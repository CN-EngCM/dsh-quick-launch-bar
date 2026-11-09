/**
 * 快速启动主机插件：快捷方式数据的读写接口、打开路径、主机侧文件选择对话框，
 * 以及页面右侧终端区的创建、输入、尺寸、关闭与输出流。
 */
import { spawn } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { readFile, rm, stat } from 'node:fs/promises'
import { homedir, tmpdir } from 'node:os'
import { isAbsolute, join } from 'node:path'
import {
  MAX_COMMAND_LENGTH,
  MAX_REQUEST_BYTES,
  RingBuffer,
  TERMINAL_LIMIT,
  buildOpenLaunch,
  buildPickFileScript,
  parsePickedFile,
  pickFileArgv,
  readStore,
  shortcutsFilePath,
  terminalArgv,
  validateShortcutsPayload,
  writeStore,
} from './lib/host-core.js'

/** 挂载本插件所需的主机服务。 */
export const inject = ['webServer', 'connection', 'subprocess']

const DEFAULT_COLS = 80
const DEFAULT_ROWS = 24
const MAX_COLS = 500
const MAX_ROWS = 300

/** 带机器可读错误码的接口错误。 */
class ApiError extends Error {
  /**
   * @param {string} code 错误码
   * @param {string} message 错误说明
   * @param {number} [status] HTTP 状态码
   * @param {object} [details] 合并进 error 对象的附加字段
   */
  constructor(code, message, status = 400, details = undefined) {
    super(message)
    this.code = code
    this.status = status
    this.details = details
  }
}

function messageOf(error) {
  return error instanceof Error ? error.message : String(error)
}

/** 统一的方法不接受时的响应体。 */
function methodNotAllowedPayload() {
  return { ok: false, error: { code: 'method-error', message: '不支持的请求方法' } }
}

/** 把整数限制在给定区间内，非法值回退到默认值。 */
function integerInRange(value, fallback, min, max) {
  if (typeof value !== 'number' || !Number.isInteger(value)) return fallback
  return Math.min(max, Math.max(min, value))
}

/** 终端尺寸是否在可用范围内。 */
function isDimension(value, min, max) {
  return typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max
}

/** 终端标题：优先用请求里的名称，空白时按类型给一个默认值。 */
function titleOf(name, kind) {
  const title = typeof name === 'string' ? name.trim() : ''
  if (title !== '') return title.slice(0, 80)
  return kind === 'blank' ? '终端' : '命令'
}

/**
 * 读取并解析 JSON 请求体，上限 1 MiB。
 * @param {import('node:http').IncomingMessage} req 请求
 * @returns {Promise<unknown>} 解析后的请求体；空请求体返回空对象
 */
async function readJsonBody(req) {
  const chunks = []
  let total = 0
  for await (const chunk of req) {
    total += chunk.length
    if (total > MAX_REQUEST_BYTES) throw new ApiError('bad-request', '请求体超过 1 MiB', 413)
    chunks.push(chunk)
  }
  if (total === 0) return {}
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw new ApiError('bad-request', '请求体不是合法 JSON', 400)
  }
}

/**
 * 启动一个与主机脱离的外部程序，等待系统确认进程已经创建。
 *
 * windowsHide 必须是 false：资源管理器会把「隐藏启动」当成隐藏窗口的请求，
 * 打开出来的文件夹和程序窗口因此不会显示。explorer.exe 是图形程序，
 * 不会因此闪出控制台窗口。
 * @param {string} command 可执行文件
 * @param {string[]} args 参数
 * @returns {Promise<void>} 进程创建成功后结算
 */
function launchDetached(command, args) {
  return new Promise((resolve, reject) => {
    let child
    try {
      child = spawn(command, args, { detached: true, stdio: 'ignore', windowsHide: false })
    } catch (error) {
      reject(error)
      return
    }
    let settled = false
    child.once('spawn', () => {
      if (settled) return
      settled = true
      // 脱离后仍保留一个错误监听，避免后续的 error 事件变成未捕获异常。
      child.on('error', () => {})
      child.unref()
      resolve()
    })
    child.once('error', (error) => {
      if (settled) return
      settled = true
      reject(error)
    })
  })
}

/**
 * 挂载主机插件。
 * @param {object} ctx Cordis 插件上下文
 */
export function apply(ctx) {
  const storePath = shortcutsFilePath()
  /** @type {Map<string, object>} */
  const terminals = new Map()
  /** @type {Set<import('node:http').ServerResponse>} */
  const streamSubscribers = new Set()
  /** @type {import('node:child_process').ChildProcess | undefined} */
  let activePicker
  /** @type {string | undefined} */
  let resolvedShellPath

  /** 统一发送 JSON 响应。 */
  function sendJson(res, status, payload) {
    if (res.writableEnded || res.destroyed) return
    if (res.headersSent) {
      try {
        res.end()
      } catch {
        // 响应已经结束，忽略
      }
      return
    }
    const text = JSON.stringify(payload)
    res.writeHead(status, {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'content-length': Buffer.byteLength(text),
    })
    res.end(text)
  }

  /** 把错误转换成统一响应。 */
  function sendFailure(res, error) {
    if (error instanceof ApiError) {
      const body = { ok: false, error: { code: error.code, message: error.message } }
      if (error.details !== undefined) Object.assign(body.error, error.details)
      sendJson(res, error.status, body)
      return
    }
    sendJson(res, 500, { ok: false, error: { code: 'internal', message: messageOf(error) } })
  }

  /**
   * 包装路由处理函数：先做同源与登录准入，再统一处理异常。
   * @param {(req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse) => Promise<void>} handler 业务处理
   * @returns {(req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse) => Promise<void>} 路由处理函数
   */
  function guard(handler) {
    return async (req, res) => {
      const rejection = ctx.connection.requestRejection(req)
      if (rejection !== undefined) {
        sendJson(res, rejection, {
          ok: false,
          error: {
            code: rejection === 401 ? 'unauthorized' : 'forbidden',
            message: '请求未通过同源或登录校验',
          },
        })
        return
      }
      try {
        await handler(req, res)
      } catch (error) {
        if (!(error instanceof ApiError)) {
          ctx.logger?.warn?.('dsh-quick-launch-bar: 请求处理失败: %s', messageOf(error))
        }
        sendFailure(res, error)
      }
    }
  }

  /** 注册一条精确路径路由，插件卸载时移除。 */
  function registerRoute(path, handler) {
    ctx.effect(
      () => ctx.webServer.register({ kind: 'exact', path, handler: guard(handler) }),
      `dsh-quick-launch-bar: ${path}`,
    )
  }

  /** 依次尝试 pwsh 与 powershell，成功的结果缓存下来。 */
  async function findShell() {
    if (resolvedShellPath !== undefined) return resolvedShellPath
    for (const candidate of ['pwsh', 'powershell']) {
      try {
        resolvedShellPath = await ctx.subprocess.resolveExecutable(candidate)
        return resolvedShellPath
      } catch {
        // 继续尝试下一个候选
      }
    }
    return undefined
  }

  /** 终端对外暴露的元信息。 */
  function metaOf(record) {
    return {
      id: record.id,
      title: record.title,
      status: record.status,
      exitCode: record.exitCode,
      createdAt: record.createdAt,
    }
  }

  /** 往一个输出流写一行 JSON，失败时返回 false。 */
  function writeFrame(res, frame) {
    if (res.writableEnded || res.destroyed) return false
    try {
      res.write(`${JSON.stringify(frame)}\n`)
      return true
    } catch {
      return false
    }
  }

  /** 把一条帧广播给所有事件流订阅者。 */
  function broadcast(record, frame) {
    if (streamSubscribers.size === 0) return
    const line = `${JSON.stringify({ ...frame, id: record.id })}\n`
    for (const subscriber of [...streamSubscribers]) {
      if (subscriber.writableEnded || subscriber.destroyed) {
        streamSubscribers.delete(subscriber)
        continue
      }
      try {
        subscriber.write(line)
      } catch {
        streamSubscribers.delete(subscriber)
      }
    }
  }

  /** 结束并清除所有事件流订阅。 */
  function closeStreamSubscribers() {
    for (const subscriber of streamSubscribers) {
      try {
        subscriber.end()
      } catch {
        // 连接已经断开，忽略
      }
    }
    streamSubscribers.clear()
  }

  /** 从列表移除终端、通知事件流，并终止进程。 */
  function removeTerminal(record) {
    if (!terminals.has(record.id)) return
    record.removed = true
    terminals.delete(record.id)
    broadcast(record, { type: 'closed' })
    void record.handle.terminate().catch((error) => {
      ctx.logger?.warn?.('dsh-quick-launch-bar: 终止终端失败: %s', messageOf(error))
    })
  }

  /** 持续读取终端输出并广播，进程结束后更新状态、按需自动关闭。 */
  function startPump(record) {
    // 先挂上拒绝处理，避免 done 提前失败时出现未处理的 Promise 拒绝。
    const outcome = record.handle.done.then(
      (value) => ({ ok: true, value }),
      (error) => ({ ok: false, error }),
    )
    void (async () => {
      try {
        for await (const chunk of record.handle.output) {
          const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
          if (buffer.length === 0) continue
          record.buffer.push(buffer)
          broadcast(record, { type: 'output', data: buffer.toString('base64') })
        }
      } catch (error) {
        if (!record.removed) {
          ctx.logger?.warn?.('dsh-quick-launch-bar: 读取终端输出失败: %s', messageOf(error))
        }
      }
      const result = await outcome
      if (record.removed) return
      if (!result.ok) {
        ctx.logger?.warn?.('dsh-quick-launch-bar: 终端进程异常结束: %s', messageOf(result.error))
      }
      record.status = 'exited'
      record.exitCode = result.ok ? result.value.exitCode : null
      broadcast(record, { type: 'status', status: 'exited', exitCode: record.exitCode })
      if (record.autoClose && record.exitCode === 0) removeTerminal(record)
    })()
  }

  /** 按 id 取终端，未知 id 抛出 terminal-not-found。 */
  function requireTerminal(payload) {
    const id = payload !== null && typeof payload === 'object' && typeof payload.id === 'string'
      ? payload.id
      : ''
    const record = id === '' ? undefined : terminals.get(id)
    if (record === undefined) throw new ApiError('terminal-not-found', `终端不存在：${id}`, 404)
    return record
  }

  /** GET 列表与 PUT 保存。 */
  async function handleList(req, res) {
    if (req.method === 'GET') {
      const result = await readStore(storePath)
      if (!result.ok) throw new ApiError(result.error.code, result.error.message, 500)
      sendJson(res, 200, { ok: true, value: result.value })
      return
    }
    if (req.method === 'PUT') {
      const payload = await readJsonBody(req)
      const validation = await validateShortcutsPayload(payload, { checkPaths: true })
      if (!validation.ok) {
        throw new ApiError('invalid-shortcut', validation.error.message, 400, {
          fieldErrors: validation.error.fieldErrors,
        })
      }
      await writeStore(storePath, validation.value)
      sendJson(res, 200, { ok: true })
      return
    }
    sendJson(res, 405, methodNotAllowedPayload())
  }

  /** 打开一个已存在的路径。 */
  async function handleOpen(req, res) {
    if (req.method !== 'POST') {
      sendJson(res, 405, methodNotAllowedPayload())
      return
    }
    const payload = await readJsonBody(req)
    const target = payload !== null && typeof payload === 'object' && typeof payload.path === 'string'
      ? payload.path.trim()
      : ''
    if (target === '') throw new ApiError('bad-request', 'path 不能为空')
    if (!isAbsolute(target)) throw new ApiError('bad-request', 'path 必须是绝对路径')

    const info = await stat(target).catch(() => undefined)
    if (info === undefined) throw new ApiError('path-missing', `路径不存在：${target}`)

    const launch = buildOpenLaunch(target)
    try {
      await launchDetached(launch.command, launch.args)
    } catch (error) {
      throw new ApiError('open-failed', `启动失败：${messageOf(error)}`, 500)
    }
    sendJson(res, 200, { ok: true })
  }

  /**
   * 在主机桌面上打开「选择文件」对话框，返回选中的绝对路径。
   *
   * 同一时间只允许一个窗口；浏览器断开时终止对话框进程。
   */
  async function handlePickFile(req, res) {
    if (req.method !== 'POST') {
      sendJson(res, 405, methodNotAllowedPayload())
      return
    }
    const payload = await readJsonBody(req)
    const requestedTitle = payload !== null && typeof payload === 'object' && typeof payload.title === 'string'
      ? payload.title.trim()
      : ''
    const title = requestedTitle === '' ? '选择要打开的程序或文件' : requestedTitle.slice(0, 80)
    if (activePicker !== undefined) throw new ApiError('picker-busy', '已经有一个选择窗口打开了', 409)

    const shellPath = await findShell()
    if (shellPath === undefined) throw new ApiError('shell-unavailable', '找不到可用的 PowerShell', 500)

    const outputPath = join(tmpdir(), `quick-launch-pick-${randomUUID()}.txt`)
    // findShell 有 await，这里再查一次，避免两个请求各开一个对话框。
    if (activePicker !== undefined) throw new ApiError('picker-busy', '已经有一个选择窗口打开了', 409)
    const argv = pickFileArgv(shellPath, buildPickFileScript(outputPath, title))
    const child = spawn(argv[0], argv.slice(1), {
      stdio: ['ignore', 'ignore', 'pipe'],
      windowsHide: true,
    })
    activePicker = child
    const closed = () => {
      if (activePicker === child) activePicker = undefined
      if (!res.writableEnded) child.kill()
    }
    res.once('close', closed)

    let stderr = ''
    child.stderr?.on('data', (chunk) => {
      if (stderr.length < 4000) stderr += chunk.toString('utf8')
    })

    const outcome = await new Promise((resolve) => {
      child.once('error', (error) => resolve({ ok: false, message: messageOf(error) }))
      child.once('close', (code) => resolve({ ok: code === 0, message: `选择窗口异常退出（代码 ${code}）：${stderr.trim()}` }))
    })
    res.off('close', closed)
    if (activePicker === child) activePicker = undefined

    let text = ''
    try {
      text = await readFile(outputPath, 'utf8')
    } catch {
      // 用户取消时脚本不写结果文件。
    }
    await rm(outputPath, { force: true }).catch(() => {})
    if (!outcome.ok) throw new ApiError('pick-failed', outcome.message, 500)
    sendJson(res, 200, { ok: true, value: { path: parsePickedFile(text) } })
  }

  /** 列出终端或创建终端。 */
  async function handleTerminals(req, res) {
    if (req.method === 'GET') {
      sendJson(res, 200, {
        ok: true,
        value: { terminals: [...terminals.values()].map(metaOf) },
      })
      return
    }
    if (req.method === 'POST') {
      await createTerminal(req, res)
      return
    }
    sendJson(res, 405, methodNotAllowedPayload())
  }

  /** 创建终端。 */
  async function createTerminal(req, res) {
    const payload = await readJsonBody(req)
    if (payload === null || typeof payload !== 'object' || Array.isArray(payload)) {
      throw new ApiError('bad-request', '请求体必须是对象')
    }
    const kind = payload.kind
    if (kind !== 'blank' && kind !== 'shortcut') {
      throw new ApiError('bad-request', 'kind 必须是 shortcut 或 blank')
    }
    if (terminals.size >= TERMINAL_LIMIT) {
      throw new ApiError('terminal-limit', `最多同时存在 ${TERMINAL_LIMIT} 个终端`)
    }

    let command = ''
    if (kind === 'shortcut') {
      if (typeof payload.command !== 'string' || payload.command.trim() === '') {
        throw new ApiError('bad-request', 'command 不能为空')
      }
      command = payload.command.trim()
      if (command.length > MAX_COMMAND_LENGTH) {
        throw new ApiError('bad-request', `命令不能超过 ${MAX_COMMAND_LENGTH} 个字符`)
      }
    }

    const requestedCwd = typeof payload.cwd === 'string' ? payload.cwd.trim() : ''
    const cwd = requestedCwd === '' ? homedir() : requestedCwd
    if (!isAbsolute(cwd)) throw new ApiError('cwd-missing', '工作目录必须是绝对路径')
    const cwdInfo = await stat(cwd).catch(() => undefined)
    if (cwdInfo === undefined || !cwdInfo.isDirectory()) {
      throw new ApiError('cwd-missing', `工作目录不存在：${cwd}`)
    }

    const cols = integerInRange(payload.cols, DEFAULT_COLS, 2, MAX_COLS)
    const rows = integerInRange(payload.rows, DEFAULT_ROWS, 1, MAX_ROWS)
    const shellPath = await findShell()
    if (shellPath === undefined) throw new ApiError('shell-unavailable', '找不到 pwsh 或 powershell', 500)

    const autoClose = kind === 'shortcut' && payload.autoClose === true
    let handle
    try {
      handle = await ctx.subprocess.spawnTerminal({
        argv: terminalArgv(shellPath, { command, autoClose }),
        cwd,
        cols,
        rows,
        terminalType: 'xterm-256color',
        graceMs: 1000,
      })
    } catch (error) {
      throw new ApiError('shell-unavailable', `终端启动失败：${messageOf(error)}`, 500)
    }

    const record = {
      id: randomUUID(),
      title: titleOf(payload.name, kind),
      status: 'running',
      exitCode: null,
      createdAt: Date.now(),
      autoClose,
      handle,
      buffer: new RingBuffer(),
      removed: false,
    }
    terminals.set(record.id, record)
    broadcast(record, { type: 'created', terminal: metaOf(record) })
    startPump(record)
    sendJson(res, 200, { ok: true, value: metaOf(record) })
  }

  /** 把文本写入终端的标准输入；终端不存在时静默丢弃。 */
  async function handleTerminalInput(req, res) {
    const payload = await readJsonBody(req)
    if (typeof payload.data !== 'string') throw new ApiError('bad-request', 'data 必须是字符串')
    const id = payload !== null && typeof payload === 'object' && typeof payload.id === 'string' ? payload.id : ''
    const record = terminals.get(id)
    if (record === undefined) {
      sendJson(res, 200, { ok: true })
      return
    }
    try {
      await record.handle.write(payload.data)
    } catch (error) {
      ctx.logger?.warn?.('dsh-quick-launch-bar: 写入终端失败: %s', messageOf(error))
    }
    sendJson(res, 200, { ok: true })
  }

  /** 调整终端尺寸。 */
  async function handleTerminalResize(req, res) {
    const payload = await readJsonBody(req)
    const record = requireTerminal(payload)
    if (!isDimension(payload.cols, 1, MAX_COLS) || !isDimension(payload.rows, 1, MAX_ROWS)) {
      throw new ApiError('bad-request', 'cols 和 rows 必须是正整数')
    }
    try {
      await record.handle.resize(payload.cols, payload.rows)
    } catch (error) {
      ctx.logger?.warn?.('dsh-quick-launch-bar: 调整终端尺寸失败: %s', messageOf(error))
    }
    sendJson(res, 200, { ok: true })
  }

  /** 关闭终端并从列表移除。 */
  async function handleTerminalClose(req, res) {
    const payload = await readJsonBody(req)
    const record = requireTerminal(payload)
    removeTerminal(record)
    sendJson(res, 200, { ok: true })
  }

  /**
   * 终端事件流：一条连接承载所有终端的事件。
   * 连接建立后先发 init 与各终端快照，之后推送 created / output / status / closed。
   */
  async function handleStream(req, res) {
    if (req.method !== 'GET') {
      sendJson(res, 405, methodNotAllowedPayload())
      return
    }

    res.writeHead(200, {
      'content-type': 'application/x-ndjson; charset=utf-8',
      'cache-control': 'no-store',
    })
    res.flushHeaders?.()

    const records = [...terminals.values()]
    writeFrame(res, { type: 'init', terminals: records.map(metaOf) })
    for (const record of records) {
      writeFrame(res, { type: 'snapshot', id: record.id, data: record.buffer.snapshotBase64() })
      if (record.status === 'exited') {
        writeFrame(res, { type: 'status', id: record.id, status: 'exited', exitCode: record.exitCode })
      }
    }

    streamSubscribers.add(res)
    const detach = () => {
      streamSubscribers.delete(res)
    }
    res.once('close', detach)
    res.once('error', detach)
  }

  registerRoute('/quick-launch/api/list', handleList)
  registerRoute('/quick-launch/api/open', handleOpen)
  registerRoute('/quick-launch/api/pick-file', handlePickFile)
  registerRoute('/quick-launch/api/terminals', handleTerminals)
  registerRoute('/quick-launch/api/terminals/input', handleTerminalInput)
  registerRoute('/quick-launch/api/terminals/resize', handleTerminalResize)
  registerRoute('/quick-launch/api/terminals/close', handleTerminalClose)
  registerRoute('/quick-launch/stream', handleStream)

  // 插件卸载时结束所有事件流、选择窗口并终止全部终端。
  ctx.effect(() => async () => {
    if (activePicker !== undefined) {
      activePicker.kill()
      activePicker = undefined
    }
    const records = [...terminals.values()]
    terminals.clear()
    for (const record of records) {
      record.removed = true
      broadcast(record, { type: 'closed' })
    }
    closeStreamSubscribers()
    await Promise.allSettled(records.map((record) => record.handle.terminate()))
  }, 'dsh-quick-launch-bar: terminals')
}

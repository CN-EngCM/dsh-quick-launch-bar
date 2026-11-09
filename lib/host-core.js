/**
 * 快速启动主机侧的纯逻辑：数据文件位置、快捷方式校验、原子读写、终端输出
 * 环形缓冲，以及 PowerShell 命令、文件选择脚本与启动参数的构造。
 *
 * 本模块不依赖 Cordis，也不做任何网络或进程操作，可以直接用 node:test 覆盖。
 */
import { randomBytes } from 'node:crypto'
import { mkdir, readFile, rename, stat, unlink, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, isAbsolute, join } from 'node:path'
import { pathToFileURL } from 'node:url'

/** 数据文件格式版本。 */
export const STORE_VERSION = 1
/** 快捷方式条数上限。 */
export const MAX_SHORTCUTS = 200
/** 单个请求体的字节上限（1 MiB）。 */
export const MAX_REQUEST_BYTES = 1024 * 1024
/** 每个终端保留的输出字节上限（512 KiB）。 */
export const RING_LIMIT_BYTES = 512 * 1024
/** 同时存在的终端数量上限。 */
export const TERMINAL_LIMIT = 12

const MAX_ID_LENGTH = 64
const MAX_NAME_LENGTH = 80
const MAX_NOTE_LENGTH = 200
/** 单条命令的字符上限。 */
export const MAX_COMMAND_LENGTH = 2000

/**
 * 解析 DSH 主目录：优先使用环境变量 DSH_HOME，缺省为用户主目录下的 .dsh。
 * @param {NodeJS.ProcessEnv} [env] 环境变量表
 * @param {string} [homeDirectory] 用户主目录
 * @returns {string} DSH 主目录
 */
export function resolveDshHome(env = process.env, homeDirectory = homedir()) {
  const configured = typeof env?.DSH_HOME === 'string' ? env.DSH_HOME.trim() : ''
  return configured === '' ? join(homeDirectory, '.dsh') : configured
}

/**
 * 快捷方式数据文件的完整路径。
 * @param {NodeJS.ProcessEnv} [env] 环境变量表
 * @param {string} [homeDirectory] 用户主目录
 * @returns {string} 数据文件路径
 */
export function shortcutsFilePath(env = process.env, homeDirectory = homedir()) {
  return join(resolveDshHome(env, homeDirectory), 'quick-launch', 'shortcuts.json')
}

/**
 * 构造空的数据文件内容。
 * @returns {{version: number, shortcuts: object[]}} 空数据
 */
export function emptyStore() {
  return { version: STORE_VERSION, shortcuts: [] }
}

/**
 * 把错误值转成可读文本。
 * @param {unknown} error 任意错误值
 * @returns {string} 错误文本
 */
function messageOf(error) {
  return error instanceof Error ? error.message : String(error)
}

/**
 * 构造一条校验失败结果，只携带第一个错误。
 * @param {number} index 条目下标；-1 表示数据整体层面的错误
 * @param {string} field 出错字段
 * @param {string} reason 机器可读的原因代码，供界面本地化
 * @param {string} detail 错误说明
 * @returns {{ok: false, error: {code: string, message: string, fieldErrors: object[]}}}
 */
function invalid(index, field, reason, detail) {
  return {
    ok: false,
    error: {
      code: 'invalid-shortcut',
      message: index >= 0 ? `第 ${index + 1} 条快捷方式：${detail}` : detail,
      fieldErrors: [{ index, field, reason, message: detail }],
    },
  }
}

/**
 * 判断路径是否存在，目录或文件都算存在。
 * @param {string} target 绝对路径
 * @returns {Promise<boolean>} 是否存在
 */
async function entryExists(target) {
  try {
    await stat(target)
    return true
  } catch {
    return false
  }
}

/**
 * 校验并归一化单条快捷方式。只返回第一个错误。
 * @param {unknown} raw 原始条目
 * @param {number} index 条目下标
 * @param {Set<string>} seenIds 已出现的 id 集合
 * @param {boolean} checkPaths 是否检查路径存在性
 * @returns {Promise<object>} 成功为 {ok:true, value}，失败为 invalid() 的结果
 */
async function normalizeShortcut(raw, index, seenIds, checkPaths) {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    return invalid(index, 'type', 'payload-shape', '快捷方式必须是对象')
  }
  if (typeof raw.id !== 'string' || raw.id.trim() === '') {
    return invalid(index, 'id', 'id-empty', 'id 不能为空')
  }
  if (raw.id.length > MAX_ID_LENGTH) {
    return invalid(index, 'id', 'id-too-long', `id 不能超过 ${MAX_ID_LENGTH} 个字符`)
  }
  if (seenIds.has(raw.id)) {
    return invalid(index, 'id', 'id-duplicate', 'id 不能重复')
  }
  seenIds.add(raw.id)

  if (raw.type !== 'open' && raw.type !== 'command') {
    return invalid(index, 'type', 'type-invalid', '类型必须是 open 或 command')
  }
  if (typeof raw.name !== 'string' || raw.name.trim() === '') {
    return invalid(index, 'name', 'name-empty', '名称不能为空')
  }
  const name = raw.name.trim()
  if (name.length > MAX_NAME_LENGTH) {
    return invalid(index, 'name', 'name-too-long', `名称不能超过 ${MAX_NAME_LENGTH} 个字符`)
  }

  let note = ''
  if (raw.note !== undefined && raw.note !== null) {
    if (typeof raw.note !== 'string') {
      return invalid(index, 'note', 'note-type', '备注必须是字符串')
    }
    note = raw.note.trim()
    if (note.length > MAX_NOTE_LENGTH) {
      return invalid(index, 'note', 'note-too-long', `备注不能超过 ${MAX_NOTE_LENGTH} 个字符`)
    }
  }

  if (raw.type === 'open') {
    if (typeof raw.path !== 'string' || raw.path.trim() === '') {
      return invalid(index, 'path', 'path-empty', '路径不能为空')
    }
    const target = raw.path.trim()
    if (!isAbsolute(target)) {
      return invalid(index, 'path', 'path-absolute', '路径必须是绝对路径')
    }
    if (checkPaths && !(await entryExists(target))) {
      return invalid(index, 'path', 'path-missing', '路径不存在')
    }
    return { ok: true, value: { id: raw.id, type: 'open', name, path: target, note } }
  }

  if (typeof raw.command !== 'string' || raw.command.trim() === '') {
    return invalid(index, 'command', 'command-empty', '命令不能为空')
  }
  const command = raw.command.trim()
  if (command.length > MAX_COMMAND_LENGTH) {
    return invalid(index, 'command', 'command-too-long', `命令不能超过 ${MAX_COMMAND_LENGTH} 个字符`)
  }

  let cwd = ''
  if (raw.cwd !== undefined && raw.cwd !== null) {
    if (typeof raw.cwd !== 'string') {
      return invalid(index, 'cwd', 'cwd-type', '工作目录必须是字符串')
    }
    cwd = raw.cwd.trim()
    if (cwd !== '') {
      if (!isAbsolute(cwd)) {
        return invalid(index, 'cwd', 'cwd-absolute', '工作目录必须是绝对路径')
      }
      if (checkPaths && !(await entryExists(cwd))) {
        return invalid(index, 'cwd', 'cwd-missing', '工作目录不存在')
      }
    }
  }

  let autoClose = false
  if (raw.autoClose !== undefined) {
    if (typeof raw.autoClose !== 'boolean') {
      return invalid(index, 'autoClose', 'autoclose-type', '自动关闭必须是布尔值')
    }
    autoClose = raw.autoClose
  }

  return {
    ok: true,
    value: { id: raw.id, type: 'command', name, command, cwd, autoClose, note },
  }
}

/**
 * 校验一份完整的数据内容并归一化。
 *
 * 打开了 checkPaths 时会用 fs.stat 检查路径是否存在；读取磁盘文件时关闭该项，
 * 只校验结构，避免某个文件夹被删除后整份列表都不可用。
 * @param {unknown} payload 待校验的数据
 * @param {{checkPaths?: boolean}} [options] 校验选项
 * @returns {Promise<object>} 成功为 {ok:true, value:{version, shortcuts}}，失败为 invalid() 的结果
 */
export async function validateShortcutsPayload(payload, options = {}) {
  const checkPaths = options.checkPaths !== false
  if (payload === null || typeof payload !== 'object' || Array.isArray(payload)) {
    return invalid(-1, 'shortcuts', 'payload-shape', '请求体必须是对象')
  }
  if (payload.version !== undefined && payload.version !== STORE_VERSION) {
    return invalid(-1, 'version', 'version-invalid', `版本号必须是 ${STORE_VERSION}`)
  }
  if (!Array.isArray(payload.shortcuts)) {
    return invalid(-1, 'shortcuts', 'shortcuts-type', '快捷方式列表必须是数组')
  }
  if (payload.shortcuts.length > MAX_SHORTCUTS) {
    return invalid(-1, 'shortcuts', 'shortcuts-too-many', `快捷方式最多 ${MAX_SHORTCUTS} 条`)
  }

  const seenIds = new Set()
  const shortcuts = []
  for (let index = 0; index < payload.shortcuts.length; index += 1) {
    const result = await normalizeShortcut(payload.shortcuts[index], index, seenIds, checkPaths)
    if (!result.ok) return result
    shortcuts.push(result.value)
  }
  return { ok: true, value: { version: STORE_VERSION, shortcuts } }
}

/**
 * 读取数据文件。文件不存在时返回空列表；读取失败、JSON 损坏或结构不合法时
 * 返回 store-corrupt，调用方不得覆盖原文件。
 * @param {string} filePath 数据文件路径
 * @returns {Promise<object>} 成功为 {ok:true, value}，失败为 {ok:false, error}
 */
export async function readStore(filePath) {
  let text
  try {
    text = await readFile(filePath, 'utf8')
  } catch (error) {
    if (error?.code === 'ENOENT') return { ok: true, value: emptyStore() }
    return {
      ok: false,
      error: { code: 'store-corrupt', message: `无法读取数据文件：${messageOf(error)}` },
    }
  }

  let payload
  try {
    // 兼容带 UTF-8 BOM 的手工编辑文件。
    payload = JSON.parse(text.charCodeAt(0) === 0xfeff ? text.slice(1) : text)
  } catch (error) {
    return {
      ok: false,
      error: { code: 'store-corrupt', message: `数据文件不是合法 JSON：${messageOf(error)}` },
    }
  }

  const result = await validateShortcutsPayload(payload, { checkPaths: false })
  if (!result.ok) {
    return {
      ok: false,
      error: { code: 'store-corrupt', message: `数据文件内容不合法：${result.error.message}` },
    }
  }
  return result
}

/**
 * 原子写入数据文件：先写同目录下的临时文件，再 rename 覆盖目标文件。
 * 写入失败时会清理临时文件，已有文件保持不变。
 * @param {string} filePath 数据文件路径
 * @param {{version: number, shortcuts: object[]}} store 已校验的数据
 * @returns {Promise<void>}
 */
export async function writeStore(filePath, store) {
  const directory = dirname(filePath)
  await mkdir(directory, { recursive: true })
  const temporaryPath = join(directory, `.shortcuts-${process.pid}-${randomBytes(6).toString('hex')}.tmp`)
  const text = `${JSON.stringify(store, null, 2)}\n`
  try {
    await writeFile(temporaryPath, text, 'utf8')
    await rename(temporaryPath, filePath)
  } catch (error) {
    await unlink(temporaryPath).catch(() => {})
    throw error
  }
}

/**
 * 终端输出环形缓冲：保留最近若干字节，超出上限时丢弃最旧的数据。
 * 快照按写入顺序拼接成一个 Buffer。
 */
export class RingBuffer {
  /**
   * @param {number} [limit] 保留的字节上限
   */
  constructor(limit = RING_LIMIT_BYTES) {
    this.limit = limit
    this.chunks = []
    this.bytes = 0
  }

  /** 当前保留的字节数。 */
  get size() {
    return this.bytes
  }

  /**
   * 追加一段输出。
   * @param {Buffer|Uint8Array|string} chunk 输出字节
   * @returns {void}
   */
  push(chunk) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk ?? '')
    if (buffer.length === 0) return
    this.chunks.push(buffer)
    this.bytes += buffer.length
    while (this.bytes > this.limit) {
      const first = this.chunks[0]
      if (first === undefined) break
      const overflow = this.bytes - this.limit
      if (first.length <= overflow) {
        this.chunks.shift()
        this.bytes -= first.length
      } else {
        this.chunks[0] = first.subarray(overflow)
        this.bytes -= overflow
      }
    }
  }

  /**
   * 取当前保留内容的副本。
   * @returns {Buffer} 输出快照
   */
  snapshot() {
    return this.chunks.length === 0 ? Buffer.alloc(0) : Buffer.concat(this.chunks, this.bytes)
  }

  /**
   * 取当前保留内容的 base64 文本，用于输出流快照。
   * @returns {string} base64 文本
   */
  snapshotBase64() {
    return this.snapshot().toString('base64')
  }
}

/**
 * 构造自动关闭终端使用的外壳脚本：先执行用户命令，再把 $LASTEXITCODE 作为退出码。
 * 用户命令里的换行原样保留。
 * @param {string} command 用户命令
 * @returns {string} PowerShell 脚本
 */
export function buildAutoCloseScript(command) {
  return `${command}\r\nexit $LASTEXITCODE\r\n`
}

/**
 * 把 PowerShell 脚本编码成 -EncodedCommand 需要的 base64（UTF-16LE）。
 * @param {string} script PowerShell 脚本
 * @returns {string} base64 文本
 */
export function encodePowerShellCommand(script) {
  return Buffer.from(script, 'utf16le').toString('base64')
}

/**
 * 转义 PowerShell 单引号字符串里的内容：单引号写成两个单引号。
 * @param {string} value 原始文本
 * @returns {string} 转义后的文本
 */
export function escapePowerShellSingleQuoted(value) {
  return String(value).replace(/'/gu, "''")
}

/**
 * 构造文件选择对话框使用的 PowerShell 脚本：用户点确定后把完整路径写入输出文件。
 *
 * 输出走临时文件而不是标准输出，避免控制台编码把中文路径写坏。
 * 打开对话框前先合成一次 Alt 抬起：后台进程拉起的窗口不会自动拿到前台，
 * 否则对话框会藏在浏览器后面。
 * @param {string} outputPath 结果文件路径
 * @param {string} title 对话框标题
 * @returns {string} PowerShell 脚本
 */
export function buildPickFileScript(outputPath, title) {
  const output = escapePowerShellSingleQuoted(outputPath)
  const caption = escapePowerShellSingleQuoted(title)
  return [
    "$ErrorActionPreference = 'Stop'",
    'Add-Type -AssemblyName System.Windows.Forms',
    `$keyboard = Add-Type -MemberDefinition '[DllImport("user32.dll")] public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, System.IntPtr dwExtraInfo);' -Name 'QuickLaunchKeyboard' -Namespace 'QuickLaunch' -PassThru`,
    '$dialog = New-Object System.Windows.Forms.OpenFileDialog',
    `$dialog.Title = '${caption}'`,
    "$dialog.Filter = '程序和快捷方式 (*.exe;*.lnk;*.bat;*.cmd;*.com)|*.exe;*.lnk;*.bat;*.cmd;*.com|所有文件 (*.*)|*.*'",
    '$dialog.CheckFileExists = $true',
    '$dialog.CheckPathExists = $true',
    '$dialog.Multiselect = $false',
    '$keyboard::keybd_event(0x12, 0, 0, [System.IntPtr]::Zero)',
    '$keyboard::keybd_event(0x12, 0, 2, [System.IntPtr]::Zero)',
    'if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {',
    `  [System.IO.File]::WriteAllText('${output}', $dialog.FileName, [System.Text.UTF8Encoding]::new($false))`,
    '}',
    'exit 0',
  ].join('\r\n')
}

/**
 * 解析文件选择脚本写下的内容：去掉 BOM 与首尾空白，空内容表示用户取消。
 * @param {unknown} text 结果文件内容
 * @returns {string | null} 选中的路径或 null
 */
export function parsePickedFile(text) {
  if (typeof text !== 'string') return null
  const value = text.replace(/^\uFEFF/u, '').trim()
  return value === '' ? null : value
}

/**
 * 构造文件选择对话框的完整 argv。
 * @param {string} shellPath shell 可执行文件路径
 * @param {string} script 对话框脚本
 * @returns {string[]} argv
 */
export function pickFileArgv(shellPath, script) {
  return [
    shellPath,
    '-NoLogo',
    '-NoProfile',
    '-NonInteractive',
    '-STA',
    '-WindowStyle',
    'Hidden',
    '-EncodedCommand',
    encodePowerShellCommand(script),
  ]
}

/**
 * 把绝对 Windows 路径编码成资源管理器能原样接收的 file URI。
 *
 * 资源管理器自己拆命令行，逗号和等号是它的字段分隔符，必须转义成百分号形式；
 * 非 ASCII 字符不能保留百分号编码（资源管理器会退回去打开「文档」目录），
 * 所以把 Node 产生的非 ASCII 转义还原成字面字符，ASCII 转义保持原样。
 * @param {string} targetPath 绝对路径
 * @returns {string} file URI
 */
export function explorerTarget(targetPath) {
  return pathToFileURL(targetPath, { windows: true }).href
    .replace(/(?:%[89A-F][0-9A-F])+/giu, (escaped) => decodeURIComponent(escaped))
    .replaceAll(',', '%2C')
    .replaceAll('=', '%3D')
}

/**
 * 构造打开路径的启动参数。
 *
 * 文件夹、程序（exe）、其他文件统一交给资源管理器，等同于在资源管理器里双击：
 * 文件夹打开窗口，程序直接启动，文档用系统默认程序打开。
 * @param {string} targetPath 已存在的绝对路径
 * @returns {{command: string, args: string[]}} 启动命令与参数
 */
export function buildOpenLaunch(targetPath) {
  return { command: 'explorer.exe', args: [explorerTarget(targetPath)] }
}


/**
 * 构造终端的完整 argv。
 *
 * - 没有命令：只带 -NoLogo，得到交互 shell；
 * - autoClose 为 true：-NoLogo -EncodedCommand <自动收尾的脚本>；
 * - autoClose 为 false：-NoLogo -NoExit -EncodedCommand <用户命令>。
 * @param {string} shellPath shell 可执行文件路径
 * @param {{command?: string, autoClose?: boolean}} [options] 终端选项
 * @returns {string[]} argv
 */
export function terminalArgv(shellPath, options = {}) {
  const argv = [shellPath, '-NoLogo']
  const command = typeof options.command === 'string' ? options.command : ''
  if (command.trim() === '') return argv
  if (options.autoClose === true) {
    argv.push('-EncodedCommand', encodePowerShellCommand(buildAutoCloseScript(command)))
  } else {
    argv.push('-NoExit', '-EncodedCommand', encodePowerShellCommand(command))
  }
  return argv
}

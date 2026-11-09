import {
  ApiError,
  closeTerminal,
  createTerminal,
  eventStreamUrl,
  listTerminals,
  resizeTerminal,
  writeTerminal,
} from './api.js';

/** 同时存在的终端上限，与主机一致。 */
export const TERMINAL_LIMIT = 12;

/** 终端字体栈。 */
const TERMINAL_FONT_FAMILY = '"Maple Mono NF CN", "Cascadia Code", Consolas, monospace';
/** 终端字号。 */
const TERMINAL_FONT_SIZE = 13;
/** 尺寸变化后合并请求的等待时间。 */
const RESIZE_DELAY = 120;
/** 事件流断开后重连前的等待时间。 */
const RECONNECT_DELAY = 400;
/** 页面生命周期内最多建立的事件流连接数。 */
const MAX_STREAM_ATTEMPTS = 3;

/**
 * 把 base64 文本还原成终端可写入的字节。
 * @param {unknown} text - base64 文本。
 * @returns {Uint8Array | undefined} 字节序列。
 */
function decodeBase64(text) {
  if (typeof text !== 'string' || text === '') return undefined;
  try {
    const binary = atob(text);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return bytes;
  } catch {
    return undefined;
  }
}

/**
 * 等待指定毫秒。
 * @param {number} ms - 等待时间。
 * @returns {Promise<void>} 计时结束。
 */
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * 创建终端会话集合。会话负责 xterm 实例、尺寸同步与输入排队；
 * 所有终端的输出与状态由一条事件流统一推送，避免占满浏览器的同源连接数。
 * @param {object} options - 运行依赖。
 * @param {typeof import('@xterm/xterm').Terminal} options.Terminal - 终端构造器。
 * @param {typeof import('@xterm/addon-fit').FitAddon} options.FitAddon - 尺寸适配插件。
 * @returns {object} 会话集合。
 */
export function createTerminalSessions({ Terminal, FitAddon }) {
  /** @type {Map<string, object>} */
  const sessions = new Map();
  const listeners = new Set();
  let themeObserver;
  let streamController = null;
  let streamAttempts = 0;
  let disposed = false;
  let snapshot = { terminals: [] };

  /** 重建快照并通知界面。 */
  function publish() {
    if (disposed) return;
    snapshot = {
      terminals: [...sessions.values()].map((session) => ({
        id: session.id,
        title: session.title,
        status: session.status,
        exitCode: session.exitCode,
      })),
    };
    for (const listener of listeners) listener();
  }

  /**
   * 读取终端窗口实际使用的配色。优先取页面主题变量，取不到时退回容器上解析后的颜色。
   * @param {HTMLElement} pane - 终端容器。
   * @returns {object} xterm 主题。
   */
  function readTheme(pane) {
    const bodyStyle = getComputedStyle(document.body);
    const paneStyle = getComputedStyle(pane);
    const token = (name) => bodyStyle.getPropertyValue(name).trim();
    const resolved = (value, fallback) => {
      const text = value.trim();
      if (text === '' || text.startsWith('var(')) return fallback;
      return text;
    };
    const background = resolved(token('--dsw-alias-bg-base'), paneStyle.backgroundColor || '#000000');
    const foreground = resolved(token('--dsw-alias-label-primary'), paneStyle.color || '#ffffff');
    const selection = resolved(token('--dsw-alias-interactive-bg-active'), 'rgba(128, 128, 128, 0.35)');
    return {
      background,
      foreground,
      cursor: foreground,
      cursorAccent: background,
      selectionBackground: selection,
    };
  }

  /**
   * 把当前页面主题应用到已打开的终端。
   * @param {object} session - 终端会话。
   */
  function applyTheme(session) {
    if (!session.term || !session.pane.isConnected) return;
    session.term.options.theme = readTheme(session.pane);
  }

  /**
   * 把选区写入系统剪贴板。
   * @param {object} session - 终端会话。
   */
  async function copySelection(session) {
    const selection = session.term ? session.term.getSelection() : '';
    if (!selection) return;
    try {
      await navigator.clipboard.writeText(selection);
    } catch {
      // 剪贴板不可用时保持终端内容不变。
    }
  }

  /**
   * 把系统剪贴板内容粘贴到终端。
   * @param {object} session - 终端会话。
   */
  async function pasteClipboard(session) {
    if (!session.term) return;
    try {
      const text = await navigator.clipboard.readText();
      if (text) session.term.paste(text);
    } catch {
      // 未授予剪贴板读取权限时忽略。
    }
  }

  /**
   * 处理终端的复制粘贴快捷键。
   * @param {object} session - 终端会话。
   * @param {KeyboardEvent} event - 键盘事件。
   * @returns {boolean} 是否已消费该事件。
   */
  function handleShortcut(session, event) {
    if (event.type !== 'keydown') return false;
    const control = event.ctrlKey || event.metaKey;
    const copy = (control && event.shiftKey && event.code === 'KeyC') || (control && event.code === 'Insert');
    const paste = (control && event.shiftKey && event.code === 'KeyV') || (event.shiftKey && event.code === 'Insert');
    if (!copy && !paste) return false;
    event.preventDefault();
    event.stopPropagation();
    if (copy) void copySelection(session);
    else void pasteClipboard(session);
    return true;
  }

  /**
   * 把键盘输入串行写入主机，保证字符顺序。
   * @param {object} session - 终端会话。
   * @param {string} data - 输入文本。
   */
  function sendInput(session, data) {
    if (session.status !== 'running') return;
    session.inputChain = session.inputChain.then(async () => {
      try {
        await writeTerminal(session.id, data);
      } catch {
        // 终端已在主机侧消失时不再重试输入。
      }
    });
  }

  /**
   * 合并尺寸变化后通知主机。
   * @param {object} session - 终端会话。
   */
  function scheduleResize(session) {
    if (session.resizeTimer) return;
    session.resizeTimer = setTimeout(() => {
      session.resizeTimer = 0;
      if (disposed || session.removed || session.status !== 'running') return;
      if (!session.cols || !session.rows) return;
      resizeTerminal(session.id, session.cols, session.rows).catch(() => {
        // 尺寸同步失败不影响继续输入。
      });
    }, RESIZE_DELAY);
  }

  /**
   * 把尚未写入容器的输出追加进待写队列。
   * @param {object} session - 终端会话。
   * @param {Uint8Array} bytes - 输出字节。
   * @param {boolean} reset - 是否先清空已有内容。
   */
  function queueBytes(session, bytes, reset) {
    if (session.term) {
      if (reset) session.term.reset();
      session.term.write(bytes);
      return;
    }
    if (reset) session.pending = [];
    session.pending.push(bytes);
  }

  /**
   * 在容器可见时创建 xterm 实例，并补写等待中的输出。
   * @param {object} session - 终端会话。
   */
  function ensureTerminal(session) {
    if (session.term || session.removed || disposed) return;
    if (!session.pane.isConnected) return;
    if (session.pane.clientWidth === 0 || session.pane.clientHeight === 0) return;

    const terminal = new Terminal({
      fontFamily: TERMINAL_FONT_FAMILY,
      fontSize: TERMINAL_FONT_SIZE,
      cursorBlink: true,
      minimumContrastRatio: 4.5,
      scrollback: 2000,
    });
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(session.pane);
    terminal.textarea?.setAttribute('aria-label', session.title);

    session.term = terminal;
    session.fitAddon = fitAddon;
    session.dataSub = terminal.onData((data) => sendInput(session, data));
    session.resizeSub = terminal.onResize(({ cols, rows }) => {
      session.cols = cols;
      session.rows = rows;
      scheduleResize(session);
    });
    session.keyHandler = (event) => handleShortcut(session, event);
    session.pane.addEventListener('keydown', session.keyHandler, true);
    applyTheme(session);

    if (session.pending.length > 0) {
      const chunks = session.pending;
      session.pending = [];
      for (const chunk of chunks) terminal.write(chunk);
    }
  }

  /**
   * 让终端铺满容器。
   * @param {object} session - 终端会话。
   */
  function fitTerminal(session) {
    if (!session.fitAddon || !session.pane.isConnected) return;
    try {
      session.fitAddon.fit();
    } catch {
      // 容器尺寸尚未稳定时跳过本次适配。
    }
  }

  /**
   * 在容器就绪后创建终端画面。
   * @param {string} id - 终端 id。
   */
  function mount(id) {
    const session = sessions.get(id);
    if (!session || disposed) return;
    ensureTerminal(session);
    fitTerminal(session);
  }

  /**
   * 让终端画面获取焦点。
   * @param {string} id - 终端 id。
   */
  function focus(id) {
    const session = sessions.get(id);
    if (!session || disposed) return;
    ensureTerminal(session);
    session.term?.focus();
  }

  /**
   * 重新适配一个终端的画面尺寸。
   * @param {string} id - 终端 id。
   */
  function fit(id) {
    const session = sessions.get(id);
    if (!session) return;
    fitTerminal(session);
  }

  /**
   * 移除一个终端并释放资源。
   * @param {string} id - 终端 id。
   */
  function remove(id) {
    const session = sessions.get(id);
    if (!session) return;
    session.removed = true;
    if (session.resizeTimer) {
      clearTimeout(session.resizeTimer);
      session.resizeTimer = 0;
    }
    session.paneObserver?.disconnect();
    if (session.keyHandler) session.pane.removeEventListener('keydown', session.keyHandler, true);
    session.dataSub?.dispose();
    session.resizeSub?.dispose();
    session.term?.dispose();
    session.term = undefined;
    session.pending = [];
    session.pane.remove();
    sessions.delete(id);
    publish();
  }

  /**
   * 登记主机上已有的终端，并创建它的容器元素。
   * @param {object} meta - 主机返回的终端元数据。
   * @returns {object | undefined} 终端会话。
   */
  function add(meta) {
    if (disposed) return undefined;
    const existing = sessions.get(meta.id);
    if (existing) {
      if (meta.status === 'exited' && existing.status !== 'exited') {
        existing.status = 'exited';
        existing.exitCode = typeof meta.exitCode === 'number' ? meta.exitCode : null;
        publish();
      }
      return existing;
    }

    const pane = document.createElement('div');
    pane.className = 'ql-term-pane';
    pane.dataset.terminalId = meta.id;

    const session = {
      id: meta.id,
      title: typeof meta.title === 'string' && meta.title ? meta.title : meta.id,
      status: meta.status === 'exited' ? 'exited' : 'running',
      exitCode: typeof meta.exitCode === 'number' ? meta.exitCode : null,
      createdAt: typeof meta.createdAt === 'number' ? meta.createdAt : Date.now(),
      pane,
      paneObserver: undefined,
      term: undefined,
      fitAddon: undefined,
      dataSub: undefined,
      resizeSub: undefined,
      keyHandler: undefined,
      inputChain: Promise.resolve(),
      resizeTimer: 0,
      cols: 0,
      rows: 0,
      pending: [],
      removed: false,
    };

    if (typeof ResizeObserver !== 'undefined') {
      session.paneObserver = new ResizeObserver(() => {
        if (disposed || session.removed) return;
        ensureTerminal(session);
        fitTerminal(session);
      });
      session.paneObserver.observe(pane);
    }

    sessions.set(session.id, session);
    publish();
    return session;
  }

  /**
   * 读取主机上的终端并重建会话。
   * @returns {Promise<object[]>} 主机返回的终端元数据。
   */
  async function load() {
    const value = await listTerminals();
    const terminals = Array.isArray(value?.terminals) ? value.terminals : [];
    if (disposed) return terminals;
    const known = new Set(terminals.map((meta) => meta.id));
    for (const id of [...sessions.keys()]) {
      if (!known.has(id)) remove(id);
    }
    const ordered = [...terminals].sort((left, right) => (left.createdAt ?? 0) - (right.createdAt ?? 0));
    for (const meta of ordered) add(meta);
    publish();
    return ordered;
  }

  /**
   * 新建终端。调用方负责把返回的终端放进界面。
   * @param {object} request - 创建参数，至少包含 kind。
   * @returns {Promise<object>} 新终端元数据。
   */
  async function create(request) {
    if (sessions.size >= TERMINAL_LIMIT) throw new ApiError('terminal-limit', '');
    const meta = await createTerminal({
      cols: 80,
      rows: 24,
      ...request,
    });
    if (disposed) return meta;
    add(meta);
    return meta;
  }

  /**
   * 关闭终端：先在主机侧终止，再移除会话。
   * @param {string} id - 终端 id。
   */
  async function close(id) {
    try {
      await closeTerminal(id);
    } catch (error) {
      if (!(error instanceof ApiError) || error.code !== 'terminal-not-found') throw error;
    }
    remove(id);
  }

  /**
   * 消费一条事件流消息。
   * @param {object} frame - 事件帧。
   */
  function applyFrame(frame) {
    if (frame === null || typeof frame !== 'object') return;
    const type = frame.type;
    const id = typeof frame.id === 'string' ? frame.id : '';

    if (type === 'init') {
      const list = Array.isArray(frame.terminals) ? frame.terminals : [];
      const known = new Set(list.map((meta) => meta.id));
      for (const existingId of [...sessions.keys()]) {
        if (!known.has(existingId)) remove(existingId);
      }
      for (const meta of list) add(meta);
      publish();
      return;
    }
    if (type === 'created') {
      if (frame.terminal !== null && typeof frame.terminal === 'object') add(frame.terminal);
      return;
    }

    const session = sessions.get(id);
    if (!session) return;
    if (type === 'snapshot') {
      const bytes = decodeBase64(frame.data);
      if (bytes) queueBytes(session, bytes, true);
      return;
    }
    if (type === 'output') {
      const bytes = decodeBase64(frame.data);
      if (bytes) queueBytes(session, bytes, false);
      return;
    }
    if (type === 'status') {
      session.status = frame.status === 'exited' ? 'exited' : 'running';
      session.exitCode = typeof frame.exitCode === 'number' ? frame.exitCode : null;
      publish();
      return;
    }
    if (type === 'closed') remove(id);
  }

  /**
   * 读取事件流直到连接结束。
   * @param {AbortController} controller - 连接的中断控制器。
   */
  async function readEventStream(controller) {
    const response = await fetch(eventStreamUrl(), {
      signal: controller.signal,
      credentials: 'same-origin',
      cache: 'no-store',
    });
    if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffered = '';
    for (;;) {
      const chunk = await reader.read();
      if (chunk.done) break;
      buffered += decoder.decode(chunk.value, { stream: true });
      let newline = buffered.indexOf('\n');
      while (newline !== -1) {
        const line = buffered.slice(0, newline).trim();
        buffered = buffered.slice(newline + 1);
        if (line) {
          try {
            applyFrame(JSON.parse(line));
          } catch {
            // 忽略无法解析的帧。
          }
        }
        newline = buffered.indexOf('\n');
      }
    }
    if (buffered.trim()) {
      try {
        applyFrame(JSON.parse(buffered.trim()));
      } catch {
        // 忽略无法解析的尾部内容。
      }
    }
  }

  /** 建立事件流；连接意外结束时按次数重连。 */
  async function runEventStream() {
    if (disposed || streamController) return;
    streamAttempts += 1;
    const controller = new AbortController();
    streamController = controller;
    try {
      await readEventStream(controller);
    } catch {
      // 连接失败或中断，按重连策略处理。
    }
    if (streamController === controller) streamController = null;
    if (disposed || controller.signal.aborted) return;
    if (streamAttempts < MAX_STREAM_ATTEMPTS) {
      await delay(RECONNECT_DELAY);
      if (!disposed) await runEventStream();
    }
  }

  /** 打开事件流。重复调用不会建立多条连接。 */
  function openStream() {
    if (disposed || streamController) return;
    streamAttempts = 0;
    void runEventStream();
  }

  /**
   * 读取某个终端的容器元素；会话不存在时返回一个临时容器。
   * @param {string} id - 终端 id。
   * @returns {HTMLElement} 容器元素。
   */
  function paneFor(id) {
    const session = sessions.get(id);
    if (session) return session.pane;
    return document.createElement('div');
  }

  /**
   * 读取某个终端的状态快照。
   * @param {string} id - 终端 id。
   * @returns {object | undefined} 终端快照。
   */
  function getTerminal(id) {
    return snapshot.terminals.find((terminal) => terminal.id === id);
  }

  /**
   * 订阅快照变化。
   * @param {() => void} listener - 变化回调。
   * @returns {() => void} 取消订阅。
   */
  function subscribe(listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  /** 读取当前快照。 */
  function getSnapshot() {
    return snapshot;
  }

  /** 已登记的终端数量。 */
  function count() {
    return sessions.size;
  }

  if (typeof MutationObserver !== 'undefined') {
    themeObserver = new MutationObserver(() => {
      for (const session of sessions.values()) applyTheme(session);
    });
    themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-ds-dark-theme'],
    });
  }

  /** 释放全部终端、事件流与观察者。 */
  function dispose() {
    if (disposed) return;
    disposed = true;
    themeObserver?.disconnect();
    themeObserver = undefined;
    streamController?.abort();
    streamController = null;
    for (const session of sessions.values()) {
      session.removed = true;
      if (session.resizeTimer) clearTimeout(session.resizeTimer);
      session.paneObserver?.disconnect();
      if (session.keyHandler) session.pane.removeEventListener('keydown', session.keyHandler, true);
      session.dataSub?.dispose();
      session.resizeSub?.dispose();
      session.term?.dispose();
      session.term = undefined;
      session.pane.remove();
    }
    sessions.clear();
    listeners.clear();
    snapshot = { terminals: [] };
  }

  return {
    add,
    close,
    count,
    create,
    dispose,
    fit,
    focus,
    getSnapshot,
    getTerminal,
    load,
    mount,
    openStream,
    paneFor,
    subscribe,
  };
}

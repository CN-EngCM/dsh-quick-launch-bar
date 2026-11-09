/** 主机接口路径前缀。 */
const API_PREFIX = 'quick-launch/api';
/** 终端输出流路径。 */
const STREAM_PATH = 'quick-launch/stream';

/**
 * 接口错误。code 与主机返回的错误码一致；网络失败使用 network。
 */
export class ApiError extends Error {
  constructor(code, message, fieldErrors) {
    super(message || code);
    this.name = 'ApiError';
    this.code = code;
    this.fieldErrors = Array.isArray(fieldErrors) ? fieldErrors : [];
  }
}

/**
 * 把相对路径解析成同源地址，避免依赖页面部署在根路径。
 * @param {string} path - 以插件前缀开头的相对路径。
 * @returns {URL} 完整地址。
 */
function endpoint(path) {
  return new URL(path, document.baseURI);
}

/**
 * 发送 JSON 请求并拆开统一响应信封。
 * @param {string} method - HTTP 方法。
 * @param {string} path - 相对路径。
 * @param {unknown} [body] - 可选请求体。
 * @returns {Promise<unknown>} 成功时的 value。
 */
async function requestJson(method, path, body) {
  let response;
  try {
    response = await fetch(endpoint(path), {
      method,
      credentials: 'same-origin',
      cache: 'no-store',
      headers: body === undefined ? undefined : { 'content-type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError('network', '');
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    payload = undefined;
  }

  if (payload !== undefined && payload !== null && payload.ok === true) return payload.value;
  if (payload !== undefined && payload !== null && payload.ok === false && payload.error) {
    const error = payload.error;
    throw new ApiError(error.code || 'request-failed', error.message || '', error.fieldErrors);
  }
  throw new ApiError(response.ok ? 'bad-response' : `http-${response.status}`, `HTTP ${response.status}`);
}

/** 读取快捷方式列表。 */
export function listShortcuts() {
  return requestJson('GET', `${API_PREFIX}/list`);
}

/**
 * 整体保存快捷方式列表。
 * @param {object[]} shortcuts - 完整列表。
 */
export function saveShortcuts(shortcuts) {
  return requestJson('PUT', `${API_PREFIX}/list`, { version: 1, shortcuts });
}

/**
 * 用系统方式打开一个路径。
 * @param {string} path - 绝对路径。
 */
export function openPath(path) {
  return requestJson('POST', `${API_PREFIX}/open`, { path });
}

/**
 * 在主机桌面上弹出「选择文件」对话框。
 * @param {string} title - 对话框标题。
 * @returns {Promise<string | null>} 选中的绝对路径；用户取消时为 null。
 */
export async function pickFile(title) {
  const value = await requestJson('POST', `${API_PREFIX}/pick-file`, { title });
  return value && typeof value.path === 'string' && value.path !== '' ? value.path : null;
}

/** 读取主机上保留的终端列表。 */
export function listTerminals() {
  return requestJson('GET', `${API_PREFIX}/terminals`);
}

/**
 * 新建终端。
 * @param {object} request - 终端创建参数。
 */
export function createTerminal(request) {
  return requestJson('POST', `${API_PREFIX}/terminals`, request);
}

/**
 * 向终端写入文本。
 * @param {string} id - 终端 id。
 * @param {string} data - 键盘输入。
 */
export function writeTerminal(id, data) {
  return requestJson('POST', `${API_PREFIX}/terminals/input`, { id, data });
}

/**
 * 调整终端尺寸。
 * @param {string} id - 终端 id。
 * @param {number} cols - 列数。
 * @param {number} rows - 行数。
 */
export function resizeTerminal(id, cols, rows) {
  return requestJson('POST', `${API_PREFIX}/terminals/resize`, { id, cols, rows });
}

/**
 * 关闭终端并让主机移除它。
 * @param {string} id - 终端 id。
 */
export function closeTerminal(id) {
  return requestJson('POST', `${API_PREFIX}/terminals/close`, { id });
}

/**
 * 终端事件流地址。一条连接承载所有终端的输出与状态。
 * @returns {string} 完整地址。
 */
export function eventStreamUrl() {
  return endpoint(STREAM_PATH).href;
}

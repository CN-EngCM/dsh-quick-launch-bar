/**
 * 端到端测试的公共操作：数据文件备份与恢复、快捷方式表单、终端分组与输出探针。
 *
 * 终端输出探针在每次页面加载前注入，同时记录 xterm 的 DOM 文本与事件流里的字节。
 * 自动关闭的终端可能在 xterm 完成渲染前就被移除，此时用事件流内容兜底。
 */
import { copyFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { homedir, tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { expect, test } from '@playwright/test';

import { panelEntry } from './auth.mjs';

/**
 * 快捷方式数据文件路径，与主机侧解析规则一致。
 * @returns {string} 数据文件路径
 */
export function dataFilePath() {
  const dshHome = typeof process.env.DSH_HOME === 'string' ? process.env.DSH_HOME.trim() : '';
  return join(dshHome === '' ? join(homedir(), '.dsh') : dshHome, 'quick-launch', 'shortcuts.json');
}

/**
 * 把数据文件复制到系统临时目录备份。
 * @returns {Promise<{file: string, directory: string | null, existed: boolean}>} 备份状态
 */
export async function backupShortcutStore() {
  const file = dataFilePath();
  const directory = await mkdtemp(join(tmpdir(), 'ql-e2e-backup-'));
  try {
    await copyFile(file, join(directory, 'shortcuts.json'));
    return { file, directory, existed: true };
  } catch (error) {
    await rm(directory, { recursive: true, force: true });
    if (error?.code === 'ENOENT') return { file, directory: null, existed: false };
    throw error;
  }
}

/**
 * 恢复测试前的数据文件；原先不存在时删除。
 * @param {{file: string, directory: string | null, existed: boolean} | undefined} state 备份状态
 * @returns {Promise<void>}
 */
export async function restoreShortcutStore(state) {
  if (state === undefined) return;
  if (state.existed && state.directory !== null) {
    await mkdir(dirname(state.file), { recursive: true });
    await copyFile(join(state.directory, 'shortcuts.json'), state.file);
  } else {
    await rm(state.file, { force: true });
  }
  if (state.directory !== null) await rm(state.directory, { recursive: true, force: true });
}

/**
 * 生成唯一的测试名称后缀，避免多次运行之间撞名。
 * @returns {string} 后缀
 */
export function uniqueSuffix() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * 生成带 E2E- 前缀的快捷方式名称。
 * @param {string} kind 用途标记
 * @param {string} [suffix] 名称后缀
 * @returns {string} 名称
 */
export function e2eName(kind, suffix = uniqueSuffix()) {
  return `E2E-${kind}-${suffix}`;
}

/**
 * 打开快速启动页；已经打开时直接返回。
 * @param {import('@playwright/test').Page} page 页面
 * @returns {Promise<void>}
 */
export async function openQuickLaunch(page) {
  const root = page.getByTestId('ql-page');
  if (!(await root.isVisible().catch(() => false))) {
    await panelEntry(page).first().click();
  }
  await expect(root).toBeVisible({ timeout: 30_000 });
  await expect(page.getByTestId('ql-add')).toBeVisible();
}

/**
 * 通过界面关闭当前页面里的全部终端标签，保证用例从干净状态开始。
 * @param {import('@playwright/test').Page} page 页面
 * @returns {Promise<void>}
 */
export async function closeAllTerminalTabs(page) {
  const closes = page.getByTestId('ql-tab-close');
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const count = await closes.count();
    if (count === 0) return;
    await closes.first().click();
    await expect.poll(() => closes.count(), { timeout: 30_000 }).toBeLessThan(count);
  }
  await expect(closes).toHaveCount(0);
}

/**
 * 在当前激活分组里新建一个空白终端。
 * @param {import('@playwright/test').Page} page 页面
 * @returns {Promise<void>}
 */
export async function addBlankTerminal(page) {
  const empty = page.getByTestId('ql-term-empty-new');
  if (await empty.isVisible().catch(() => false)) {
    await empty.click();
  } else {
    await page.getByTestId('ql-group-add').last().click();
  }
  await expect
    .poll(async () => page.getByTestId('ql-tab').count(), { timeout: 30_000 })
    .toBeGreaterThan(0);
}

/**
 * 已打开的终端分组数量。
 * @param {import('@playwright/test').Page} page 页面
 * @returns {Promise<number>} 分组数
 */
export async function groupCount(page) {
  return page.locator('.dv-groupview').count();
}

/**
 * 把标签拖动到所在分组的右边缘，生成一个新的分组。
 * @param {import('@playwright/test').Page} page 页面
 * @param {import('@playwright/test').Locator} tab 标签
 * @returns {Promise<void>}
 */
export async function dragTabToRightEdge(page, tab) {
  await expect(tab).toBeVisible();
  const tabBox = await tab.boundingBox();
  const groupBox = await tab.evaluate((element) => {
    const group = element.closest('.dv-groupview');
    if (!group) return null;
    const rect = group.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
  });
  if (!tabBox || !groupBox) throw new Error('找不到标签或分组的位置');
  const startX = tabBox.x + tabBox.width / 2;
  const startY = tabBox.y + tabBox.height / 2;
  const endX = groupBox.x + groupBox.width - 6;
  const endY = groupBox.y + groupBox.height / 2;
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  for (let step = 1; step <= 16; step += 1) {
    await page.mouse.move(
      startX + ((endX - startX) * step) / 16,
      startY + ((endY - startY) * step) / 16,
    );
    await page.waitForTimeout(35);
  }
  await page.mouse.up();
}

/**
 * 卡片定位器（按名称匹配）。
 * @param {import('@playwright/test').Page} page 页面
 * @param {string} name 快捷方式名称
 * @returns {import('@playwright/test').Locator} 卡片
 */
export function shortcutCard(page, name) {
  return page.getByTestId('ql-card').filter({ hasText: name });
}

/**
 * 点击卡片执行快捷方式。
 * @param {import('@playwright/test').Page} page 页面
 * @param {string} name 快捷方式名称
 * @returns {Promise<void>}
 */
export async function runShortcutCard(page, name) {
  const card = shortcutCard(page, name).first();
  await expect(card).toBeVisible();
  await card.locator('.ql-card-open').click();
}

/**
 * 通过新增表单创建「打开路径」快捷方式。
 * @param {import('@playwright/test').Page} page 页面
 * @param {{name: string, path: string}} input 表单内容
 * @returns {Promise<void>}
 */
export async function addOpenShortcut(page, { name, path }) {
  await page.getByTestId('ql-add').click();
  const form = page.getByTestId('ql-form');
  await expect(form).toBeVisible();
  await page.getByTestId('ql-form-type-open').check();
  await page.getByTestId('ql-form-name').fill(name);
  await page.getByTestId('ql-form-path').fill(path);
  await page.getByTestId('ql-form-save').click();
  await expect(form).toBeHidden();
}

/**
 * 通过新增表单创建「运行命令」快捷方式。
 * @param {import('@playwright/test').Page} page 页面
 * @param {{name: string, command: string, cwd?: string, autoClose?: boolean}} input 表单内容
 * @returns {Promise<void>}
 */
export async function addCommandShortcut(page, { name, command, cwd = '', autoClose = false }) {
  await page.getByTestId('ql-add').click();
  const form = page.getByTestId('ql-form');
  await expect(form).toBeVisible();
  await page.getByTestId('ql-form-type-command').check();
  await page.getByTestId('ql-form-name').fill(name);
  await page.getByTestId('ql-form-command').fill(command);
  if (cwd !== '') await page.getByTestId('ql-form-cwd').fill(cwd);
  if (autoClose) await page.getByTestId('ql-form-autoclose').check();
  await page.getByTestId('ql-form-save').click();
  await expect(form).toBeHidden();
}

/**
 * 在页面加载前注入终端输出探针。
 *
 * 探针记录两类内容：
 * - xterm 渲染出的可见文本（每帧与每 50 毫秒采样，终端被移除后仍保留历史）；
 * - 终端事件流里的字节（克隆 fetch 响应后解析 NDJSON），用于自动关闭终端的兜底断言。
 * @param {import('@playwright/test').Page} page 页面
 * @returns {Promise<void>}
 */
export async function installTerminalProbe(page) {
  await page.addInitScript(() => {
    const probe = { domTexts: [], streams: [] };
    window.__qlProbe = probe;

    const rememberDomText = () => {
      const panes = [...document.querySelectorAll('.ql-term-pane .xterm')];
      if (panes.length === 0) return;
      const text = panes.map((pane) => pane.innerText).join('\n');
      if (!text || probe.domTexts[probe.domTexts.length - 1] === text) return;
      probe.domTexts.push(text);
      if (probe.domTexts.length > 120) probe.domTexts.shift();
    };

    requestAnimationFrame(function sampleFrame() {
      rememberDomText();
      requestAnimationFrame(sampleFrame);
    });
    setInterval(rememberDomText, 50);

    const originalFetch = window.fetch;
    window.fetch = async function patchedFetch(input, init) {
      const response = await originalFetch.call(this, input, init);
      const url =
        typeof input === 'string' ? input : input instanceof URL ? input.href : (input && input.url) || '';
      if (!url.includes('/quick-launch/stream') || !response.ok || response.body === null) return response;

      let tapped;
      try {
        tapped = response.clone();
      } catch {
        return response;
      }

      const entry = { url, text: '', closed: false, status: null };
      probe.streams.push(entry);
      const lines = new TextDecoder();
      const bytesToText = new TextDecoder('utf-8');
      void (async () => {
        const reader = tapped.body.getReader();
        let buffered = '';
        try {
          for (;;) {
            const chunk = await reader.read();
            if (chunk.done) break;
            buffered += lines.decode(chunk.value, { stream: true });
            let newline = buffered.indexOf('\n');
            while (newline !== -1) {
              const line = buffered.slice(0, newline).trim();
              buffered = buffered.slice(newline + 1);
              if (line !== '') {
                try {
                  const frame = JSON.parse(line);
                  if (
                    (frame.type === 'snapshot' || frame.type === 'output') &&
                    typeof frame.data === 'string'
                  ) {
                    const binary = atob(frame.data);
                    const bytes = new Uint8Array(binary.length);
                    for (let index = 0; index < binary.length; index += 1) {
                      bytes[index] = binary.charCodeAt(index);
                    }
                    entry.text += bytesToText.decode(bytes);
                  } else if (frame.type === 'status') {
                    entry.status = frame;
                  } else if (frame.type === 'closed') {
                    entry.closed = true;
                  }
                } catch {
                  // 半行数据留到下一次读取再解析。
                }
              }
              newline = buffered.indexOf('\n');
            }
          }
        } catch {
          // 事件流被关闭或页面卸载。
        }
      })();
      return response;
    };
  });
}

/**
 * 清空探针记录，用于验证切换面板后的重新回放。
 * @param {import('@playwright/test').Page} page 页面
 * @returns {Promise<void>}
 */
export async function resetTerminalProbe(page) {
  await page.evaluate(() => {
    if (!window.__qlProbe) return;
    window.__qlProbe.domTexts = [];
    window.__qlProbe.streams = [];
  });
}

/**
 * 读取探针记录。
 * @param {import('@playwright/test').Page} page 页面
 * @returns {Promise<{domText: string, streamText: string, streams: number}>} 探针快照
 */
export async function readTerminalProbe(page) {
  return page.evaluate(() => {
    const probe = window.__qlProbe;
    if (!probe) return { domText: '', streamText: '', streams: 0 };
    return {
      domText: (probe.domTexts || []).join('\n'),
      streamText: (probe.streams || []).map((entry) => entry.text || '').join('\n'),
      streams: (probe.streams || []).length,
    };
  });
}

/**
 * 等待终端出现指定输出。
 *
 * 优先用 xterm 的 DOM 文本断言；自动关闭的终端可能在渲染前就被移除，
 * 此时退回事件流内容，并在报告里留下一条说明。
 * @param {import('@playwright/test').Page} page 页面
 * @param {string} needle 期望出现的文本
 * @param {{timeout?: number}} [options] 等待选项
 * @returns {Promise<'dom' | 'stream'>} 断言依据
 */
export async function expectTerminalText(page, needle, { timeout = 30_000 } = {}) {
  let observedIn = 'dom';
  await expect
    .poll(
      async () => {
        const snapshot = await readTerminalProbe(page);
        if (snapshot.domText.includes(needle)) {
          observedIn = 'dom';
          return true;
        }
        if (snapshot.streamText.includes(needle)) {
          observedIn = 'stream';
          return true;
        }
        return false;
      },
      { timeout, message: `等待终端输出「${needle}」` },
    )
    .toBe(true);

  if (observedIn !== 'dom') {
    test.info().annotations.push({
      type: 'terminal-output',
      description: `「${needle}」只出现在终端事件流里：xterm 的 DOM 文本没有采样到，终端可能在渲染完成前已被自动关闭。`,
    });
  }
  return observedIn;
}

/**
 * 端到端测试的登录与侧栏导航辅助。
 *
 * GUI 地址、登录 token 与本机会话 Cookie 文件只从环境变量读取，不写入仓库或测试产物。
 */
import { readFileSync } from 'node:fs';

/** GUI 地址，可用 QL_GUI_URL 覆盖。 */
export const GUI_URL = (process.env.QL_GUI_URL || 'http://127.0.0.1:3080').replace(/\/+$/u, '');

/** DSH 进程启动时打印的登录 token。 */
export const DSH_TOKEN = typeof process.env.QL_DSH_TOKEN === 'string' ? process.env.QL_DSH_TOKEN.trim() : '';

/** 本机测试会话 Cookie 文件路径，内容为 {name, value, expiresAt, authority}。 */
export const COOKIE_FILE =
  typeof process.env.QL_DSH_COOKIE_FILE === 'string' ? process.env.QL_DSH_COOKIE_FILE.trim() : '';

/** 是否具备运行端到端测试所需的登录凭据。 */
export const HAS_AUTH = DSH_TOKEN !== '' || COOKIE_FILE !== '';

/** 兼容旧名字。 */
export const HAS_TOKEN = HAS_AUTH;

/** 侧栏「快速启动」入口的可访问名称。 */
export const QUICK_LAUNCH_LABEL = /快速启动|Quick launch/iu;

/**
 * 侧栏面板按钮。
 * @param {import('@playwright/test').Page} page 页面
 * @param {RegExp} [label] 入口的可访问名称
 * @returns {import('@playwright/test').Locator} 面板按钮
 */
export function panelEntry(page, label = QUICK_LAUNCH_LABEL) {
  return page.getByRole('button', { name: label });
}

/**
 * 等待应用壳加载完成：侧栏入口出现即视为就绪。
 * @param {import('@playwright/test').Page} page 页面
 * @returns {Promise<void>}
 */
export async function waitForShell(page) {
  await panelEntry(page).first().waitFor({ state: 'visible', timeout: 45_000 });
}

/**
 * 登录 GUI：优先用启动 token 换取 Cookie；也接受本机测试用的 Cookie 文件。
 * @param {import('@playwright/test').Page} page 页面
 * @returns {Promise<void>}
 */
export async function login(page) {
  if (DSH_TOKEN !== '') {
    await page.goto(`${GUI_URL}/?token=${encodeURIComponent(DSH_TOKEN)}`, { waitUntil: 'domcontentloaded' });
    await page
      .waitForURL((target) => !target.searchParams.has('token'), { timeout: 30_000 })
      .catch(() => {
        throw new Error(
          '登录没有完成重定向：请确认 QL_DSH_TOKEN 是当前 DSH 进程打印的 token，且 QL_GUI_URL 指向正在运行的 GUI。',
        );
      });
    await waitForShell(page);
    return;
  }

  const cookie = JSON.parse(readFileSync(COOKIE_FILE, 'utf8'));
  const hostname = new URL(GUI_URL).hostname;
  await page.context().addCookies([
    {
      name: cookie.name,
      value: cookie.value,
      domain: hostname,
      path: '/',
      httpOnly: true,
      sameSite: 'Strict',
      expires: Math.floor(cookie.expiresAt / 1000),
    },
  ]);
  await page.goto(`${GUI_URL}/`, { waitUntil: 'domcontentloaded' });
  await waitForShell(page);
}

/**
 * 等待某个侧栏面板成为当前页面。
 * @param {import('@playwright/test').Page} page 页面
 * @param {RegExp} label 面板入口名称
 * @returns {Promise<void>}
 */
export async function selectPanel(page, label) {
  await panelEntry(page, label).first().click();
}

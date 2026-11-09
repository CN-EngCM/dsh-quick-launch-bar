/**
 * 快速启动插件的端到端测试。
 *
 * 前置条件：
 * - DSH Web GUI 正在运行，QL_GUI_URL 指向它（缺省 http://127.0.0.1:3080）；
 * - 登录凭据二选一：QL_DSH_TOKEN（进程启动时打印的 token）或 QL_DSH_COOKIE_FILE
 *   （本机会话 Cookie 文件）；两者都没有时整个文件跳过；
 * - 现有数据文件里的路径仍然存在，否则保存接口会整体拒绝。
 *
 * 测试开始前备份数据文件，结束后恢复；测试条目统一以 E2E- 开头。
 */
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { expect, test } from '@playwright/test';

import {
  HAS_AUTH,
  login,
  panelEntry,
  selectPanel,
  waitForShell,
} from './auth.mjs';
import {
  addBlankTerminal,
  addCommandShortcut,
  addOpenShortcut,
  backupShortcutStore,
  closeAllTerminalTabs,
  dragTabToRightEdge,
  e2eName,
  expectTerminalText,
  groupCount,
  installTerminalProbe,
  openQuickLaunch,
  resetTerminalProbe,
  restoreShortcutStore,
  runShortcutCard,
  shortcutCard,
  uniqueSuffix,
} from './support.mjs';

test.skip(
  !HAS_AUTH,
  '缺少登录凭据：请设置 QL_DSH_TOKEN（DSH 进程启动时打印的 token）或 QL_DSH_COOKIE_FILE（本机测试会话 Cookie 文件）。',
);

/** @type {{file: string, directory: string | null, existed: boolean} | undefined} */
let storeBackup;

test.beforeAll(async () => {
  storeBackup = await backupShortcutStore();
});

test.afterAll(async () => {
  await restoreShortcutStore(storeBackup);
});

test.beforeEach(async ({ page }) => {
  await installTerminalProbe(page);
  await login(page);
});

test('侧栏入口与页面骨架', async ({ page }) => {
  await expect(panelEntry(page).first()).toBeVisible();

  await openQuickLaunch(page);
  await expect(page.getByTestId('ql-page')).toBeVisible();
  await expect(page.getByTestId('ql-add')).toBeVisible();
  await expect(page.getByTestId('ql-workspace')).toBeVisible();

  if ((await page.getByTestId('ql-card').count()) > 0) {
    await expect(page.getByTestId('ql-card').first()).toBeVisible();
  } else {
    await expect(page.getByTestId('ql-empty')).toBeVisible();
  }
});

test('新增「打开路径」：卡片出现、可以执行，不存在的路径被拦下', async ({ page }) => {
  const suffix = uniqueSuffix();
  const name = e2eName('open', suffix);
  const folder = tmpdir();

  await openQuickLaunch(page);
  await addOpenShortcut(page, { name, path: folder });

  const card = shortcutCard(page, name);
  await expect(card).toBeVisible();
  await expect(card).toContainText(folder);

  await runShortcutCard(page, name);
  const toast = page.getByTestId('ql-toast');
  await expect(toast).toBeVisible({ timeout: 15_000 });
  await expect(toast).toContainText(name);
  await expect(toast).toHaveAttribute('data-tone', 'info');

  const missingName = e2eName('missing', suffix);
  await page.getByTestId('ql-add').click();
  const form = page.getByTestId('ql-form');
  await expect(form).toBeVisible();
  await expect(page.getByTestId('ql-form-pick-file')).toBeVisible();
  await page.getByTestId('ql-form-name').fill(missingName);
  await page.getByTestId('ql-form-path').fill(join(tmpdir(), `ql-e2e-missing-${suffix}`));
  await page.getByTestId('ql-form-save').click();

  await expect(form).toBeVisible();
  await expect(form.getByRole('alert')).toContainText(/路径不存在|does not exist/iu);
  await expect(shortcutCard(page, missingName)).toHaveCount(0);

  await page.getByTestId('ql-form-cancel').click();
  await expect(form).toBeHidden();
});

test('命令快捷方式勾选自动关闭：输出可见且标签自动消失', async ({ page }) => {
  const suffix = uniqueSuffix();
  const name = e2eName('auto', suffix);

  await openQuickLaunch(page);
  await closeAllTerminalTabs(page);
  await addCommandShortcut(page, { name, command: "Write-Output 'e2e-auto-ok'", autoClose: true });
  await runShortcutCard(page, name);

  await expectTerminalText(page, 'e2e-auto-ok');
  await expect(page.getByTestId('ql-tab')).toHaveCount(0, { timeout: 30_000 });
  await expect(page.getByTestId('ql-term-empty')).toBeVisible();
});

test('命令快捷方式保留终端：输出、键盘交互与手动关闭', async ({ page }) => {
  const suffix = uniqueSuffix();
  const name = e2eName('keep', suffix);

  await openQuickLaunch(page);
  await closeAllTerminalTabs(page);
  await addCommandShortcut(page, { name, command: "Write-Output 'e2e-keep-ok'" });
  await runShortcutCard(page, name);

  const tab = page.getByTestId('ql-tab').filter({ hasText: name });
  await expect(tab).toBeVisible({ timeout: 20_000 });
  await expectTerminalText(page, 'e2e-keep-ok');
  await expect(tab.locator('.ql-tab-dot')).toHaveAttribute('data-status', 'running');

  await page.locator('.ql-term-pane .xterm').first().click();
  await page.keyboard.type("Write-Output 'e2e-typed-ok'");
  await page.keyboard.press('Enter');
  await expectTerminalText(page, 'e2e-typed-ok');

  await tab.getByTestId('ql-tab-close').click();
  await expect(page.getByTestId('ql-tab')).toHaveCount(0, { timeout: 20_000 });
});

test('命令异常退出：勾选自动关闭但标签保留，状态点为失败', async ({ page }) => {
  const suffix = uniqueSuffix();
  const name = e2eName('fail', suffix);

  await openQuickLaunch(page);
  await closeAllTerminalTabs(page);
  await addCommandShortcut(page, { name, command: 'cmd /c exit 3', autoClose: true });
  await runShortcutCard(page, name);

  const tab = page.getByTestId('ql-tab').filter({ hasText: name });
  await expect(tab).toBeVisible({ timeout: 20_000 });
  await page.waitForTimeout(3000);

  await expect(tab).toBeVisible();
  await expect(tab.locator('.ql-tab-dot')).toHaveAttribute('data-status', 'failed', { timeout: 20_000 });

  await tab.getByTestId('ql-tab-close').click();
  await expect(page.getByTestId('ql-tab')).toHaveCount(0, { timeout: 20_000 });
});

test('编辑快捷方式：名称在卡片上更新', async ({ page }) => {
  const suffix = uniqueSuffix();
  const name = e2eName('edit', suffix);
  const renamed = e2eName('renamed', suffix);

  await openQuickLaunch(page);
  await addCommandShortcut(page, { name, command: 'hostname' });

  const card = shortcutCard(page, name);
  await expect(card).toBeVisible();
  await card.hover();
  await card.getByTestId('ql-card-edit').click();

  const form = page.getByTestId('ql-form');
  await expect(form).toBeVisible();
  await expect(page.getByTestId('ql-form-name')).toHaveValue(name);
  await page.getByTestId('ql-form-name').fill(renamed);
  await page.getByTestId('ql-form-save').click();

  await expect(form).toBeHidden();
  await expect(shortcutCard(page, renamed)).toBeVisible();
  await expect(shortcutCard(page, name)).toHaveCount(0);
});

test('删除快捷方式：确认后卡片消失', async ({ page }) => {
  const suffix = uniqueSuffix();
  const name = e2eName('delete', suffix);

  await openQuickLaunch(page);
  await addCommandShortcut(page, { name, command: 'hostname' });

  const card = shortcutCard(page, name);
  await expect(card).toBeVisible();
  await card.hover();
  await card.getByTestId('ql-card-delete').click();

  await expect(page.getByRole('dialog')).toContainText(name);
  await page.getByTestId('ql-confirm-delete').click();

  await expect(page.getByTestId('ql-confirm-delete')).toHaveCount(0);
  await expect(card).toHaveCount(0);
});

test('刷新页面后快捷方式仍在', async ({ page }) => {
  const suffix = uniqueSuffix();
  const name = e2eName('reload', suffix);

  await openQuickLaunch(page);
  await addOpenShortcut(page, { name, path: tmpdir() });
  await expect(shortcutCard(page, name)).toBeVisible();

  await page.reload({ waitUntil: 'domcontentloaded' });
  await waitForShell(page);
  await openQuickLaunch(page);
  await expect(shortcutCard(page, name)).toBeVisible();

  const card = shortcutCard(page, name);
  await card.hover();
  await card.getByTestId('ql-card-delete').click();
  await page.getByTestId('ql-confirm-delete').click();
  await expect(card).toHaveCount(0);
});

test('切换面板再回来：终端标签重建并回放输出', async ({ page }) => {
  const suffix = uniqueSuffix();
  const name = e2eName('switch', suffix);

  await openQuickLaunch(page);
  await closeAllTerminalTabs(page);
  await addCommandShortcut(page, { name, command: "Write-Output 'e2e-persist-ok'" });
  await runShortcutCard(page, name);

  await expect(page.getByTestId('ql-tab').filter({ hasText: name })).toBeVisible({ timeout: 20_000 });
  await expectTerminalText(page, 'e2e-persist-ok');

  await selectPanel(page, /^(插件|Plugins)$/u);
  await expect(page.getByTestId('ql-page')).toHaveCount(0, { timeout: 20_000 });
  await resetTerminalProbe(page);

  await openQuickLaunch(page);
  const restored = page.getByTestId('ql-tab').filter({ hasText: name });
  await expect(restored).toBeVisible({ timeout: 20_000 });
  await expectTerminalText(page, 'e2e-persist-ok');

  await restored.getByTestId('ql-tab-close').click();
  await expect(page.getByTestId('ql-tab')).toHaveCount(0, { timeout: 20_000 });
});

test('拖动标签生成新分组，刷新后布局恢复', async ({ page }) => {
  await openQuickLaunch(page);
  await closeAllTerminalTabs(page);
  await addBlankTerminal(page);
  await expect(page.getByTestId('ql-tab')).toHaveCount(1);
  await addBlankTerminal(page);
  await expect(page.getByTestId('ql-tab')).toHaveCount(2);
  await expect.poll(() => groupCount(page)).toBe(1);

  await dragTabToRightEdge(page, page.getByTestId('ql-tab').last());
  await expect.poll(() => groupCount(page)).toBe(2);
  await expect(page.getByTestId('ql-tab')).toHaveCount(2);

  await page.reload({ waitUntil: 'domcontentloaded' });
  await waitForShell(page);
  await openQuickLaunch(page);
  await expect.poll(() => groupCount(page)).toBe(2);
  await expect(page.getByTestId('ql-tab')).toHaveCount(2);

  await closeAllTerminalTabs(page);
  await expect(page.getByTestId('ql-term-empty')).toBeVisible();
});

test('最多同时显示 9 个终端分组，再拖出一个分组会被拦下', async ({ page }) => {
  test.setTimeout(240_000);
  await page.setViewportSize({ width: 2400, height: 1200 });
  await openQuickLaunch(page);
  await closeAllTerminalTabs(page);
  await addBlankTerminal(page);
  await expect(page.getByTestId('ql-tab')).toHaveCount(1);

  for (let round = 1; round <= 8; round += 1) {
    await addBlankTerminal(page);
    await dragTabToRightEdge(page, page.getByTestId('ql-tab').last());
    await expect.poll(() => groupCount(page), { timeout: 10_000 }).toBe(round + 1);
  }
  await expect.poll(() => groupCount(page)).toBe(9);

  await addBlankTerminal(page);
  await dragTabToRightEdge(page, page.getByTestId('ql-tab').last());
  await expect(page.getByTestId('ql-toast')).toContainText(/最多同时显示 9 个终端分组/u, {
    timeout: 10_000,
  });
  await expect.poll(() => groupCount(page)).toBe(9);

  await closeAllTerminalTabs(page);
  await expect(page.getByTestId('ql-term-empty')).toBeVisible();
});

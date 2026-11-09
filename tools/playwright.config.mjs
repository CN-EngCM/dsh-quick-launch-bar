/**
 * 快速启动插件的 Playwright 配置。
 *
 * - testDir 指向 tools/e2e，只跑 .spec.mjs；
 * - 单 worker 顺序执行，避免多个页面同时操作同一份快捷方式数据；
 * - baseURL 读 QL_GUI_URL，缺省 http://127.0.0.1:3080；
 * - 失败时的截图与 trace 落在 tools/e2e/artifacts（已被 .gitignore 忽略）。
 */
import { defineConfig } from '@playwright/test';

const GUI_URL = (process.env.QL_GUI_URL || 'http://127.0.0.1:3080').replace(/\/+$/u, '');

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  timeout: 90_000,
  reporter: [['list']],
  outputDir: './e2e/artifacts',
  expect: {
    timeout: 15_000,
  },
  use: {
    baseURL: GUI_URL,
    locale: 'zh-CN',
    viewport: { width: 1440, height: 900 },
    actionTimeout: 15_000,
    navigationTimeout: 45_000,
    screenshot: 'only-on-failure',
    trace: 'off',
    video: 'off',
  },
});

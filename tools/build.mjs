/**
 * 构建浏览器端产物。
 *
 * 入口是 src/client.jsx，输出根目录 client.js：
 * - 经典脚本（iife），顶层调用 window.__ModuleLoader__.load；
 * - React 不打包，由插件工厂通过平台模块表 require('react')；
 * - xterm 及其基础样式在构建阶段内联进产物。
 */
import { readFile, stat } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';

const toolsDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(toolsDir, '..');
const outfile = resolve(rootDir, 'client.js');

await build({
  entryPoints: [resolve(rootDir, 'src/client.jsx')],
  outfile,
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2022'],
  charset: 'utf8',
  legalComments: 'eof',
  loader: { '.css': 'text' },
  nodePaths: [resolve(toolsDir, 'node_modules')],
  jsx: 'transform',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  minify: true,
  logLevel: 'info',
  banner: {
    js: '/* dsh-quick-launch-bar 浏览器端产物，由 tools/build.mjs 依据 src 生成。 */',
  },
});

const info = await stat(outfile);
const content = await readFile(outfile, 'utf8');
console.log(`输出：${relative(rootDir, outfile)}`);
console.log(`大小：${(info.size / 1024).toFixed(1)} KiB`);
console.log(`顶层加载调用：${content.includes('window.__ModuleLoader__.load') ? '有' : '无'}`);

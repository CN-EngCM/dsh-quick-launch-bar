# 快速启动插件设计

本文件描述当前设计意图与接口契约，是实现的依据。实现完成后，本文件应保持与代码一致。

## 1. 目标与范围

在 DSH Web 界面的左侧栏增加「快速启动」入口。点击后主内容区切换为快捷方式页：

- 左栏是启动项列表，右栏是可分栏的终端区。
- 启动项分两类：打开路径（文件夹用资源管理器打开，可执行文件直接启动，其他文件用默认程序打开）、运行命令（在右栏终端里执行）。
- 右栏终端按分组排列，每个分组自带标签栏；标签可以拖到分组边缘生成新的分组，最多同时 9 个分组、12 个终端。

首期范围：

- 仅 Windows，仅当前 web profile，作为本地插件包安装。
- 快捷方式列表全局一份，存放在主机侧 JSON 文件。
- 不做：agent 工具、图标自定义、快捷方式拖拽排序、导入导出、终端标签自定义命名、非 Windows 平台。

## 2. 环境事实

- DSH 安装目录：`C:\Users\engcm\AppData\Roaming\npm\node_modules\@deepseek-ai\dsh`，包在 `node_modules\@deepseek-ai\` 下。
- 当前 profile：`C:\Users\engcm\.dsh\profiles\web`。
- Web GUI：`http://127.0.0.1:3080`，进程启动参数 `dsh web --no-open --port 3080 --host 127.0.0.1`。
- 浏览器请求需要登录：进程启动时终端打印的 `?token=...` URL 换取签名 Cookie。插件自己的 fetch 与浏览器同源，自动带 Cookie。
- 主机插件运行在 DSH 的 Node 进程里，可直接用 Node 内置模块；没有沙箱限制约定。
- 客户端插件是经典脚本，由 `/plugins` 路由下发，通过 `window.__ModuleLoader__.load({ id, factory(require) })` 注册。`factory` 内可用 `require('react')`（平台模块表提供），不能 `require` 其他客户端包。
- 客户端插件不可直接 import npm 依赖；xterm 与 dockview 由构建阶段打进 `client.js`。
- 浏览器的同源 HTTP/1.1 连接数上限是 6，终端输出必须共用一条事件流，不能每个终端各开一条长连接。
- 用 `explorer.exe` 打开路径时必须 `windowsHide: false`：隐藏启动会被资源管理器当成隐藏窗口的请求，窗口打开但不显示。

## 3. 包结构

```
package.json              插件清单（bundle patch + dsh.client）
cordis.patch.yml          Loader patch：插入 quick-launch 行
index.js                  主机 Cordis 插件（HTTP 接口、终端管理、事件流）
lib/host-core.js          主机纯逻辑（无 Cordis 依赖，可单测）
client.js                 浏览器构建产物（生成文件，不手改）
src/client.jsx            客户端源码入口
src/ui/page.jsx           页面骨架、快捷方式列表与表单
src/ui/workspace.js       dockview 终端工作区（分组、标签、布局持久化）
src/terminal.js           终端会话（xterm、输入输出、尺寸与主题）
src/api.js                客户端 HTTP 接口
src/i18n.js               中英文案
src/icons.js              图标组件
src/styles.js             页面 CSS 文本常量
tools/package.json        构建与测试工具链依赖（含 dockview）
tools/build.mjs           esbuild 构建脚本
tools/unit/*.test.mjs     主机单元测试（node:test）
tools/e2e/*.spec.mjs      Playwright 端到端测试
locale/zh.json            插件管理面板元数据（中文）
locale/en.json            插件管理面板元数据（英文）
icon.svg                  插件图标
docs/design.md            本文件
README.md                 使用与开发说明
```

## 4. 入口与页面

- 侧栏入口：注册 `sidebar.panellist`（list，root 作用域），`id` 为 `quick-launch`，`order` 为 -10（排在「插件」「自动化任务」之前），`label` 走本地化，图标为闪电 SVG。图标组件接收 `{ size, active }`。
- 主页面：注册 `main`（keyed，root 作用域），`key` 为 `quick-launch`，组件为整页组件。侧栏点击行时由 shell 调 `ctx.layout.selectPanel('quick-launch')`。
- 页面占满内容列，左右两栏：
  - 左栏固定 280px；页面容器宽度不超过 760px 时收窄到 220px（容器查询，不改成上下堆叠）。顶部是标题与「新增快捷方式」按钮，主体是可滚动的快捷方式列表或空状态。
  - 右栏从页面顶到底全部是终端工作区，不再有整页标题行和底部可收起的终端面板。
- 页面不在任何 Session 上下文里，所有数据自己通过 HTTP 接口读写。

注册方式，参照 `@deepseek-ai/dsh-client-ui-schedule/lib/client.js` 约 19360 行：

```js
ctx.slots.inject('main', () => ctx.slots.register({
  name: 'main',
  key: PANEL_ID,
  locale: NS,
}, QuickLaunchPage));

ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
  name: 'sidebar.panellist',
  id: PANEL_ID,
  order: -10,
  locale: NS,
  label: () => t('panel.label'),
}, PanelIcon));
```

## 5. 数据模型

数据文件：`<DSH_HOME>/quick-launch/shortcuts.json`，`DSH_HOME` 取 `process.env.DSH_HOME`，缺省为 `<用户主目录>/.dsh`。

```json
{
  "version": 1,
  "shortcuts": [
    {
      "id": "uuid",
      "type": "open",
      "name": "项目目录",
      "path": "D:\\MyCode\\project",
      "note": ""
    },
    {
      "id": "uuid",
      "type": "command",
      "name": "启动开发服务器",
      "command": "npm run dev",
      "cwd": "D:\\MyCode\\project",
      "autoClose": false,
      "note": ""
    }
  ]
}
```

校验规则（保存时由主机执行）：

- `shortcuts` 必须是数组，最多 200 条。
- `id`：非空字符串，最长 64，保存时整体唯一。
- `type`：`open` 或 `command`。
- `name`：去首尾空格后 1 到 80 字符。
- `note`：可选，去空格后最长 200 字符。
- `open`：`path` 为绝对 Windows 路径（`path.isAbsolute`），且路径存在；忽略 `command`/`cwd`/`autoClose`。
- `command`：`command` 去空格后 1 到 2000 字符；`cwd` 可选，若给出必须是存在的绝对路径，未给出按空处理；`autoClose` 为可选布尔，缺省 false。
- 路径存在性用 `fs.stat` 判断，目录或文件都算存在。
- 保存请求做完整校验（含路径存在性）；读取磁盘文件时只校验结构与类型，不校验路径存在性，避免用户删掉一个文件夹后整份列表变成损坏状态。
- 校验失败返回第一个错误即可，客户端显示在表单里。

## 6. 主机接口

统一前缀 `/quick-launch`。所有接口先做 `ctx.connection.requestRejection(req)`，返回非 undefined 时直接 403/401 结束。请求体为 JSON，最大 1 MiB。响应统一 JSON：成功 `{ "ok": true, "value": ... }`，失败 `{ "ok": false, "error": { "code": "...", "message": "..." } }`。

### 6.1 快捷方式

- `GET /quick-launch/api/list`
  - 成功：`{ok:true, value:{version:1, shortcuts:[...]}}`
  - 数据文件不存在：返回空列表。
  - 数据文件损坏或校验不过：`{ok:false, error:{code:'store-corrupt', message}}`，客户端显示错误条并禁止保存。

- `PUT /quick-launch/api/list`，请求体 `{version:1, shortcuts:[...]}`
  - 校验通过后原子写文件：写同目录临时文件再 rename。
  - 成功：`{ok:true}`
  - 校验失败：`{ok:false, error:{code:'invalid-shortcut', message, fieldErrors:[{index, field, reason, message}]}}`；`reason` 是机器可读的原因码（如 `path-missing`、`cwd-missing`、`name-too-long`），客户端据此显示对应语言的提示，`message` 仅作兜底。

- `POST /quick-launch/api/open`，请求体 `{path}`
  - 路径存在：交给资源管理器打开，成功返回 `{ok:true}`。
  - 路径不存在：`{ok:false, error:{code:'path-missing', message}}`
  - 启动失败：`{ok:false, error:{code:'open-failed', message}}`

- `POST /quick-launch/api/pick-file`，请求体 `{title}`（可选，对话框标题）
  - 在主机屏幕上弹出系统的「选择文件」对话框，用户确定后返回完整路径。
  - 成功：`{ok:true, value:{path: string|null}}`，取消时 `path` 为 `null`。
  - 已经有一个选择窗口打开：`{ok:false, error:{code:'picker-busy', message}}`
  - 找不到可用的 PowerShell：`{ok:false, error:{code:'shell-unavailable', message}}`
  - 对话框异常退出：`{ok:false, error:{code:'pick-failed', message}}`
  - 浏览器断开时终止对话框进程；插件卸载时同样终止。

### 6.2 终端

- `GET /quick-launch/api/terminals`
  - `{ok:true, value:{terminals:[{id, title, status:'running'|'exited', exitCode:number|null, createdAt:number}]}}`

- `POST /quick-launch/api/terminals`，请求体：
  ```json
  { "kind": "shortcut" | "blank", "name": "显示名", "command": "命令文本", "cwd": "绝对路径", "autoClose": false, "cols": 80, "rows": 24 }
  ```
  - `kind` 为 `blank` 时不带 command，工作目录缺省为用户主目录。
  - 超过 12 个终端：`{ok:false, error:{code:'terminal-limit', message}}`
  - 工作目录不存在或 shell 不可用：对应错误码 `cwd-missing` / `shell-unavailable`。
  - 成功：`{ok:true, value:TerminalMeta}`（同上）。

- `POST /quick-launch/api/terminals/input`，`{id, data}`：把文本写入 PTY 输入。终端已经不存在时返回 `{ok:true}` 并丢弃输入（终端被关闭瞬间可能还有按键在途）。
- `POST /quick-launch/api/terminals/resize`，`{id, cols, rows}`：改 PTY 尺寸；未知 id 返回 `terminal-not-found`。
- `POST /quick-launch/api/terminals/close`，`{id}`：终止进程并从列表移除；未知 id 返回 `terminal-not-found`。

### 6.3 终端事件流

- `GET /quick-launch/stream`
  - 一条连接承载所有终端的输出与状态，响应 `content-type: application/x-ndjson; charset=utf-8`，`cache-control: no-store`。
  - 连接建立后先发 `{"type":"init","terminals":[TerminalMeta...]}`。
  - 接着每个终端一条快照：`{"type":"snapshot","id":"...","data":"<base64>"}`，内容为保留的最近输出（每终端最多 512 KiB）；已退出的终端再补一条 `status`。
  - 之后实时推送：
    - `{"type":"created","id":"...","terminal":TerminalMeta}`：新终端创建；
    - `{"type":"output","id":"...","data":"<base64>"}`：实时输出；
    - `{"type":"status","id":"...","status":"exited","exitCode":<number|null>}`：进程结束；
    - `{"type":"closed","id":"..."}`：终端被关闭移除。
  - 连接建立时终端不存在不返回 404；客户端靠 `init` 列表与后续帧同步状态。
  - 客户端断开或响应关闭时移除订阅；插件卸载时结束所有事件流。

### 6.4 终端行为

- shell 选择：先 `ctx.subprocess.resolveExecutable('pwsh')`，失败再 `resolveExecutable('powershell')`；都失败返回 `shell-unavailable`。
- 命令通过 `-EncodedCommand`（base64 UTF-16LE 脚本）传入，避免引号转义问题。
  - `autoClose: true`：参数 `-NoLogo -EncodedCommand <脚本>`，脚本为「用户命令 + 换行 + 把 `$LASTEXITCODE` 作为退出码」；进程退出码为 0 时主机自动关闭该终端并广播 `closed`，非 0 或异常时保留终端并广播 `status`（异常不自动关闭）。
  - `autoClose: false`：参数 `-NoLogo -NoExit -EncodedCommand <用户命令>`，命令结束后停在交互 shell，可继续输入。
  - 空白终端：参数 `-NoLogo`，交互 shell。
- 创建：`ctx.subprocess.spawnTerminal({argv:[shell,...args], cwd, rows, cols, terminalType:'xterm-256color', graceMs:1000})`。
- 输出：`handle.output` 的 Buffer 追加到环形缓冲区（上限 512 KiB，超出丢最旧），并广播给事件流订阅者；base64 编码后发送。
- 进程结束：`handle.done` 结算后更新状态并广播 `status`。
- 关闭：`handle.terminate()`，从列表移除，广播 `closed`。
- 插件卸载时终止所有终端并结束事件流。
- shell 输出的 UTF-8 解码由浏览器侧 xterm 完成（直接写字节）。

## 7. 打开路径

- 校验存在后统一交给资源管理器：`spawn('explorer.exe', [fileUri], {detached:true, stdio:'ignore', windowsHide:false})`，成功建进程即返回，随后 `unref()`。行为等同于在资源管理器里双击目标：
  - 目录：打开资源管理器窗口；
  - 可执行文件（exe、lnk、bat、cmd 等）：直接启动；
  - 其它文件：用系统默认程序打开。
- 目标路径先转成 file URI：`pathToFileURL(path, {windows:true})`。资源管理器自己拆命令行，逗号和等号是字段分隔符，转成 `%2C`/`%3D`；非 ASCII 字符不能保留百分号编码（资源管理器会改开「文档」目录），所以把 Node 产生的非 ASCII 转义还原成字面字符，ASCII 转义（如空格 `%20`）保持原样。
- `windowsHide` 必须为 false，否则资源管理器把启动当成隐藏窗口请求，窗口打开但不显示。
- 启动失败返回 `open-failed`。系统在资源管理器接手之后才报的失败（例如没有关联程序）无法观察，接口只反映资源管理器进程是否创建成功。

## 7.1 文件选择对话框

- 主机侧用 PowerShell（优先 pwsh，退化 powershell）跑一段 WinForms 脚本：`-NoLogo -NoProfile -NonInteractive -STA -WindowStyle Hidden -EncodedCommand <脚本>`，`windowsHide:true` 只隐藏控制台，对话框本身正常显示。
- 脚本用 `OpenFileDialog`：过滤器分成「程序和快捷方式」（exe/lnk/bat/cmd/com）与「所有文件」两组，禁止多选。
- 用户点确定后脚本把完整路径写进主机临时目录里的结果文件（UTF-8），不经过标准输出，避免中文路径被控制台编码弄坏；取消时不写文件。
- 打开对话框前合成一次 Alt 抬起（`keybd_event`）：后台进程拉起的窗口不会自动拿到前台，否则对话框会藏在浏览器后面。
- 用户取消返回 `path: null`；临时结果文件处理完立即删除。
- 同一时间只允许一个选择窗口。

## 8. 客户端页面

### 8.1 结构

- 左栏：
  - 顶部：标题「快速启动」与「新增快捷方式」按钮。
  - 主体：错误条、加载提示、快捷方式列表或空状态。
  - 列表项是紧凑单行：类型图标、名称、一行目标摘要（路径或命令，超长省略）；悬停显示「编辑」「删除」按钮；点击整行执行。
  - 点击命令项在右栏当前激活分组新建终端并执行；点击打开路径项调打开接口并提示。
  - 空状态：说明文字 + 「新增快捷方式」按钮。
  - 提示条（toast）：执行打开路径成功或失败、终端创建/关闭失败等，页面右上角短暂显示。
- 右栏：dockview 终端工作区。
  - 每个终端是一个面板，面板按分组排列，分组自带标签栏。
  - 标签可拖动：拖到分组左/右/上/下边缘生成新的分组，拖到整个工作区的右侧或底部边缘生成新列/行；拖动标签到另一个分组的标签栏即移动过去。
  - 同时最多 9 个分组，超过时回退到上一次布局并提示。
  - 浮动分组和弹出浏览器窗口禁用，所有终端都留在网格里。
  - 分组标签栏右侧有「+」，新建的空白终端进入该分组。
  - 没有终端时显示空状态：说明文字 + 「新建终端」按钮。

### 8.2 表单

- 新增/编辑用居中弹窗表单，背景遮罩；Esc 关闭；点击遮罩关闭。提交中禁用保存按钮。
- 字段：
  - 类型：两个单选按钮「打开路径」「运行命令」。
  - 名称：文本输入，必填。
  - 打开路径类型：路径输入框 + 「选择文件夹」按钮（调 `ctx.uiWorkspace.pickDirectory()`）+ 「选择程序」按钮（调主机 `pick-file`，系统的文件选择器）；下方提示可以填文件夹、程序（exe）或其它文件。用「选择程序」选中文件时，名称仍为空则用文件名（去掉扩展名）自动填上。
  - 运行命令类型：命令文本域；工作目录输入框 + 「选择文件夹」按钮（可留空）；「正常结束后自动关闭终端」复选框（默认不勾）。
  - 备注：可选，单行。
- 保存：组装完整列表 `PUT /api/list`；成功关窗并刷新列表；失败在弹窗内显示第一条错误，字段错误尽量定位到对应输入。主机返回的字段错误带 `reason` 原因码，客户端按原因码显示当前语言的提示；未知原因才回退主机消息。
- 删除：确认弹窗（说明名称），确认后提交去掉该项的列表。

### 8.3 终端工作区

- 工作区基于 dockview：面板 id 就是终端 id，分组就是 dockview 的分组，标签栏由自定义标签渲染器实现。
- 终端画面：每个终端一个 xterm 实例，容器是 dockview 面板的内容元素；面板在分组间移动时 DOM 元素随之移动，xterm 实例与滚动内容保持不变。
- 标签：状态点（运行中绿色、正常退出灰色、异常退出红色）、标题、关闭按钮；状态点 tooltip 显示「运行中」或退出码。关闭标签即终止主机上的终端进程。
- 输出：页面只建立一条终端事件流。
  - 收到 `snapshot` 时先 `term.reset()` 再写快照字节；收到 `output` 时写实时字节。
  - xterm 还没挂载时按终端缓存字节，挂载后按顺序补写。
  - 连接意外断开最多重连 3 次；重连成功后按 `init` 与快照重新同步。
- 键盘输入通过 `term.onData` 串行 POST 到 input 接口（一个在途请求，保持顺序）。
- 尺寸：每个终端容器一个 ResizeObserver 加 FitAddon，尺寸变化节流后 POST resize。
- 主题：从页面 CSS 变量取颜色构造 xterm theme，监听 `document.body` 的 style/class 变化，切换主题时更新正在运行的实例；dockview 的 `--dv-*` 变量映射到 DSH 的 `--dsw-alias-*` 变量。
- 字体：`"Maple Mono NF CN", "Cascadia Code", Consolas, monospace`，字号 13。
- 复制粘贴：Ctrl+Shift+C / Ctrl+Shift+V，及 Ctrl+Insert / Shift+Insert，用 navigator.clipboard。
- 状态同步：收到主机的 `closed` 帧时移除对应面板；终端异常退出时保留面板与内容并更新状态点；同一 profile 的另一个窗口新建或关闭终端，也会通过事件流同步到当前页面。
- 布局持久化：
  - 结构变化后（200ms 合并）把 `api.toJSON()` 写入 `localStorage` 的 `dsh-quick-launch-bar:workspace-layout:v1`；页面隐藏（`pagehide`）和工作区销毁时再保存一次。
  - 页面加载时先读主机终端列表，再用保存的布局 `fromJSON` 恢复；保存的布局里已经不存在的终端面板被移除，主机上多出来的终端补进当前分组。
  - 保存的分组数超过 9 时丢弃保存的布局，按一个分组重建。
- 分组上限：布局变化后检查分组数量，超过 9 个用上一次布局快照回退并提示「最多同时显示 9 个终端分组」。
- 页面卸载时断开事件流并销毁 xterm 实例；主机终端继续运行，回到页面后由 `GET /api/terminals` 重建面板并重放最近输出。
- 分组里最后一个标签关闭后，分组自动消失，剩余分组重新分配空间。
- 最多 12 个终端、9 个分组，达到上限时「+」与命令快捷方式给出提示。

### 8.4 视觉

- 只用 DSH 主题变量：`--dsw-alias-bg-base`、`--dsw-alias-bg-layer-1..4`、`--dsw-alias-border-l1..l4`、`--dsw-alias-label-primary/secondary/tertiary`、`--dsw-alias-interactive-bg-hover/-active`、`--dsw-alias-brand-primary`、`--dsw-alias-state-error-primary`、`--dsw-alias-button-primary-fill/-hover` 等，暗色自动跟随。
- dockview 主题类 `ql-term-theme` 把 `--dv-*` 变量逐项映射到 DSH 变量，标签栏、分组边框、拖拽提示、分隔线都跟随明暗主题。
- 左栏圆角、间距、字号参照 DSH 插件管理页与自动化任务页；不引入第三方组件库。
- 文案中文为主，同时注册英文；所有用户可见文字走 `ctx.locale`。
- 组件内注入 `<style data-plugin-css="dsh-quick-launch-bar">`，卸载不残留。
- 按钮与列表项带 `aria-label`，弹窗给 `role="dialog"` 与 `aria-modal`。

### 8.5 测试定位

组件与关键控件加 `data-testid`：`ql-page`、`ql-add`、`ql-workspace`、`ql-term-empty`、`ql-term-empty-new`、`ql-group-add`、`ql-tab`、`ql-tab-close`、`ql-card`、`ql-card-edit`、`ql-card-delete`、`ql-form`、`ql-form-type-open`、`ql-form-type-command`、`ql-form-name`、`ql-form-path`、`ql-form-pick-file`、`ql-form-command`、`ql-form-cwd`、`ql-form-autoclose`、`ql-form-note`、`ql-form-save`、`ql-form-cancel`、`ql-confirm-delete`、`ql-toast`；终端容器使用类名 `ql-term-pane`，分组容器使用 dockview 的 `dv-groupview`。

## 9. 存储与安全

- 数据文件损坏时不覆盖原文件，只返回错误；客户端禁止保存，并提示手动修复或删除该文件。
- 写文件先写 `.tmp` 再 rename。
- 快捷方式命令由用户自己配置并主动点击执行；不注册成 agent 工具，模型无法调用。
- 所有路由做同源准入检查；不提供跨域能力。
- 终端布局只存在浏览器 `localStorage`，不落主机；多个窗口各自保存，后写的覆盖先写的。

## 10. 构建与测试

- 构建：`tools/` 下安装依赖（@xterm/xterm、@xterm/addon-fit、dockview、esbuild），`node tools/build.mjs` 把 `src/client.jsx` 打成根目录 `client.js`（iife，浏览器目标），xterm 与 dockview 的代码和样式都内联进产物（约 914 KiB）。构建产物提交到仓库，运行时不依赖 node_modules。
- 修改主机代码（`index.js`、`lib/`）后，需要在插件管理器里重载插件或重启 DSH 才生效；只改浏览器代码时重新构建并刷新页面即可。
- 单元测试：`node --test tools/unit/*.test.mjs`，覆盖数据校验、存储读写与损坏、环形缓冲、shell 参数与编码、资源管理器 file URI 编码、文件选择脚本与结果解析。
- 端到端测试：Playwright（Chromium）驱动真实 GUI。登录凭据二选一：环境变量 `QL_DSH_TOKEN`（进程启动时打印的 token），或 `QL_DSH_COOKIE_FILE`（本机测试会话 Cookie 文件）。GUI 地址读 `QL_GUI_URL`，缺省 `http://127.0.0.1:3080`。凭据只从环境变量读取，不写入仓库。只跑一个 Playwright 实例，避免共用 `tools/e2e/artifacts` 互相清理。
- e2e 覆盖：侧栏入口与页面骨架、新增/编辑/删除、保存校验失败、打开文件夹、运行命令输出、自动关闭、异常不自动关闭、手动关闭标签、切到别的面板再回来终端仍在、拖动标签分栏并在刷新后恢复布局、9 个分组上限与超限回退、刷新后快捷方式仍在。
- e2e 开始前备份数据文件，结束后恢复，测试条目统一用 `E2E-` 前缀并在结束时清掉。

## 11. 验收清单

1. 插件装进 web profile 后，左栏出现「快速启动」，折叠时只剩图标。
2. 点击后主内容区显示左右两栏：左侧启动项列表，右侧终端区占满其余空间；布局跟随明暗主题。
3. 能新增、编辑、删除两类快捷方式；不存在的路径保存时被拦下并在表单提示。
4. 点击文件夹快捷方式打开资源管理器；点击 exe 快捷方式启动应用；新增/编辑时可以用「选择程序」直接挑 exe。
5. 点击命令快捷方式在右栏当前分组里执行，能看到输出，能键盘交互；勾选自动关闭且正常结束时面板自动消失，异常退出时面板保留并显示失败状态点。
6. 拖动标签到边缘生成新分组，标签可在分组间移动；刷新页面或切换面板后分组布局恢复；分组超过 9 个时回退并提示。
7. 关闭分组里最后一个标签后分组消失；切到别的面板再回来，终端仍在并可继续输入。
8. 单元测试与 Playwright 测试全部通过。

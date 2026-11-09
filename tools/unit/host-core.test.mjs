/**
 * 主机纯逻辑的单元测试，覆盖数据路径、校验、存储读写、环形缓冲与 PowerShell 参数构造。
 *
 * 运行：node --test tools/unit/host-core.test.mjs
 * 所有用例只使用系统临时目录，结束后删除，不接触真实数据文件。
 */
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import {
  MAX_SHORTCUTS,
  RingBuffer,
  STORE_VERSION,
  buildAutoCloseScript,
  buildOpenLaunch,
  buildPickFileScript,
  emptyStore,
  encodePowerShellCommand,
  escapePowerShellSingleQuoted,
  explorerTarget,
  parsePickedFile,
  pickFileArgv,
  readStore,
  resolveDshHome,
  shortcutsFilePath,
  terminalArgv,
  validateShortcutsPayload,
  writeStore,
} from '../../lib/host-core.js';

/**
 * 在临时目录里执行一段用例，结束后删除目录。
 * @param {(directory: string) => Promise<void>} run 用例主体
 * @returns {Promise<void>}
 */
async function withTempDir(run) {
  const directory = await mkdtemp(join(tmpdir(), 'ql-unit-'));
  try {
    await run(directory);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

/**
 * 读取校验失败结果里的第一个字段错误。
 * @param {object} result 校验结果
 * @returns {{index: number, field: string, message: string}} 第一条字段错误
 */
function firstFieldError(result) {
  assert.equal(result.ok, false);
  assert.equal(result.error.code, 'invalid-shortcut');
  assert.ok(Array.isArray(result.error.fieldErrors) && result.error.fieldErrors.length > 0);
  return result.error.fieldErrors[0];
}

test('数据文件路径：DSH_HOME 覆盖与缺省位置', () => {
  assert.equal(
    resolveDshHome({ DSH_HOME: 'D:\\custom\\dsh-home' }, 'C:\\Users\\someone'),
    'D:\\custom\\dsh-home',
  );
  assert.equal(resolveDshHome({}, 'C:\\Users\\someone'), join('C:\\Users\\someone', '.dsh'));
  assert.equal(
    resolveDshHome({ DSH_HOME: '   ' }, 'C:\\Users\\someone'),
    join('C:\\Users\\someone', '.dsh'),
  );
  assert.equal(
    shortcutsFilePath({ DSH_HOME: 'D:\\custom\\dsh-home' }, 'C:\\Users\\someone'),
    join('D:\\custom\\dsh-home', 'quick-launch', 'shortcuts.json'),
  );
  assert.equal(
    shortcutsFilePath({}, 'C:\\Users\\someone'),
    join('C:\\Users\\someone', '.dsh', 'quick-launch', 'shortcuts.json'),
  );
});

test('校验：合法的打开路径与命令条目会被归一化', async () => {
  await withTempDir(async (directory) => {
    const result = await validateShortcutsPayload({
      version: STORE_VERSION,
      shortcuts: [
        { id: 'open-1', type: 'open', name: ' 项目目录 ', path: directory, note: ' 说明 ' },
        {
          id: 'cmd-1',
          type: 'command',
          name: '启动',
          command: " Write-Output 'hi' ",
          cwd: directory,
          autoClose: true,
        },
        { id: 'cmd-2', type: 'command', name: '无工作目录', command: 'hostname' },
      ],
    });

    assert.equal(result.ok, true);
    assert.equal(result.value.version, STORE_VERSION);
    const [open, command, bare] = result.value.shortcuts;
    assert.deepEqual(open, {
      id: 'open-1',
      type: 'open',
      name: '项目目录',
      path: directory,
      note: '说明',
    });
    assert.deepEqual(command, {
      id: 'cmd-1',
      type: 'command',
      name: '启动',
      command: "Write-Output 'hi'",
      cwd: directory,
      autoClose: true,
      note: '',
    });
    assert.deepEqual(bare, {
      id: 'cmd-2',
      type: 'command',
      name: '无工作目录',
      command: 'hostname',
      cwd: '',
      autoClose: false,
      note: '',
    });
  });
});

test('校验：非法条目返回带 fieldErrors 的第一个错误', async () => {
  await withTempDir(async (directory) => {
    const base = { id: 'x', type: 'command', name: '正常', command: 'hostname' };
    const cases = [
      { label: '类型非法', entry: { ...base, type: 'folder' }, field: 'type' },
      { label: '名称为空', entry: { ...base, name: '   ' }, field: 'name' },
      { label: '名称超长', entry: { ...base, name: 'a'.repeat(81) }, field: 'name' },
      { label: '路径为空', entry: { id: 'e', type: 'open', name: '空路径', path: '' }, field: 'path' },
      {
        label: '相对路径',
        entry: { id: 'r', type: 'open', name: '相对', path: 'relative\\dir' },
        field: 'path',
      },
      {
        label: '路径不存在',
        entry: { id: 'm', type: 'open', name: '缺失', path: join(directory, 'not-here') },
        field: 'path',
      },
      { label: '空命令', entry: { ...base, command: '  ' }, field: 'command' },
      { label: '非法 autoClose', entry: { ...base, autoClose: 'yes' }, field: 'autoClose' },
    ];

    for (const item of cases) {
      const result = await validateShortcutsPayload({ version: STORE_VERSION, shortcuts: [item.entry] });
      const detail = firstFieldError(result);
      assert.equal(detail.field, item.field, item.label);
      assert.equal(detail.index, 0, item.label);
      assert.ok(detail.message.length > 0, item.label);
      assert.match(result.error.message, /第 1 条快捷方式/u, item.label);
    }

    const badCwd = await validateShortcutsPayload({
      version: STORE_VERSION,
      shortcuts: [{ id: 'c', type: 'command', name: '相对工作目录', command: 'hostname', cwd: 'relative' }],
    });
    assert.equal(firstFieldError(badCwd).field, 'cwd');
  });
});

test('校验：checkPaths 关闭时只校验结构，不检查路径存在性', async () => {
  const missing = join(tmpdir(), 'ql-definitely-missing-path');
  const result = await validateShortcutsPayload(
    {
      version: STORE_VERSION,
      shortcuts: [
        { id: 'a', type: 'open', name: '缺失目录', path: missing },
        { id: 'b', type: 'command', name: '缺失工作目录', command: 'hostname', cwd: missing },
      ],
    },
    { checkPaths: false },
  );
  assert.equal(result.ok, true);
});

test('校验：重复 id、版本不匹配、超过条数上限与整体结构错误', async () => {
  const entry = { id: 'same', type: 'command', name: '重复', command: 'hostname' };

  const duplicate = await validateShortcutsPayload({ version: STORE_VERSION, shortcuts: [entry, entry] });
  const duplicateDetail = firstFieldError(duplicate);
  assert.equal(duplicateDetail.field, 'id');
  assert.equal(duplicateDetail.index, 1);
  assert.match(duplicateDetail.message, /重复/u);

  const version = await validateShortcutsPayload({ version: STORE_VERSION + 1, shortcuts: [] });
  const versionDetail = firstFieldError(version);
  assert.equal(versionDetail.field, 'version');
  assert.equal(versionDetail.index, -1);

  const tooMany = Array.from({ length: MAX_SHORTCUTS + 1 }, (unused, index) => ({
    id: `bulk-${index}`,
    type: 'command',
    name: `第 ${index} 条`,
    command: 'hostname',
  }));
  const overflow = await validateShortcutsPayload({ version: STORE_VERSION, shortcuts: tooMany });
  const overflowDetail = firstFieldError(overflow);
  assert.equal(overflowDetail.field, 'shortcuts');
  assert.equal(overflowDetail.index, -1);
  assert.match(overflowDetail.message, new RegExp(String(MAX_SHORTCUTS), 'u'));

  const notArray = await validateShortcutsPayload({ version: STORE_VERSION, shortcuts: 'oops' });
  assert.equal(firstFieldError(notArray).field, 'shortcuts');

  const notObject = await validateShortcutsPayload([]);
  assert.equal(firstFieldError(notObject).field, 'shortcuts');

  const withoutVersion = await validateShortcutsPayload({ shortcuts: [] });
  assert.equal(withoutVersion.ok, true);
  assert.equal(withoutVersion.value.version, STORE_VERSION);
});

test('读数据文件：不存在时返回空列表', async () => {
  await withTempDir(async (directory) => {
    const result = await readStore(join(directory, 'quick-launch', 'shortcuts.json'));
    assert.equal(result.ok, true);
    assert.deepEqual(result.value, emptyStore());
  });
});

test('读数据文件：非法 JSON 与结构不合法返回 store-corrupt', async () => {
  await withTempDir(async (directory) => {
    const invalidJson = join(directory, 'invalid.json');
    await writeFile(invalidJson, '{"version": 1, "shortcuts": [', 'utf8');
    const broken = await readStore(invalidJson);
    assert.equal(broken.ok, false);
    assert.equal(broken.error.code, 'store-corrupt');

    const invalidShape = join(directory, 'shape.json');
    await writeFile(
      invalidShape,
      JSON.stringify({
        version: STORE_VERSION,
        shortcuts: [{ id: 'a', type: 'folder', name: '类型非法', path: 'D:\\' }],
      }),
      'utf8',
    );
    const shape = await readStore(invalidShape);
    assert.equal(shape.ok, false);
    assert.equal(shape.error.code, 'store-corrupt');
    assert.match(shape.error.message, /不合法/u);

    const notArray = join(directory, 'not-array.json');
    await writeFile(notArray, JSON.stringify({ version: STORE_VERSION, shortcuts: {} }), 'utf8');
    const arrayResult = await readStore(notArray);
    assert.equal(arrayResult.ok, false);
    assert.equal(arrayResult.error.code, 'store-corrupt');
  });
});

test('读数据文件：容忍 UTF-8 BOM，且不检查路径是否存在', async () => {
  await withTempDir(async (directory) => {
    const file = join(directory, 'shortcuts.json');
    const content = {
      version: STORE_VERSION,
      shortcuts: [
        { id: 'bom-1', type: 'open', name: '已被删除的目录', path: join(directory, 'gone'), note: '' },
      ],
    };
    await writeFile(file, `\uFEFF${JSON.stringify(content, null, 2)}\n`, 'utf8');

    const result = await readStore(file);
    assert.equal(result.ok, true);
    assert.equal(result.value.shortcuts.length, 1);
    assert.equal(result.value.shortcuts[0].name, '已被删除的目录');
    assert.equal(result.value.shortcuts[0].path, join(directory, 'gone'));
  });
});

test('写数据文件：自动建目录、写读往返、覆盖旧内容', async () => {
  await withTempDir(async (directory) => {
    const file = join(directory, 'nested', 'deeper', 'shortcuts.json');
    const first = {
      version: STORE_VERSION,
      shortcuts: [
        {
          id: 'a',
          type: 'command',
          name: '第一条',
          command: 'hostname',
          cwd: '',
          autoClose: false,
          note: '',
        },
      ],
    };
    await writeStore(file, first);
    assert.deepEqual((await readStore(file)).value, first);
    assert.equal(await readFile(file, 'utf8'), `${JSON.stringify(first, null, 2)}\n`);

    const second = { version: STORE_VERSION, shortcuts: [] };
    await writeStore(file, second);
    assert.deepEqual((await readStore(file)).value, second);
    assert.deepEqual(await readdir(join(directory, 'nested', 'deeper')), ['shortcuts.json']);
  });
});

test('写数据文件：写入失败时抛出且不留下临时文件', async () => {
  await withTempDir(async (directory) => {
    const target = join(directory, 'blocked');
    await mkdir(target);

    await assert.rejects(() => writeStore(target, emptyStore()));

    const entries = await readdir(directory);
    assert.deepEqual(entries, ['blocked']);
    assert.deepEqual(
      entries.filter((name) => name.includes('.tmp')),
      [],
    );
  });
});

test('环形缓冲：容量内保留全部内容，超出上限丢弃最旧数据', () => {
  const buffer = new RingBuffer(32);
  buffer.push(Buffer.from('hello '));
  buffer.push('world');
  buffer.push('');
  assert.equal(buffer.size, 11);
  assert.equal(buffer.snapshot().toString('utf8'), 'hello world');

  const trimmed = new RingBuffer(5);
  trimmed.push('abc');
  trimmed.push('def');
  assert.equal(trimmed.size, 5);
  assert.equal(trimmed.snapshot().toString('utf8'), 'bcdef');

  const dropped = new RingBuffer(4);
  dropped.push('ab');
  dropped.push('cdefg');
  assert.equal(dropped.size, 4);
  assert.equal(dropped.snapshot().toString('utf8'), 'defg');

  const emptyBuffer = new RingBuffer(8);
  assert.equal(emptyBuffer.size, 0);
  assert.deepEqual(emptyBuffer.snapshot(), Buffer.alloc(0));
  assert.equal(emptyBuffer.snapshotBase64(), '');
});

test('环形缓冲：snapshotBase64 可解码且内容正确', () => {
  const text = '终端输出 e2e';
  const buffer = new RingBuffer();
  buffer.push(Buffer.from(text, 'utf8'));

  const decoded = Buffer.from(buffer.snapshotBase64(), 'base64');
  assert.equal(decoded.toString('utf8'), text);
  assert.deepEqual(decoded, Buffer.from(text, 'utf8'));
});

test('自动关闭脚本：命令后追加退出码，编码可往返解码', () => {
  const script = buildAutoCloseScript("Write-Output '完成'");
  assert.equal(script, "Write-Output '完成'\r\nexit $LASTEXITCODE\r\n");
  assert.equal(Buffer.from(encodePowerShellCommand(script), 'base64').toString('utf16le'), script);
});

test('PowerShell 单引号转义', () => {
  assert.equal(escapePowerShellSingleQuoted("D:\\a'b.txt"), "D:\\a''b.txt");
  assert.equal(escapePowerShellSingleQuoted("''"), "''''");
  assert.equal(escapePowerShellSingleQuoted(''), '');
  assert.equal(escapePowerShellSingleQuoted("D:\\plain.txt"), "D:\\plain.txt");
});

test('文件选择脚本：转义输出路径与标题，确定时写结果文件', () => {
  const script = buildPickFileScript("C:\\Temp\\it's\\out.txt", "选择程序 'x'");
  assert.ok(script.includes("$dialog.Title = '选择程序 ''x'''"));
  assert.ok(script.includes("WriteAllText('C:\\Temp\\it''s\\out.txt', $dialog.FileName"));
  assert.ok(script.includes("Add-Type -AssemblyName System.Windows.Forms"));
  assert.ok(script.includes('keybd_event(0x12, 0, 0'));
  assert.ok(script.endsWith('exit 0'));
});

test('文件选择结果：去 BOM 与空白，空内容表示取消', () => {
  assert.equal(parsePickedFile('D:\\a\\b.exe'), 'D:\\a\\b.exe');
  assert.equal(parsePickedFile('\uFEFF  D:\\中文\\程序.exe \r\n'), 'D:\\中文\\程序.exe');
  assert.equal(parsePickedFile(''), null);
  assert.equal(parsePickedFile('   \r\n'), null);
  assert.equal(parsePickedFile(undefined), null);
});

test('文件选择参数：隐藏控制台并带 -STA，脚本编码可往返解码', () => {
  const shell = 'C:\\Program Files\\PowerShell\\7\\pwsh.exe';
  const script = buildPickFileScript('C:\\Temp\\out.txt', '选择程序');
  const argv = pickFileArgv(shell, script);
  assert.deepEqual(argv.slice(0, 8), [
    shell,
    '-NoLogo',
    '-NoProfile',
    '-NonInteractive',
    '-STA',
    '-WindowStyle',
    'Hidden',
    '-EncodedCommand',
  ]);
  assert.equal(argv.length, 9);
  assert.equal(Buffer.from(argv[8], 'base64').toString('utf16le'), script);
});

test('终端参数：空白终端、自动关闭、保留终端三种情况', () => {
  const shell = 'C:\\Program Files\\PowerShell\\7\\pwsh.exe';
  assert.deepEqual(terminalArgv(shell), [shell, '-NoLogo']);
  assert.deepEqual(terminalArgv(shell, { command: '   ', autoClose: true }), [shell, '-NoLogo']);

  const autoClose = terminalArgv(shell, {
    command: "Write-Output 'e2e-auto-ok'",
    autoClose: true,
  });
  assert.deepEqual(autoClose, [
    shell,
    '-NoLogo',
    '-EncodedCommand',
    encodePowerShellCommand(buildAutoCloseScript("Write-Output 'e2e-auto-ok'")),
  ]);
  assert.equal(
    Buffer.from(autoClose[3], 'base64').toString('utf16le'),
    "Write-Output 'e2e-auto-ok'\r\nexit $LASTEXITCODE\r\n",
  );

  const keepAlive = terminalArgv(shell, { command: "Write-Output 'e2e-keep-ok'" });
  assert.deepEqual(keepAlive.slice(0, 4), [shell, '-NoLogo', '-NoExit', '-EncodedCommand']);
  assert.equal(keepAlive.length, 5);
  assert.equal(
    Buffer.from(keepAlive[4], 'base64').toString('utf16le'),
    "Write-Output 'e2e-keep-ok'",
  );
});

test('资源管理器目标：中文按字面传递，逗号等号转义，空格保留编码', () => {
  assert.equal(explorerTarget('D:\\MyCode\\project'), 'file:///D:/MyCode/project');
  assert.equal(explorerTarget('D:\\项目\\目录'), 'file:///D:/项目/目录');
  assert.equal(explorerTarget("D:\\MyCode\\it's\\readme.txt"), "file:///D:/MyCode/it's/readme.txt");
  assert.equal(explorerTarget('D:\\a,b=c\\x y.txt'), 'file:///D:/a%2Cb%3Dc/x%20y.txt');
  assert.equal(explorerTarget('\\\\server\\share\\dir'), 'file://server/share/dir');
});

test('打开路径：文件夹、程序与文件都交给资源管理器双击语义', () => {
  assert.deepEqual(buildOpenLaunch('D:\\MyCode\\project'), {
    command: 'explorer.exe',
    args: ['file:///D:/MyCode/project'],
  });

  assert.deepEqual(buildOpenLaunch('C:\\Program Files\\App\\App.exe'), {
    command: 'explorer.exe',
    args: ['file:///C:/Program%20Files/App/App.exe'],
  });

  assert.deepEqual(buildOpenLaunch('D:\\项目\\说明书.txt'), {
    command: 'explorer.exe',
    args: ['file:///D:/项目/说明书.txt'],
  });
});

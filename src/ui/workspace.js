import { createDockview } from 'dockview';

/** 同时显示的分组上限。 */
export const MAX_GROUPS = 9;

/** 布局在浏览器里的存储键。 */
const STORAGE_KEY = 'dsh-quick-launch-bar:workspace-layout:v1';

/** 结构变化后合并保存布局的等待时间。 */
const SAVE_DELAY = 200;

/**
 * 新建一组 SVG 元素。
 * @param {string} path - 路径描述。
 * @param {number} size - 边长。
 * @returns {SVGSVGElement} SVG 元素。
 */
function svgIcon(path, size) {
  const namespace = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(namespace, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.6');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const shape = document.createElementNS(namespace, 'path');
  shape.setAttribute('d', path);
  svg.append(shape);
  return svg;
}

/**
 * 标签状态点的状态值。
 * @param {object} terminal - 终端快照。
 * @returns {string} running、exited 或 failed。
 */
function dotStatus(terminal) {
  if (terminal.status !== 'exited') return 'running';
  return terminal.exitCode === 0 ? 'exited' : 'failed';
}

/**
 * 终端状态说明。
 * @param {object} terminal - 终端快照。
 * @param {(key: string, params?: object) => string} t - 翻译函数。
 * @returns {string} 说明文本。
 */
function statusText(terminal, t) {
  if (!terminal || terminal.status !== 'exited') return t('dock.running');
  if (typeof terminal.exitCode === 'number') return t('dock.exitCode', { code: String(terminal.exitCode) });
  return t('dock.exited');
}

/**
 * 读取浏览器里保存的布局。
 * @returns {object | null} 序列化的布局。
 */
function readSavedLayout() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1 || typeof parsed.layout !== 'object') return null;
    return parsed.layout;
  } catch {
    return null;
  }
}

/**
 * 创建终端工作区。工作区把每个终端呈现为 dockview 的一个面板：
 * 面板按分组排列，分组自带标签栏，标签可拖动到边缘生成新分组。
 * @param {object} options - 工作区依赖。
 * @param {(key: string, params?: object) => string} options.t - 翻译函数。
 * @param {object} options.sessions - 终端会话集合。
 * @param {(text: string, tone?: 'info' | 'error') => void} options.notify - 页面提示。
 * @param {(group?: object) => void} options.requestNewTerminal - 请求新建终端；group 为期望落入的分组。
 * @param {(id: string) => void} options.closeTerminal - 请求关闭终端。
 * @returns {object} 工作区。
 */
export function createTerminalWorkspace({ t, sessions, notify, requestNewTerminal, closeTerminal }) {
  let api = null;
  let disposed = false;
  let ready = false;
  let restoring = false;
  let reverting = false;
  let lastGoodLayout = null;
  let saveTimer = 0;
  let unsubscribe = () => {};
  let layoutSubscriptions = [];
  /** @type {Map<string, { update: (terminal: object) => void }>} */
  const tabViews = new Map();

  /** 把当前布局写入浏览器存储。 */
  function saveLayout() {
    if (!api) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, layout: api.toJSON() }));
    } catch {
      // 存储不可用时只影响布局恢复。
    }
  }

  /** 合并短时间内的多次结构变化后再保存。 */
  function scheduleSave() {
    if (saveTimer) return;
    saveTimer = setTimeout(() => {
      saveTimer = 0;
      if (!disposed) saveLayout();
    }, SAVE_DELAY);
  }

  /**
   * 把终端放进指定分组，不指定时放进当前激活分组。
   * @param {object} meta - 终端元数据。
   * @param {object} [group] - 目标分组。
   * @returns {object | undefined} 面板对象。
   */
  function add(meta, group) {
    if (!api || disposed) return undefined;
    const existing = api.getPanel(meta.id);
    if (existing) return existing;
    const target =
      group && group.panels.length > 0
        ? group
        : api.activeGroup && api.activeGroup.panels.length > 0
          ? api.activeGroup
          : api.groups.length > 0
            ? api.groups[api.groups.length - 1]
            : undefined;
    const panel = api.addPanel({
      id: meta.id,
      component: 'terminal',
      title: meta.title || meta.id,
      params: { terminalId: meta.id },
      ...(target ? { position: { referenceGroup: target, direction: 'within' } } : {}),
    });
    return panel;
  }

  /**
   * 让面板跟随终端状态更新标签的状态点。
   * @param {object} terminal - 终端快照。
   * @param {{ update: (terminal: object) => void }} view - 标签视图。
   */
  function updateTab(terminal, view) {
    view.update(terminal);
  }

  /** 同步所有标签的状态，并移除已经在主机侧消失的终端面板。 */
  function syncTabs() {
    if (!api || disposed) return;
    const snapshot = sessions.getSnapshot();
    const alive = new Set();
    for (const terminal of snapshot.terminals) {
      alive.add(terminal.id);
      const view = tabViews.get(terminal.id);
      if (view) updateTab(terminal, view);
    }
    for (const panel of [...api.panels]) {
      if (!alive.has(panel.id)) {
        try {
          api.removePanel(panel);
        } catch {
          // 面板已被移除时忽略。
        }
      }
    }
    if (ready) {
      for (const terminal of snapshot.terminals) {
        if (!api.getPanel(terminal.id)) add(terminal);
      }
    }
  }

  /** 分组数量超过上限时回退到上一次布局。 */
  function revertLayout() {
    if (!lastGoodLayout || !api) return;
    reverting = true;
    notify(t('workspace.groupLimit', { count: MAX_GROUPS }), 'error');
    try {
      api.fromJSON(lastGoodLayout);
    } catch {
      // 回退失败时保留当前布局。
    }
    setTimeout(() => {
      reverting = false;
    }, 0);
  }

  /**
   * 终端面板的内容渲染器。
   * @param {string} id - 终端 id。
   * @returns {object} 内容渲染器。
   */
  function createTerminalContent(id) {
    return {
      element: sessions.paneFor(id),
      init() {
        sessions.mount(id);
      },
      dispose() {
        // 终端容器由会话集合持有，标签由标签渲染器释放。
      },
      focus() {
        sessions.focus(id);
      },
      layout() {
        sessions.fit(id);
      },
      update() {
        // 终端内容由 xterm 自行维护，无需响应参数更新。
      },
    };
  }

  /**
   * 自定义终端标签。
   * @param {string} id - 终端 id。
   * @returns {object} 标签渲染器。
   */
  function createTab(id) {
    const element = document.createElement('div');
    element.className = 'ql-tab';
    element.dataset.testid = 'ql-tab';

    const dot = document.createElement('span');
    dot.className = 'ql-tab-dot';
    const title = document.createElement('span');
    title.className = 'ql-tab-title';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'ql-tab-close';
    close.dataset.testid = 'ql-tab-close';
    close.append(svgIcon('M6 6l12 12M18 6L6 18', 12));
    element.append(dot, title, close);

    let titleSubscription = null;
    close.addEventListener('pointerdown', (event) => event.stopPropagation());
    close.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeTerminal(id);
    });

    const view = {
      /**
       * 刷新状态点与提示。
       * @param {object | undefined} terminal - 终端快照。
       */
      update(terminal) {
        dot.dataset.status = terminal ? dotStatus(terminal) : 'running';
        element.title = statusText(terminal, t);
      },
    };

    return {
      element,
      init(params) {
        title.textContent = params.title || id;
        close.setAttribute('aria-label', t('dock.closeNamed', { title: params.title || id }));
        tabViews.set(id, view);
        titleSubscription = params.api.onDidTitleChange((event) => {
          title.textContent = event.title;
          close.setAttribute('aria-label', t('dock.closeNamed', { title: event.title }));
        });
        view.update(sessions.getTerminal(id));
      },
      dispose() {
        tabViews.delete(id);
        titleSubscription?.dispose();
      },
    };
  }

  /**
   * 分组标签栏右侧的新建终端按钮。
   * @param {object} group - 所在分组。
   * @returns {object} 渲染器。
   */
  function createGroupAction(group) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ql-group-add';
    button.dataset.testid = 'ql-group-add';
    button.title = t('workspace.new');
    button.setAttribute('aria-label', t('workspace.new'));
    button.append(svgIcon('M12 5v14M5 12h14', 14));
    button.addEventListener('pointerdown', (event) => event.stopPropagation());
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      requestNewTerminal(group);
    });
    return {
      element: button,
      init() {
        // 按钮内容固定，无需在初始化时读取参数。
      },
      dispose() {
        // 按钮随分组销毁，无需额外清理。
      },
    };
  }

  /**
   * 没有终端时的空状态。
   * @returns {object} 渲染器。
   */
  function createWatermark() {
    const element = document.createElement('div');
    element.className = 'ql-term-empty';
    element.dataset.testid = 'ql-term-empty';
    const title = document.createElement('p');
    title.className = 'ql-term-empty-title';
    title.textContent = t('workspace.emptyTitle');
    const hint = document.createElement('p');
    hint.className = 'ql-term-empty-hint';
    hint.textContent = t('workspace.emptyHint');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ql-button ql-button-small ql-term-empty-action';
    button.dataset.testid = 'ql-term-empty-new';
    button.textContent = t('workspace.new');
    button.addEventListener('click', () => requestNewTerminal(undefined));
    element.append(title, hint, button);
    return {
      element,
      init() {
        // 空状态内容固定。
      },
      dispose() {
        // 空状态随工作区销毁。
      },
    };
  }

  /**
   * 挂载工作区。
   * @param {HTMLElement} container - 承载元素。
   */
  function mount(container) {
    if (api || disposed) return;
    ready = false;
    api = createDockview(container, {
      theme: { name: 'dsh-quick-launch', className: 'ql-term-theme', colorScheme: 'dark' },
      disableFloatingGroups: true,
      dndStrategy: 'pointer',
      defaultRenderer: 'always',
      dropSizing: 'distribute',
      closeEmptyGroups: true,
      noPanelsOverlay: 'watermark',
      defaultTabComponent: 'terminal-tab',
      createComponent: ({ id }) => createTerminalContent(id),
      createTabComponent: ({ id }) => createTab(id),
      createWatermarkComponent: () => createWatermark(),
      createRightHeaderActionComponent: (group) => createGroupAction(group),
    });

    layoutSubscriptions = [
      api.onWillMutateLayout(() => {
        if (reverting || restoring) return;
        lastGoodLayout = api.toJSON();
      }),
      api.onDidLayoutChange((event) => {
        if (disposed) return;
        if (!reverting && !restoring && api.groups.length > MAX_GROUPS) {
          revertLayout();
          return;
        }
        if (event.reasons.has('structure')) scheduleSave();
      }),
      api.onDidRemovePanel((panel) => {
        if (disposed || reverting || restoring) return;
        if (sessions.getTerminal(panel.id)) closeTerminal(panel.id);
      }),
    ];

    unsubscribe = sessions.subscribe(() => syncTabs());
    window.addEventListener('pagehide', saveLayout);
    lastGoodLayout = null;
  }

  /**
   * 按主机上的终端重建界面，并尽量恢复上次保存的分组布局。
   * @param {object[]} terminals - 主机返回的终端元数据。
   */
  function restore(terminals) {
    if (!api || disposed) return;
    restoring = true;
    try {
      const saved = readSavedLayout();
      if (saved) {
        try {
          api.fromJSON(saved);
        } catch {
          api.clear();
        }
      }
      const alive = new Set(terminals.map((terminal) => terminal.id));
      for (const panel of [...api.panels]) {
        if (!alive.has(panel.id)) {
          try {
            api.removePanel(panel);
          } catch {
            // 面板已被移除时忽略。
          }
        }
      }
      if (api.groups.length > MAX_GROUPS) api.clear();
      for (const meta of terminals) add(meta);
      syncTabs();
    } finally {
      restoring = false;
    }
    ready = true;
    lastGoodLayout = api.toJSON();
    scheduleSave();
  }

  /** 释放工作区。 */
  function dispose() {
    if (disposed) return;
    if (saveTimer) {
      clearTimeout(saveTimer);
      saveTimer = 0;
    }
    saveLayout();
    disposed = true;
    ready = false;
    window.removeEventListener('pagehide', saveLayout);
    unsubscribe();
    unsubscribe = () => {};
    for (const subscription of layoutSubscriptions) subscription.dispose();
    layoutSubscriptions = [];
    tabViews.clear();
    api?.dispose();
    api = null;
  }

  return {
    add,
    dispose,
    mount,
    restore,
  };
}

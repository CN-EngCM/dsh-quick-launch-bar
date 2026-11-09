import { FitAddon } from '@xterm/addon-fit';
import { Terminal } from '@xterm/xterm';
import xtermCss from '@xterm/xterm/css/xterm.css';
import dockviewCss from 'dockview/dist/styles/dockview.css';

import { NS, dictionaries } from './i18n.js';
import { createIcons } from './icons.js';
import { createPage } from './ui/page.jsx';

/** 插件 id，必须与包名一致。 */
const PLUGIN_ID = 'dsh-quick-launch-bar';
/** 侧栏入口与主面板共用的 id。 */
const PANEL_ID = 'quick-launch';

window.__ModuleLoader__.load({
  id: PLUGIN_ID,
  factory(require) {
    const React = require('react');
    const icons = createIcons(React);

    /** 只依赖插槽与本地化服务；其余能力按需读取。 */
    const inject = ['slots', 'locale'];

    /**
     * 注册译文、侧栏入口与主页面。
     * @param {object} ctx - 客户端插件上下文。
     */
    function apply(ctx) {
      ctx.effect(() => {
        const disposeZh = ctx.locale.register(NS, 'zh', dictionaries.zh);
        const disposeEn = ctx.locale.register(NS, 'en', dictionaries.en);
        return () => {
          disposeZh();
          disposeEn();
        };
      }, 'quick-launch: dictionaries');

      const t = ctx.locale.bind(NS);

      const Page = createPage({
        React,
        t,
        Terminal,
        FitAddon,
        xtermCss,
        dockviewCss,
        icons,
        getPickDirectory: () => {
          const workspace = ctx.get('uiWorkspace');
          if (!workspace || typeof workspace.pickDirectory !== 'function') return undefined;
          return workspace.pickDirectory.bind(workspace);
        },
      });

      /**
       * 侧栏入口图标。
       * @param {object} props - 插槽提供的尺寸。
       * @returns {object} 闪电图标。
       */
      function PanelIcon({ size }) {
        return React.createElement(icons.Lightning, { size });
      }

      ctx.slots.inject('main', () =>
        ctx.slots.register(
          {
            name: 'main',
            key: PANEL_ID,
            locale: NS,
          },
          Page,
        ),
      );

      ctx.slots.inject('sidebar.panellist', () =>
        ctx.slots.register(
          {
            name: 'sidebar.panellist',
            id: PANEL_ID,
            order: -10,
            locale: NS,
            label: () => t('panel.label'),
          },
          PanelIcon,
        ),
      );
    }

    return { inject, apply };
  },
});

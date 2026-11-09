/**
 * 图标集合。所有图标使用 currentColor 描边，尺寸跟随调用方。
 * @param {typeof import('react')} React - 平台 React。
 * @returns {Record<string, Function>} 图标组件。
 */
export function createIcons(React) {
  const h = React.createElement;

  /**
   * 统一描边风格的图标外壳。
   * @param {object} props - 图标属性。
   * @returns {object} SVG 元素。
   */
  function Icon({ size = 16, strokeWidth = 1.6, children, ...rest }) {
    return h(
      'svg',
      {
        viewBox: '0 0 24 24',
        width: size,
        height: size,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': 'true',
        focusable: 'false',
        ...rest,
      },
      children,
    );
  }

  /** 侧栏入口图标。 */
  function Lightning(props) {
    return h(Icon, props, h('path', { d: 'M13 2 5 13h6l-1 9 8-11h-6l1-9Z' }));
  }

  /** 打开路径类型的卡片图标。 */
  function Folder(props) {
    return h(
      Icon,
      props,
      h('path', { d: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z' }),
    );
  }

  /** 打开程序类型的卡片图标。 */
  function AppWindow(props) {
    return h(
      Icon,
      props,
      h('rect', { x: 3, y: 4, width: 18, height: 16, rx: 2 }),
      h('path', { d: 'M3 8h18M7 6h.01M10 6h.01' }),
    );
  }

  /** 运行命令类型的卡片图标。 */
  function TerminalIcon(props) {
    return h(
      Icon,
      props,
      h('rect', { x: 3, y: 5, width: 18, height: 14, rx: 2 }),
      h('path', { d: 'M7 9l3 3-3 3M13 15h4' }),
    );
  }

  /** 编辑按钮图标。 */
  function Pencil(props) {
    return h(
      Icon,
      props,
      h('path', { d: 'M4 20h4L19 9a2.1 2.1 0 0 0-4-4L4 16v4Z' }),
      h('path', { d: 'M14 6l4 4' }),
    );
  }

  /** 删除按钮图标。 */
  function Trash(props) {
    return h(
      Icon,
      props,
      h('path', { d: 'M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6' }),
    );
  }

  return { Lightning, Folder, AppWindow, TerminalIcon, Pencil, Trash };
}

import * as api from '../api.js';
import { ApiError } from '../api.js';
import { createTerminalSessions, TERMINAL_LIMIT } from '../terminal.js';
import { PAGE_CSS } from '../styles.js';
import { createTerminalWorkspace } from './workspace.js';

/** 字段校验原因对应的本地化键。 */
const FIELD_ERROR_KEYS = {
  'name-empty': 'form.invalidName',
  'name-too-long': 'form.nameTooLong',
  'path-empty': 'form.invalidPath',
  'path-absolute': 'form.pathAbsolute',
  'path-missing': 'form.pathMissing',
  'command-empty': 'form.invalidCommand',
  'command-too-long': 'form.commandTooLong',
  'cwd-absolute': 'form.cwdAbsolute',
  'cwd-missing': 'form.cwdMissing',
};

/** 接口错误码对应的本地化键。 */
const ERROR_KEYS = {
  network: 'error.network',
  unauthorized: 'error.auth',
  forbidden: 'error.auth',
  'http-401': 'error.auth',
  'http-403': 'error.auth',
  'terminal-limit': 'error.terminalLimitShort',
  'path-missing': 'error.pathMissing',
  'cwd-missing': 'error.cwdMissing',
  'open-failed': 'error.openFailed',
  'shell-unavailable': 'error.shellUnavailable',
  'terminal-not-found': 'error.terminalGone',
  'picker-busy': 'error.pickBusy',
  'pick-failed': 'error.pickFailed',
};

/** 可执行文件的扩展名，用来给卡片挑图标。 */
const EXECUTABLE_EXTENSIONS = /\.(?:exe|lnk|bat|cmd|com|msi)$/iu;

/**
 * 从完整路径里猜一个名称：取最后一段并去掉扩展名。
 * @param {string} value - 完整路径。
 * @returns {string} 名称。
 */
function suggestNameFromPath(value) {
  const base = value.split(/[\\/]/u).pop() || '';
  const dot = base.lastIndexOf('.');
  return dot > 0 ? base.slice(0, dot) : base;
}

/**
 * 路径是否指向可执行文件。
 * @param {string} value - 路径。
 * @returns {boolean} 是否像可执行文件。
 */
function looksExecutable(value) {
  return EXECUTABLE_EXTENSIONS.test(value || '');
}

/**
 * 把接口错误转成可显示的说明。
 * @param {unknown} error - 抛出的错误。
 * @param {(key: string, params?: object) => string} t - 翻译函数。
 * @returns {string} 说明文本。
 */
function describeError(error, t) {
  if (error instanceof ApiError) {
    if (error.code === 'terminal-limit') return t('toast.terminalLimit', { count: TERMINAL_LIMIT });
    const key = ERROR_KEYS[error.code];
    if (key !== undefined) return t(key);
    if (error.message) return error.message;
  }
  return t('error.unknown');
}

/** 生成快捷方式 id。 */
function createShortcutId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `ql-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * 把表单草稿转成要保存的快捷方式。
 * @param {object} draft - 表单草稿。
 * @param {string} id - 快捷方式 id。
 * @returns {object} 快捷方式。
 */
function draftToShortcut(draft, id) {
  const base = {
    id,
    type: draft.type,
    name: draft.name.trim(),
    note: draft.note.trim(),
  };
  if (draft.type === 'open') return { ...base, path: draft.path.trim() };
  return {
    ...base,
    command: draft.command.trim(),
    cwd: draft.cwd.trim(),
    autoClose: draft.autoClose === true,
  };
}

/**
 * 校验必填字段。
 * @param {object} draft - 表单草稿。
 * @param {(key: string, params?: object) => string} t - 翻译函数。
 * @returns {{ field: string, message: string } | null} 第一条错误。
 */
function validateDraft(draft, t) {
  if (!draft.name.trim()) return { field: 'name', message: t('form.invalidName') };
  if (draft.type === 'open' && !draft.path.trim()) return { field: 'path', message: t('form.invalidPath') };
  if (draft.type === 'command' && !draft.command.trim()) return { field: 'command', message: t('form.invalidCommand') };
  return null;
}

/**
 * 创建快速启动页组件。
 * @param {object} options - 页面依赖。
 * @param {typeof import('react')} options.React - 平台 React。
 * @param {(key: string, params?: object) => string} options.t - 绑定的翻译函数。
 * @param {typeof import('@xterm/xterm').Terminal} options.Terminal - 终端构造器。
 * @param {typeof import('@xterm/addon-fit').FitAddon} options.FitAddon - 尺寸适配插件。
 * @param {string} options.xtermCss - xterm 基础样式。
 * @param {string} options.dockviewCss - dockview 基础样式。
 * @param {Record<string, Function>} options.icons - 图标组件。
 * @param {() => ((() => Promise<string | null>) | undefined)} options.getPickDirectory - 读取系统目录选择器。
 * @returns {Function} 页面组件。
 */
export function createPage({ React, t: boundT, Terminal, FitAddon, xtermCss, dockviewCss, icons, getPickDirectory }) {
  const { useState, useEffect, useRef, useCallback } = React;
  const { Lightning, Folder, AppWindow, TerminalIcon, Pencil, Trash } = icons;
  const STYLE_TEXT = `${xtermCss}\n${dockviewCss}\n${PAGE_CSS}`;

  /**
   * 一张快捷方式卡片。
   * @param {object} props - 卡片属性。
   * @returns {object} 列表项。
   */
  function ShortcutCard({ t, shortcut, disabled, onRun, onEdit, onDelete }) {
    const Glyph = shortcut.type === 'command' ? TerminalIcon : looksExecutable(shortcut.path) ? AppWindow : Folder;
    const target = shortcut.type === 'open' ? shortcut.path : shortcut.command;
    return (
      <li className="ql-card" data-testid="ql-card">
        <button
          type="button"
          className="ql-card-open"
          aria-label={t('card.run', { name: shortcut.name })}
          onClick={onRun}
        />
        <span className="ql-card-icon" aria-hidden="true">
          <Glyph size={18} />
        </span>
        <span className="ql-card-main">
          <span className="ql-card-name">{shortcut.name}</span>
          <span className="ql-card-target" title={target}>
            {target}
          </span>
        </span>
        <span className="ql-card-actions">
          <button
            type="button"
            className="ql-icon-button"
            data-testid="ql-card-edit"
            aria-label={t('card.editNamed', { name: shortcut.name })}
            title={t('card.edit')}
            disabled={disabled}
            onClick={onEdit}
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            className="ql-icon-button ql-icon-button-danger"
            data-testid="ql-card-delete"
            aria-label={t('card.deleteNamed', { name: shortcut.name })}
            title={t('card.delete')}
            disabled={disabled}
            onClick={onDelete}
          >
            <Trash size={15} />
          </button>
        </span>
      </li>
    );
  }

  /**
   * 新增或编辑快捷方式的弹窗。
   * @param {object} props - 表单属性。
   * @returns {object} 弹窗。
   */
  function ShortcutForm({ t, mode, initial, pickDirectory, onCancel, onSubmit }) {
    const [draft, setDraft] = useState(() => ({
      type: initial && initial.type === 'command' ? 'command' : 'open',
      name: initial ? initial.name : '',
      path: initial ? initial.path || '' : '',
      command: initial ? initial.command || '' : '',
      cwd: initial ? initial.cwd || '' : '',
      autoClose: Boolean(initial && initial.autoClose),
      note: initial ? initial.note || '' : '',
    }));
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [picking, setPicking] = useState(false);
    const title = mode === 'edit' ? t('form.editTitle') : t('form.createTitle');

    /** 关闭前忽略正在提交的状态。 */
    const cancel = () => {
      if (!submitting) onCancel();
    };

    /**
     * 更新一个字段。
     * @param {string} field - 字段名。
     * @returns {(event: object) => void} 事件处理函数。
     */
    const update = (field) => (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      setDraft((current) => ({ ...current, [field]: value }));
    };

    /** 选择目录并写入当前字段。 */
    const pickInto = async (field) => {
      if (pickDirectory === null || picking) return;
      setPicking(true);
      try {
        const directory = await pickDirectory();
        if (directory) setDraft((current) => ({ ...current, [field]: directory }));
      } catch {
        // 用户取消或系统选择器不可用时保持原值。
      } finally {
        setPicking(false);
      }
    };

    /** 选择要打开的程序或文件，写进路径；名称为空时用文件名补上。 */
    const pickFileIntoPath = async () => {
      if (picking) return;
      setPicking(true);
      setError(null);
      try {
        const file = await api.pickFile(t('form.pickFileTitle'));
        if (file) {
          setDraft((current) => ({
            ...current,
            path: file,
            name: current.name.trim() === '' ? suggestNameFromPath(file) : current.name,
          }));
        }
      } catch (failure) {
        setError({ field: 'path', message: describeError(failure, t) });
      } finally {
        setPicking(false);
      }
    };

    /** 提交表单。 */
    const submit = async (event) => {
      event.preventDefault();
      if (submitting) return;
      const validation = validateDraft(draft, t);
      if (validation) {
        setError(validation);
        return;
      }
      setSubmitting(true);
      setError(null);
      try {
        await onSubmit(draft);
      } catch (failure) {
        setSubmitting(false);
        const detail = failure instanceof ApiError && failure.fieldErrors.length > 0 ? failure.fieldErrors[0] : null;
        const localizedKey = detail && detail.reason ? FIELD_ERROR_KEYS[detail.reason] : undefined;
        setError({
          field: detail && detail.field,
          message: localizedKey !== undefined ? t(localizedKey) : (detail && detail.message) || describeError(failure, t),
        });
      }
    };

    const fieldInvalid = (field) => (error && error.field === field ? true : undefined);

    return (
      <div
        className="ql-overlay"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) cancel();
        }}
      >
        <form
          className="ql-modal"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          data-testid="ql-form"
          onSubmit={submit}
          noValidate
        >
          <div className="ql-modal-head">
            <h2 className="ql-modal-title">{title}</h2>
          </div>
          <div className="ql-modal-body">
            {error !== null && (
              <p className="ql-field-error" role="alert">
                {error.message}
              </p>
            )}

            <fieldset className="ql-fieldset">
              <legend className="ql-legend">{t('form.type')}</legend>
              <div className="ql-radio-row">
                <label className="ql-radio">
                  <input
                    type="radio"
                    name="quick-launch-type"
                    value="open"
                    data-testid="ql-form-type-open"
                    checked={draft.type === 'open'}
                    onChange={() => setDraft((current) => ({ ...current, type: 'open' }))}
                  />
                  <span>{t('type.open')}</span>
                </label>
                <label className="ql-radio">
                  <input
                    type="radio"
                    name="quick-launch-type"
                    value="command"
                    data-testid="ql-form-type-command"
                    checked={draft.type === 'command'}
                    onChange={() => setDraft((current) => ({ ...current, type: 'command' }))}
                  />
                  <span>{t('type.command')}</span>
                </label>
              </div>
            </fieldset>

            <label className="ql-field">
              <span className="ql-label">{t('form.name')}</span>
              <input
                className="ql-input"
                data-testid="ql-form-name"
                value={draft.name}
                placeholder={t('form.namePlaceholder')}
                aria-invalid={fieldInvalid('name')}
                onChange={update('name')}
                autoFocus
              />
            </label>

            {draft.type === 'open' ? (
              <div className="ql-field">
                <label className="ql-label" htmlFor="ql-form-path-input">
                  {t('form.path')}
                </label>
                <div className="ql-field-row">
                  <input
                    id="ql-form-path-input"
                    className="ql-input"
                    data-testid="ql-form-path"
                    value={draft.path}
                    placeholder={t('form.pathPlaceholder')}
                    aria-invalid={fieldInvalid('path')}
                    onChange={update('path')}
                  />
                  {pickDirectory !== null && (
                    <button
                      type="button"
                      className="ql-button ql-button-small"
                      disabled={picking}
                      onClick={() => void pickInto('path')}
                    >
                      {t('form.pickDirectory')}
                    </button>
                  )}
                  <button
                    type="button"
                    className="ql-button ql-button-small"
                    data-testid="ql-form-pick-file"
                    disabled={picking}
                    onClick={() => void pickFileIntoPath()}
                  >
                    {picking ? t('form.picking') : t('form.pickFile')}
                  </button>
                </div>
                <span className="ql-field-hint">{t('form.pathHint')}</span>
              </div>
            ) : (
              <>
                <label className="ql-field">
                  <span className="ql-label">{t('form.command')}</span>
                  <textarea
                    className="ql-textarea"
                    data-testid="ql-form-command"
                    value={draft.command}
                    placeholder={t('form.commandPlaceholder')}
                    aria-invalid={fieldInvalid('command')}
                    onChange={update('command')}
                    spellCheck={false}
                  />
                </label>
                <div className="ql-field">
                  <label className="ql-label" htmlFor="ql-form-cwd-input">
                    {t('form.cwd')}
                  </label>
                  <div className="ql-field-row">
                    <input
                      id="ql-form-cwd-input"
                      className="ql-input"
                      data-testid="ql-form-cwd"
                      value={draft.cwd}
                      placeholder={t('form.cwdPlaceholder')}
                      aria-invalid={fieldInvalid('cwd')}
                      onChange={update('cwd')}
                    />
                    {pickDirectory !== null && (
                      <button
                        type="button"
                        className="ql-button ql-button-small"
                        onClick={() => void pickInto('cwd')}
                      >
                        {t('form.pickDirectory')}
                      </button>
                    )}
                  </div>
                </div>
                <label className="ql-check">
                  <input
                    type="checkbox"
                    data-testid="ql-form-autoclose"
                    checked={draft.autoClose}
                    onChange={update('autoClose')}
                  />
                  <span>{t('form.autoClose')}</span>
                </label>
              </>
            )}

            <label className="ql-field">
              <span className="ql-label">{t('form.note')}</span>
              <input
                className="ql-input"
                data-testid="ql-form-note"
                value={draft.note}
                placeholder={t('form.notePlaceholder')}
                onChange={update('note')}
              />
            </label>
          </div>
          <div className="ql-modal-foot">
            <button type="button" className="ql-button" data-testid="ql-form-cancel" onClick={cancel} disabled={submitting}>
              {t('form.cancel')}
            </button>
            <button type="submit" className="ql-button ql-button-primary" data-testid="ql-form-save" disabled={submitting}>
              {submitting ? t('form.saving') : t('form.save')}
            </button>
          </div>
        </form>
      </div>
    );
  }

  /**
   * 删除确认弹窗。
   * @param {object} props - 弹窗属性。
   * @returns {object} 弹窗。
   */
  function DeleteDialog({ t, shortcut, onCancel, onConfirm }) {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');

    const confirm = async () => {
      if (deleting) return;
      setDeleting(true);
      setError('');
      try {
        await onConfirm();
      } catch (failure) {
        setDeleting(false);
        setError(t('toast.deleteFailed', { message: describeError(failure, t) }));
      }
    };

    return (
      <div
        className="ql-overlay"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget && !deleting) onCancel();
        }}
      >
        <div className="ql-modal ql-modal-small" role="dialog" aria-modal="true" aria-label={t('confirm.title')}>
          <div className="ql-modal-head">
            <h2 className="ql-modal-title">{t('confirm.title')}</h2>
          </div>
          <div className="ql-modal-body">
            <p className="ql-dialog-text">{t('confirm.body', { name: shortcut.name })}</p>
            {error !== '' && (
              <p className="ql-field-error" role="alert">
                {error}
              </p>
            )}
          </div>
          <div className="ql-modal-foot">
            <button type="button" className="ql-button" onClick={onCancel} disabled={deleting}>
              {t('confirm.cancel')}
            </button>
            <button
              type="button"
              className="ql-button ql-button-danger"
              data-testid="ql-confirm-delete"
              onClick={() => void confirm()}
              disabled={deleting}
            >
              {deleting ? t('confirm.deleting') : t('confirm.confirm')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * 主页面。
   * @param {object} props - 插槽属性。
   * @returns {object} 页面元素。
   */
  function Page(props) {
    const t = props.t || boundT;
    const sessionsRef = useRef(null);
    if (sessionsRef.current === null) {
      sessionsRef.current = createTerminalSessions({ Terminal, FitAddon });
    }
    const sessions = sessionsRef.current;
    const hostRef = useRef(null);
    const workspaceRef = useRef(null);
    const notifyRef = useRef(() => {});
    const createTerminalRef = useRef(() => {});
    const closeTerminalRef = useRef(() => {});

    const [catalog, setCatalog] = useState({ status: 'loading', shortcuts: [], error: null, blocked: false });
    const [saveError, setSaveError] = useState('');
    const [dialog, setDialog] = useState(null);
    const [toast, setToast] = useState(null);
    const toastTimer = useRef(0);

    const loadShortcuts = useCallback(async () => {
      setCatalog((current) => ({ ...current, status: 'loading' }));
      try {
        const value = await api.listShortcuts();
        setCatalog({
          status: 'ready',
          shortcuts: Array.isArray(value && value.shortcuts) ? value.shortcuts : [],
          error: null,
          blocked: false,
        });
        setSaveError('');
      } catch (error) {
        setCatalog({
          status: 'error',
          shortcuts: [],
          error,
          blocked: error instanceof ApiError && error.code === 'store-corrupt',
        });
      }
    }, []);

    useEffect(() => {
      void loadShortcuts();
    }, [loadShortcuts]);

    useEffect(() => {
      const node = hostRef.current;
      if (!node) return undefined;
      let cancelled = false;
      const workspace = createTerminalWorkspace({
        t,
        sessions,
        notify: (text, tone) => notifyRef.current(text, tone),
        requestNewTerminal: (group) => createTerminalRef.current(group),
        closeTerminal: (id) => closeTerminalRef.current(id),
      });
      workspaceRef.current = workspace;
      workspace.mount(node);
      sessions
        .load()
        .then((terminals) => {
          if (cancelled) return;
          workspace.restore(terminals);
          sessions.openStream();
        })
        .catch(() => undefined);
      return () => {
        cancelled = true;
        workspaceRef.current = null;
        workspace.dispose();
        sessions.dispose();
      };
    }, [sessions]);

    useEffect(() => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    }, []);

    useEffect(() => {
      if (dialog === null) return undefined;
      const onKeyDown = (event) => {
        if (event.key === 'Escape') setDialog(null);
      };
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }, [dialog]);

    const canEdit = catalog.status === 'ready';
    const pickDirectory = getPickDirectory() || null;

    /**
     * 短暂显示一条提示。
     * @param {string} text - 提示文本。
     * @param {'info' | 'error'} [tone] - 语气。
     */
    const showToast = (text, tone = 'info') => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setToast({ text, tone });
      toastTimer.current = setTimeout(() => {
        toastTimer.current = 0;
        setToast(null);
      }, 3000);
    };
    notifyRef.current = showToast;

    /** 打开新增表单。 */
    const openCreate = () => {
      if (!canEdit) return;
      setSaveError('');
      setDialog({ kind: 'form', mode: 'create', index: -1, shortcut: null });
    };

    /**
     * 打开编辑表单。
     * @param {object} shortcut - 要编辑的快捷方式。
     * @param {number} index - 它在列表中的位置。
     */
    const openEdit = (shortcut, index) => {
      if (!canEdit) return;
      setSaveError('');
      setDialog({ kind: 'form', mode: 'edit', index, shortcut });
    };

    /**
     * 打开删除确认。
     * @param {object} shortcut - 要删除的快捷方式。
     */
    const openDelete = (shortcut) => {
      if (!canEdit) return;
      setSaveError('');
      setDialog({ kind: 'delete', shortcut });
    };

    /**
     * 保存表单内容。
     * @param {object} draft - 表单草稿。
     */
    const saveShortcut = async (draft) => {
      if (dialog === null || dialog.kind !== 'form') return;
      const id = dialog.mode === 'edit' ? dialog.shortcut.id : createShortcutId();
      const shortcut = draftToShortcut(draft, id);
      const next =
        dialog.mode === 'edit'
          ? catalog.shortcuts.map((item, index) => (index === dialog.index ? shortcut : item))
          : [...catalog.shortcuts, shortcut];
      try {
        await api.saveShortcuts(next);
      } catch (error) {
        if (!(error instanceof ApiError) || error.fieldErrors.length === 0) {
          setSaveError(describeError(error, t));
        }
        throw error;
      }
      setCatalog({ status: 'ready', shortcuts: next, error: null, blocked: false });
      setSaveError('');
      setDialog(null);
    };

    /** 删除当前确认的快捷方式。 */
    const deleteShortcut = async () => {
      if (dialog === null || dialog.kind !== 'delete') return;
      const next = catalog.shortcuts.filter((item) => item.id !== dialog.shortcut.id);
      try {
        await api.saveShortcuts(next);
      } catch (error) {
        setSaveError(describeError(error, t));
        throw error;
      }
      setCatalog({ status: 'ready', shortcuts: next, error: null, blocked: false });
      setSaveError('');
      setDialog(null);
    };

    /**
     * 执行一条快捷方式。
     * @param {object} shortcut - 快捷方式。
     */
    const runShortcut = async (shortcut) => {
      if (shortcut.type === 'open') {
        try {
          await api.openPath(shortcut.path);
          showToast(t('toast.opened', { name: shortcut.name }));
        } catch (error) {
          showToast(t('toast.openFailed', { name: shortcut.name, message: describeError(error, t) }), 'error');
        }
        return;
      }
      if (sessions.count() >= TERMINAL_LIMIT) {
        showToast(t('toast.terminalLimit', { count: TERMINAL_LIMIT }), 'error');
        return;
      }
      try {
        const meta = await sessions.create({
          kind: 'shortcut',
          name: shortcut.name,
          command: shortcut.command,
          cwd: shortcut.cwd || undefined,
          autoClose: shortcut.autoClose === true,
        });
        workspaceRef.current?.add(meta);
      } catch (error) {
        showToast(t('toast.createFailed', { message: describeError(error, t) }), 'error');
      }
    };

    /**
     * 新建空白终端。
     * @param {object} [group] - 期望落入的分组。
     */
    const newBlankTerminal = async (group) => {
      if (sessions.count() >= TERMINAL_LIMIT) {
        showToast(t('toast.terminalLimit', { count: TERMINAL_LIMIT }), 'error');
        return;
      }
      try {
        const meta = await sessions.create({ kind: 'blank', name: t('dock.blank') });
        workspaceRef.current?.add(meta, group ?? undefined);
      } catch (error) {
        showToast(t('toast.createFailed', { message: describeError(error, t) }), 'error');
      }
    };

    /**
     * 关闭一个终端标签。
     * @param {string} id - 终端 id。
     */
    const closeTerminalTab = async (id) => {
      try {
        await sessions.close(id);
      } catch (error) {
        showToast(t('toast.closeFailed', { message: describeError(error, t) }), 'error');
      }
    };
    createTerminalRef.current = (group) => void newBlankTerminal(group);
    closeTerminalRef.current = (id) => void closeTerminalTab(id);

    let content = null;
    if (catalog.status === 'loading') {
      content = <p className="ql-loading">{t('page.loading')}</p>;
    } else if (catalog.shortcuts.length > 0) {
      content = (
        <ul className="ql-list">
          {catalog.shortcuts.map((shortcut, index) => (
            <ShortcutCard
              key={shortcut.id}
              t={t}
              shortcut={shortcut}
              disabled={!canEdit}
              onRun={() => void runShortcut(shortcut)}
              onEdit={() => openEdit(shortcut, index)}
              onDelete={() => openDelete(shortcut)}
            />
          ))}
        </ul>
      );
    } else if (catalog.status === 'ready') {
      content = (
        <div className="ql-empty" data-testid="ql-empty">
          <span className="ql-empty-icon" aria-hidden="true">
            <Lightning size={34} strokeWidth={1.4} />
          </span>
          <p className="ql-empty-title">{t('empty.title')}</p>
          <p className="ql-empty-hint">{t('empty.hint')}</p>
          <button
            type="button"
            className="ql-button ql-button-primary ql-empty-action"
            onClick={openCreate}
            disabled={!canEdit}
          >
            {t('page.add')}
          </button>
        </div>
      );
    }

    return (
      <div className="ql-page" data-testid="ql-page">
        <style data-plugin-css="dsh-quick-launch-bar">{STYLE_TEXT}</style>
        <aside className="ql-side">
          <div className="ql-side-head">
            <h1 className="ql-title">{t('page.title')}</h1>
            <button
              type="button"
              className="ql-button ql-button-primary"
              data-testid="ql-add"
              onClick={openCreate}
              disabled={!canEdit}
            >
              {t('page.add')}
            </button>
          </div>
          <div className="ql-side-body">
            {catalog.error !== null && catalog.error !== undefined && (
              <div className="ql-error" role="alert">
                <span className="ql-error-text">
                  {catalog.blocked
                    ? t('store.corrupt')
                    : `${t('error.load')}：${describeError(catalog.error, t)}`}
                </span>
                <button type="button" className="ql-button ql-button-small" onClick={() => void loadShortcuts()}>
                  {t('error.retry')}
                </button>
              </div>
            )}
            {saveError !== '' && (
              <div className="ql-error" role="alert">
                <span className="ql-error-text">
                  {t('error.save')}：{saveError}
                </span>
              </div>
            )}
            {content}
          </div>
        </aside>
        <section className="ql-workspace">
          <div className="ql-workspace-host" data-testid="ql-workspace" ref={hostRef} />
        </section>
        {toast !== null && (
          <div className="ql-toast" data-testid="ql-toast" data-tone={toast.tone} role="status">
            <span className="ql-toast-dot" aria-hidden="true" />
            <span>{toast.text}</span>
          </div>
        )}
        {dialog !== null && dialog.kind === 'form' && (
          <ShortcutForm
            key={dialog.mode === 'edit' ? dialog.shortcut.id : 'create'}
            t={t}
            mode={dialog.mode}
            initial={dialog.shortcut}
            pickDirectory={pickDirectory}
            onCancel={() => setDialog(null)}
            onSubmit={saveShortcut}
          />
        )}
        {dialog !== null && dialog.kind === 'delete' && (
          <DeleteDialog
            t={t}
            shortcut={dialog.shortcut}
            onCancel={() => setDialog(null)}
            onConfirm={deleteShortcut}
          />
        )}
      </div>
    );
  }

  return Page;
}

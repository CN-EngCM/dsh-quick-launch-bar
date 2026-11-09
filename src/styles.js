/**
 * 页面样式。颜色、边框、圆角与阴影全部取自 DSH 主题变量，
 * 明暗主题切换时无需重新渲染样式。
 */
export const PAGE_CSS = `
.ql-page {
  --ql-inset: 16px;
  --ql-side-width: 280px;
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 0;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-base);
  font-size: 14px;
  line-height: 1.6;
  overflow: hidden;
  container-type: inline-size;
}

.ql-page :focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.ql-side {
  display: flex;
  flex: none;
  flex-direction: column;
  box-sizing: border-box;
  width: var(--ql-side-width);
  min-height: 0;
  border-right: .5px solid var(--dsw-alias-border-l3);
  background: var(--dsw-alias-bg-base);
}

@container (width <= 760px) {
  .ql-page {
    --ql-side-width: 220px;
  }
}

.ql-side-head {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 18px 14px 10px;
}

.ql-title {
  margin: 0;
  overflow: hidden;
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ql-side-head .ql-button {
  flex: none;
}

.ql-side-body {
  flex: 1;
  min-height: 0;
  padding: 0 10px 16px;
  overflow: auto;
  scrollbar-gutter: stable;
}

.ql-workspace {
  position: relative;
  flex: 1;
  min-width: 0;
  min-height: 0;
  background: var(--dsw-alias-bg-base);
}

.ql-workspace-host {
  position: absolute;
  inset: 0;
  box-sizing: border-box;
}

.ql-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ql-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  min-width: 0;
  padding: 8px;
  border-radius: var(--dsw-radius-md);
  transition: background-color .12s;
}

@media (hover: hover) {
  .ql-card:hover {
    background: var(--dsw-alias-interactive-bg-hover);
  }
}

.ql-card-open {
  position: absolute;
  inset: 0;
  z-index: 1;
  padding: 0;
  border: 0;
  border-radius: inherit;
  background: none;
  cursor: pointer;
}

.ql-card-open:focus-visible {
  outline-offset: -2px;
}

.ql-card-icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--dsw-radius-sm);
  color: var(--dsw-alias-label-secondary);
  pointer-events: none;
}

.ql-card-main {
  position: relative;
  z-index: 2;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
  pointer-events: none;
}

.ql-card-name {
  overflow: hidden;
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  font-weight: 500;
  line-height: 19px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ql-card-target {
  overflow: hidden;
  color: var(--dsw-alias-label-tertiary);
  font-size: 11.5px;
  line-height: 17px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ql-card-actions {
  position: relative;
  z-index: 3;
  display: flex;
  flex: none;
  align-items: center;
  gap: 2px;
  opacity: 0;
  pointer-events: none;
  transition: opacity .12s;
}

@media (hover: hover) {
  .ql-card:hover .ql-card-actions,
  .ql-card:focus-within .ql-card-actions {
    opacity: 1;
    pointer-events: auto;
  }
}

@media (hover: none) {
  .ql-card-actions {
    opacity: 1;
    pointer-events: auto;
  }
}

.ql-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: var(--dsw-radius-sm);
  background: none;
  color: var(--dsw-alias-label-tertiary);
  cursor: pointer;
}

.ql-icon-button:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-active);
  color: var(--dsw-alias-label-primary);
}

.ql-icon-button-danger:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover-danger);
  color: var(--dsw-alias-state-error-primary);
}

.ql-icon-button:disabled {
  opacity: .4;
  cursor: default;
}

.ql-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-sizing: border-box;
  height: 30px;
  padding: 0 12px;
  border: .5px solid var(--dsw-alias-border-l3);
  border-radius: var(--dsw-radius-md);
  background: none;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 13px;
  line-height: 20px;
  white-space: nowrap;
  cursor: pointer;
}

.ql-button:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover);
}

.ql-button:disabled {
  opacity: .5;
  cursor: default;
}

.ql-button-primary {
  border-color: transparent;
  background: var(--dsw-alias-button-primary-fill);
  color: var(--dsw-alias-label-primary-foreground);
}

.ql-button-primary:hover:not(:disabled) {
  background: var(--dsw-alias-button-primary-hover);
}

.ql-button-danger {
  border-color: transparent;
  background: var(--dsw-alias-state-error-primary);
  color: var(--dsw-alias-label-primary-foreground);
}

.ql-button-small {
  height: 26px;
  padding: 0 9px;
  font-size: 12px;
}

.ql-error {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  box-sizing: border-box;
  margin: 0 0 10px;
  padding: 8px 10px;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-interactive-bg-hover-danger, var(--dsw-alias-interactive-bg-hover));
  color: var(--dsw-alias-state-error-primary);
  font-size: 12px;
  line-height: 18px;
  overflow-wrap: anywhere;
}

.ql-error-text {
  flex: 1;
  min-width: 0;
  padding-top: 2px;
}

.ql-error .ql-button {
  flex: none;
  margin-left: auto;
}

.ql-loading {
  padding: 32px 0;
  color: var(--dsw-alias-label-tertiary);
  font-size: 12.5px;
  text-align: center;
}

.ql-empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 20px 8px;
  color: var(--dsw-alias-label-tertiary);
}

.ql-empty-icon {
  color: var(--dsw-alias-label-caption);
}

.ql-empty-title {
  margin: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
}

.ql-empty-hint {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.ql-empty-action {
  margin-top: 4px;
}

.ql-toast {
  position: absolute;
  top: 14px;
  right: var(--ql-inset);
  z-index: 1400;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  box-sizing: border-box;
  max-width: min(420px, calc(100% - 2 * var(--ql-inset)));
  padding: 8px 12px;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-toast-bg);
  color: var(--dsw-alias-toast-label);
  box-shadow: var(--dsw-elevation-prominent);
  font-size: 13px;
  line-height: 20px;
  overflow-wrap: anywhere;
  animation: ql-toast-in .14s ease-out;
}

.ql-toast-dot {
  flex: none;
  width: 6px;
  height: 6px;
  margin-top: 6px;
  border-radius: 50%;
  background: var(--dsw-alias-state-success-primary);
}

.ql-toast[data-tone="error"] .ql-toast-dot {
  background: var(--dsw-alias-state-error-primary);
}

@keyframes ql-toast-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.ql-overlay {
  position: fixed;
  inset: 0;
  z-index: 1600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 24px;
  background: var(--dsw-alias-bg-mask-1);
}

.ql-modal {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: min(520px, 100%);
  max-height: calc(100dvh - 48px);
  overflow: hidden;
  border: .5px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-xl);
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: var(--dsw-elevation-prominent);
}

.ql-modal-small {
  width: min(420px, 100%);
}

.ql-modal-head {
  flex: none;
  padding: 18px 20px 6px;
}

.ql-modal-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.ql-modal-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
  padding: 8px 20px 4px;
  overflow-y: auto;
}

.ql-modal-foot {
  display: flex;
  flex: none;
  justify-content: flex-end;
  gap: 8px;
  padding: 18px 20px 20px;
}

.ql-dialog-text {
  margin: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 13px;
  line-height: 20px;
  overflow-wrap: anywhere;
}

.ql-fieldset {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  border: 0;
}

.ql-label,
.ql-legend {
  padding: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 13px;
  line-height: 20px;
}

.ql-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ql-field-hint {
  color: var(--dsw-alias-label-tertiary);
  font-size: 12px;
  line-height: 18px;
}

.ql-field-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
}

.ql-field-row .ql-input {
  flex: 1 1 auto;
  min-width: 0;
}

.ql-input,
.ql-textarea {
  box-sizing: border-box;
  width: 100%;
  border: .5px solid var(--dsw-alias-border-l4);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-layer-3);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 13px;
  outline: none;
  transition: border-color .15s, box-shadow .15s;
}

.ql-input {
  height: 36px;
  padding: 0 12px;
}

.ql-textarea {
  min-height: 84px;
  padding: 8px 12px;
  line-height: 20px;
  resize: vertical;
}

.ql-input::placeholder,
.ql-textarea::placeholder {
  color: var(--dsw-alias-label-caption);
}

.ql-input:focus,
.ql-textarea:focus {
  border-color: var(--dsw-alias-state-business-primary);
  box-shadow: inset 0 0 0 .5px var(--dsw-alias-state-business-primary);
}

.ql-input[aria-invalid="true"],
.ql-textarea[aria-invalid="true"] {
  border-color: var(--dsw-alias-state-error-primary);
  box-shadow: none;
}

.ql-input:disabled,
.ql-textarea:disabled {
  opacity: .55;
}

.ql-field-error {
  margin: 0;
  color: var(--dsw-alias-state-error-primary);
  font-size: 12px;
  line-height: 18px;
}

.ql-radio-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
}

.ql-radio,
.ql-check {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  line-height: 20px;
  cursor: pointer;
}

.ql-radio input,
.ql-check input {
  width: 15px;
  height: 15px;
  margin: 0;
  accent-color: var(--dsw-alias-brand-primary);
  flex: none;
}

/* dockview 主题：所有可见颜色映射到 DSH 主题变量，明暗自动跟随。 */
.ql-term-theme {
  --dv-background-color: var(--dsw-alias-bg-base);
  --dv-group-view-background-color: var(--dsw-alias-bg-base);
  --dv-tabs-and-actions-container-background-color: var(--dsw-alias-bg-layer-1);
  --dv-activegroup-visiblepanel-tab-background-color: var(--dsw-alias-bg-base);
  --dv-activegroup-hiddenpanel-tab-background-color: var(--dsw-alias-bg-layer-1);
  --dv-inactivegroup-visiblepanel-tab-background-color: var(--dsw-alias-bg-layer-1);
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(--dsw-alias-bg-layer-1);
  --dv-activegroup-visiblepanel-tab-color: var(--dsw-alias-label-primary);
  --dv-activegroup-hiddenpanel-tab-color: var(--dsw-alias-label-secondary);
  --dv-inactivegroup-visiblepanel-tab-color: var(--dsw-alias-label-secondary);
  --dv-inactivegroup-hiddenpanel-tab-color: var(--dsw-alias-label-tertiary);
  --dv-tab-divider-color: var(--dsw-alias-border-l1);
  --dv-separator-border: var(--dsw-alias-border-l3);
  --dv-paneview-header-border-color: var(--dsw-alias-border-l2);
  --dv-paneview-active-outline-color: var(--dsw-alias-state-business-primary);
  --dv-drag-over-background-color: var(--dsw-alias-interactive-bg-active);
  --dv-drag-over-border-color: var(--dsw-alias-state-business-primary);
  --dv-edge-dock-indicator-color: var(--dsw-alias-state-business-primary);
  --dv-tabs-container-scrollbar-color: var(--dsw-alias-border-l3);
  --dv-icon-hover-background-color: var(--dsw-alias-interactive-bg-hover);
  --dv-active-sash-color: var(--dsw-alias-state-business-primary);
  --dv-sash-color: transparent;
  --dv-tabs-and-actions-container-font-size: 12px;
  --dv-tabs-and-actions-container-height: 31px;
  --dv-edge-drop-strip-size: 10px;
  --dv-tab-font-size: inherit;
  --dv-tab-margin: 0;
  --dv-tab-border-radius: 0;
  --dv-border-radius: 0;
  --dv-sash-border-radius: 0;
  --dv-dropdown-border-radius: var(--dsw-radius-sm);
  --dv-spacing-padding: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-transition-duration: .1s;
  --dv-active-sash-transition-delay: .5s;
  --dv-floating-group-border: none;
  --dv-floating-border: none;
  --dv-drag-over-border: none;
  --dv-overlay-z-index: 1500;
  --dv-tab-close-icon-size: 12px;
  color-scheme: inherit;
}

.ql-term-theme .dv-dockview {
  --dv-tab-margin: 0;
}

.ql-term-theme .dv-tabs-and-actions-container {
  padding: 0 4px;
}

.ql-term-theme .dv-right-actions-container,
.ql-term-theme .dv-left-actions-container {
  align-items: center;
}

.ql-term-theme .dv-tabs-and-actions-container .dv-tabs-container {
  gap: 2px;
}

.ql-term-theme .dv-tab {
  padding: 0;
  border-radius: var(--dsw-radius-sm) var(--dsw-radius-sm) 0 0;
}

.ql-term-theme .dv-tab:has(> .ql-tab) {
  padding: 0;
}

.ql-tab {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  gap: 6px;
  max-width: 200px;
  height: 100%;
  padding: 0 8px;
  color: inherit;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
}

.ql-tab-dot {
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--dsw-alias-state-success-primary);
}

.ql-tab-dot[data-status="exited"] {
  background: var(--dsw-alias-state-idle-primary);
}

.ql-tab-dot[data-status="failed"] {
  background: var(--dsw-alias-state-error-primary);
}

.ql-tab-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ql-tab-close {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: 0;
  border-radius: var(--dsw-radius-xs);
  background: none;
  color: inherit;
  opacity: .65;
  cursor: pointer;
}

.ql-tab-close:hover {
  background: var(--dsw-alias-interactive-bg-active);
  color: var(--dsw-alias-label-primary);
  opacity: 1;
}

.ql-group-add {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin: 0 2px;
  padding: 0;
  border: 0;
  border-radius: var(--dsw-radius-sm);
  background: none;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
}

.ql-group-add:hover {
  background: var(--dsw-alias-interactive-bg-hover);
  color: var(--dsw-alias-label-primary);
}

.ql-term-pane {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
}

.ql-term-pane .xterm {
  width: 100%;
  height: 100%;
}

.ql-term-pane .xterm-viewport {
  background-color: transparent;
}

.ql-term-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 24px;
  color: var(--dsw-alias-label-tertiary);
  text-align: center;
}

.ql-term-empty-title {
  margin: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
}

.ql-term-empty-hint {
  max-width: 40ch;
  margin: 0;
  font-size: 12.5px;
  line-height: 19px;
}

.ql-term-empty-action {
  margin-top: 6px;
}

@media (prefers-reduced-motion: reduce) {
  .ql-card,
  .ql-card-actions,
  .ql-input,
  .ql-textarea {
    transition: none;
  }

  .ql-toast {
    animation: none;
  }
}
`;

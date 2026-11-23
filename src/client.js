window.__ModuleLoader__.load({
  id: 'dsh-theme-claude',
  factory(require) {
    const React = require('react');
    /* BUILD_TOKENS */
    /* BUILD_CSS */
    /* BUILD_SETTINGS_NAV */
    /* BUILD_SIDEBAR_WORKSPACES */
    /* BUILD_SHORTCUTTER_SEARCH */
    const VERSION = '0.11.9';
    const KEYS = {
      enabled: 'dsh-theme-claude.enabled.v1',
      palette: 'dsh-theme-claude.palette.v2',
      prose: 'dsh-theme-claude.prose.v2',
      chrome: 'dsh-theme-claude.chrome.v1',
    };
    const BODY_ATTRS = [
      'data-dsh-claude-theme',
      'data-claude-palette',
      'data-claude-prose',
      'data-claude-chrome',
      'data-claude-window-inactive',
    ];
    const inject = ['theme', 'slots', 'sessions'];

    // Asymmetric 12-ray organic starburst inspired by Claude Desktop's terracotta emblem.
    const SUNBURST_RAYS = [
      [12, 2.2, 12, 8.6],
      [17.1, 3.6, 13.8, 9.1],
      [20.6, 7.2, 14.9, 10.3],
      [21.8, 12.1, 15.4, 12.0],
      [20.3, 17.0, 14.8, 13.7],
      [16.8, 20.4, 13.7, 14.9],
      [11.9, 21.8, 12.0, 15.4],
      [7.0, 20.4, 10.2, 14.9],
      [3.5, 16.9, 9.1, 13.7],
      [2.2, 11.9, 8.6, 12.0],
      [3.6, 7.0, 9.1, 10.3],
      [7.1, 3.5, 10.3, 9.1],
    ];

    function ClaudeHeroMark({ size = 28 }) {
      const edge = Math.min(Number(size) || 28, 30);
      return React.createElement(
        'svg',
        {
          viewBox: '0 0 24 24',
          width: edge,
          height: edge,
          fill: 'none',
          'aria-hidden': 'true',
          className: 'claude-hero-sunburst',
        },
        ...SUNBURST_RAYS.map(([x1, y1, x2, y2], idx) =>
          React.createElement('line', {
            key: idx,
            x1,
            y1,
            x2,
            y2,
            stroke: 'currentColor',
            strokeWidth: idx % 2 === 0 ? 1.95 : 1.65,
            strokeLinecap: 'round',
          })),
        React.createElement('circle', {
          cx: 12,
          cy: 12,
          r: 2.35,
          fill: 'currentColor',
        }),
      );
    }

    function readPref(key, allowed, fallback) {
      try {
        const raw = localStorage.getItem(key);
        if (allowed.includes(raw)) return raw;
      } catch {}
      return fallback;
    }

    function writePref(key, value) {
      try { localStorage.setItem(key, value); } catch {}
    }

    function apply(ctx) {
      let enabled = true;
      try { enabled = localStorage.getItem(KEYS.enabled) !== 'false'; } catch {}
      let palette = readPref(KEYS.palette, ['neutral', 'warm'], 'neutral');
      let prose = readPref(KEYS.prose, ['sans', 'serif'], 'sans');
      let chrome = readPref(KEYS.chrome, ['claude', 'dsh'], 'claude');

      let releaseTokens = null;
      let appliedPalette = null;
      const subscribers = new Set();
      const style = document.createElement('style');
      style.dataset.dshClaudeStyles = VERSION;
      style.textContent = THEME_CSS;
      const oldAttrs = new Map(BODY_ATTRS.map(name => [name, document.body.getAttribute(name)]));

      function setBodyAttr(name, value) {
        if (document.body.getAttribute(name) === value) return;
        if (value === null) document.body.removeAttribute(name);
        else document.body.setAttribute(name, value);
      }

      function restoreBodyAttrs() {
        for (const [name, prev] of oldAttrs) {
          setBodyAttr(name, prev);
        }
      }

      function syncWindowActivity() {
        if (!enabled) return;
        if (typeof document.hasFocus === 'function' && !document.hasFocus()) {
          setBodyAttr('data-claude-window-inactive', 'true');
        } else {
          setBodyAttr('data-claude-window-inactive', null);
        }
      }

      function sync() {
        if (enabled) {
          setBodyAttr('data-dsh-claude-theme', VERSION);
          setBodyAttr('data-claude-palette', palette);
          setBodyAttr('data-claude-prose', prose);
          setBodyAttr('data-claude-chrome', chrome);
          syncWindowActivity();
          if (!releaseTokens || appliedPalette !== palette) {
            releaseTokens?.();
            releaseTokens = ctx.theme.overrideTokens('dsh-theme-claude', PALETTES[palette] || PALETTES.neutral);
            appliedPalette = palette;
          }
        } else {
          if (releaseTokens) {
            releaseTokens();
            releaseTokens = null;
            appliedPalette = null;
          }
          restoreBodyAttrs();
        }
        for (const subscriber of subscribers) subscriber();
      }

      ctx.effect(() => {
        document.head.append(style);
        const canListenFocus = typeof window.addEventListener === 'function' && typeof window.removeEventListener === 'function';
        if (canListenFocus) {
          window.addEventListener('focus', syncWindowActivity);
          window.addEventListener('blur', syncWindowActivity);
        }
        sync();
        return () => {
          if (canListenFocus) {
            window.removeEventListener('focus', syncWindowActivity);
            window.removeEventListener('blur', syncWindowActivity);
          }
          releaseTokens?.();
          releaseTokens = null;
          appliedPalette = null;
          style.remove();
          restoreBodyAttrs();
          subscribers.clear();
        };
      }, 'dsh-theme-claude: visual-layer');

      ctx.effect(() => ctx.slots.inject('conversation.hero.brand.mark', () => {
        let unregister = null;
        const syncHeroMark = () => {
          if (enabled && chrome === 'claude') {
            unregister ??= ctx.slots.register({ name: 'conversation.hero.brand.mark' }, ClaudeHeroMark);
          } else if (unregister) {
            unregister();
            unregister = null;
          }
        };
        subscribers.add(syncHeroMark);
        syncHeroMark();
        return () => {
          subscribers.delete(syncHeroMark);
          unregister?.();
          unregister = null;
        };
      }), 'dsh-theme-claude: hero-mark');

      ctx.effect(() => {
        let disposeSearch = null;
        const syncShortcutterSearch = () => {
          if (enabled && chrome === 'claude') {
            disposeSearch ??= observeShortcutterSearch(document, () => ctx.sessions?.list?.getSnapshot?.());
          } else if (disposeSearch) {
            disposeSearch();
            disposeSearch = null;
          }
        };
        subscribers.add(syncShortcutterSearch);
        syncShortcutterSearch();
        return () => {
          subscribers.delete(syncShortcutterSearch);
          disposeSearch?.();
          disposeSearch = null;
        };
      }, 'dsh-theme-claude: shortcutter-search');

      function renderRow(title, desc, control) {
        return React.createElement('div', { className: 'claude-theme-row' },
          React.createElement('div', { className: 'claude-theme-row-meta' },
            React.createElement('span', { className: 'claude-theme-row-title' }, title),
            desc ? React.createElement('span', { className: 'claude-theme-row-desc' }, desc) : null),
          control);
      }

      function renderSegmented(label, value, options, onSelect, isDisabled = false) {
        return React.createElement('div', { className: 'claude-theme-segmented', role: 'group', 'aria-label': label },
          ...options.map(([id, text]) =>
            React.createElement('button', {
              key: id,
              type: 'button',
              disabled: isDisabled,
              'aria-pressed': value === id,
              onClick: () => onSelect(id),
            }, text)));
      }

      function Settings({ view } = {}) {
        if (view === 'summary') return 'Claude 风格的字体、配色与界面细节';
        return React.createElement(SettingsControls);
      }

      function SettingsControls() {
        const [, refresh] = React.useReducer(n => n + 1, 0);
        React.useEffect(() => {
          subscribers.add(refresh);
          const dispose = ctx.on('theme/change', refresh);
          return () => { subscribers.delete(refresh); dispose(); };
        }, []);
        const preference = ctx.theme.getTheme().preference;

        return React.createElement('section', { className: 'claude-theme-settings' },
          React.createElement('h3', null, '外观细节'),
          React.createElement('p', null, '调整主题、色温和回复字体。会话字号与键盘快捷键可在通用设置中修改。'),
          React.createElement('div', { className: 'claude-theme-rows' },
            renderRow(
              '启用 Claude 主题',
              '关闭后立即恢复 DSH 默认外观',
              React.createElement('button', {
                type: 'button',
                role: 'switch',
                className: 'claude-theme-switch',
                'aria-label': '启用 Claude 主题',
                'aria-checked': enabled,
                onClick: () => {
                  enabled = !enabled;
                  writePref(KEYS.enabled, String(enabled));
                  sync();
                },
              }, React.createElement('span', { className: 'claude-theme-switch-thumb' }))),
            renderRow(
              '明暗外观',
              '与 DSH 系统外观实时同步',
              renderSegmented('明暗外观', preference, [['system', '跟随系统'], ['light', '浅色'], ['dark', '深色']], id => ctx.theme.setTheme(id))),
            renderRow(
              '纸张色温',
              'Claude Desktop #FAFAFA/#FFFFFF 浅灰与 #1F1F1F/#191919 深炭，或经典暖纸',
              renderSegmented('纸张色温', palette, [['neutral', '现代浅灰 (默认)'], ['warm', '经典暖纸']], id => {
                if (palette === id) return;
                palette = id;
                writePref(KEYS.palette, id);
                sync();
              }, !enabled)),
            renderRow(
              '回复正文字体',
              '默认采用 Claude Desktop 原生 PingFang SC 无衬线；可选书卷衬线',
              renderSegmented('回复正文字体', prose, [['sans', '无衬线 Sans (默认)'], ['serif', '书卷衬线 Serif']], id => {
                if (prose === id) return;
                prose = id;
                writePref(KEYS.prose, id);
                sync();
              }, !enabled)),
            renderRow(
              '宿主工作区与品牌元素',
              '默认采用 Claude Desktop 全套线性图标、极简侧栏与底部贴合新建会话画布，可随时恢复 DSH 原生图标与布局',
              renderSegmented('宿主工作区与品牌元素', chrome, [['claude', '纯粹克制'], ['dsh', '保留 DSH']], id => {
                if (chrome === id) return;
                chrome = id;
                writePref(KEYS.chrome, id);
                sync();
              }, !enabled))));
      }

      ctx.effect(() => ctx.slots.inject('plugins.bundle.config', () =>
        ctx.slots.register({ name: 'plugins.bundle.config', key: 'dsh-theme-claude' }, Settings)), 'dsh-theme-claude: settings');

      function currentSettingsActions() {
        const owner = ctx.slots.entriesOfSlot('sidebar.settings')
          .find(entry => entry.children?.['settings.section']);
        const store = owner?.store;
        return store && typeof store !== 'function' ? store.create().actions : undefined;
      }

      function SidebarSettingsButton({ wide, t }) {
        const [, refresh] = React.useReducer(n => n + 1, 0);
        React.useEffect(() => {
          subscribers.add(refresh);
          const dispose = ctx.slots.subscribe('sidebar.settings', refresh);
          return () => { subscribers.delete(refresh); dispose(); };
        }, []);
        if (!wide || !enabled || chrome !== 'claude' || typeof currentSettingsActions()?.open !== 'function') return null;
        return React.createElement('button', {
          type: 'button',
          className: 'claude-sidebar-settings-button',
          'aria-label': t('trigger'),
          'aria-haspopup': 'dialog',
          title: t('trigger'),
          // Resolve the live owner at click time, including after host reloads.
          onClick: () => currentSettingsActions()?.open(),
        }, React.createElement('span', { 'aria-hidden': 'true' }));
      }
      ctx.effect(() => ctx.slots.inject('sidebar.footer.action', () =>
        ctx.slots.register({ name: 'sidebar.footer.action', id: 'claude-open-settings', locale: 'settings' }, SidebarSettingsButton)), 'dsh-theme-claude: sidebar settings button');

      function currentWorkspaceOwner() {
        return ctx.slots.entriesOfSlot('sidebar.workspaces')[0];
      }

      function SidebarWorkspacesEnhancer({ wide }) {
        const anchor = React.useRef(null);
        const [, refresh] = React.useReducer(n => n + 1, 0);
        React.useEffect(() => {
          subscribers.add(refresh);
          const dispose = ctx.slots.subscribe('sidebar.workspaces', refresh);
          return () => { subscribers.delete(refresh); dispose(); };
        }, []);
        const active = Boolean(wide && enabled && chrome === 'claude');
        React.useLayoutEffect(() => {
          if (!active) return;
          const sidebarRoot = anchor.current?.closest(':is([class$="_root"], [class*="_root "]):has([data-sidebar-scrollport])');
          if (!sidebarRoot) return;
          return enhanceSidebarWorkspaces(sidebarRoot, currentWorkspaceOwner);
        }, [active]);
        if (!active) return null;
        return React.createElement('span', { ref: anchor, hidden: true });
      }
      ctx.effect(() => ctx.slots.inject('sidebar.footer.action', () =>
        ctx.slots.register({ name: 'sidebar.footer.action', id: 'claude-sidebar-workspaces', order: -100 }, SidebarWorkspacesEnhancer)), 'dsh-theme-claude: sidebar workspaces');

      function SettingsNavigation() {
        const anchor = React.useRef(null);
        const [, refresh] = React.useReducer(n => n + 1, 0);
        React.useEffect(() => {
          subscribers.add(refresh);
          return () => subscribers.delete(refresh);
        }, []);
        React.useLayoutEffect(() => {
          if (!enabled) return;
          const panel = anchor.current?.closest('[data-shortcut-modal="settings"]');
          if (!panel) return;
          return enhanceSettingsNavigation(panel, () => ctx.slots.entries('settings.section')
            .map(entry => ({
              id: entry.options.id ?? '',
              order: entry.options.order ?? 0,
              label: typeof entry.options.label === 'function' ? entry.options.label() : entry.options.label,
            }))
            .sort((a, b) => a.order - b.order));
        }, [enabled]);
        return React.createElement('span', { ref: anchor, hidden: true });
      }
      ctx.effect(() => ctx.slots.inject('settings.action', () =>
        ctx.slots.register({ name: 'settings.action', id: 'claude-settings-navigation', order: -100 }, SettingsNavigation)), 'dsh-theme-claude: settings navigation');
    }

    return { inject, apply };
  },
});

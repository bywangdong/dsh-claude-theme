import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import tokens, { PALETTES } from '../src/tokens.mjs';
import { DSH_ICON_MASKS, INLINE_SVG_MASKS, toDataUri } from '../src/icons.mjs';
import { enhanceSidebarWorkspaces } from '../src/sidebar-workspaces.mjs';
import { observeShortcutterSearch } from '../src/shortcutter-search.mjs';

const root = new URL('../', import.meta.url);
const source = readFileSync(new URL('lib/client.js', root), 'utf8');
execFileSync(process.execPath, ['--check', fileURLToPath(new URL('lib/client.js', root))]);

const warmKeys = Object.keys(PALETTES.warm).sort();
const neutralKeys = Object.keys(PALETTES.neutral).sort();
assert.deepEqual(warmKeys, neutralKeys, 'warm and neutral palettes must define the exact same token keys');
assert.equal(tokens, PALETTES.neutral, 'default export must be the neutral palette');

// Guard palette values; visual fidelity is checked separately against screenshots.
assert.equal(PALETTES.neutral['--dsw-alias-bg-base'].light, '#FFFFFF');
assert.equal(PALETTES.neutral['--dsw-alias-bg-base'].dark, '#191919');
assert.equal(PALETTES.neutral['--dsw-specific-sidebar-fill'].light, '#FAFAFA');
assert.equal(PALETTES.neutral['--dsw-specific-sidebar-fill'].dark, '#1F1F1F');
assert.equal(PALETTES.neutral['--claude-nav-active-bg'].light, '#E4E4E4');
assert.equal(PALETTES.neutral['--claude-nav-active-bg'].dark, '#3F3F3F');
assert.equal(PALETTES.neutral['--claude-prose-strong-weight'].light, '600');
assert.equal(PALETTES.neutral['--claude-prose-strong-weight'].dark, '500');
assert.equal(PALETTES.neutral['--claude-settings-panel-bg'].light, '#FFFFFF');
assert.equal(PALETTES.neutral['--claude-settings-panel-bg'].dark, '#191919');
assert.equal(PALETTES.neutral['--claude-settings-nav-bg'].light, '#FFFFFF');
assert.equal(PALETTES.neutral['--claude-settings-nav-bg'].dark, '#191919');
assert.equal(PALETTES.neutral['--claude-switch-on'].light, '#2A78D6');
assert.equal(PALETTES.neutral['--claude-switch-on'].dark, '#3987E5');

for (const [paletteName, map] of Object.entries(PALETTES)) {
  for (const [name, values] of Object.entries(map)) {
    assert.match(name, /^--[a-z][a-z0-9-]+$/, `${paletteName}.${name}: invalid CSS variable name`);
    assert.equal(typeof values.light, 'string', `${paletteName}.${name}: light is required`);
    assert.equal(typeof values.dark, 'string', `${paletteName}.${name}: dark is required`);
  }
}

// Validate all 106 DSH icon family SVG masks and 62 inline UI glyph masks
const iconNames = Object.keys(DSH_ICON_MASKS);
assert.equal(iconNames.length, 106, 'DSH_ICON_MASKS must cover all 106 DSH icon families');
for (const [name, svg] of Object.entries(DSH_ICON_MASKS)) {
  assert.match(svg, /^<svg xmlns='http:\/\/www\.w3\.org\/2000\/svg' viewBox='[^']+'[\s\S]*<\/svg>$/, `${name}: invalid SVG root`);
  assert.ok(!svg.includes('"'), `${name}: use single quotes inside SVG markup for clean CSS data URI embedding`);
  const uri = toDataUri(svg);
  assert.ok(!uri.includes('#'), `${name}: data URI must percent-encode #`);
}
assert.equal(INLINE_SVG_MASKS.length, 62, 'INLINE_SVG_MASKS must cover all 62 active DSH inline & FileTypeIcon SVGs');
for (const { selector, svg } of INLINE_SVG_MASKS) {
  assert.match(svg, /^<svg xmlns='http:\/\/www\.w3\.org\/2000\/svg' viewBox='[^']+'[\s\S]*<\/svg>$/, `${selector}: invalid SVG root`);
  assert.ok(!svg.includes('"'), `${selector}: use single quotes inside SVG markup for clean CSS data URI embedding`);
}

let injectedCss = '';
// Exercise the real emitted plugin's mount/dispose behavior, including stored preferences, window blur/focus dimming, and clean unload.
for (const scenario of [
  { disabled: false, palette: null, prose: null, chrome: null, expectPalette: 'neutral', expectProse: 'sans', expectChrome: 'claude', expectHeroMark: true },
  { disabled: false, palette: 'warm', prose: 'serif', chrome: 'dsh', expectPalette: 'warm', expectProse: 'serif', expectChrome: 'dsh', expectHeroMark: false },
  { disabled: true, palette: 'warm', prose: 'serif', chrome: 'claude', expectPalette: 'warm', expectProse: 'serif', expectChrome: 'claude', expectHeroMark: false },
]) {
  const effects = [], componentEffects = [], bodyWrites = [], attrs = new Map(), styles = new Set(), layers = new Map(), registeredSlots = new Map(), windowListeners = new Map(), slotSubscriptions = new Set(), themeSubscriptions = new Set();
  let settingsOpens = 0;
  let settingsOwners = [{ children: { 'settings.trigger': {} }, store: { create: () => ({ actions: { open: () => settingsOpens++ } }) } }];
  let plugin;
  let focused = true;
  const storage = new Map();
  if (scenario.disabled) storage.set('dsh-theme-claude.enabled.v1', 'false');
  if (scenario.palette) storage.set('dsh-theme-claude.palette.v2', scenario.palette);
  if (scenario.prose) storage.set('dsh-theme-claude.prose.v2', scenario.prose);
  if (scenario.chrome) storage.set('dsh-theme-claude.chrome.v1', scenario.chrome);

  const document = {
    hasFocus: () => focused,
    body: {
      getAttribute: k => attrs.get(k) ?? null,
      setAttribute: (k, v) => { bodyWrites.push(k); attrs.set(k, v); },
      removeAttribute: k => { bodyWrites.push(k); attrs.delete(k); },
    },
    head: { append: element => { styles.add(element); if (!injectedCss && element.textContent) injectedCss = element.textContent; } },
    createElement: () => { const element = { dataset: {}, textContent: '', remove: () => styles.delete(element) }; return element; },
  };
  const windowObj = {
    addEventListener(type, fn) {
      if (!windowListeners.has(type)) windowListeners.set(type, new Set());
      windowListeners.get(type).add(fn);
    },
    removeEventListener(type, fn) {
      const set = windowListeners.get(type);
      if (set) {
        set.delete(fn);
        if (set.size === 0) windowListeners.delete(type);
      }
    },
    __ModuleLoader__: {
      load(def) {
        plugin = def.factory(() => ({
          createElement: (tag, props, ...children) => ({ tag, props, children }),
          useRef: initial => ({ current: initial }),
          useReducer: () => [0, () => {}],
          useEffect: fn => { const dispose = fn(); if (dispose) componentEffects.push(dispose); },
          useLayoutEffect: fn => { const dispose = fn(); if (dispose) componentEffects.push(dispose); },
        }));
      },
    },
  };
  const workspaceOwners = [{ store: { create: () => ({ getSnapshot: () => ({ groupBy: 'workspace', orderBy: 'updated', archivedFilter: 'default' }), actions: {} }) } }];
  const context = {
    effect(fn) { const dispose = fn(); if (dispose) effects.push(dispose); },
    on(name, fn) {
      assert.equal(name, 'theme/change');
      themeSubscriptions.add(fn);
      return () => themeSubscriptions.delete(fn);
    },
    theme: {
      getTheme: () => ({ preference: 'system' }),
      overrideTokens(id, value) { layers.set(id, value); return () => layers.delete(id); },
    },
    slots: {
      inject(_name, fn) { return fn(); },
      entriesOfSlot(name) {
        assert.ok(name === 'sidebar.settings' || name === 'sidebar.workspaces', `unexpected slot lookup: ${name}`);
        return name === 'sidebar.settings' ? settingsOwners : workspaceOwners;
      },
      subscribe(name, fn) {
        assert.ok(name === 'sidebar.settings' || name === 'sidebar.workspaces', `unexpected slot subscribe: ${name}`);
        slotSubscriptions.add(fn);
        return () => slotSubscriptions.delete(fn);
      },
      register(spec, comp) {
        const slotKey = spec.id ? `${spec.name}:${spec.id}` : spec.name;
        registeredSlots.set(slotKey, comp);
        return () => registeredSlots.delete(slotKey);
      },
    },
  };
  vm.runInNewContext(source, {
    window: windowObj,
    document,
    localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v) },
  });
  plugin.apply(context);
  assert.equal(styles.size, 1);
  assert.equal(layers.size, scenario.disabled ? 0 : 1);
  assert.equal(attrs.has('data-dsh-claude-theme'), !scenario.disabled);
  assert.equal(registeredSlots.has('conversation.hero.brand.mark'), scenario.expectHeroMark);
  if (scenario.expectHeroMark) {
    const svg = registeredSlots.get('conversation.hero.brand.mark')({ size: 34 });
    assert.equal(svg.tag, 'svg');
    assert.equal(svg.props.className, 'claude-hero-sunburst');
  }
  if (!scenario.disabled) {
    assert.equal(attrs.get('data-dsh-claude-theme'), '0.12.1');
    assert.equal(attrs.get('data-claude-palette'), scenario.expectPalette);
    assert.equal(attrs.get('data-claude-prose'), scenario.expectProse);
    assert.equal(attrs.get('data-claude-chrome'), scenario.expectChrome);
    assert.equal(attrs.has('data-claude-window-inactive'), false);
    assert.equal(layers.get('dsh-theme-claude')['--dsw-alias-bg-base'].light, PALETTES[scenario.expectPalette]['--dsw-alias-bg-base'].light);
    // Simulate window blur -> inactive sidebar dimming -> focus -> active -> blur before unload
    focused = false;
    for (const fn of windowListeners.get('blur') ?? []) fn();
    assert.equal(attrs.get('data-claude-window-inactive'), 'true');
    const afterBlurWrites = bodyWrites.length;
    for (const fn of windowListeners.get('blur') ?? []) fn();
    assert.equal(bodyWrites.length, afterBlurWrites, 'repeated focus state must not rewrite body attributes');
    focused = true;
    for (const fn of windowListeners.get('focus') ?? []) fn();
    assert.equal(attrs.has('data-claude-window-inactive'), false);
    focused = false;
    for (const fn of windowListeners.get('blur') ?? []) fn();
    assert.equal(attrs.get('data-claude-window-inactive'), 'true');
  } else {
    assert.equal(attrs.size, 0, 'disabled startup must not dirty body attributes');
  }
  const ThemeSettings = registeredSlots.get('plugins.bundle.config');
  assert.equal(typeof ThemeSettings({ view: 'summary' }), 'string');
  assert.equal(themeSubscriptions.size, 0, 'static plugin summary must not subscribe to theme changes');
  const controls = ThemeSettings({});
  const controlsTree = controls.tag();
  const buttons = [];
  const visit = node => {
    if (!node || typeof node !== 'object') return;
    if (node.tag === 'button') buttons.push(node);
    node.children?.forEach(visit);
  };
  visit(controlsTree);
  const selectedPreferences = buttons.filter(node => node.props['aria-pressed'] && node.children[0] !== '跟随系统');
  const beforeSamePreference = bodyWrites.length;
  for (const button of selectedPreferences) button.props.onClick();
  assert.equal(bodyWrites.length, beforeSamePreference, 'selecting an unchanged preference must do no theme DOM writes');
  // The visible cog must open the live settings owner directly, without an account-menu click.
  const FooterButton = registeredSlots.get('sidebar.footer.action:claude-open-settings');
  const WorkspacesEnhancer = registeredSlots.get('sidebar.footer.action:claude-sidebar-workspaces');
  assert.equal(typeof WorkspacesEnhancer, 'function');
  const enhancerNode = WorkspacesEnhancer({ wide: true });
  if (!scenario.disabled && scenario.expectChrome === 'claude') {
    assert.equal(enhancerNode.tag, 'span');
    assert.equal(enhancerNode.props.hidden, true);
  } else {
    assert.equal(enhancerNode, null, 'disabled and native DSH chrome must not mount sidebar workspace enhancer');
  }
  assert.equal(WorkspacesEnhancer({ wide: false }), null, 'collapsed sidebar must not mount wide workspace enhancer');
  const footer = FooterButton({ wide: true, t: key => key === 'trigger' ? 'Settings' : key });
  if (!scenario.disabled && scenario.expectChrome === 'claude') {
    assert.equal(footer.tag, 'button');
    assert.equal(footer.props['aria-label'], 'Settings');
    assert.equal(footer.props['aria-haspopup'], 'dialog');
    footer.props.onClick();
    assert.equal(settingsOpens, 1);
    let replacementOpens = 0;
    settingsOwners = [{ children: { 'settings.section': {} }, store: { create: () => ({ actions: { open: () => replacementOpens++ } }) } }];
    footer.props.onClick();
    assert.equal(replacementOpens, 1, 'click must resolve the current owner after host reloads');
    assert.equal(settingsOpens, 1, 'stale settings owner must not receive later clicks');
    settingsOwners = [];
    assert.doesNotThrow(() => footer.props.onClick());
    assert.equal(FooterButton({ wide: true, t: () => 'Settings' }), null, 'hide the action when settings is unavailable');
  } else {
    assert.equal(footer, null, 'disabled and native DSH chrome must not add a footer action');
  }
  assert.equal(FooterButton({ wide: false, t: () => 'Settings' }), null, 'collapsed sidebar retains its native launcher');
  for (const dispose of componentEffects.reverse()) dispose();
  assert.equal(slotSubscriptions.size, 0, 'footer owner subscription must be removed on unmount');
  assert.equal(themeSubscriptions.size, 0, 'settings theme subscription must be removed on unmount');
  for (const dispose of effects.reverse()) dispose();
  assert.equal(styles.size, 0, 'theme stylesheet must be removed on unload');
  assert.equal(layers.size, 0, 'override layer must be removed on unload');
  assert.equal(attrs.size, 0, 'all theme attributes must be removed on unload');
  assert.equal(registeredSlots.size, 0, 'all slot registrations must be removed on unload');
  assert.equal(windowListeners.size, 0, 'all window focus/blur listeners must be removed on unload');
}

assert.ok(
  !source.includes('BUILD_CSS')
  && !source.includes('BUILD_TOKENS')
  && !source.includes('BUILD_SETTINGS_NAV')
  && !source.includes('BUILD_SIDEBAR_WORKSPACES')
  && !source.includes('BUILD_SHORTCUTTER_SEARCH'),
);
assert.equal(typeof enhanceSidebarWorkspaces, 'function');
assert.equal(typeof observeShortcutterSearch, 'function');
assert.equal(PALETTES.neutral['--claude-cmdk-bg'].dark, '#303030');
assert.equal(PALETTES.neutral['--claude-cmdk-selected-bg'].dark, '#4F4F4F');
for (const marker of [
  'PingFang SC',
  '--dsh-font-family-text',
  '--dsh-font-family-code',
  '--dsh-hairline-width',
  '--dsw-font-markdown-table:',
  '--claude-prose-strong-weight',
  '[data-claude-window-inactive="true"]',
  'data-row-key^="workspace:"',
  'data-row-key^="session:"',
  'data-sidebar-workspace-header',
  '_searchExpanded',
  '_searchResultRow',
  'claude-sidebar-search-row',
  'claude-workspace-sort-btn',
  'claude-workspace-sort-menu',
  '--claude-workspace-sort-icon',
  'data-claude-sort-open="true"',
  'dialog.sc-session-search',
  '--claude-cmdk-bg',
  '--claude-code-session-icon',
  '--claude-return-enter-icon',
  'data-claude-reltime',
  'data-sidebar-scrollport',
  'data-content-phase="hero"',
  'canvas[data-home-whale]',
  '[data-sidebar-right-guide]',
  '[data-shortcut-modal="settings"]',
  '[data-claude-settings-id="remote-connection"]',
  'body[data-ds-dark-theme][data-dsh-claude-theme] [data-shortcut-modal="settings"] select',
  'grid-template-rows: 44px minmax(0, 1fr)',
  '--claude-settings-panel-bg',
  '--claude-settings-nav-bg',
  '--claude-settings-field-bg',
  'button[role="switch"]:is([class$="_switch"], [class*="_switch "])',
  ':is([class$="_markdown"], [class*="_markdown "]):not(svg)',
  ':is([class$="_tabActive"], [class*="_tabActive "])',
  ':is([class$="_dialog"], [class*="_dialog "])',
  '_rowResting',
  '_headerBlank',
  '--claude-icon:',
  '--claude-pkg-icon:',
  '--dsh-file-type-icon-color:',
  'M2.80078 10.2112',
  'M8.48924 28H19.5108',
  'M14 6.68994V4',
  'M8 4.5V10',
  'M5.5 1.5H3',
]) {
  assert.ok(injectedCss.includes(marker), `emitted CSS must include 0.12.1 semantic selector marker: ${marker}`);
}
assert.ok(!injectedCss.includes('html[data-theme="dark"]'), 'must use body[data-ds-dark-theme], not html[data-theme="dark"]');
assert.ok(!injectedCss.includes('_1wejo_'), 'must not hardcode legacy Vite CSS module hashes');
assert.ok(!injectedCss.includes('[data-clipped]'), 'must not retain removed workspace data-clipped hook');
assert.ok(
  injectedCss.includes('[data-sidebar-workspace-header][data-claude-ws-header="flat"]'),
  'flat/empty mode must keep workspace header reachable when no workspace rows are rendered',
);
assert.ok(
  source.includes('svg[data-icon^="dsw-icon-project-add-"]')
  && !source.includes('_headerActions "]) button:not([aria-haspopup])'),
  'Add workspace lookup must target project-add icon / direct child and not match ViewOptionsMenu',
);
assert.ok(
  injectedCss.includes('dsw-icon-sliders-two-outline-'),
  'flat-mode workspace header sort icon rule must match ViewOptionsMenu without relying solely on aria-haspopup',
);
assert.ok(
  !/body\[[^\]]*\](?::not\([^)]*\))*:has\(/.test(injectedCss),
  'never place :has() directly on body (triggers full-document style recalculation on every DOM mutation)',
);
assert.ok(
  !/\[data-sidebar-scrollport\][^{]*_root[^{]*:has\(/.test(injectedCss),
  'never place subtree :has() on WorkspaceBrowser _root (triggers full-sidebar style recalculation on every session update)',
);

for (const name of iconNames) {
  assert.ok(injectedCss.includes(`dsw-icon-${name}-regular`), `missing regular icon rule: ${name}`);
  assert.ok(injectedCss.includes(`dsw-icon-${name}-medium`), `missing medium icon rule: ${name}`);
}

// Performance regression: shared icon rules must reject ordinary HTML and the
// 204 non-rendering symbols in DSH's sprite registry before the large matcher.
const sharedIconsStart = injectedCss.indexOf('/* Auto-generated Claude Desktop Icon Pack');
const sharedIconsEnd = injectedCss.indexOf('{ --claude-icon:', sharedIconsStart);
const sharedIconRules = injectedCss.slice(sharedIconsStart, sharedIconsEnd);
assert.equal((sharedIconRules.match(/:where\(svg\):is\(/g) ?? []).length, 2, 'shared icon matching must be gated by the SVG tag');
assert.ok(!/\)\s*>\s*\*/.test(sharedIconRules), 'icon child rules must not consider every HTML element');
assert.ok(!/>\s*:where\([^)]*\bsymbol\b/.test(sharedIconRules), 'sprite definitions must stay outside the icon child matcher');

// Guard against '>' across DSH <span data-slot="..."> boundaries!
assert.ok(!/_sidebarCol["\]\s)]*>\s*:is\(\[class\$="_root"/.test(injectedCss), 'must never use > between _sidebarCol and _root (broken by <span data-slot="sidebar">)');
assert.ok(!/_newSessionRow["\]\s)]*>\s*button/.test(injectedCss), 'must never use > between _newSessionRow and button (broken by <span data-slot="sidebar.session.action">)');
assert.ok(!/_fishHitbox["\]\s)]*>\s*svg/.test(injectedCss), 'must never use > between _fishHitbox and svg (broken by <span data-slot="conversation.hero.brand.mark">)');
assert.ok(!/_composerHero["\]\s)]*>\s*:is\(\[class\$="_root"/.test(injectedCss), 'must never use > between _composerHero and _root (broken by <span data-slot>)');

// Guard against unanchored [class*="_foo"] substring collisions and legacy Vite [class*="_foo_"] patterns (DSH 0.2.3+ emits <hash>_foo)
const rawClassContains = [...injectedCss.matchAll(/\[class\*="([^"]+)"\]/g)].map(m => m[1]);
for (const pat of rawClassContains) {
  assert.ok(
    pat.endsWith(' '),
    `ambiguous or legacy [class*="${pat}"] selector is forbidden; use :is([class$="_foo"], [class*="_foo "])`,
  );
}

// Validate DSH 0.2.3+ native manifest icon and localized meta files
const pkgJson = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'));
assert.equal(pkgJson.version, '0.12.1');
assert.equal(pkgJson.icon, './icon.svg');
assert.equal(pkgJson.dsh?.manifestVersion, 1);
const iconSvg = readFileSync(new URL('icon.svg', root), 'utf8');
assert.match(iconSvg, /^<svg\b[^>]*viewBox="0 0 36 36"[\s\S]*<\/svg>\s*$/);
for (const loc of ['en', 'zh']) {
  const meta = JSON.parse(readFileSync(new URL(`locale/${loc}.json`, root), 'utf8')).meta;
  assert.equal(typeof meta?.title, 'string');
  assert.equal(typeof meta?.description, 'string');
  assert.equal(meta?.detail, 'README.md');
}

assert.ok(!/https?:\/\/|fetch\(|XMLHttpRequest/.test(source.replaceAll('http://www.w3.org/2000/svg', '')), 'theme must be offline and self contained');
console.log('PASS: emitted 0.12.1 JS, palette completeness, semantic CSS, 106 icon families + 62 inline glyphs, DSH 0.2.3 manifest/locale metadata, saved preferences, slot/style lifecycle and offline bundle. Visual acceptance is recorded separately in design-qa.md.');

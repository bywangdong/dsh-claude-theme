import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import tokens, { PALETTES } from '../src/tokens.mjs';
import { DSH_ICON_MASKS, INLINE_SVG_MASKS, toDataUri } from '../src/icons.mjs';

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

// Validate all 102 DSH icon family SVG masks and 64 inline UI glyph masks
const iconNames = Object.keys(DSH_ICON_MASKS);
assert.equal(iconNames.length, 102, 'DSH_ICON_MASKS must cover all 102 DSH icon families');
for (const [name, svg] of Object.entries(DSH_ICON_MASKS)) {
  assert.match(svg, /^<svg xmlns='http:\/\/www\.w3\.org\/2000\/svg' viewBox='[^']+'[\s\S]*<\/svg>$/, `${name}: invalid SVG root`);
  assert.ok(!svg.includes('"'), `${name}: use single quotes inside SVG markup for clean CSS data URI embedding`);
  const uri = toDataUri(svg);
  assert.ok(!uri.includes('#'), `${name}: data URI must percent-encode #`);
}
assert.equal(INLINE_SVG_MASKS.length, 64, 'INLINE_SVG_MASKS must cover all 64 DSH inline & FileTypeIcon SVGs');
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
  const effects = [], attrs = new Map(), styles = new Set(), layers = new Map(), registeredSlots = new Map(), windowListeners = new Map();
  let plugin;
  let focused = true;
  const storage = new Map();
  if (scenario.disabled) storage.set('dsh-theme-claude.enabled.v1', 'false');
  if (scenario.palette) storage.set('dsh-theme-claude.palette.v2', scenario.palette);
  if (scenario.prose) storage.set('dsh-theme-claude.prose.v2', scenario.prose);
  if (scenario.chrome) storage.set('dsh-theme-claude.chrome.v1', scenario.chrome);

  const document = {
    hasFocus: () => focused,
    body: { getAttribute: k => attrs.get(k) ?? null, setAttribute: (k, v) => attrs.set(k, v), removeAttribute: k => attrs.delete(k) },
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
        plugin = def.factory(() => ({ createElement: (tag, props, ...children) => ({ tag, props, children }) }));
      },
    },
  };
  const context = {
    effect(fn) { const dispose = fn(); if (dispose) effects.push(dispose); },
    theme: { overrideTokens(id, value) { layers.set(id, value); return () => layers.delete(id); } },
    slots: {
      inject(_name, fn) { return fn(); },
      register(spec, comp) {
        registeredSlots.set(spec.name, comp);
        return () => registeredSlots.delete(spec.name);
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
    assert.equal(attrs.get('data-dsh-claude-theme'), '0.11.0');
    assert.equal(attrs.get('data-claude-palette'), scenario.expectPalette);
    assert.equal(attrs.get('data-claude-prose'), scenario.expectProse);
    assert.equal(attrs.get('data-claude-chrome'), scenario.expectChrome);
    assert.equal(attrs.has('data-claude-window-inactive'), false);
    assert.equal(layers.get('dsh-theme-claude')['--dsw-alias-bg-base'].light, PALETTES[scenario.expectPalette]['--dsw-alias-bg-base'].light);
    // Simulate window blur -> inactive sidebar dimming -> focus -> active -> blur before unload
    focused = false;
    for (const fn of windowListeners.get('blur') ?? []) fn();
    assert.equal(attrs.get('data-claude-window-inactive'), 'true');
    focused = true;
    for (const fn of windowListeners.get('focus') ?? []) fn();
    assert.equal(attrs.has('data-claude-window-inactive'), false);
    focused = false;
    for (const fn of windowListeners.get('blur') ?? []) fn();
    assert.equal(attrs.get('data-claude-window-inactive'), 'true');
  } else {
    assert.equal(attrs.size, 0, 'disabled startup must not dirty body attributes');
  }
  for (const dispose of effects.reverse()) dispose();
  assert.equal(styles.size, 0, 'theme stylesheet must be removed on unload');
  assert.equal(layers.size, 0, 'override layer must be removed on unload');
  assert.equal(attrs.size, 0, 'all theme attributes must be removed on unload');
  assert.equal(registeredSlots.size, 0, 'all slot registrations must be removed on unload');
  assert.equal(windowListeners.size, 0, 'all window focus/blur listeners must be removed on unload');
}

assert.ok(!source.includes('BUILD_CSS') && !source.includes('BUILD_TOKENS') && !source.includes('BUILD_SETTINGS_NAV'));
for (const marker of [
  'PingFang SC',
  '--dsw-font-markdown-table:',
  '--claude-prose-strong-weight',
  '[data-claude-window-inactive="true"]',
  'data-row-key^="workspace:"',
  'data-row-key^="session:"',
  'data-sidebar-workspace-header',
  'data-sidebar-scrollport',
  'data-content-phase="hero"',
  'canvas[data-home-whale]',
  '[data-sidebar-right-guide]',
  '[data-shortcut-modal="settings"]',
  'grid-template-rows: 44px minmax(0, 1fr)',
  '--claude-settings-panel-bg',
  '--claude-settings-nav-bg',
  '--claude-settings-field-bg',
  'button[role="switch"][class*="_switch_"]',
  '_rowResting',
  '_headerBlank',
  '--claude-icon:',
  '--claude-pkg-icon:',
  '--dsh-file-type-icon-color:',
  'M2.80078 10.2112',
  'M8.48924 28H19.5108',
]) {
  assert.ok(injectedCss.includes(marker), `emitted CSS must include 0.11.0 semantic selector marker: ${marker}`);
}

for (const name of iconNames) {
  assert.ok(injectedCss.includes(`dsw-icon-${name}-regular`), `missing regular icon rule: ${name}`);
  assert.ok(injectedCss.includes(`dsw-icon-${name}-medium`), `missing medium icon rule: ${name}`);
}

// Guard against '>' across DSH <span data-slot="..."> boundaries!
assert.ok(!/_sidebarCol["\]\s)]*>\s*:is\(\[class\$="_root"/.test(injectedCss), 'must never use > between _sidebarCol and _root (broken by <span data-slot="sidebar">)');
assert.ok(!/_newSessionRow["\]\s)]*>\s*button/.test(injectedCss), 'must never use > between _newSessionRow and button (broken by <span data-slot="sidebar.session.action">)');
assert.ok(!/_fishHitbox["\]\s)]*>\s*svg/.test(injectedCss), 'must never use > between _fishHitbox and svg (broken by <span data-slot="conversation.hero.brand.mark">)');

// Guard against unanchored [class*="_foo"] substring collisions (only trailing-space [class*="_foo "] or Vite _foo_ allowed)
const rawClassContains = [...injectedCss.matchAll(/\[class\*="([^"]+)"\]/g)].map(m => m[1]);
for (const pat of rawClassContains) {
  assert.ok(
    pat.endsWith(' ') || (pat.startsWith('_') && pat.endsWith('_')),
    `ambiguous substring selector [class*="${pat}"] is forbidden; use :is([class$="${pat}"], [class*="${pat} "])`,
  );
}

assert.ok(!/https?:\/\/|fetch\(|XMLHttpRequest/.test(source.replaceAll('http://www.w3.org/2000/svg', '')), 'theme must be offline and self contained');
console.log('PASS: emitted 0.11.0 JS, palette completeness, semantic CSS, bundled icons, saved preferences, slot/style lifecycle and offline bundle. Visual acceptance is recorded separately in design-qa.md.');

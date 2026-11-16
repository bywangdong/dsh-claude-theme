import { mkdir, readFile, writeFile } from 'node:fs/promises';
import tokens, { PALETTES } from '../src/tokens.mjs';
import { DSH_ICON_MASKS, INLINE_SVG_MASKS, buildIconCss } from '../src/icons.mjs';
import { buildSettingsIconCss } from '../src/settings-icons.mjs';

const root = new URL('../', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');
const settingsNavigationSource = (await read('src/settings-navigation.mjs')).replace('export function', 'function');
const sidebarWorkspacesSource = (await read('src/sidebar-workspaces.mjs')).replace('export function', 'function');
const shortcutterSearchSource = (await read('src/shortcutter-search.mjs')).replace('export function', 'function');
const css = `${await read('src/theme.css')}\n\n${buildIconCss()}\n\n${buildSettingsIconCss()}\n`;
const client = (await read('src/client.js'))
  .replace('/* BUILD_TOKENS */', () => `const PALETTES = ${JSON.stringify(PALETTES)};`)
  .replace('/* BUILD_SETTINGS_NAV */', () => (settingsNavigationSource))
  .replace('/* BUILD_SIDEBAR_WORKSPACES */', () => (sidebarWorkspacesSource))
  .replace('/* BUILD_SHORTCUTTER_SEARCH */', () => (shortcutterSearchSource))
  .replace('/* BUILD_CSS */', () => `const THEME_CSS = ${JSON.stringify(css)};`);

await mkdir(new URL('lib/', root), { recursive: true });
await mkdir(new URL('dist/', root), { recursive: true });
await writeFile(new URL('lib/client.js', root), client);
await writeFile(new URL('lib/index.js', root), '// Client-only theme. No model tools or host service replacement.\nexport function apply() {}\n');
console.log(
  `Built Claude theme: ${Object.keys(tokens).length} adaptive tokens × ${Object.keys(PALETTES).length} palettes, ${Object.keys(DSH_ICON_MASKS).length} icon families + ${INLINE_SVG_MASKS.length} inline glyphs, ${Buffer.byteLength(client)} bytes.`,
);

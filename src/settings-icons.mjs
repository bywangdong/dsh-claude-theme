import { readFileSync } from 'node:fs';
import { toDataUri } from './icons.mjs';

// Original 20px reference masters, plus Lucide fallbacks for DSH-only items.
// See per-asset provenance and THIRD_PARTY_NOTICES.md.
export function buildSettingsIconCss() {
  const asset = name => toDataUri(readFileSync(new URL(`./assets/${name}.svg`, import.meta.url), 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '').replaceAll('currentColor', 'black')
    .replace('stroke-width="2"', 'stroke-width="1.5"'));
  const sortSvg = toDataUri(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='black' stroke-width='1.35' stroke-linecap='round' stroke-linejoin='round'><path d='M5.05 2.4v9.7M2.5 4.95L5.05 2.4 7.6 4.95M10.95 3.9v9.7M8.4 11.05l2.55 2.55 2.55-2.55'/></svg>`,
  );
  const plusSvg = toDataUri(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='black' stroke-width='1.35' stroke-linecap='round' stroke-linejoin='round'><path d='M8 2.45v11.1M2.45 8h11.1'/></svg>`,
  );
  const checkSvg = toDataUri(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='black' stroke-width='1.65' stroke-linecap='round' stroke-linejoin='round'><path d='M3.25 8.4l3.1 3.1L12.85 4.8'/></svg>`,
  );
  const folderAddSvg = toDataUri(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='black' stroke-width='1.35' stroke-linecap='round' stroke-linejoin='round'><path d='M2 4.3c0-.66.54-1.2 1.2-1.2h2.85c.36 0 .7.17.92.45l.82 1.05c.22.28.56.45.92.45h4.09c.66 0 1.2.54 1.2 1.2v5.45c0 .66-.54 1.2-1.2 1.2H3.2c-.66 0-1.2-.54-1.2-1.2V4.3Z'/><path d='M8 7.2v3.4M6.3 8.9h3.4'/></svg>`,
  );
  const manageDotsSvg = toDataUri(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='black'><circle cx='3.5' cy='8' r='1.15'/><circle cx='8' cy='8' r='1.15'/><circle cx='12.5' cy='8' r='1.15'/></svg>`,
  );
  const remoteConnSvg = toDataUri(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='black' stroke-width='1.35' stroke-linecap='round' stroke-linejoin='round'><rect x='2.5' y='3.5' width='15' height='10.25' rx='1.9'/><path d='M6.75 16.75h6.5M10 13.75v3M7.75 9.35a3.1 3.1 0 0 1 4.5 0M9 10.85a1.45 1.45 0 0 1 2 0'/></svg>`,
  );
  const archivedSvg = toDataUri(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='black' stroke-width='1.35' stroke-linecap='round' stroke-linejoin='round'><rect x='2.4' y='3.25' width='15.2' height='3.6' rx='1.2'/><path d='M3.6 6.85v8.1a1.6 1.6 0 0 0 1.6 1.6h9.6a1.6 1.6 0 0 0 1.6-1.6v-8.1M8 10.75h4'/></svg>`,
  );
  const scope = 'body[data-dsh-claude-theme] [data-shortcut-modal="settings"]';
  const lines = [
    `body[data-dsh-claude-theme] { --claude-sidebar-settings-icon: ${asset('claude-settings/settings')}; --claude-sidebar-search-icon: ${asset('claude-settings/search')}; --claude-modal-close-icon: ${asset('lucide/x')}; --claude-workspace-sort-icon: ${sortSvg}; --claude-workspace-plus-icon: ${plusSvg}; --claude-menu-check-icon: ${checkSvg}; --claude-workspace-add-icon: ${folderAddSvg}; --claude-workspace-manage-icon: ${manageDotsSvg}; --claude-palette-search-icon: ${asset('claude-search/search')}; --claude-palette-close-icon: ${asset('claude-search/close')}; --claude-code-session-icon: ${asset('claude-search/code')}; --claude-return-enter-icon: ${asset('claude-search/return')}; }`,
    `${scope} { --claude-settings-search-icon: ${asset('claude-settings/search')}; --claude-settings-close-icon: ${asset('lucide/x')}; }`,
  ];
  const icons = { account: 'lucide/user-round', general: 'claude-settings/settings', models: 'claude-settings/database', plugins: 'claude-settings/plugin', 'agent-presets': 'claude-settings/computer' };
  lines.push(`${scope} [data-claude-settings-id] { --claude-settings-icon: ${asset('claude-settings/settings')}; }`);
  for (const [id, name] of Object.entries(icons)) {
    lines.push(`${scope} [data-claude-settings-id="${id}"] { --claude-settings-icon: ${asset(name)}; }`);
  }
  lines.push(`${scope} [data-claude-settings-id="remote-connection"] { --claude-settings-icon: ${remoteConnSvg}; }`);
  lines.push(`${scope} [data-claude-settings-id="archived-sessions"] { --claude-settings-icon: ${archivedSvg}; }`);
  lines.push(`${scope} [data-claude-settings-id*="shortcutter"] { --claude-settings-icon: ${asset('lucide/keyboard')}; }`);
  return lines.join('\n');
}

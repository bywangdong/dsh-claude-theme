import { readFileSync } from 'node:fs';
import { toDataUri } from './icons.mjs';

// Original 20px reference masters, plus Lucide fallbacks for DSH-only items.
// See per-asset provenance and THIRD_PARTY_NOTICES.md.
export function buildSettingsIconCss() {
  const asset = name => toDataUri(readFileSync(new URL(`./assets/${name}.svg`, import.meta.url), 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '').replaceAll('currentColor', 'black')
    .replace('stroke-width="2"', 'stroke-width="1.5"'));
  const scope = 'body[data-dsh-claude-theme] [data-shortcut-modal="settings"]';
  const lines = [
    `body[data-dsh-claude-theme] { --claude-sidebar-settings-icon: ${asset('claude-settings/settings')}; --claude-palette-search-icon: ${asset('claude-search/search')}; --claude-palette-close-icon: ${asset('claude-search/close')}; --claude-code-session-icon: ${asset('claude-search/code')}; --claude-return-enter-icon: ${asset('claude-search/return')}; }`,
    `${scope} { --claude-settings-search-icon: ${asset('claude-settings/search')}; --claude-settings-close-icon: ${asset('lucide/x')}; }`,
  ];
  const icons = { account: 'lucide/user-round', general: 'claude-settings/settings', models: 'claude-settings/database', plugins: 'claude-settings/plugin', 'agent-presets': 'claude-settings/computer' };
  lines.push(`${scope} [data-claude-settings-id] { --claude-settings-icon: ${asset('claude-settings/settings')}; }`);
  for (const [id, name] of Object.entries(icons)) {
    lines.push(`${scope} [data-claude-settings-id="${id}"] { --claude-settings-icon: ${asset(name)}; }`);
  }
  lines.push(`${scope} [data-claude-settings-id*="shortcutter"] { --claude-settings-icon: ${asset('lucide/keyboard')}; }`);
  return lines.join('\n');
}

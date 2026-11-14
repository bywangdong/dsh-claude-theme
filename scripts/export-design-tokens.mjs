import { readFile, writeFile, mkdir } from 'node:fs/promises';
import tokens from '../src/tokens.mjs';

const root = new URL('../', import.meta.url);
const pkg = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));
const css = await readFile(new URL('src/theme.css', root), 'utf8');
const bodyRule = css.match(/body\[data-dsh-claude-theme\]\s*\{([^}]+)\}/)?.[1];
if (!bodyRule) throw new Error('Theme root rule not found; update the design exporter.');
const rootProperties = Object.fromEntries(
  [...bodyRule.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]),
);
const destination = new URL('design/dsh-theme/tokens.json', root);
await mkdir(new URL('design/dsh-theme/', root), { recursive: true });
await writeFile(destination, JSON.stringify({
  schema_version: 1,
  theme_name: pkg.name,
  theme_version: pkg.version,
  source_files: ['../../src/tokens.mjs', '../../src/theme.css'],
  regenerate: 'node scripts/export-design-tokens.mjs',
  scope: 'Generated snapshot. Source files remain authoritative. Root custom properties exclude selector-specific component and responsive rules; see design-spec.md and theme.css.',
  paired_token_count: Object.keys(tokens).length,
  tokens,
  root_custom_properties: rootProperties,
}, null, 2) + '\n');
console.log(`Exported ${Object.keys(tokens).length} paired tokens and ${Object.keys(rootProperties).length} root properties to design/dsh-theme/tokens.json`);

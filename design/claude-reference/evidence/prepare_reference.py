from pathlib import Path
import json, re, struct, base64

BASE = Path(__file__).parent
LATEST = BASE / 'latest'
APP = Path('/Users/nick/Library/Caches/com.anthropic.claudefordesktop.ShipIt/update.N6t5KrO/Claude.app')
css_file = next(LATEST.glob('ion-dist-c6a992*.css'))
css = css_file.read_text()
rules = []
for match in re.finditer(r'([^{}]+)\{([^{}]*)\}', css):
    selector, body = match.groups()
    values = dict(re.findall(r'(--[\w-]+):([^;]+)', body))
    rules.append((selector, body, values))

color_rules = [r for r in rules if '--cds-fizzy-lake-color-sidebar' in r[2]]
selected = []
for selector, body, values in rules:
    keep = selector in ['.cds-root', '.cds-root[data-density=comfortable]', '.font-display', '.font-heading', '.font-title', '.h-list-row']
    keep |= selector.startswith('.cds-root.cds-root[data-density=comfortable]')
    keep |= '--cds-fizzy-lake-color-sidebar' in values and selector in [color_rules[0][0], color_rules[1][0]]
    keep |= selector == '.cds-root:is([data-cds-fizzy-lake~=type],[data-cds-fizzy-lake~=type] *)'
    if keep:
        if '--cds-fizzy-lake-color-sidebar' in values:
            relevant = {k:v for k,v in values.items() if any(x in k for x in ['surface-', 'text-primary', 'text-secondary', 'text-muted', 'fill-primary', 'fill-secondary', 'fill-ghost', 'color-sidebar', 'color-composer-ring']) or k in ['--cds-border','--cds-border-line']}
        elif values:
            relevant = {k:v for k,v in values.items() if re.match(r'--cds-(font-(size|weight|sans|voice)|leading|radius|gap|pad|h-control|icon|dur-|ease-|shadow-popover|clay)', k)}
        else:
            relevant = None
        if relevant or relevant is None:
            selected.append({'selector':selector, 'declarations':relevant, 'raw':body if relevant is None else None})

result = {
  'research_date':'2026-11-14',
  'platform':'macOS',
  'installed_version':'5.1231.2',
  'staged_update_version':'5.11492.5',
  'scope':'Latest update delivered to this installation; not a claim that every account has identical server-side rollout.',
  'css_source':str(css_file),
  'css_archive_source':str(APP/'Contents/Resources/ion-dist.asar'),
  'scale':'rem converted with 16 CSS px; cds-rem-scale = 1. Screenshot is a 2x Retina capture.',
  'observed_settings':{'interface_font':'Default · System','response_font':'Match interface','transcript_text_size':'Medium','theme':'System'},
  'measured_layout_css_px':{'sidebar_width_ax':288,'home_composer_width_approx':672,'sidebar_row_height':32,'sidebar_outer_gutter_approx':8,'home_composer_outer_radius_approx_range':[20,24],'welcome_to_composer_gap_approx_range':[40,48]},
  'rules': selected
}
(BASE/'verified-design-tokens.json').write_text(json.dumps(result, ensure_ascii=False, indent=2))
lines = ['/* Claude 5.11492.5: selected source declarations. See verified-design-tokens.json for scope. */']
for item in selected:
    lines.append(item['selector']+' {')
    if item['declarations'] is None:
        lines.extend('  '+x+';' for x in item['raw'].split(';') if x)
    else:
        lines.extend('  '+k+': '+v+';' for k,v in item['declarations'].items())
    lines.append('}\n')
(BASE/'source-excerpts.css').write_text('\n'.join(lines))

font_files = {
    'CLAUDE_SANS_DATA':'/assets/v1/cb48c413e-yAna2Le1.woff2',
    'CLAUDE_SERIF_DATA':'/assets/v1/c66fc489e-2VcCjn5t.woff2',
    'CLAUDE_MONO_DATA':'/assets/v1/c5dbe0935-CQcSkHaI.woff2'
}
fragment_path = BASE.parent/'claude-desktop-design.html'
fragment = fragment_path.read_text()
with (APP/'Contents/Resources/ion-dist.asar').open('rb') as f:
    _, size, _, length = struct.unpack('<4I', f.read(16))
    header = json.loads(f.read(length))
    for placeholder, name in font_files.items():
        item = header
        for part in name.strip('/').split('/'):
            item = item['files'][part]
        f.seek(8+size+int(item['offset']))
        payload = base64.b64encode(f.read(item['size'])).decode()
        fragment = fragment.replace(placeholder, 'data:font/woff2;base64,'+payload)
fragment_path.write_text(fragment)
print(json.dumps({'reference':str(fragment_path),'bytes':fragment_path.stat().st_size,'source_excerpt':str(BASE/'source-excerpts.css')}))

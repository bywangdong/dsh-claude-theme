// Claude Desktop inspired icon pack for DeepSeek Harness (0.2.2-rc.x).
// Covers all 102 DSH `dsw-icon-*` symbol families (regular + medium), 36 DSH inline SVGs,
// Right Sidebar `Start` Guide optical sizing, and `@deepseek-ai/*` experimental bundle icons
// via pure reversible CSS masks (`body[data-dsh-claude-theme]:not([data-claude-chrome="dsh"])`).

const strokeSvg = (body, { viewBox = '0 0 16 16', strokeWidth = 1.35 } = {}) =>
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}' fill='none' stroke='black' stroke-width='${strokeWidth}' stroke-linecap='round' stroke-linejoin='round'>${body}</svg>`;

const fillSvg = (body, { viewBox = '0 0 16 16' } = {}) =>
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}' fill='black'>${body}</svg>`;

export function toDataUri(svg) {
  return `url("data:image/svg+xml,${svg
    .replaceAll('%', '%25')
    .replaceAll('#', '%23')
    .replaceAll('"', "'")
    .replaceAll('<', '%3C')
    .replaceAll('>', '%3E')
    .replace(/\s+/g, ' ')
    .trim()}")`;
}

const FOLDER_CLOSED = `<path d='M2 4.3c0-.66.54-1.2 1.2-1.2h2.85c.36 0 .7.17.92.45l.82 1.05c.22.28.56.45.92.45h4.09c.66 0 1.2.54 1.2 1.2v5.45c0 .66-.54 1.2-1.2 1.2H3.2c-.66 0-1.2-.54-1.2-1.2V4.3Z'/>`;
const FOLDER_OPEN = `<path d='M2 11.5V4.3c0-.66.54-1.2 1.2-1.2h2.7c.35 0 .68.16.9.44l.75.96c.22.28.55.45.9.45h3.85c.66 0 1.2.54 1.2 1.2v1.2M2.35 12.9h9.85c.5 0 .94-.32 1.1-.8l.92-3.05a.9.9 0 0 0-.86-1.15H4.12c-.5 0-.94.32-1.1.8l-.92 3.05a.9.9 0 0 0 .25 1.15Z'/>`;
const SHIELD_BASE = `<path d='M8 2l5 1.85v3.55c0 3.45-2.15 5.8-5 6.85-2.85-1.05-5-3.4-5-6.85V3.85L8 2Z'/>`;
const DOTS_THREE = fillSvg(`<circle cx='3.5' cy='8' r='1.15'/><circle cx='8' cy='8' r='1.15'/><circle cx='12.5' cy='8' r='1.15'/>`);
const PLUS_CROSS = strokeSvg(`<path d='M8 3.25v9.5M3.25 8h9.5'/>`, { strokeWidth: 1.4 });
const CODE_BRACKETS = strokeSvg(`<path d='M5.1 5.3L2.3 8l2.8 2.7M10.9 5.3L13.7 8l-2.8 2.7M9 3.6L7 12.4'/>`);
const TERMINAL_PROMPT = strokeSvg(`<path d='M3.2 5l3.6 3.2L3.2 11.4M8.2 11.8h4.6'/>`, { strokeWidth: 1.35 });
const FILE_SHEET_BASE = `<path d='M4 2.1h5.3l3.1 3.1v7.5a1.2 1.2 0 0 1-1.2 1.2H4a1.2 1.2 0 0 1-1.2-1.2V3.3A1.2 1.2 0 0 1 4 2.1Z'/><path d='M9.1 2.2v2.7a.8.8 0 0 0 .8.8h2.6'/>`;
const FILE_BLANK_SHEET = strokeSvg(FILE_SHEET_BASE);
const FILE_DOC_SHEET = strokeSvg(`${FILE_SHEET_BASE}<path d='M5.3 8.1h5.4M5.3 10.6h3.8'/>`);
const FILE_CODE_SHEET = strokeSvg(`${FILE_SHEET_BASE}<path d='M6.6 7.8L5.1 9.4l1.5 1.6M9.4 7.8l1.5 1.6-1.5 1.6'/>`);
const FILE_TABLE_SHEET = strokeSvg(
  `<rect x='2.3' y='2.6' width='11.4' height='10.8' rx='1.5'/><path d='M2.3 6.2h11.4M2.3 9.8h11.4M6.5 6.2v7.2'/>`,
);
const FILE_SLIDE_SHEET = strokeSvg(
  `<rect x='2.1' y='2.8' width='11.8' height='8.2' rx='1.4'/><path d='M8 11v2.6M5.4 13.6h5.2M5.2 7.8l1.8-2 1.6 1.4 2.2-2.2'/>`,
);
const FILE_IMAGE_SHEET = strokeSvg(
  `<rect x='2.1' y='2.8' width='11.8' height='10.4' rx='1.6'/><circle cx='10.5' cy='5.9' r='1.1'/><path d='M2.3 11.1l3.1-2.7a.9.9 0 0 1 1.2.04l2.3 2.26 1.7-1.35a.9.9 0 0 1 1.15.03l2 1.72'/>`,
);
const FILE_VIDEO_SHEET = strokeSvg(
  `<rect x='2.1' y='2.8' width='11.8' height='10.4' rx='1.6'/><path d='M6.7 5.8l4.1 2.2-4.1 2.2V5.8Z'/>`,
);
const TOOL_WRENCH = strokeSvg(
  `<path d='M10.4 2.6a3.4 3.4 0 0 0-3.2 4.5L3 11.3a1.25 1.25 0 0 0 1.77 1.77l4.2-4.2a3.4 3.4 0 0 0 4.43-3.27l-1.9 1.9-1.9-1.9 1.8-1.9Z'/>`,
);
const JSON_BRACES = strokeSvg(
  `<path d='M5.6 2.6H4.8a1.4 1.4 0 0 0-1.4 1.4v2.3A1.4 1.4 0 0 1 2 7.7a1.4 1.4 0 0 1 1.4 1.4v2.3a1.4 1.4 0 0 0 1.4 1.4h.8M10.4 2.6h.8a1.4 1.4 0 0 1 1.4 1.4v2.3A1.4 1.4 0 0 0 14 7.7a1.4 1.4 0 0 0-1.4 1.4v2.3a1.4 1.4 0 0 1-1.4 1.4h-.8'/>`,
);
const SCHEDULE_EMPTY_EMBLEM = strokeSvg(
  `<rect x='8' y='12' width='40' height='38' rx='6'/><path d='M19 7v9M37 7v9M8 23h40'/><circle cx='46' cy='46' r='11' fill='none'/><path d='M46 40.5V46l3.8 2.4'/>`,
  { viewBox: '0 0 64 64', strokeWidth: 2 },
);
const UPLOAD_DROP_EMBLEM = strokeSvg(
  `<path d='M18 10h19l11 11v29a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4Z'/><path d='M36 10.5V20a2 2 0 0 0 2 2h9.5M31 41V27M25 33l6-6 6 6'/>`,
  { viewBox: '0 0 64 64', strokeWidth: 2 },
);
const SESSION_LOG_SHEET = strokeSvg(
  `<rect x='2.4' y='2.3' width='11.2' height='11.4' rx='1.85'/><path d='M5.1 5.6h5.8M5.1 8h5.8M5.1 10.4h3.5'/>`,
);
const MODULAR_GRID_PLUS = strokeSvg(
  `<rect x='2.3' y='2.3' width='4.4' height='4.4' rx='1.1'/><rect x='9.3' y='2.3' width='4.4' height='4.4' rx='1.1'/><rect x='2.3' y='9.3' width='4.4' height='4.4' rx='1.1'/><path d='M11.5 9.3v4.4M9.3 11.5h4.4'/>`,
);
const WAVEFORM_VOICE = strokeSvg(
  `<path d='M2.6 8v.01M5.3 5.2v5.6M8 3v10M10.7 5.2v5.6M13.4 7.2v1.6'/>`,
  { strokeWidth: 1.45 },
);
const TRANSLATE_GLYPH = strokeSvg(
  `<path d='M2.2 4.2h6.6M5.5 2.4v1.8M3.5 4.2c.35 2.5 1.8 4.4 4.2 5.6M7.3 4.2c-.45 2.2-1.8 4.1-4.3 5.5M8.8 13.6l2.3-6 2.3 6M9.5 11.8h3.2'/>`,
);
const STARBURST_36 = strokeSvg(
  `<circle cx='18' cy='18' r='2.2' fill='black' stroke='none'/><path d='M18 9.5v4M18 22.5v4M9.5 18h4M22.5 18h4M12 12l2.8 2.8M21.2 21.2L24 24M24 12l-2.8 2.8M14.8 21.2L12 24'/>`,
  { viewBox: '0 0 36 36', strokeWidth: 1.85 },
);
const SETTINGS_COG_24 = strokeSvg(
  `<circle cx='12' cy='12' r='3'/><path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'/>`,
  { viewBox: '0 0 24 24', strokeWidth: 1.8 },
);

// Exact 102 DSH icon families (`dsw-icon-<family>-regular` & `dsw-icon-<family>-medium`)
export const DSH_ICON_MASKS = {
  'agent-preset-outline': strokeSvg(
    `<rect x='2.8' y='3.1' width='10.4' height='6.7' rx='1.15'/><path d='M2.8 9.8l-1.05 2.35a.6.6 0 0 0 .55.85h11.4a.6.6 0 0 0 .55-.85L13.2 9.8'/>`,
  ),
  'alarm-clock-outline': strokeSvg(
    `<circle cx='8' cy='8.6' r='5'/><path d='M8 5.9v2.7l1.8 1.15M2.4 3.8L4.3 2.3M13.6 3.8l-1.9-1.5'/>`,
  ),
  'api-outline': TERMINAL_PROMPT,
  'apps-add-compact-outline': DOTS_THREE,
  'apps-add-outline': DOTS_THREE,
  'archive-check-outline': strokeSvg(
    `<rect x='1.9' y='2.6' width='12.2' height='2.9' rx='.95'/><path d='M2.9 5.5v6.5a1.3 1.3 0 0 0 1.3 1.3h7.6a1.3 1.3 0 0 0 1.3-1.3V5.5M6.1 9.3l1.3 1.3 2.6-2.6'/>`,
  ),
  'archive-off-outline': strokeSvg(
    `<path d='M2.3 2.3l11.4 11.4M5.7 2.6h7.4a.95.95 0 0 1 .95.95v1a.95.95 0 0 1-.95.95h-2.8M2.9 5.5v6.5a1.3 1.3 0 0 0 1.3 1.3h7.2'/>`,
  ),
  'archive-outline': strokeSvg(
    `<rect x='1.9' y='2.6' width='12.2' height='2.9' rx='.95'/><path d='M2.9 5.5v6.5a1.3 1.3 0 0 0 1.3 1.3h7.6a1.3 1.3 0 0 0 1.3-1.3V5.5M6.4 8.6h3.2'/>`,
  ),
  'branch-outline': strokeSvg(
    `<circle cx='4.6' cy='4' r='1.45'/><circle cx='4.6' cy='12' r='1.45'/><circle cx='11.4' cy='5.3' r='1.45'/><path d='M4.6 5.45v5.1M11.4 6.75c0 2-1.3 2.75-3.25 2.75H6.2c-.95 0-1.6.55-1.6 1.4'/>`,
  ),
  'browse-outline': strokeSvg(
    `<rect x='2.2' y='2.6' width='11.6' height='10.8' rx='1.6'/><path d='M2.2 5.6h11.6M5 8.4h6M5 10.8h3.8'/>`,
  ),
  'check-circle-fill': fillSvg(
    `<path fill-rule='evenodd' d='M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm3.05 5.26a.68.68 0 0 0-.96-.96L7.2 8.7 5.93 7.42a.68.68 0 1 0-.96.96l1.75 1.75a.68.68 0 0 0 .96 0l3.37-3.37Z'/>`,
  ),
  'check-circle-outline': strokeSvg(
    `<circle cx='8' cy='8' r='5.8'/><path d='M5.5 8.2l1.7 1.7 3.5-3.6'/>`,
  ),
  'check-outline': strokeSvg(`<path d='M3 8.4l3.2 3.2L13 4.6'/>`, { strokeWidth: 1.45 }),
  'checklist-outline': strokeSvg(
    `<path d='M2.4 5l1.3 1.3 2.3-2.3M2.4 10.7l1.3 1.3 2.3-2.3M8 5h5.6M8 10.8h5.6'/>`,
  ),
  'chevron-down-outline': strokeSvg(`<path d='M4.2 6.2L8 10l3.8-3.8'/>`, { strokeWidth: 1.4 }),
  'chevron-left-outline': strokeSvg(`<path d='M9.8 4.2L6 8l3.8 3.8'/>`, { strokeWidth: 1.4 }),
  'chevron-right-outline': strokeSvg(`<path d='M6.2 4.2L10 8l-3.8 3.8'/>`, { strokeWidth: 1.4 }),
  'chevron-up-outline': strokeSvg(`<path d='M4.2 9.8L8 6l3.8 3.8'/>`, { strokeWidth: 1.4 }),
  'chevrons-up-down-outline': strokeSvg(
    `<path d='M5.3 5.8L8 3.1l2.7 2.7M5.3 10.2L8 12.9l2.7-2.7'/>`,
  ),
  'clock-outline': strokeSvg(`<circle cx='8' cy='8' r='5.75'/><path d='M8 4.75V8l2.25 1.45'/>`),
  'close-circle-fill': fillSvg(
    `<path fill-rule='evenodd' d='M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.22 5.26a.68.68 0 0 0-.96.96L7.04 8 5.26 9.78a.68.68 0 1 0 .96.96L8 8.96l1.78 1.78a.68.68 0 1 0 .96-.96L8.96 8l1.78-1.78a.68.68 0 1 0-.96-.96L8 7.04 6.22 5.26Z'/>`,
  ),
  'close-fill': strokeSvg(`<path d='M4.2 4.2l7.6 7.6M11.8 4.2l-7.6 7.6'/>`, { strokeWidth: 1.55 }),
  'close-outline': strokeSvg(`<path d='M3.8 3.8l8.4 8.4M12.2 3.8l-8.4 8.4'/>`, { strokeWidth: 1.4 }),
  'code-outline': CODE_BRACKETS,
  'compact-outline': strokeSvg(
    `<path d='M3 5.8h3.2V2.6M2.4 2.4l3.8 3.4M13 5.8H9.8V2.6M13.6 2.4L9.8 5.8M3 10.2h3.2v3.2M2.4 13.6l3.8-3.4M13 10.2H9.8v3.2M13.6 13.6l-3.8-3.4'/>`,
  ),
  'compare-split-outline': strokeSvg(
    `<rect x='2' y='2.6' width='12' height='10.8' rx='1.8'/><path d='M8 2.6v10.8'/>`,
  ),
  'context-injection-outline': strokeSvg(
    `<path d='M5.2 3.2H3.6a1.2 1.2 0 0 0-1.2 1.2v8a1.2 1.2 0 0 0 1.2 1.2h8.8a1.2 1.2 0 0 0 1.2-1.2v-8a1.2 1.2 0 0 0-1.2-1.2h-1.6M8 2v6.1M5.8 5.9L8 8.1l2.2-2.2M5.4 11h5.2'/>`,
  ),
  'copy-outline': strokeSvg(
    `<rect x='5.2' y='5.2' width='8.4' height='8.4' rx='1.6'/><path d='M3.6 10.8H3a1.4 1.4 0 0 1-1.4-1.4V3.8A1.4 1.4 0 0 1 3 2.4h5.6A1.4 1.4 0 0 1 10 3.8v.6'/>`,
  ),
  'cordis-plugin-outline': MODULAR_GRID_PLUS,
  'dark-outline': strokeSvg(
    `<path d='M13.2 9.7A5.4 5.4 0 0 1 6.3 2.8a5.4 5.4 0 1 0 6.9 6.9Z'/>`,
  ),
  'data-outline': strokeSvg(
    `<ellipse cx='7.4' cy='3.7' rx='4.8' ry='1.7'/><path d='M2.6 3.7v8c0 .94 2.15 1.7 4.8 1.7.6 0 1.18-.04 1.7-.12M2.6 7.7c0 .94 2.15 1.7 4.8 1.7.8 0 1.55-.07 2.2-.2M12.2 3.7v3.6'/><circle cx='12.2' cy='11.8' r='1.7'/>`,
  ),
  'database-outline': strokeSvg(
    `<ellipse cx='8' cy='3.8' rx='5.2' ry='1.8'/><path d='M2.8 3.8v8.4c0 1 2.33 1.8 5.2 1.8s5.2-.8 5.2-1.8V3.8M2.8 8c0 1 2.33 1.8 5.2 1.8s5.2-.8 5.2-1.8'/>`,
  ),
  'deliver-doc': strokeSvg(
    `<path d='M4 2.2h5.4l3.1 3.1v7.3a1.2 1.2 0 0 1-1.2 1.2H4a1.2 1.2 0 0 1-1.2-1.2V3.4A1.2 1.2 0 0 1 4 2.2Z'/><path d='M9.2 2.2v3.2h3.2M5.3 8.3h5.4M5.3 10.9h3.6'/>`,
  ),
  'dislike-fill': fillSvg(
    `<path d='M7.4 13.5a1.5 1.5 0 0 0 2.7-.9v-2.3h2.4a1.6 1.6 0 0 0 1.57-1.9l-.76-4.4a1.6 1.6 0 0 0-1.57-1.3H5.5v6l1.9 4.8ZM2.8 8.7h1.6v-6H2.8a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1Z'/>`,
  ),
  'dislike-outline': strokeSvg(
    `<path d='M5.2 8.6l2.2 4.6a1.3 1.3 0 0 0 2.4-.65V10h2.7a1.3 1.3 0 0 0 1.28-1.54l-.76-4.4A1.3 1.3 0 0 0 11.74 3H5.2m0 5.6V3m0 5.6H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.2'/>`,
  ),
  'download-outline': strokeSvg(
    `<path d='M8 2.6v7.4M5 7l3 3 3-3M2.8 11.4v1.1a1.1 1.1 0 0 0 1.1 1.1h8.2a1.1 1.1 0 0 0 1.1-1.1v-1.1'/>`,
  ),
  'drag-handle-outline': strokeSvg(`<path d='M3.8 5.2h8.4M3.8 8h8.4M3.8 10.8h8.4'/>`),
  'edit-outline': strokeSvg(
    `<path d='M7.5 3H3.6A1.4 1.4 0 0 0 2.2 4.4v8A1.4 1.4 0 0 0 3.6 13.8h8a1.4 1.4 0 0 0 1.4-1.4V8.5'/><path d='M11.6 2.3a1.35 1.35 0 0 1 1.9 1.9L7.9 9.8l-2.5.6.6-2.5 5.6-5.6Z'/>`,
  ),
  'ellipsis-outline': DOTS_THREE,
  'enhance-outline': strokeSvg(
    `<path d='M2.2 3.6h11.6M2.2 6.8h8.2M2.2 10h5.4M11.8 8.6l.65 1.85 1.85.65-1.85.65-.65 1.85-.65-1.85-1.85-.65 1.85-.65.65-1.85Z'/>`,
  ),
  'eye-off-outline': strokeSvg(
    `<path d='M2.4 2.4l11.2 11.2M6.5 3.7c.48-.13.98-.2 1.5-.2 2.5 0 4.7 1.5 6.2 4.5-.55 1.1-1.22 2.02-2 2.75M9.5 12.3c-.48.13-.98-.2-1.5.2-2.5 0-4.7-1.5-6.2-4.5.55-1.1 1.22-2.02 2-2.75'/>`,
  ),
  'eye-outline': strokeSvg(
    `<path d='M1.8 8c1.5-3 3.7-4.5 6.2-4.5S12.7 5 14.2 8c-1.5 3-3.7 4.5-6.2 4.5S3.3 11 1.8 8Z'/><circle cx='8' cy='8' r='1.9'/>`,
  ),
  'flat-list-outline': strokeSvg(
    `<path d='M5.6 4.2h8M5.6 8h8M5.6 11.8h8'/><circle cx='2.9' cy='4.2' r='.95' fill='black' stroke='none'/><circle cx='2.9' cy='8' r='.95' fill='black' stroke='none'/><circle cx='2.9' cy='11.8' r='.95' fill='black' stroke='none'/>`,
  ),
  'folder-close': strokeSvg(FOLDER_CLOSED),
  'folder-open': strokeSvg(FOLDER_OPEN),
  'folder-open-outline': strokeSvg(FOLDER_OPEN),
  'followsystem-outline': strokeSvg(
    `<rect x='2' y='2.8' width='12' height='8.2' rx='1.5'/><path d='M5.4 13.4h5.2M8 11v2.4'/>`,
  ),
  'fullscreen-outline': strokeSvg(
    `<path d='M2.5 6V3.5a1 1 0 0 1 1-1H6M10 2.5h2.5a1 1 0 0 1 1 1V6M13.5 10v2.5a1 1 0 0 1-1 1H10M6 13.5H3.5a1 1 0 0 1-1-1V10'/>`,
  ),
  'gauge-outline': strokeSvg(
    `<path d='M3.2 12a6 6 0 1 1 9.6 0'/><path d='M8 8.5l2.5-2.5'/><circle cx='8' cy='8.5' r='1'/>`,
  ),
  'globe-outline': strokeSvg(
    `<circle cx='8' cy='8' r='5.8'/><ellipse cx='8' cy='8' rx='2.5' ry='5.8'/><path d='M2.3 8h11.4'/>`,
  ),
  'goal-outline': strokeSvg(
    `<circle cx='8' cy='8' r='5.8'/><circle cx='8' cy='8' r='2.8'/><circle cx='8' cy='8' r='.85' fill='black' stroke='none'/>`,
  ),
  'info-outline': strokeSvg(
    `<circle cx='8' cy='8' r='5.8'/><path d='M8 7.4v3.4'/><circle cx='8' cy='5.1' r='.7' fill='black' stroke='none'/>`,
  ),
  'inspect-outline': CODE_BRACKETS,
  'layers-outline': strokeSvg(
    `<path d='M8 2.3L2.2 5.2 8 8.1l5.8-2.9L8 2.3ZM2.2 8L8 10.9 13.8 8M2.2 10.8L8 13.7l5.8-2.9'/>`,
  ),
  'light-outline': strokeSvg(
    `<circle cx='8' cy='8' r='2.7'/><path d='M8 1.9v1.5M8 12.6v1.5M1.9 8h1.5M12.6 8h1.5M3.7 3.7l1.05 1.05M11.25 11.25l1.05 1.05M12.3 3.7l-1.05 1.05M4.75 11.25L3.7 12.3'/>`,
  ),
  'like-fill': fillSvg(
    `<path d='M7.4 2.5a1.5 1.5 0 0 1 2.7.9V5.7h2.4a1.6 1.6 0 0 1 1.57 1.9l-.76 4.4a1.6 1.6 0 0 1-1.57 1.3H5.5V7.3l1.9-4.8ZM2.8 7.3h1.6v6H2.8a1 1 0 0 1-1-1V8.3a1 1 0 0 1 1-1Z'/>`,
  ),
  'like-outline': strokeSvg(
    `<path d='M5.2 7.4L7.4 2.8a1.3 1.3 0 0 1 2.4.65V6h2.7a1.3 1.3 0 0 1 1.28 1.54l-.76 4.4a1.3 1.3 0 0 1-1.28 1.06H5.2m0-5.6v5.6m0-5.6H3a1 1 0 0 0-1 1v3.6a1 1 0 0 0 1 1h2.2'/>`,
  ),
  'link-outline': strokeSvg(
    `<path d='M6.7 9.3a2.8 2.8 0 0 0 4 0l2-2a2.8 2.8 0 0 0-4-4L7.6 4.4M9.3 6.7a2.8 2.8 0 0 0-4 0l-2 2a2.8 2.8 0 0 0 4 4l1.1-1.1'/>`,
  ),
  'list-pen-outline': strokeSvg(
    `<path d='M3.4 3.5h6.8M3.4 6.7h5.2M3.4 9.9h3.2M11.6 7.4a1.2 1.2 0 0 1 1.7 1.7l-3.8 3.8-2.1.5.5-2.1 3.7-3.9Z'/>`,
  ),
  'loading-outline': strokeSvg(`<path d='M8 2.2a5.8 5.8 0 1 1-4.1 1.7'/>`),
  'microphone-outline': strokeSvg(
    `<rect x='5.5' y='2' width='5' height='7.6' rx='2.5'/><path d='M3.3 7.6a4.7 4.7 0 0 0 9.4 0M8 12.3v1.9M5.8 14.2h4.4'/>`,
  ),
  'new-chat-outline': PLUS_CROSS,
  'nowrap-fill': strokeSvg(`<path d='M2.2 2.5v11M13.8 2.5v11M4.6 8h6.8M9.4 6l2 2-2 2'/>`),
  'panel-left-outline': strokeSvg(
    `<rect x='1.6' y='2.9' width='12.8' height='10.2' rx='2.15'/><line x1='4.9' y1='5.45' x2='4.9' y2='10.55'/>`,
    { strokeWidth: 1.3 },
  ),
  'paper-plane-outline': strokeSvg(
    `<path d='M13.5 2.5L7.2 8.8M13.5 2.5L9.4 13.7 7.2 8.8 2.3 6.6 13.5 2.5Z'/>`,
  ),
  'paperclip-outline': strokeSvg(
    `<path d='M12.8 7.4l-5.1 5.1a3.5 3.5 0 0 1-5-5l5.4-5.4a2.3 2.3 0 0 1 3.25 3.25l-5.3 5.3a1.15 1.15 0 0 1-1.62-1.62l4.7-4.7'/>`,
  ),
  'pause-outline': strokeSvg(`<circle cx='8' cy='8' r='5.8'/><path d='M6.6 5.8v4.4M9.4 5.8v4.4'/>`),
  'personalization-outline': strokeSvg(
    `<path d='M2.2 3.8h6M11.4 3.8h2.4M2.2 8h2.4M7.8 8h6M2.2 12.2h6M11.4 12.2h2.4'/><circle cx='9.8' cy='3.8' r='1.35'/><circle cx='6.2' cy='8' r='1.35'/><circle cx='9.8' cy='12.2' r='1.35'/>`,
  ),
  'pin-fill': fillSvg(
    `<path d='M9.7 2.1a.75.75 0 0 1 1.06 0l3.14 3.14a.75.75 0 0 1-.16 1.17l-1.58.95-1.72 1.72.34 2.42a.75.75 0 0 1-.21.64l-.84.84a.55.55 0 0 1-.78 0L6.2 10.23l-2.95 2.95a.65.65 0 1 1-.92-.92L5.28 9.3 2.52 6.55a.55.55 0 0 1 0-.78l.84-.84a.75.75 0 0 1 .64-.21l2.42.34 1.72-1.72.95-1.58a.75.75 0 0 1 .61-.36Z'/>`,
  ),
  'pin-outline': strokeSvg(
    `<path d='M9.8 2.4l3.8 3.8-1.6 1-1.9 1.9.35 2.5-.95.95-5.9-5.9.95-.95 2.5.35 1.9-1.9 1-1.6ZM6.3 9.7L2.8 13.2'/>`,
  ),
  'plan-outline': strokeSvg(
    `<rect x='3' y='2.8' width='10' height='10.8' rx='1.4'/><path d='M6 2.1h4M5.4 6.2h5.2M5.4 8.8h5.2M5.4 11.3h3.2'/>`,
  ),
  'play-outline': strokeSvg(
    `<circle cx='8' cy='8' r='5.8'/><path fill='black' stroke='none' d='M6.7 5.7c0-.42.47-.67.82-.44l3.5 2.3a.52.52 0 0 1 0 .88l-3.5 2.3c-.35.23-.82-.02-.82-.44V5.7Z'/>`,
  ),
  // Claude Desktop's "Customize" rounded toolkit/briefcase icon in place of DeepSeek's 4-blade pinwheel
  'plugin-pinwheel-outline': strokeSvg(
    `<rect x='2' y='5.1' width='12' height='8.2' rx='1.65'/><path d='M5.6 5.1V3.75c0-.6.5-1.1 1.1-1.1h2.6c.6 0 1.1.5 1.1 1.1V5.1'/>`,
  ),
  'plus-outline': PLUS_CROSS,
  'project-add-outline': strokeSvg(
    `${FOLDER_CLOSED}<path d='M8 7.2v3.4M6.3 8.9h3.4'/>`,
  ),
  'question-outline': strokeSvg(
    `<circle cx='8' cy='8' r='5.8'/><path d='M6.4 6.3a1.65 1.65 0 0 1 3.1.8c0 1.1-1.5 1.4-1.5 2.3'/><circle cx='8' cy='11.4' r='.7' fill='black' stroke='none'/>`,
  ),
  'queue-outline': strokeSvg(
    `<path d='M3.2 12.4L2 13.8V4.4A1.6 1.6 0 0 1 3.6 2.8h8.8A1.6 1.6 0 0 1 14 4.4v6a1.6 1.6 0 0 1-1.6 1.6H3.8l-.6.4ZM5.2 6.3h5.6M5.2 8.7h3.4'/>`,
  ),
  'refresh-outline': strokeSvg(
    `<path d='M13.5 3.6v3.4h-3.4'/><path d='M12.85 10a5.25 5.25 0 1 1-.75-5.2L13.5 7'/>`,
  ),
  'right-up-outline': strokeSvg(`<path d='M4.2 11.8L11.8 4.2M6.2 4.2h5.6v5.6'/>`),
  'save-outline': strokeSvg(
    `<path d='M3.3 2.3h7.2l3.2 3.2v6.9a1.3 1.3 0 0 1-1.3 1.3H3.3A1.3 1.3 0 0 1 2 12.4V3.6a1.3 1.3 0 0 1 1.3-1.3Z'/><path d='M5.2 2.3v3.3h4.8V2.3M4.8 13.7V9.4h6.4v4.3'/>`,
  ),
  'search-outline': strokeSvg(
    `<circle cx='7.1' cy='7.1' r='4.45'/><path d='M10.35 10.35L13.5 13.5'/>`,
    { strokeWidth: 1.4 },
  ),
  'send-outline': strokeSvg(`<path d='M8 12.8V3.2M4 7.2L8 3.2l4 4'/>`, { strokeWidth: 1.5 }),
  'settings-outline': SETTINGS_COG_24,
  'share-outline': strokeSvg(
    `<path d='M9.4 4.8L13.4 8l-4 3.2V9.1c-3.2 0-5.4 1.1-6.8 3.3.5-3.6 2.7-6.3 6.8-6.3V4.8Z'/>`,
  ),
  'shield-outline': strokeSvg(SHIELD_BASE),
  'skill-outline': strokeSvg(
    `<path d='M8.5 13.6H3.6a1.2 1.2 0 0 1-1.2-1.2V3.6a1.2 1.2 0 0 1 1.2-1.2h6.8a1.2 1.2 0 0 1 1.2 1.2v3.6M4.8 5.5h4.4M4.8 8.2h2.8M12 9.2l.65 1.8 1.8.65-1.8.65-.65 1.8-.65-1.8-1.8-.65 1.8-.65.65-1.8Z'/>`,
  ),
  'sliders-two-outline': strokeSvg(
    `<path d='M2.2 5.2h5.1M10.7 5.2h3.1M2.2 10.8h3.1M8.7 10.8h5.1'/><circle cx='9' cy='5.2' r='1.55'/><circle cx='7' cy='10.8' r='1.55'/>`,
  ),
  // Mini Claude 8-ray starburst emblem
  sparkle: strokeSvg(
    `<circle cx='8' cy='8' r='1.55' fill='black' stroke='none'/><path d='M8 1.9v2.9M8 11.2v2.9M1.9 8h2.9M11.2 8h2.9M3.7 3.7l2.05 2.05M10.25 10.25l2.05 2.05M12.3 3.7l-2.05 2.05M5.75 10.25L3.7 12.3'/>`,
  ),
  'stop-fill': fillSvg(`<rect x='3' y='3' width='10' height='10' rx='2.4'/>`),
  'think-outline': strokeSvg(
    `<path d='M6.1 11.6h3.8M6.6 13.6h2.8M5.7 9.8C4.6 9 4 7.8 4 6.4a4 4 0 1 1 8 0c0 1.4-.6 2.6-1.7 3.4-.35.28-.55.7-.55 1.15v.65h-3.5v-.65c0-.45-.2-.87-.55-1.15Z'/>`,
  ),
  'trash-outline': strokeSvg(
    `<path d='M2.5 4.2h11M5.8 4.2V2.9a.9.9 0 0 1 .9-.9h2.6a.9.9 0 0 1 .9.9v1.3M3.8 4.2l.6 8.3a1.3 1.3 0 0 0 1.3 1.2h4.6a1.3 1.3 0 0 0 1.3-1.2l.6-8.3M6.7 7v4.2M9.3 7v4.2'/>`,
  ),
  'tree-corner': strokeSvg(`<path d='M1 0v6.8A3.2 3.2 0 0 0 4.2 10H8.4'/>`, {
    viewBox: '0 0 9 11',
    strokeWidth: 1.25,
  }),
  'triangle-right-fill': fillSvg(
    `<path d='M5.8 4.2c0-.65.72-1.04 1.27-.68l5.1 3.35a.82.82 0 0 1 0 1.36l-5.1 3.35c-.55.36-1.27-.03-1.27-.68V4.2Z'/>`,
  ),
  'unarchive-outline': strokeSvg(
    `<rect x='1.9' y='2.6' width='12.2' height='2.9' rx='.95'/><path d='M2.9 5.5v6.5a1.3 1.3 0 0 0 1.3 1.3h7.6a1.3 1.3 0 0 0 1.3-1.3V5.5M8 11.3V7.5M6.3 9.2L8 7.5l1.7 1.7'/>`,
  ),
  'upload-outline': strokeSvg(
    `<path d='M8 10V2.6M5 5.6l3-3 3 3M2.8 11.4v1.1a1.1 1.1 0 0 0 1.1 1.1h8.2a1.1 1.1 0 0 0 1.1-1.1v-1.1'/>`,
  ),
  'user-outline': strokeSvg(
    `<circle cx='8' cy='5.3' r='2.5'/><path d='M3.2 13.4c.55-2.3 2.45-3.7 4.8-3.7s4.25 1.4 4.8 3.7'/>`,
  ),
  'users-outline': strokeSvg(
    `<circle cx='6.2' cy='5.5' r='2.2'/><path d='M2.2 13.2c.45-2 2-3.2 4-3.2s3.55 1.2 4 3.2M10.4 3.6a2.1 2.1 0 0 1 0 3.8M13.8 13.2c-.35-1.6-1.45-2.7-3-3.05'/>`,
  ),
  'warning-outline': strokeSvg(
    `<circle cx='8' cy='8' r='5.8'/><path d='M8 5v3.6'/><circle cx='8' cy='11' r='.7' fill='black' stroke='none'/>`,
  ),
  'warning-triangle-outline': strokeSvg(
    `<path d='M6.9 2.9a1.25 1.25 0 0 1 2.2 0l4.6 8.5a1.25 1.25 0 0 1-1.1 1.85H3.4a1.25 1.25 0 0 1-1.1-1.85l4.6-8.5Z'/><path d='M8 6.3v2.9'/><circle cx='8' cy='11.3' r='.68' fill='black' stroke='none'/>`,
  ),
  'workspace-tree-outline': strokeSvg(`${FOLDER_CLOSED}<path d='M6.3 7.4v2.6h2.7'/>`),
  'wrap-fill': strokeSvg(
    `<path d='M2.2 2.5v11M13.8 2.5v11M4.8 5.6h4.2a2.2 2.2 0 0 1 0 4.4H6.2M7.8 8.4L6 10l1.8 1.6'/>`,
  ),
  'wrap-lines-outline': strokeSvg(
    `<path d='M2.5 3.8h11M2.5 7.8h8.2a2.1 2.1 0 0 1 0 4.2H7.6M9.3 10.3L7.5 12l1.8 1.7M2.5 11.8h2.6'/>`,
  ),
};

// Custom inline SVGs rendered without `data-icon` in DSH UI bundles, matched by exact path fingerprint
export const INLINE_SVG_MASKS = [
  {
    // Composer primary Send upward arrow (InputBar.client.js)
    selector: `svg:not([data-icon]):has(> path[d^="M8.3125 0.980183"])`,
    svg: strokeSvg(`<path d='M8 12.8V3.2M4 7.2L8 3.2l4 4'/>`, { strokeWidth: 1.55 }),
  },
  {
    // Permission: Workspace Write (shield + check)
    selector: `svg:not([data-icon]):has(> path[d^="M5.08545"])`,
    svg: strokeSvg(`${SHIELD_BASE}<path d='M5.8 8l1.5 1.5 3-3.1'/>`),
  },
  {
    // Permission: Read Only (shield + eye dot)
    selector: `svg:not([data-icon]):has(> path[d^="M6.4209"])`,
    svg: strokeSvg(`${SHIELD_BASE}<circle cx='8' cy='8' r='1.45'/>`),
  },
  {
    // Permission: Full access (shield + alert)
    selector: `svg:not([data-icon]):has(> path[d^="M8 4.39209"])`,
    svg: strokeSvg(`${SHIELD_BASE}<path d='M8 5.4v2.9'/><circle cx='8' cy='10.6' r='.65' fill='black' stroke='none'/>`),
  },
  {
    // Permission: Auto review (shield + sparkle)
    selector: `svg:not([data-icon]):has(> path[d^="M5.75 10.15L8 4.95"])`,
    svg: strokeSvg(
      `${SHIELD_BASE}<path d='M8 5.4l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7Z' fill='black' stroke='none'/>`,
    ),
  },
  {
    // Schedule calendar icon (dsh-client-ui-schedule)
    selector: `svg:not([data-icon]):has(> rect[x="1.4"][y="2.6"])`,
    svg: strokeSvg(`<rect x='2.2' y='3.2' width='11.6' height='10.4' rx='1.6'/><path d='M5.2 1.9v2.4M10.8 1.9v2.4M2.2 6.5h11.6'/>`),
  },
  {
    // Right sidebar Terminal tab icon (dsh-client-ui-sidebar-terminal)
    selector: `svg:not([data-icon]):has(> path[d="M3 4L7 8L3 12"])`,
    svg: TERMINAL_PROMPT,
  },
  {
    // Account notifications bell (dsh-client-ui-account-notifications)
    selector: `svg:not([data-icon]):has(> path[d^="M3.6355 6.93969"])`,
    svg: strokeSvg(`<path d='M4.2 6.8a3.8 3.8 0 0 1 7.6 0v3.3l1.1 1.3H3.1l1.1-1.3V6.8ZM6.6 13a1.5 1.5 0 0 0 2.8 0'/>`),
  },
  {
    // Plugins page & Guide: Built-in "Shell" / "New terminal" artwork (36x36; overridden to 16x16 in Guide)
    selector: `svg:not([data-icon]):has(> path[d^="M10 11L16.606"])`,
    svg: strokeSvg(`<path d='M12 13.5l5.2 4.5-5.2 4.5M19.2 23h5.3'/>`, {
      viewBox: '0 0 36 36',
      strokeWidth: 1.9,
    }),
  },
  {
    // Plugins page: Built-in "Agent loop" card artwork (36x36 Claude starburst)
    selector: `svg:not([data-icon]):has(> path[d^="M18.0486 28.4901"])`,
    svg: STARBURST_36,
  },
  {
    // Plugins page: Built-in "Subagent" / row artwork (36x36 overlapping workspaces)
    selector: `svg:not([data-icon]):has(> rect[x="14.9893"])`,
    svg: strokeSvg(
      `<rect x='14.5' y='14.5' width='11' height='11' rx='2.4'/><path d='M12.5 21.5h-1a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1'/>`,
      { viewBox: '0 0 36 36', strokeWidth: 1.85 },
    ),
  },
  {
    // Plugins page: Built-in "Web search and fetch" card artwork (36x36 globe)
    selector: `svg:not([data-icon]):has(> path[d^="M26.5362 26.9865"])`,
    svg: strokeSvg(
      `<circle cx='18' cy='18' r='8.2'/><ellipse cx='18' cy='18' rx='3.6' ry='8.2'/><path d='M10 18h16'/>`,
      { viewBox: '0 0 36 36', strokeWidth: 1.85 },
    ),
  },
  {
    // Plugins page: Default package card artwork (36x36 Customize toolkit)
    selector: `svg:not([data-icon]):has(> path[d^="M24.6294 8.63696"])`,
    svg: strokeSvg(
      `<rect x='10' y='14.2' width='16' height='11' rx='2.2'/><path d='M14.8 14.2v-1.8c0-.8.65-1.4 1.45-1.4h3.5c.8 0 1.45.6 1.45 1.4v1.8'/>`,
      { viewBox: '0 0 36 36', strokeWidth: 1.85 },
    ),
  },
  {
    // Right sidebar Guide: "Workspace files" artwork (36x36; overridden to 16x16 inside Guide)
    selector: `svg:not([data-icon]):has(> path[d^="M10.7603 27.922"])`,
    svg: strokeSvg(
      `<path d='M8.5 12c0-1.1.9-2 2-2h4.6c.58 0 1.12.26 1.48.72l1.28 1.64c.36.46.9.72 1.48.72h6.16c1.1 0 2 .9 2 2v8.92c0 1.1-.9 2-2 2h-15c-1.1 0-2-.9-2-2V12Z'/>`,
      { viewBox: '0 0 36 36', strokeWidth: 1.85 },
    ),
  },
  {
    // Right sidebar Guide: "Browser" artwork (36x36; overridden to 16x16 inside Guide)
    selector: `svg:not([data-icon]):has(> path[d^="M17.9995 28.1465"])`,
    svg: strokeSvg(
      `<circle cx='18' cy='18' r='8.2'/><ellipse cx='18' cy='18' rx='3.6' ry='8.2'/><path d='M10 18h16'/>`,
      { viewBox: '0 0 36 36', strokeWidth: 1.85 },
    ),
  },
  {
    // Right sidebar Start tab CompassGlyph (dsh-client-ui-sidebar-right)
    selector: `svg:not([data-icon]):has(> path[d^="M10.6101 5.39014"])`,
    svg: strokeSvg(`<circle cx='8' cy='8' r='5.8'/><path d='M10.35 5.65L8.95 8.95l-3.3 1.4 1.4-3.3 3.3-1.4Z'/>`),
  },
  {
    // Right sidebar fallback CubeGlyph (dsh-client-ui-sidebar-right; Session log overridden to trace sheet)
    selector: `svg:not([data-icon]):has(> path[d^="M7.99998 2.5L12.9"])`,
    svg: strokeSvg(`<path d='M8 2.2l5.1 2.9v5.8L8 13.8l-5.1-2.9V5.1L8 2.2ZM2.9 5.1L8 8l5.1-2.9M8 8v5.8'/>`),
  },
  {
    // Right sidebar Guide: "More tools" 22x22 modular grid + plus icon
    selector: `svg:not([data-icon]):has(> path[d^="M5.45873 5.04102"])`,
    svg: MODULAR_GRID_PLUS,
  },
  {
    // Right sidebar header: FullscreenGlyph
    selector: `svg:not([data-icon]):has(> path[d^="M2.33203 10.4054"])`,
    svg: DSH_ICON_MASKS['fullscreen-outline'],
  },
  {
    // Right sidebar header: ExitFullscreenGlyph
    selector: `svg:not([data-icon]):has(> path[d^="M9 2.5V6C9"])`,
    svg: strokeSvg(`<path d='M6 2.5V5a1 1 0 0 1-1 1H2.5M10 2.5V5a1 1 0 0 0 1 1h2.5M13.5 10H11a1 1 0 0 0-1 1v2.5M2.5 10H5a1 1 0 0 1 1 1v2.5'/>`),
  },
  {
    // DockKit split-pane header button
    selector: `svg:not([data-icon]):has(> path[d^="M13.5 1.5H2.5"]):has(> path[d="M8 1.5V14.5"])`,
    svg: DSH_ICON_MASKS['compare-split-outline'],
  },
  {
    // Browser sidebar SandboxPolicyIcon: sandboxed shield + check
    selector: `svg:not([data-icon]):has(> path[d^="M12.1654 5.7552"])`,
    svg: strokeSvg(`${SHIELD_BASE}<path d='M5.8 8l1.5 1.5 3-3.1'/>`),
  },
  {
    // Browser sidebar SandboxPolicyIcon: unsandboxed shield + cross
    selector: `svg:not([data-icon]):has(> path[d^="M10.6074 4.40278"])`,
    svg: strokeSvg(`${SHIELD_BASE}<path d='M6.4 6.4l3.2 3.2M9.6 6.4l-3.2 3.2'/>`),
  },
  {
    // Shortcuts modal search field icon (dsh-client-ui-shortcuts)
    selector: `svg:not([data-icon]):has(> path[d^="M10.28 5.86536"])`,
    svg: DSH_ICON_MASKS['search-outline'],
  },
  {
    // Subagent switcher stack icon (dsh-client-ui-subagent)
    selector: `svg:not([data-icon]):has(> path[d^="M5.99951 12.7"])`,
    svg: DSH_ICON_MASKS['layers-outline'],
  },
  {
    // Session inspector filter funnel (dsh-experimental-session-inspector)
    selector: `svg:not([data-icon]):has(> path[d="M2 3h12L9.5 8v5l-3-1.5V8L2 3Z"])`,
    svg: strokeSvg(`<path d='M2.3 3.4h11.4L9.4 8.2v4.3l-2.8-1.4V8.2L2.3 3.4Z'/>`),
  },
  {
    // Session inspector element picker crosshair (dsh-experimental-session-inspector)
    selector: `svg:not([data-icon]):has(> path[d="M8 0v5M8 11v5M0 8h5M11 8h5"])`,
    svg: strokeSvg(`<circle cx='8' cy='8' r='4.6'/><path d='M8 1.8v2.6M8 11.6v2.6M1.8 8h2.6M11.6 8h2.6'/>`),
  },
  {
    // Account settings sign-out icon (dsh-client-ui-settings-account)
    selector: `svg:not([data-icon]):has(> path[d^="M3.9961 1.40039"])`,
    svg: strokeSvg(`<path d='M6.2 2.4H3.8A1.4 1.4 0 0 0 2.4 3.8v8.4a1.4 1.4 0 0 0 1.4 1.4h2.4M10.2 5.2L13.4 8l-3.2 2.8M6.4 8h6.8'/>`),
  },
  {
    // Reference chip: session message bubble
    selector: `svg:not([data-icon]):has(> path[d^="M2.37067 11.2497"])`,
    svg: DSH_ICON_MASKS['queue-outline'],
  },
  {
    // Reference chip: web globe
    selector: `svg:not([data-icon]):has(> path[d^="M7.99986 14.0887"])`,
    svg: DSH_ICON_MASKS['globe-outline'],
  },
  {
    // Reference chip: code inspect brackets
    selector: `svg:not([data-icon]):has(> path[d^="M4.67398 4.25061"])`,
    svg: CODE_BRACKETS,
  },
  {
    // Reference chip: document note
    selector: `svg:not([data-icon]):has(> path[d^="M12.5 1.32617"])`,
    svg: DSH_ICON_MASKS['plan-outline'],
  },
  {
    // Reference chip: folder
    selector: `svg:not([data-icon]):has(> path[d^="M1.50439 3.11059"])`,
    svg: strokeSvg(FOLDER_CLOSED),
  },
  {
    // Link chip: image preview
    selector: `svg:not([data-icon]):has(> path[d^="M12.4326 2.38086"])`,
    svg: strokeSvg(
      `<rect x='2.1' y='2.8' width='11.8' height='10.4' rx='1.6'/><circle cx='10.5' cy='5.9' r='1.1'/><path d='M2.3 11.1l3.1-2.7a.9.9 0 0 1 1.2.04l2.3 2.26 1.7-1.35a.9.9 0 0 1 1.15.03l2 1.72'/>`,
    ),
  },
  {
    // Link chip: file document
    selector: `svg:not([data-icon]):has(> path[d^="M3.51919 14.5069"])`,
    svg: DSH_ICON_MASKS['deliver-doc'],
  },
  {
    // Link chip: code file document
    selector: `svg:not([data-icon]):has(> path[d^="M3.75275 14.271"])`,
    svg: FILE_CODE_SHEET,
  },
  {
    // FileTypeIcon (`$Z`): folder icon in Right Sidebar `Files` tab, attachments, previews
    selector: `svg:not([data-icon]):has(> path[d^="M2.80078 10.2112"])`,
    svg: strokeSvg(FOLDER_CLOSED),
  },
  {
    // FileTypeIcon (`cZ`): all 48 colorful Seti/VSCode language icons in `Files` tree, tabs, attachments, Forge
    selector: `svg:not([data-icon])[viewBox="0 0 20 20"]:not(:has(> path[d^="M5.99951 12.7"]))`,
    svg: FILE_CODE_SHEET,
  },
  {
    // FileTypeIcon (`or`): generic `other` file
    selector: `svg:not([data-icon]):has(> path[d^="M8.48924 28H19.5108"]):not(:has([data-file-type-mark]))`,
    svg: FILE_BLANK_SHEET,
  },
  {
    // FileTypeIcon (`or`): `code`
    selector: `svg:not([data-icon]):has(> path[d^="M8.48924 28H19.5108"]):has(path[d^="M10.0053 13.126"])`,
    svg: FILE_CODE_SHEET,
  },
  {
    // FileTypeIcon (`or`): `html`
    selector: `svg:not([data-icon]):has(> path[d^="M8.48924 28H19.5108"]):has(path[d^="M13.9994 9.68298"])`,
    svg: FILE_CODE_SHEET,
  },
  {
    // FileTypeIcon (`or`): `markdown`
    selector: `svg:not([data-icon]):has(> path[d^="M8.48924 28H19.5108"]):has(path[d^="M8.7588 19.5V14.6"])`,
    svg: FILE_DOC_SHEET,
  },
  {
    // FileTypeIcon (`or`): `pdf`
    selector: `svg:not([data-icon]):has(> path[d^="M8.48924 28H19.5108"]):has(path[d^="M6.80616 19.5V14.6"])`,
    svg: FILE_DOC_SHEET,
  },
  {
    // FileTypeIcon (`or`): `word`
    selector: `svg:not([data-icon]):has(> path[d^="M8.48924 28H19.5108"]):has(path[d^="M10.5118 20.5L8.24179"])`,
    svg: FILE_DOC_SHEET,
  },
  {
    // FileTypeIcon (`or`): `excel` / CSV
    selector: `svg:not([data-icon]):has(> path[d^="M8.48924 28H19.5108"]):has(path[d^="M14 11.5H11.4"])`,
    svg: FILE_TABLE_SHEET,
  },
  {
    // FileTypeIcon (`or`): `ppt`
    selector: `svg:not([data-icon]):has(> path[d^="M8.48924 28H19.5108"]):has(path[d^="M11.0132 20.5V13.5"])`,
    svg: FILE_SLIDE_SHEET,
  },
  {
    // FileTypeIcon (`or`): `image`
    selector: `svg:not([data-icon]):has(> path[d^="M8.48924 28H19.5108"]):has(path[d^="M10.4212 15.9204"])`,
    svg: FILE_IMAGE_SHEET,
  },
  {
    // FileTypeIcon (`or`): `video`
    selector: `svg:not([data-icon]):has(> path[d^="M8.48924 28H19.5108"]):has(path[d^="M17.5 14.634"])`,
    svg: FILE_VIDEO_SHEET,
  },
  {
    // Secret mask & Models API key reveal eye (dsh-client-ui-secret-mask & dsh-client-ui-settings-models)
    selector: `svg:not([data-icon]):has(> path[d="M1.5 8C2.9 5.25 5.25 3.5 8 3.5C10.75 3.5 13.1 5.25 14.5 8C13.1 10.75 10.75 12.5 8 12.5C5.25 12.5 2.9 10.75 1.5 8ZM10 8C10 9.1 9.1 10 8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8Z"])`,
    svg: DSH_ICON_MASKS['eye-outline'],
  },
  {
    // Secret mask & Models API key hide eye-off
    selector: `svg:not([data-icon]):has(> path[d^="M1.5 8C2.9 5.25"][d$="M2.5 2.5L13.5 13.5"])`,
    svg: DSH_ICON_MASKS['eye-off-outline'],
  },
  {
    // Shortcuts settings edit pencil
    selector: `svg:not([data-icon]):has(> path[d^="M7.4553 1.01221"])`,
    svg: DSH_ICON_MASKS['edit-outline'],
  },
  {
    // Shortcuts settings error badge
    selector: `svg:not([data-icon]):has(> path[d^="M8.90039 3.97328"])`,
    svg: DSH_ICON_MASKS['warning-outline'],
  },
  {
    // Shortcuts settings success badge
    selector: `svg:not([data-icon]):has(> path[d^="M12.5303 6.53027"])`,
    svg: DSH_ICON_MASKS['check-circle-outline'],
  },
  {
    // Trajectory / Session log role wrench
    selector: `svg[data-role-icon="wrench"]:not([data-icon])`,
    svg: TOOL_WRENCH,
  },
  {
    // Trajectory / Session log role information
    selector: `svg[data-role-icon="information"]:not([data-icon])`,
    svg: DSH_ICON_MASKS['info-outline'],
  },
  {
    // Trajectory / Session log role compacted
    selector: `svg[data-role-icon="compacted"]:not([data-icon])`,
    svg: DSH_ICON_MASKS['compact-outline'],
  },
  {
    // Trajectory tool call & catalog wrench
    selector: `svg:not([data-icon]):has(> path[d^="M14.7 6.3a1 1"])`,
    svg: TOOL_WRENCH,
  },
  {
    // Trajectory JSON braces toggle
    selector: `svg:not([data-icon]):has(> path[d^="M6 2H5a2 2"])`,
    svg: JSON_BRACES,
  },
  {
    // Trajectory toolbar duration clock
    selector: `svg:not([data-icon]):has(> circle[cx="8"][cy="8"][r="5.25"])`,
    svg: DSH_ICON_MASKS['clock-outline'],
  },
  {
    // Document zoom-out minus control
    selector: `svg:not([data-icon]):has(> path[d="M2 8h12"])`,
    svg: strokeSvg(`<path d='M3.2 8h9.6'/>`, { strokeWidth: 1.45 }),
  },
  {
    // JSON string collapse icon
    selector: `svg:not([data-icon]):has(> path[d="M9.5 1.5V6.5H14.5M1.5 9.5H6.5V14.5"])`,
    svg: DSH_ICON_MASKS['compact-outline'],
  },
  {
    // Any standalone FishLogo fallback outside HeroShell
    selector: `svg:not([data-icon]):has(> path[d^="M22.9168 1.43018"]):not([class$="_fish"]):not([class*="_fish "])`,
    svg: DSH_ICON_MASKS.sparkle,
  },
  {
    // Automation tasks empty-state illustration
    selector: `svg:not([data-icon])[viewBox="0 0 170 170"]`,
    svg: SCHEDULE_EMPTY_EMBLEM,
  },
  {
    // Drag-and-drop file upload overlay illustration
    selector: `svg:not([data-icon])[viewBox="0 0 115 84"]`,
    svg: UPLOAD_DROP_EMBLEM,
  },
];

// Shipped `@deepseek-ai/*` plugin bundle cards that render `<img class="..._packageImage">` on the Plugins page
const EXPERIMENTAL_PACKAGE_ICONS = [
  ['voice-input', WAVEFORM_VOICE],
  ['speech-to-text', WAVEFORM_VOICE],
  ['plugin-market', MODULAR_GRID_PLUS],
  ['auto-review', strokeSvg(`${SHIELD_BASE}<path d='M5.8 8l1.5 1.5 3-3.1'/>`)],
  ['forge', DSH_ICON_MASKS['branch-outline']],
  ['worktree', DSH_ICON_MASKS['branch-outline']],
  ['recommendation', DSH_ICON_MASKS.sparkle],
  ['inspector', SESSION_LOG_SHEET],
  ['cua', DSH_ICON_MASKS['followsystem-outline']],
  ['translation', TRANSLATE_GLYPH],
  ['translator', TRANSLATE_GLYPH],
  ['session-search', DSH_ICON_MASKS['search-outline']],
  ['session-title', DSH_ICON_MASKS['list-pen-outline']],
  ['terminal', TERMINAL_PROMPT],
  ['skill', DSH_ICON_MASKS['skill-outline']],
  ['liveshare', DSH_ICON_MASKS['share-outline']],
  ['agent-team', DSH_ICON_MASKS['users-outline']],
  ['ralph', DSH_ICON_MASKS.sparkle],
];

export function buildIconCss() {
  const scope = 'body[data-dsh-claude-theme]:not([data-claude-chrome="dsh"])';
  const families = Object.keys(DSH_ICON_MASKS).sort();
  const mappedSelectors = [
    ...families.flatMap(name => [
      `svg[data-icon="dsw-icon-${name}-regular"]`,
      `svg[data-icon="dsw-icon-${name}-medium"]`,
    ]),
    `button[data-sidebar-toggle] svg:is([class$="_panelIcon"], [class*="_panelIcon "])`,
    `button[data-sidebar-opener] > svg`,
    ...INLINE_SVG_MASKS.map(item => item.selector),
  ];

  const lines = [
    '/* Auto-generated Claude Desktop Icon Pack (102 DSH symbol families + 64 inline UI glyphs + Guide & Plugin overrides) */',
    // Keep HTML elements out of this large matcher. In particular, a trailing
    // universal child selector made ordinary text/input changes recheck the
    // entire icon list. :where preserves the original rule specificity.
    `${scope} :where(svg):is(\n  ${mappedSelectors.join(',\n  ')}\n) {`,
    '  background-color: currentColor;',
    '  -webkit-mask-image: var(--claude-icon);',
    '  -webkit-mask-position: center;',
    '  -webkit-mask-size: contain;',
    '  -webkit-mask-repeat: no-repeat;',
    '  mask-image: var(--claude-icon);',
    '  mask-position: center;',
    '  mask-size: contain;',
    '  mask-repeat: no-repeat;',
    '}',
    // Symbols are non-rendering definitions. Including them would pull the
    // host's entire hidden sprite registry back into the expensive matcher.
    `${scope} :where(svg):is(\n  ${mappedSelectors.join(',\n  ')}\n) > :where(path, circle, rect, line, polyline, polygon, ellipse, g, use, text, image, foreignObject, svg, defs, switch, a) {`,
    '  display: none;',
    '}',
  ];

  for (const name of families) {
    const uri = toDataUri(DSH_ICON_MASKS[name]);
    const extra = name === 'panel-left-outline'
      ? ',\n  button[data-sidebar-toggle] svg:is([class$="_panelIcon"], [class*="_panelIcon "]),\n  button[data-sidebar-opener] > svg'
      : '';
    lines.push(
      `${scope} :is(\n  svg[data-icon="dsw-icon-${name}-regular"],\n  svg[data-icon="dsw-icon-${name}-medium"]${extra}\n) { --claude-icon: ${uri}; }`,
    );
  }

  for (const { selector, svg } of INLINE_SVG_MASKS) {
    lines.push(`${scope} ${selector} { --claude-icon: ${toDataUri(svg)}; }`);
  }

  // Right Sidebar `Start` Guide: unify all 36x36 artworks & Session log cube onto crisp 16x16 (1.35px stroke) masks
  lines.push(
    `${scope} [data-sidebar-right-guide] svg:not([data-icon]):has(> path[d^="M10.7603 27.922"]) { --claude-icon: ${toDataUri(strokeSvg(FOLDER_CLOSED))}; }`,
    `${scope} [data-sidebar-right-guide] svg:not([data-icon]):has(> path[d^="M10 11L16.606"]) { --claude-icon: ${toDataUri(TERMINAL_PROMPT)}; }`,
    `${scope} [data-sidebar-right-guide] svg:not([data-icon]):has(> path[d^="M17.9995 28.1465"]) { --claude-icon: ${toDataUri(DSH_ICON_MASKS['globe-outline'])}; }`,
    `${scope} :is([data-sidebar-right-guide-entry="session-inspector-log"], [data-dockkit-tab="session-inspector-log"]) svg:not([data-icon]):has(> path) { --claude-icon: ${toDataUri(SESSION_LOG_SHEET)}; }`,
  );

  // Plugins page: replace shipped `@deepseek-ai/*` experimental `<img class="..._packageImage">` icons with cohesive Claude masks
  const cardIconSel = ':is([class$="_cardIcon"], [class*="_cardIcon "]):has(> img:is([class$="_packageImage"], [class*="_packageImage "]))';
  lines.push(
    `${scope} :is([data-plugin-package^="@deepseek-ai/"], [data-plugin-detail^="@deepseek-ai/"]) ${cardIconSel} {`,
    `  --claude-pkg-icon: ${toDataUri(DSH_ICON_MASKS['plugin-pinwheel-outline'])};`,
    '  position: relative;',
    '}',
    `${scope} :is([data-plugin-package^="@deepseek-ai/"], [data-plugin-detail^="@deepseek-ai/"]) ${cardIconSel} > img:is([class$="_packageImage"], [class*="_packageImage "]) {`,
    '  display: none;',
    '}',
    `${scope} :is([data-plugin-package^="@deepseek-ai/"], [data-plugin-detail^="@deepseek-ai/"]) ${cardIconSel}::after {`,
    '  content: "";',
    '  width: 20px;',
    '  height: 20px;',
    '  background-color: currentColor;',
    '  -webkit-mask: var(--claude-pkg-icon) center / contain no-repeat;',
    '  mask: var(--claude-pkg-icon) center / contain no-repeat;',
    '}',
  );
  for (const [slug, svg] of EXPERIMENTAL_PACKAGE_ICONS) {
    lines.push(
      `${scope} :is([data-plugin-package^="@deepseek-ai/"][data-plugin-package*="${slug}"], [data-plugin-detail^="@deepseek-ai/"][data-plugin-detail*="${slug}"]) ${cardIconSel} { --claude-pkg-icon: ${toDataUri(svg)}; }`,
    );
  }
  lines.push(
    `${scope} :is([data-plugin-package="dsh-theme-claude"], [data-plugin-detail="dsh-theme-claude"]) :is([class$="_cardIcon"], [class*="_cardIcon "]) svg:not([data-icon]):has(> path) {`,
    `  --claude-icon: ${toDataUri(STARBURST_36)};`,
    '  color: var(--claude-clay);',
    '}',
    `${scope} svg:not([data-icon])[viewBox="0 0 170 170"] {`,
    '  color: var(--dsw-alias-label-tertiary);',
    '  opacity: .72;',
    '  -webkit-mask-size: 64px 64px;',
    '  mask-size: 64px 64px;',
    '}',
    `${scope} svg:not([data-icon])[viewBox="0 0 115 84"] {`,
    '  color: var(--dsw-alias-label-secondary);',
    '  -webkit-mask-size: 56px 56px;',
    '  mask-size: 56px 56px;',
    '}',
    `${scope} :is([class$="_runningIcon"], [class*="_runningIcon "]):has(:is([class$="_runningWhaleStill"], [class*="_runningWhaleStill "])) {`,
    '  color: var(--claude-clay);',
    '  background-color: currentColor;',
    `  -webkit-mask: ${toDataUri(DSH_ICON_MASKS.sparkle)} center / contain no-repeat;`,
    `  mask: ${toDataUri(DSH_ICON_MASKS.sparkle)} center / contain no-repeat;`,
    '}',
    `${scope} :is([class$="_runningIcon"], [class*="_runningIcon "]) > :is([class$="_runningWhaleAnimated"], [class*="_runningWhaleAnimated "], [class$="_runningWhaleStill"], [class*="_runningWhaleStill "]) {`,
    '  display: none !important;',
    '}',
  );

  return lines.join('\n');
}

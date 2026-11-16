// Dual Claude palettes for DeepSeek Harness (0.11.8):
// 1. neutral (default): Verbatim Claude Desktop @ant/cds fizzy-lake surfaces, settings modal & ink hierarchy
//    - Light: #FAFAFA sidebar | #EAEAEA 1px seam | #FFFFFF canvas | #E4E4E4 selected pill | #FFFFFF settings modal
//    - Dark:  #1F1F1F sidebar | #2B2B2B 1px seam | #191919 canvas | #3F3F3F selected pill | #191919 settings modal, #1F1F1F settings header
// 2. warm: Classic Claude warm parchment (#FAF9F5 canvas / #F3F1E9 sidebar) & warm charcoal (#1C1C1A canvas / #222120 sidebar).

function createPalette(spec) {
  const tokens = {};
  const pair = (name, light, dark = light) => { tokens[name] = Object.freeze({ light, dark }); };
  const alias = (name, light, dark = light) => pair(`--dsw-alias-${name}`, light, dark);
  const specific = (name, light, dark = light) => pair(`--dsw-specific-${name}`, light, dark);
  spec({ pair, alias, specific });
  return Object.freeze(tokens);
}

export const WARM_TOKENS = createPalette(({ pair, alias, specific }) => {
  alias('bg-base', '#FAF9F5', '#1C1C1A');
  alias('bg-layer-1', '#FAF9F5', '#1C1C1A');
  alias('bg-layer-2', '#FFFFFF', '#242321');
  alias('bg-layer-3', '#FFFFFF', '#302F2C');
  alias('bg-module-platform', '#F3F1E9', '#222120');
  alias('bg-multi-select', '#E8E6DC', '#363532');
  alias('bg-overlay', '#EFECE2', '#302F2C');
  alias('bg-document-preview', '#F5F4ED', '#1F1E1C');
  alias('label-document-preview', '#5E5D58', '#B8B6AC');
  alias('bg-skeleton', '#1414130A', '#FAF9F50A');

  alias('label-primary', '#191918', '#E7E5DC');
  alias('label-primary-dimmed', '#2C2C2A', '#D6D4CB');
  alias('label-secondary', '#63615C', '#9E9C93');
  alias('label-tertiary', '#76746E', '#87857D');
  alias('label-caption', '#76746E', '#828078');
  alias('label-dimmed', '#9E9B92', '#686660');
  alias('label-primary-inverted', '#FAF9F5', '#191918');
  alias('label-primary-foreground', '#FFFFFF', '#191918');
  alias('label-on-color', '#FFFFFF', '#191918');
  alias('label-primary-bluish', '#7A4B38', '#E5B4A1');

  alias('brand-primary', '#191918', '#EFECE4');
  alias('brand-primary-invert', '#191918', '#EFECE4');
  alias('brand-text', '#191918', '#EFECE4');
  alias('brand-primary-new-colorprimary-new-color', '#D97757');

  alias('border-l1', '#1414130D', '#FAF9F50D');
  alias('border-l2', '#14141316', '#FAF9F514');
  alias('border-l2-darkmode-thin', '#14141316', '#FAF9F50D');
  alias('border-l3', '#14141320', '#FAF9F51C');
  alias('border-l4', '#1414132B', '#FAF9F524');
  alias('border-selected', '#73726C', '#9C9A92');

  alias('interactive-bg-hover', '#1414130C', '#FAF9F512');
  alias('interactive-bg-hover-solid', '#EAE7DC', '#2F2E2B');
  alias('interactive-bg-hover-accent', '#14141314', '#FAF9F51A');
  alias('interactive-bg-active', '#E3E0D5', '#3E3D39');

  alias('button-primary-fill', '#191918', '#EFECE4');
  alias('button-primary-hover', '#333330', '#DDDAD0');
  alias('button-primary-dimmed', '#E5E2D7', '#42413E');
  alias('button-info-fill', '#191918', '#EFECE4');
  alias('button-info-hover', '#333330', '#DDDAD0');
  alias('button-floating-fill', '#FFFFFF', '#2B2A28');
  alias('button-floating-hover', '#F2F0E8', '#363532');
  alias('button-elevated-fill', '#FFFFFF', '#2B2A28');
  alias('button-ghost-active-fill', '#1414130E', '#FAF9F51C');
  alias('button-ghost-active-hover', '#14141316', '#FAF9F528');
  alias('button-ghost-active-border', '#1414131F', '#FAF9F524');
  alias('button-contrast-fill', '#5E5D58', '#D8D6CC');

  alias('card-fill', '#F5F4ED', '#242321');
  alias('card-fill-hover', '#ECEAE0', '#2E2D2A');
  alias('card-tile-fill', '#FFFFFF', '#242321');
  alias('settings-card-fill', '#F5F3EC', '#272623');
  alias('settings-card-stroke', '#E3E0D5', '#353430');
  alias('switch-thumb', '#FFFFFF', '#FFFFFF');
  alias('menu-icon', '#5E5C57', '#CFCBC0');
  alias('menu-group-header-fill', '#FFFFFF', '#302F2C');
  alias('link', '#2168BA', '#85B8F2');

  alias('state-business-primary', '#A64F34', '#E5A58D');
  alias('state-business-tertiary', '#D977571A', '#D9775726');
  alias('label-deep-diving', '#A64F34', '#DFA184');
  alias('label-deep-diving-shimmer', '#D97757', '#F1C9B9');
  alias('state-success-primary', '#187928', '#62BE72');
  alias('state-success-secondary', '#187928', '#62BE72');
  alias('state-success-tertiary', '#18792814', '#62BE721A');
  alias('state-error-primary', '#C13838', '#F07B7C');
  alias('state-warn-label', '#8A6311', '#E8BF68');
  alias('state-done-primary', '#6F56DC', '#B7A5F5');

  alias('scrollbar-bg-l1', '#14141321', '#FAF9F521');
  alias('scrollbar-bg-l2', '#14141321', '#FAF9F521');
  alias('scrollbar-hover-l1', '#1414133D', '#FAF9F53D');
  alias('scrollbar-hover-l2', '#1414133D', '#FAF9F53D');

  alias('markdown-code-block', '#F3F1E8', '#161614');
  alias('markdown-code-block-banner', '#EAE7DD', '#201F1D');
  alias('markdown-inline-code', '#1414130E', '#FAF9F514');
  alias('markdown-code-segment-selected', '#FFFFFF', '#3A3936');
  alias('markdown-code-segment-unselected', '#EFECE2', '#201F1D');
  alias('markdown-tag', '#EAE7DC', '#2F2E2B');
  alias('markdown-citation', '#EAE7DC', '#2F2E2B');
  alias('markdown-placeholder', '#F2F0E8', '#22211F');

  alias('tooltip-bg', '#2C2B29', '#383733');
  alias('tooltip-label', '#FAF9F5', '#FAF9F5');
  alias('toast-bg', '#2C2B29', '#FAF9F5');
  alias('toast-label', '#FAF9F5', '#191918');
  alias('toast-action', '#F1C9B9', '#8F462E');
  alias('turn-trigger-bg', '#F4F2EA', '#22211F');
  alias('turn-trigger-bg-hover', '#EAE7DC', '#2B2A28');

  specific('input-major', '#FFFFFF', '#252422');
  specific('bubble', '#EFECE2', '#242321');
  specific('bubble-highlight', '#E4E0D4', '#2F2E2B');
  specific('selector', '#1414130B', '#FAF9F512');
  specific('tip', '#F3F1E8', '#201F1D');
  specific('menu', '#FFFFFF', '#302F2C');
  specific('sidebar-fill', '#F3F1E9', '#222120');
  specific('sidebar-tint', '#F3F1E9', '#222120');
  specific('sidebar-nav-item-active', '#E3E0D5', '#3E3D39');
  specific('sidebar-nav-item-active-accent', '#E3E0D5', '#3E3D39');
  specific('sidebar-glass-fill', 'transparent', 'transparent');
  specific('sidebar-glass-hover', '#1414130C', '#FAF9F512');
  specific('sidebar-glass-collapsed-fill', 'transparent');
  specific('sidebar-glass-collapsed-hover', '#1414130F', '#FAF9F514');
  for (const end of ['top', 'top-clear', 'bottom', 'bottom-clear']) specific(`sidebar-wash-${end}`, 'transparent');

  pair('--dsw-menu-surface-fill', '#FFFFFF', '#302F2C');
  pair('--dsw-menu-backdrop-filter', 'none');
  pair('--dsw-focus-ring-color', '#2A78D6', '#3987E5');
  pair('--claude-clay', '#D97757');
  pair('--claude-accent-blue', '#2A78D6', '#3987E5');
  pair('--claude-send-fill', '#C6613F', '#CE6846');
  pair('--claude-send-hover', '#B25334', '#DB7553');
  pair('--claude-send-ink', '#FFFFFF', '#FFFFFF');
  pair('--claude-nav-active-bg', '#E3E0D5', '#3E3D39');
  pair('--claude-session-ink', '#242321', '#CECCC3');
  pair('--claude-session-active-ink', '#141413', '#EFECE4');
  pair('--claude-sidebar-inactive-ink', '#14141380', '#FAF9F580');
  pair('--claude-workspace-label', '#6B6963', '#96948C');
  pair('--claude-workspace-chevron', '#85827A', '#828079');
  pair('--claude-session-dot', '#8A877E', '#949188');
  pair('--claude-prose-ink', '#191918', '#E1DFD6');
  pair('--claude-prose-strong-ink', '#111110', '#F2F0E8');
  pair('--claude-prose-strong-weight', '600', '500');
  pair('--claude-bubble-ink', '#242321', '#D0CEC5');
  pair('--claude-bubble-border', '#14141310', '#FAF9F512');
  pair('--claude-sidebar-divider', '#E4E1D6', '#2E2D2A');
  pair('--claude-canvas-divider', '#EAE7DC', '#282725');
  pair('--claude-composer-border', '#DDD9CD', '#383733');
  pair('--claude-composer-border-focus', '#B5B1A4', '#54524C');
  pair('--claude-composer-shadow', '0 1px 6px -1px #14141308, 0 1px 2px 0 #14141304', '0 6px 20px -2px #0000003B, 0 1px 3px 0 #00000024');
  pair('--claude-composer-shadow-focus', '0 3px 14px -2px #14141310, 0 1px 3px 0 #14141308', '0 8px 24px -2px #00000050, 0 2px 6px 0 #00000030');
  pair('--claude-popover-shadow', '0 10px 28px -4px #1414131C, 0 2px 6px 0 #1414130F', '0 12px 32px -4px #00000054, 0 2px 8px 0 #00000033');
  pair('--claude-modal-shadow', '0 24px 64px -12px #14141333, 0 4px 16px -2px #14141314', '0 28px 72px -10px #0000008C, 0 6px 24px -2px #00000059');
  pair('--claude-settings-backdrop', '#1414134A', '#0000009E');
  pair('--claude-settings-shadow', '0 1px 4px #1414131A, 0 0 0 1px #14141314', '0 2px 12px #00000050, 0 0 0 1px #FAF9F514');
  pair('--claude-settings-panel-bg', '#FAF9F5', '#21201E');
  pair('--claude-settings-nav-bg', '#FAF9F5', '#21201E');
  pair('--claude-settings-header-bg', '#FAF9F5', '#282724');
  pair('--claude-settings-search-bg', '#FAF9F5', '#2B2A27');
  pair('--claude-settings-search-border', '#E3E0D5', '#353430');
  pair('--claude-settings-nav-selected-ink', '#191918', '#FAF9F5');
  pair('--claude-settings-ink', '#191918', '#E1DFD6');
  pair('--claude-settings-divider', '#E3E0D5', '#2E2D2A');
  pair('--claude-settings-row-divider', '#1414130D', '#FAF9F50D');
  pair('--claude-settings-nav-ink', '#353430', '#CECCC3');
  pair('--claude-settings-nav-icon', '#63615C', '#A8A69D');
  pair('--claude-settings-nav-hover', '#1414130A', '#FAF9F50F');
  pair('--claude-settings-nav-active-bg', '#E2DFD3', '#383733');
  pair('--claude-settings-desc-ink', '#696760', '#98968D');
  pair('--claude-settings-field-bg', '#ECE9DF', '#2B2A27');
  pair('--claude-settings-field-hover', '#E4E0D4', '#34332F');
  pair('--claude-settings-field-border', '#14141306', '#FAF9F506');
  pair('--claude-settings-seg-track', '#E9E6DB', '#292825');
  pair('--claude-settings-seg-thumb', '#FFFFFF', '#413F3B');
  pair('--claude-settings-card-bg', '#F5F3EC', '#272623');
  pair('--claude-settings-card-border', '#E3E0D5', '#353430');
  pair('--claude-settings-selected-border', '#C4BFB1', '#54524C');
  pair('--claude-settings-card-btn-bg', '#EAE7DC', '#34332F');
  pair('--claude-settings-card-btn-hover', '#E1DDD0', '#3D3C37');
  pair('--claude-control-shadow', '0 1px 2px #1414130A', '0 1px 2px #0000002E');
  pair('--claude-switch-off', '#CFCBC0', '#403F3B');
  pair('--claude-switch-on', '#2A78D6', '#3987E5');
  pair('--claude-cmdk-bg', '#FAF9F5', '#2B2A27');
  pair('--claude-cmdk-border', '#E5E2D8', '#3C3A36');
  pair('--claude-cmdk-divider', '#E5E2D8', '#3C3A36');
  pair('--claude-cmdk-hover-bg', '#F1EFE8', '#353430');
  pair('--claude-cmdk-selected-bg', '#E7E4DB', '#484641');
  pair('--claude-cmdk-ink', '#4A4945', '#B3B0A8');
  pair('--claude-cmdk-active-ink', '#141413', '#F5F3EC');
  pair('--claude-cmdk-muted', '#75736C', '#9C9990');
  pair('--claude-cmdk-placeholder', '#8A877F', '#8A877F');
  pair('--claude-cmdk-enter-ink', '#66645E', '#BAB7AE');
  pair('--claude-cmdk-backdrop', '#14141336', '#00000072');
});

export const NEUTRAL_TOKENS = createPalette(({ pair, alias, specific }) => {
  alias('bg-base', '#FFFFFF', '#191919');
  alias('bg-layer-1', '#FFFFFF', '#191919');
  alias('bg-layer-2', '#FAFAFA', '#212121');
  alias('bg-layer-3', '#FFFFFF', '#2E2E2E');
  alias('bg-module-platform', '#FAFAFA', '#1F1F1F');
  alias('bg-multi-select', '#EFEFEF', '#303030');
  alias('bg-overlay', '#F2F2F2', '#2E2E2E');
  alias('bg-document-preview', '#FAFAFA', '#1D1D1D');
  alias('label-document-preview', '#666666', '#B0B0B0');
  alias('bg-skeleton', '#0000000A', '#FFFFFF0A');

  alias('label-primary', '#1A1A1A', '#E6E6E6');
  alias('label-primary-dimmed', '#262626', '#D6D6D6');
  alias('label-secondary', '#666666', '#9E9E9E');
  alias('label-tertiary', '#767676', '#858585');
  alias('label-caption', '#767676', '#808080');
  alias('label-dimmed', '#999999', '#666666');
  alias('label-primary-inverted', '#FFFFFF', '#191919');
  alias('label-primary-foreground', '#FFFFFF', '#191919');
  alias('label-on-color', '#FFFFFF', '#191919');
  alias('label-primary-bluish', '#724B3D', '#E5B4A1');

  alias('brand-primary', '#171717', '#EDEDED');
  alias('brand-primary-invert', '#171717', '#EDEDED');
  alias('brand-text', '#171717', '#EDEDED');
  alias('brand-primary-new-colorprimary-new-color', '#D97757');

  alias('border-l1', '#0000000C', '#FFFFFF0D');
  alias('border-l2', '#00000014', '#FFFFFF14');
  alias('border-l2-darkmode-thin', '#00000014', '#FFFFFF0D');
  alias('border-l3', '#0000001E', '#FFFFFF1C');
  alias('border-l4', '#00000028', '#FFFFFF24');
  alias('border-selected', '#767676', '#9E9E9E');

  alias('interactive-bg-hover', '#0000000C', '#FFFFFF13');
  alias('interactive-bg-hover-solid', '#EFEFEF', '#2C2C2C');
  alias('interactive-bg-hover-accent', '#00000014', '#FFFFFF1C');
  alias('interactive-bg-active', '#E4E4E4', '#3F3F3F');

  alias('button-primary-fill', '#191919', '#EFEFEF');
  alias('button-primary-hover', '#383838', '#D7D7D7');
  alias('button-primary-dimmed', '#E6E6E6', '#454545');
  alias('button-info-fill', '#191919', '#EFEFEF');
  alias('button-info-hover', '#383838', '#D7D7D7');
  alias('button-floating-fill', '#FFFFFF', '#282828');
  alias('button-floating-hover', '#F2F2F2', '#343434');
  alias('button-elevated-fill', '#FFFFFF', '#282828');
  alias('button-ghost-active-fill', '#0000000D', '#FFFFFF1F');
  alias('button-ghost-active-hover', '#00000014', '#FFFFFF2E');
  alias('button-ghost-active-border', '#0000001F', '#FFFFFF26');
  alias('button-contrast-fill', '#666666', '#D7D7D7');

  alias('card-fill', '#F7F7F7', '#222222');
  alias('card-fill-hover', '#EFEFEF', '#2B2B2B');
  alias('card-tile-fill', '#FFFFFF', '#222222');
  alias('settings-card-fill', '#FAFAFA', '#262626');
  alias('settings-card-stroke', '#E8E8E8', '#333333');
  alias('switch-thumb', '#FFFFFF', '#FFFFFF');
  alias('menu-icon', '#5C5C5C', '#CCCCCC');
  alias('menu-group-header-fill', '#FFFFFF', '#2E2E2E');
  alias('link', '#2171CA', '#82B7F4');

  alias('state-business-primary', '#A64F34', '#E5A58D');
  alias('state-business-tertiary', '#D977571A', '#D9775726');
  alias('label-deep-diving', '#A64F34', '#DFA184');
  alias('label-deep-diving-shimmer', '#D97757', '#F1C9B9');
  alias('state-success-primary', '#18832B', '#62BE72');
  alias('state-success-secondary', '#18832B', '#62BE72');
  alias('state-success-tertiary', '#18832B14', '#62BE721A');
  alias('state-error-primary', '#C83839', '#F07B7C');
  alias('state-warn-label', '#8C6511', '#E8BF68');
  alias('state-done-primary', '#785EE8', '#B7A5F5');

  alias('scrollbar-bg-l1', '#00000021', '#FFFFFF21');
  alias('scrollbar-bg-l2', '#00000021', '#FFFFFF21');
  alias('scrollbar-hover-l1', '#0000003D', '#FFFFFF3D');
  alias('scrollbar-hover-l2', '#0000003D', '#FFFFFF3D');

  alias('markdown-code-block', '#F7F7F7', '#141414');
  alias('markdown-code-block-banner', '#EFEFEF', '#1E1E1E');
  alias('markdown-inline-code', '#0000000D', '#FFFFFF14');
  alias('markdown-code-segment-selected', '#FFFFFF', '#383838');
  alias('markdown-code-segment-unselected', '#F2F2F2', '#1E1E1E');
  alias('markdown-tag', '#F0F0EF', '#2B2B2B');
  alias('markdown-citation', '#F0F0EF', '#2B2B2B');
  alias('markdown-placeholder', '#F5F5F5', '#212121');

  alias('tooltip-bg', '#262626', '#383838');
  alias('tooltip-label', '#FFFFFF', '#EFEFEF');
  alias('toast-bg', '#262626', '#EFEFEF');
  alias('toast-label', '#FFFFFF', '#191919');
  alias('toast-action', '#F1C9B9', '#8F462E');
  alias('turn-trigger-bg', '#FAFAFA', '#1F1F1F');
  alias('turn-trigger-bg-hover', '#F2F2F2', '#292929');

  specific('input-major', '#FFFFFF', '#222222');
  specific('bubble', '#F4F4F4', '#212121');
  specific('bubble-highlight', '#E7E7E5', '#2C2C2C');
  specific('selector', '#0000000B', '#FFFFFF12');
  specific('tip', '#FAFAFA', '#1E1E1E');
  specific('menu', '#FFFFFF', '#2E2E2E');
  specific('sidebar-fill', '#FAFAFA', '#1F1F1F');
  specific('sidebar-tint', '#FAFAFA', '#1F1F1F');
  specific('sidebar-nav-item-active', '#E4E4E4', '#3F3F3F');
  specific('sidebar-nav-item-active-accent', '#E4E4E4', '#3F3F3F');
  specific('sidebar-glass-fill', 'transparent', 'transparent');
  specific('sidebar-glass-hover', '#0000000C', '#FFFFFF13');
  specific('sidebar-glass-collapsed-fill', 'transparent');
  specific('sidebar-glass-collapsed-hover', '#0000000F', '#FFFFFF16');
  for (const end of ['top', 'top-clear', 'bottom', 'bottom-clear']) specific(`sidebar-wash-${end}`, 'transparent');

  pair('--dsw-menu-surface-fill', '#FFFFFF', '#2E2E2E');
  pair('--dsw-menu-backdrop-filter', 'none');
  pair('--dsw-focus-ring-color', '#2A78D6', '#3987E5');
  pair('--claude-clay', '#D97757');
  pair('--claude-accent-blue', '#2A78D6', '#3987E5');
  pair('--claude-send-fill', '#171717', '#EDEDED');
  pair('--claude-send-hover', '#383838', '#D6D6D6');
  pair('--claude-send-ink', '#FFFFFF', '#171717');
  pair('--claude-nav-active-bg', '#E4E4E4', '#3F3F3F');
  pair('--claude-session-ink', '#242424', '#CCCCCC');
  pair('--claude-session-active-ink', '#171717', '#ECECEC');
  pair('--claude-sidebar-inactive-ink', '#00000080', '#FFFFFF80');
  pair('--claude-workspace-label', '#686868', '#969696');
  pair('--claude-workspace-chevron', '#858585', '#828282');
  pair('--claude-session-dot', '#8A8A8A', '#8E8E8E');
  pair('--claude-prose-ink', '#1A1A1A', '#DFDFDF');
  pair('--claude-prose-strong-ink', '#111111', '#F0F0F0');
  pair('--claude-prose-strong-weight', '600', '500');
  pair('--claude-bubble-ink', '#242424', '#CECECE');
  pair('--claude-bubble-border', '#0000000D', '#FFFFFF12');
  pair('--claude-sidebar-divider', '#EAEAEA', '#2B2B2B');
  pair('--claude-canvas-divider', '#EFEFEF', '#242424');
  pair('--claude-composer-border', '#E0E0E0', '#343434');
  pair('--claude-composer-border-focus', '#BDBDBD', '#505050');
  pair('--claude-composer-shadow', '0 1px 6px -1px #00000008, 0 1px 2px 0 #00000004', '0 6px 20px -2px #0000003B, 0 1px 3px 0 #00000024');
  pair('--claude-composer-shadow-focus', '0 3px 14px -2px #00000010, 0 1px 3px 0 #00000006', '0 8px 24px -2px #00000050, 0 2px 6px 0 #00000030');
  pair('--claude-popover-shadow', '0 8px 24px #00000018, 0 2px 6px #0000000F', '0 12px 32px #00000050, 0 2px 6px #0000002B');
  pair('--claude-modal-shadow', '0 24px 64px -12px #0000002E, 0 4px 16px -2px #00000012', '0 28px 72px -10px #0000008C, 0 6px 24px -2px #00000059');
  pair('--claude-settings-backdrop', '#00000066', '#0000009E');
  pair('--claude-settings-shadow', '0 1px 4px #0000001A, 0 0 0 1px #00000014', '0 2px 12px #00000050, 0 0 0 1px #FFFFFF14');
  pair('--claude-settings-panel-bg', '#FFFFFF', '#191919');
  pair('--claude-settings-nav-bg', '#FFFFFF', '#191919');
  pair('--claude-settings-header-bg', '#FFFFFF', '#1F1F1F');
  pair('--claude-settings-search-bg', '#FFFFFF', '#252425');
  pair('--claude-settings-search-border', '#E8E8E8', '#2D2C2D');
  pair('--claude-settings-nav-selected-ink', '#1A1A1A', '#F1F1F1');
  pair('--claude-settings-ink', '#1A1A1A', '#EFEFEF');
  pair('--claude-settings-divider', '#E1E1E1', '#303030');
  pair('--claude-settings-row-divider', '#0000000D', '#FFFFFF0D');
  pair('--claude-settings-nav-ink', '#1A1A1A', '#EFEFEF');
  pair('--claude-settings-nav-icon', '#1A1A1A', '#EFEFEF');
  pair('--claude-settings-nav-hover', '#00000009', '#FFFFFF0E');
  pair('--claude-settings-nav-active-bg', '#E5E5E5', '#3B3B3B');
  pair('--claude-settings-desc-ink', '#6B6B6B', '#9C9C9C');
  pair('--claude-settings-field-bg', '#FFFFFF', '#242424');
  pair('--claude-settings-field-hover', '#F3F3F3', '#333333');
  pair('--claude-settings-field-border', '#E5E5E5', '#3B3B3B');
  pair('--claude-settings-seg-track', '#F3F3F3', '#282828');
  pair('--claude-settings-seg-thumb', '#FFFFFF', '#404040');
  pair('--claude-settings-card-bg', '#FAFAFA', '#262626');
  pair('--claude-settings-card-border', '#E8E8E8', '#333333');
  pair('--claude-settings-selected-border', '#CCCCCC', '#525252');
  pair('--claude-settings-card-btn-bg', '#EFEFEE', '#323232');
  pair('--claude-settings-card-btn-hover', '#E5E5E4', '#3B3B3B');
  pair('--claude-control-shadow', '0 1px 2px #00000008', '0 1px 2px #0000002E');
  pair('--claude-switch-off', '#CECECC', '#3D3D3D');
  pair('--claude-switch-on', '#2A78D6', '#3987E5');
  pair('--claude-cmdk-bg', '#FFFFFF', '#303030');
  pair('--claude-cmdk-border', '#E5E5E5', '#595959');
  pair('--claude-cmdk-divider', '#E5E5E5', '#454545');
  pair('--claude-cmdk-hover-bg', '#F3F3F3', '#3B3B3B');
  pair('--claude-cmdk-selected-bg', '#EAEAEA', '#4F4F4F');
  pair('--claude-cmdk-ink', '#666666', '#A6A6A6');
  pair('--claude-cmdk-active-ink', '#141413', '#FFFFFFED');
  pair('--claude-cmdk-muted', '#666666', '#A6A6A6');
  pair('--claude-cmdk-placeholder', '#878787', '#878787');
  pair('--claude-cmdk-enter-ink', '#666666', '#FFFFFF91');
  pair('--claude-cmdk-backdrop', '#00000038', '#00000070');
});

export const PALETTES = Object.freeze({
  neutral: NEUTRAL_TOKENS,
  warm: WARM_TOKENS,
});

export default NEUTRAL_TOKENS;

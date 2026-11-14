// A settings.action contribution mounts this enhancement with the dialog.
// Keep the host's buttons, order, focus handling and click handlers intact.
// Only theme-owned search/heading nodes and reversible data attributes are added.
export function enhanceSettingsNavigation(panel, getSections) {
  const doc = panel.ownerDocument;
  const nav = panel.querySelector('nav');
  const list = nav?.querySelector('[class$="_navList"], [class*="_navList "]');
  if (!nav || !list) return () => {};

  const copy = {
    en: ['Search', 'Search settings pages', 'Clear search', 'Preferences', 'Customize', 'No settings found', 'Settings pages'],
    zh: ['搜索', '搜索设置页面', '清除搜索', '偏好设置', '自定义', '未找到相关设置', '设置页面'],
    ja: ['検索', '設定ページを検索', '検索をクリア', '環境設定', 'カスタマイズ', '設定が見つかりません', '設定ページ'],
    es: ['Buscar', 'Buscar páginas de ajustes', 'Borrar búsqueda', 'Preferencias', 'Personalizar', 'No se encontraron ajustes', 'Páginas de ajustes'],
    fr: ['Rechercher', 'Rechercher dans les réglages', 'Effacer la recherche', 'Préférences', 'Personnaliser', 'Aucun réglage trouvé', 'Pages de réglages'],
    de: ['Suchen', 'Einstellungsseiten suchen', 'Suche löschen', 'Einstellungen', 'Anpassen', 'Keine Einstellungen gefunden', 'Einstellungsseiten'],
    ru: ['Поиск', 'Поиск страниц настроек', 'Очистить поиск', 'Настройки', 'Персонализация', 'Настройки не найдены', 'Страницы настроек'],
    pt: ['Pesquisar', 'Pesquisar páginas de configurações', 'Limpar pesquisa', 'Preferências', 'Personalizar', 'Nenhuma configuração encontrada', 'Páginas de configurações'],
  };
  const aliases = {
    account: 'profile account 账户 帐号 个人资料',
    general: 'general appearance theme font language permission 通用 外观 主题 字体 语言 权限',
    models: 'model provider api 模型 供应商',
    plugins: 'plugin extension 插件 扩展',
    'agent-presets': 'agent preset 智能体 预设',
  };
  const normalize = value => String(value).normalize('NFKC').toLocaleLowerCase().trim();
  const originalNavLabel = nav.getAttribute('aria-label');
  const decorated = new Map();
  const headings = [];
  let rows = [];
  let disposed = false;

  const search = doc.createElement('div');
  search.className = 'claude-settings-search';
  search.setAttribute('role', 'search');
  const icon = doc.createElement('span');
  icon.className = 'claude-settings-search-icon';
  icon.setAttribute('aria-hidden', 'true');
  const input = doc.createElement('input');
  input.type = 'search';
  input.autocomplete = 'off';
  input.spellcheck = false;
  const clear = doc.createElement('button');
  clear.type = 'button';
  clear.className = 'claude-settings-search-clear';
  const clearIcon = doc.createElement('span');
  clearIcon.setAttribute('aria-hidden', 'true');
  clear.append(clearIcon);
  search.append(icon, input, clear);
  nav.insertBefore(search, list);
  const empty = doc.createElement('div');
  empty.className = 'claude-settings-search-empty';
  empty.setAttribute('role', 'status');
  nav.append(empty);
  nav.dataset.claudeSettingsNavigation = '';

  function filter() {
    const terms = normalize(input.value).split(/\s+/).filter(Boolean);
    for (const row of rows) {
      const haystack = normalize(`${row.label} ${row.id} ${aliases[row.id] ?? ''} ${row.id.includes('shortcutter') ? 'keyboard shortcuts 快捷键' : ''}`);
      row.button.toggleAttribute('data-claude-search-hidden', !terms.every(term => haystack.includes(term)));
    }
    let firstVisibleGroup = true;
    for (const { node, group } of headings) {
      node.hidden = !rows.some(row => row.group === group && !row.button.hasAttribute('data-claude-search-hidden'));
      node.toggleAttribute('data-claude-first-group', !node.hidden && firstVisibleGroup);
      if (!node.hidden) firstVisibleGroup = false;
    }
    clear.hidden = !input.value;
    empty.hidden = rows.some(row => !row.button.hasAttribute('data-claude-search-hidden'));
  }

  function observe() {
    observer.observe(list, { childList: true, subtree: true, characterData: true });
    observer.observe(doc.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  function refresh() {
    if (disposed) return;
    observer.disconnect();
    const text = copy[doc.documentElement.lang.split('-')[0]] ?? copy.en;
    input.placeholder = text[0];
    input.setAttribute('aria-label', text[1]);
    clear.setAttribute('aria-label', text[2]);
    empty.textContent = text[5];
    nav.setAttribute('aria-label', text[6]);
    for (const { node } of headings) node.remove();
    headings.length = 0;
    const sections = getSections();
    const buttons = Array.from(list.children).filter(node => node.matches('button'));
    rows = buttons.map((button, index) => {
      const label = button.textContent.trim();
      // Locale changes can commit before the slot ledger. Prefer a label match;
      // use the host's ordered projection only when the row counts agree.
      const section = sections.find(row => row.label === label)
        ?? (sections.length === buttons.length ? sections[index] : undefined);
      const id = section?.id ?? button.dataset.claudeSettingsId ?? '';
      const group = ['account', 'general', 'models'].includes(id) ? 'preferences' : 'customize';
      if (!decorated.has(button)) decorated.set(button, {
        id: button.getAttribute('data-claude-settings-id'),
        hidden: button.hasAttribute('data-claude-search-hidden'),
      });
      button.dataset.claudeSettingsId = id;
      return { button, label, id, group };
    });
    let previousGroup;
    for (const row of rows) {
      if (row.group === previousGroup) continue;
      const node = doc.createElement('div');
      node.className = 'claude-settings-nav-heading';
      node.setAttribute('role', 'heading');
      node.setAttribute('aria-level', '2');
      node.textContent = text[row.group === 'preferences' ? 3 : 4];
      list.insertBefore(node, row.button);
      headings.push({ node, group: row.group });
      previousGroup = row.group;
    }
    filter();
    observe();
  }

  function onClear() {
    input.value = '';
    filter();
    input.focus();
  }
  function onKeyDown(event) {
    if (event.isComposing || !['Enter', 'ArrowDown'].includes(event.key)) return;
    const first = rows.find(row => !row.button.hasAttribute('data-claude-search-hidden'));
    if (!first) return;
    event.preventDefault();
    event.stopPropagation();
    first.button.focus();
    if (event.key === 'Enter') first.button.click();
  }
  const observer = new MutationObserver(refresh);
  input.addEventListener('input', filter);
  input.addEventListener('keydown', onKeyDown);
  clear.addEventListener('click', onClear);
  refresh();

  return () => {
    disposed = true;
    observer.disconnect();
    input.removeEventListener('input', filter);
    input.removeEventListener('keydown', onKeyDown);
    clear.removeEventListener('click', onClear);
    if (search.contains(doc.activeElement)) {
      rows.find(row => row.button.getAttribute('aria-current') === 'true')?.button.focus();
    }
    search.remove();
    empty.remove();
    for (const { node } of headings) node.remove();
    for (const [button, previous] of decorated) {
      if (previous.id === null) button.removeAttribute('data-claude-settings-id');
      else button.setAttribute('data-claude-settings-id', previous.id);
      button.toggleAttribute('data-claude-search-hidden', previous.hidden);
    }
    delete nav.dataset.claudeSettingsNavigation;
    if (originalNavLabel === null) nav.removeAttribute('aria-label');
    else nav.setAttribute('aria-label', originalNavLabel);
  };
}

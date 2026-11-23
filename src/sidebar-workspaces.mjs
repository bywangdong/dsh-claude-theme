// Reversible Claude Code Desktop sidebar workspace enhancement:
// 1. Places a calm "Search" row at the top of the sidebar nav list (under "+ New Session"),
//    opening DSH's inline 28px session search on demand while keeping the workspace list chrome-free at rest.
// 2. Places a per-project "↑↓" (Group & sort) hover button on every [data-row-key^="workspace:"] row
//    right beside "+", opening a localized popover bound directly to DSH's WorkspaceViewStore.
export function enhanceSidebarWorkspaces(sidebarRoot, getWorkspaceOwner) {
  const doc = sidebarRoot.ownerDocument;
  const win = doc.defaultView;
  const scrollport = sidebarRoot.querySelector('[data-sidebar-scrollport]');
  if (!scrollport || !win) return () => {};

  const copy = {
    zh: {
      search: '搜索',
      searchAria: '搜索会话',
      sortAria: '分组与排序',
      groupBy: '分组方式',
      workspace: '按工作区',
      workspaceTree: '按工作区树',
      flat: '单列表',
      orderBy: '排序方式',
      updated: '最近更新',
      manual: '手动排序',
      filterBy: '筛选会话',
      hideArchived: '隐藏已归档',
      showArchived: '全部对话（显示已归档）',
      onlyArchived: '仅显示已归档',
      manageWorkspace: '管理此工作区…',
      addWorkspace: '添加工作区…',
    },
    en: {
      search: 'Search',
      searchAria: 'Search sessions',
      sortAria: 'Group and sort',
      groupBy: 'Group by',
      workspace: 'Workspace',
      workspaceTree: 'Workspace tree',
      flat: 'In one list',
      orderBy: 'Order by',
      updated: 'Last updated',
      manual: 'Manual',
      filterBy: 'Filter sessions',
      hideArchived: 'Hide archived',
      showArchived: 'All conversations',
      onlyArchived: 'Archived only',
      manageWorkspace: 'Manage workspace…',
      addWorkspace: 'Add workspace…',
    },
    ja: {
      search: '検索',
      searchAria: 'セッションを検索',
      sortAria: 'グループ化と並び替え',
      groupBy: 'グループ化',
      workspace: 'ワークスペース別',
      workspaceTree: 'ワークスペースツリー',
      flat: '1つのリスト',
      orderBy: '並び替え',
      updated: '最終更新順',
      manual: '手動',
      filterBy: 'フィルター',
      hideArchived: 'アーカイブを非表示',
      showArchived: 'すべて表示（アーカイブ含む）',
      onlyArchived: 'アーカイブのみ',
      manageWorkspace: 'このワークスペースを管理…',
      addWorkspace: 'ワークスペースを追加…',
    },
    es: {
      search: 'Buscar',
      searchAria: 'Buscar sesiones',
      sortAria: 'Agrupar y ordenar',
      groupBy: 'Agrupar por',
      workspace: 'Espacio de trabajo',
      workspaceTree: 'Árbol de espacios',
      flat: 'En una lista',
      orderBy: 'Ordenar por',
      updated: 'Última actualización',
      manual: 'Manual',
      filterBy: 'Filtrar sesiones',
      hideArchived: 'Ocultar archivadas',
      showArchived: 'Todas las conversaciones',
      onlyArchived: 'Solo archivadas',
      manageWorkspace: 'Gestionar espacio…',
      addWorkspace: 'Añadir espacio de trabajo…',
    },
    fr: {
      search: 'Rechercher',
      searchAria: 'Rechercher des sessions',
      sortAria: 'Grouper et trier',
      groupBy: 'Grouper par',
      workspace: 'Espace de travail',
      workspaceTree: 'Arborescence',
      flat: 'Liste unique',
      orderBy: 'Trier par',
      updated: 'Dernière mise à jour',
      manual: 'Manuel',
      filterBy: 'Filtrer les sessions',
      hideArchived: 'Masquer les archives',
      showArchived: 'Toutes les conversations',
      onlyArchived: 'Archives uniquement',
      manageWorkspace: 'Gérer cet espace…',
      addWorkspace: 'Ajouter un espace de travail…',
    },
    de: {
      search: 'Suchen',
      searchAria: 'Sitzungen suchen',
      sortAria: 'Gruppieren und sortieren',
      groupBy: 'Gruppieren nach',
      workspace: 'Arbeitsbereich',
      workspaceTree: 'Arbeitsbereichsbaum',
      flat: 'In einer Liste',
      orderBy: 'Sortieren nach',
      updated: 'Zuletzt aktualisiert',
      manual: 'Manuell',
      filterBy: 'Sitzungen filtern',
      hideArchived: 'Archivierte ausblenden',
      showArchived: 'Alle Unterhaltungen',
      onlyArchived: 'Nur archivierte',
      manageWorkspace: 'Arbeitsbereich verwalten…',
      addWorkspace: 'Arbeitsbereich hinzufügen…',
    },
    ru: {
      search: 'Поиск',
      searchAria: 'Поиск сессий',
      sortAria: 'Группировка и сортировка',
      groupBy: 'Группировать',
      workspace: 'По рабочим областям',
      workspaceTree: 'Дерево областей',
      flat: 'Единым списком',
      orderBy: 'Сортировать',
      updated: 'По обновлению',
      manual: 'Вручную',
      filterBy: 'Фильтр сессий',
      hideArchived: 'Скрыть архивные',
      showArchived: 'Все диалоги',
      onlyArchived: 'Только архивные',
      manageWorkspace: 'Управление областью…',
      addWorkspace: 'Добавить рабочую область…',
    },
    pt: {
      search: 'Pesquisar',
      searchAria: 'Pesquisar sessões',
      sortAria: 'Agrupar e ordenar',
      groupBy: 'Agrupar por',
      workspace: 'Espaço de trabalho',
      workspaceTree: 'Árvore de espaços',
      flat: 'Em uma lista',
      orderBy: 'Ordenar por',
      updated: 'Última atualização',
      manual: 'Manual',
      filterBy: 'Filtrar sessões',
      hideArchived: 'Ocultar arquivadas',
      showArchived: 'Todas as conversas',
      onlyArchived: 'Apenas arquivadas',
      manageWorkspace: 'Gerenciar espaço…',
      addWorkspace: 'Adicionar espaço de trabalho…',
    },
  };

  const hasToken = (el, suffix) =>
    typeof el?.className === 'string'
    && el.className.split(/\s+/).some(token => token.endsWith(suffix));

  const currentStrings = () => {
    const lang = (doc.documentElement.lang || 'en').split('-')[0];
    return copy[lang] ?? copy.en;
  };

  const resolveViewStore = () => {
    const owner = getWorkspaceOwner?.();
    const store = owner?.store;
    return store && typeof store !== 'function' && typeof store.create === 'function'
      ? store.create()
      : undefined;
  };

  let cachedHeader = null;
  let cachedPanelList = null;
  let cachedListArea = null;
  let cachedNewSessionBtn = null;
  let observedHeader = null;
  let observedHeroSignature = '';
  let lastLang = null;

  const getHeader = () => {
    if (!cachedHeader?.isConnected) {
      cachedHeader = scrollport.querySelector('[data-sidebar-workspace-header]');
    }
    return cachedHeader;
  };
  const getPanelList = () => {
    if (!cachedPanelList?.isConnected) {
      cachedPanelList = scrollport.querySelector('nav[class$="_panelList"], nav[class*="_panelList "]');
    }
    return cachedPanelList;
  };
  const getListArea = () => {
    if (!cachedListArea?.isConnected) {
      cachedListArea = scrollport.querySelector('[data-sidebar-list-area]');
    }
    return cachedListArea;
  };
  const getNewSessionBtn = () => {
    if (!cachedNewSessionBtn?.isConnected) {
      cachedNewSessionBtn = sidebarRoot.querySelector('button[class$="_newSession"], button[class*="_newSession "]');
    }
    return cachedNewSessionBtn;
  };
  const getSearchButton = () => getHeader()?.querySelector('[class$="_searchButton"], [class*="_searchButton "]') ?? null;
  const getSearchInput = () => getHeader()?.querySelector('[class$="_searchInput"], [class*="_searchInput "]') ?? null;
  const getClearButton = () => getHeader()?.querySelector('[class$="_clearButton"], [class*="_clearButton "]') ?? null;
  const isSearchExpanded = () => Boolean(getHeader()?.querySelector('[class$="_searchExpanded"], [class*="_searchExpanded "]'));
  const getAddWorkspaceButton = () => {
    const actions = getHeader()?.querySelector(':is([class$="_headerActions"], [class*="_headerActions "])');
    if (!actions) return null;
    const byIcon = actions.querySelector('svg[data-icon^="dsw-icon-project-add-"]')?.closest('button');
    if (byIcon && actions.contains(byIcon)) return byIcon;
    return actions.querySelector(':scope > button:not([aria-haspopup])')
      ?? actions.querySelector('button:not([aria-haspopup]):not([class$="_wide"]):not([class*="_wide "])')
      ?? null;
  };

  let disposed = false;
  const sortButtons = new Set();
  const decoratedRows = new WeakMap();
  const stampedHeaderNodes = new Set();
  let activeMenu = null;
  let activeButton = null;
  let activeRow = null;
  let detachMenuListeners = null;

  const searchEntry = doc.createElement('div');
  searchEntry.className = 'claude-sidebar-search-entry';
  const searchButton = doc.createElement('button');
  searchButton.type = 'button';
  searchButton.className = 'claude-sidebar-search-row';
  const searchGlyph = doc.createElement('span');
  searchGlyph.className = 'claude-sidebar-search-glyph';
  searchGlyph.setAttribute('aria-hidden', 'true');
  const searchTitle = doc.createElement('span');
  searchTitle.className = 'claude-sidebar-search-title';
  searchButton.append(searchGlyph, searchTitle);
  searchEntry.append(searchButton);

  function closeMenu({ restoreFocus = false } = {}) {
    detachMenuListeners?.();
    detachMenuListeners = null;
    if (activeMenu) {
      activeMenu.remove();
      activeMenu = null;
    }
    if (activeRow) {
      activeRow.removeAttribute('data-claude-sort-open');
      activeRow = null;
    }
    const trigger = activeButton;
    if (activeButton) {
      activeButton.setAttribute('aria-expanded', 'false');
      activeButton = null;
    }
    if (restoreFocus && trigger?.isConnected) {
      trigger.focus({ preventScroll: true });
    }
  }

  function openMenu(row, button) {
    if (activeButton === button && activeMenu) {
      closeMenu({ restoreFocus: true });
      return;
    }
    closeMenu();
    const viewStore = resolveViewStore();
    const snapshot = viewStore?.getSnapshot?.() ?? {
      groupBy: 'workspace',
      orderBy: 'updated',
      archivedFilter: 'default',
    };
    const groupBy = snapshot.groupBy ?? 'workspace';
    const orderBy = snapshot.orderBy ?? 'updated';
    const archivedFilter = snapshot.archivedFilter ?? 'default';
    const strings = currentStrings();

    const menu = doc.createElement('div');
    menu.className = 'claude-workspace-sort-menu';
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-label', strings.sortAria);
    menu.tabIndex = -1;

    const addHeading = text => {
      const el = doc.createElement('div');
      el.className = 'claude-workspace-sort-heading';
      el.setAttribute('role', 'presentation');
      el.textContent = text;
      menu.append(el);
    };

    const addSeparator = () => {
      const el = doc.createElement('div');
      el.className = 'claude-workspace-sort-separator';
      el.setAttribute('role', 'separator');
      menu.append(el);
    };

    const addOption = (label, checked, onSelect) => {
      const item = doc.createElement('button');
      item.type = 'button';
      item.className = 'claude-workspace-sort-item';
      item.setAttribute('role', 'menuitemradio');
      item.setAttribute('aria-checked', String(checked));
      const text = doc.createElement('span');
      text.className = 'claude-workspace-sort-item-label';
      text.textContent = label;
      const check = doc.createElement('span');
      check.className = 'claude-workspace-sort-item-check';
      check.setAttribute('aria-hidden', 'true');
      item.append(text, check);
      item.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        onSelect();
        closeMenu();
      });
      menu.append(item);
    };

    addHeading(strings.groupBy);
    addOption(strings.workspace, groupBy === 'workspace', () => viewStore?.actions?.setGroupBy?.('workspace'));
    addOption(strings.workspaceTree, groupBy === 'workspace-tree', () => viewStore?.actions?.setGroupBy?.('workspace-tree'));
    addOption(strings.flat, groupBy === 'flat', () => viewStore?.actions?.setGroupBy?.('flat'));

    addSeparator();
    addHeading(strings.orderBy);
    addOption(strings.updated, orderBy === 'updated', () => viewStore?.actions?.setOrderBy?.('updated', {}));
    addOption(strings.manual, orderBy === 'manual', () => viewStore?.actions?.setOrderBy?.('manual', {}));

    addSeparator();
    addHeading(strings.filterBy);
    addOption(strings.hideArchived, archivedFilter === 'default', () => viewStore?.actions?.setArchivedFilter?.('default'));
    addOption(strings.showArchived, archivedFilter === 'show', () => viewStore?.actions?.setArchivedFilter?.('show'));
    addOption(strings.onlyArchived, archivedFilter === 'only', () => viewStore?.actions?.setArchivedFilter?.('only'));

    const hasWorkspaceMenu = Boolean(
      row.querySelector('[data-slot="contextMenu.button"] button, button[aria-haspopup="menu"]:not(.claude-workspace-sort-btn)'),
    );
    const addWsBtn = getAddWorkspaceButton();
    if (hasWorkspaceMenu || addWsBtn) {
      addSeparator();
      const addAction = (iconKind, label, onRun) => {
        const actionItem = doc.createElement('button');
        actionItem.type = 'button';
        actionItem.className = 'claude-workspace-sort-item claude-workspace-sort-action';
        actionItem.setAttribute('role', 'menuitem');
        const icon = doc.createElement('span');
        icon.className = 'claude-workspace-sort-action-icon';
        icon.dataset.icon = iconKind;
        icon.setAttribute('aria-hidden', 'true');
        const text = doc.createElement('span');
        text.className = 'claude-workspace-sort-item-label';
        text.textContent = label;
        actionItem.append(icon, text);
        actionItem.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          closeMenu();
          onRun();
        });
        menu.append(actionItem);
      };
      if (hasWorkspaceMenu) {
        addAction('manage', strings.manageWorkspace, () => {
          const rect = row.getBoundingClientRect();
          row.dispatchEvent(new win.MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: true,
            view: win,
            button: 2,
            clientX: Math.round(Math.max(rect.left + 24, rect.right - 36)),
            clientY: Math.round(rect.bottom - 4),
          }));
        });
      }
      if (addWsBtn) {
        addAction('add', strings.addWorkspace, () => {
          getAddWorkspaceButton()?.click();
        });
      }
    }

    doc.body.append(menu);
    activeMenu = menu;
    activeButton = button;
    activeRow = row;
    button.setAttribute('aria-expanded', 'true');
    row.setAttribute('data-claude-sort-open', 'true');

    const anchorRect = button.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const margin = 8;
    const gap = 4;
    let left = anchorRect.right - menuRect.width;
    if (left < margin) left = margin;
    if (left + menuRect.width > win.innerWidth - margin) {
      left = Math.max(margin, win.innerWidth - menuRect.width - margin);
    }
    let top = anchorRect.bottom + gap;
    if (top + menuRect.height > win.innerHeight - margin && anchorRect.top - gap - menuRect.height >= margin) {
      top = anchorRect.top - gap - menuRect.height;
    }
    menu.style.left = `${Math.round(left)}px`;
    menu.style.top = `${Math.round(top)}px`;

    const items = Array.from(menu.querySelectorAll('button[role^="menuitem"]'));
    items[0]?.focus({ preventScroll: true });

    const onDocPointerDown = event => {
      const target = event.target;
      if (target && (menu.contains(target) || button.contains(target))) return;
      closeMenu();
    };
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        closeMenu({ restoreFocus: true });
        return;
      }
      if (event.key === 'Tab') {
        closeMenu();
        return;
      }
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key) || items.length === 0) return;
      event.preventDefault();
      event.stopPropagation();
      const currentIndex = items.indexOf(doc.activeElement);
      let nextIndex = 0;
      if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = items.length - 1;
      else if (event.key === 'ArrowDown') nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
      else nextIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
      items[nextIndex]?.focus({ preventScroll: true });
    };
    const onDismiss = () => closeMenu();
    const listArea = scrollport.querySelector('[data-sidebar-list-area]');

    doc.addEventListener('pointerdown', onDocPointerDown, true);
    doc.addEventListener('keydown', onKeyDown, true);
    win.addEventListener('resize', onDismiss);
    win.addEventListener('blur', onDismiss);
    scrollport.addEventListener('scroll', onDismiss, { passive: true });
    listArea?.addEventListener('scroll', onDismiss, { passive: true });

    detachMenuListeners = () => {
      doc.removeEventListener('pointerdown', onDocPointerDown, true);
      doc.removeEventListener('keydown', onKeyDown, true);
      win.removeEventListener('resize', onDismiss);
      win.removeEventListener('blur', onDismiss);
      scrollport.removeEventListener('scroll', onDismiss);
      listArea?.removeEventListener('scroll', onDismiss);
    };
  }

  function createSortButton(row) {
    const btn = doc.createElement('button');
    btn.type = 'button';
    btn.className = 'claude-workspace-sort-btn';
    btn.setAttribute('aria-haspopup', 'menu');
    btn.setAttribute('aria-expanded', 'false');
    const glyph = doc.createElement('span');
    glyph.setAttribute('aria-hidden', 'true');
    btn.append(glyph);
    const stop = event => { event.stopPropagation(); };
    btn.addEventListener('pointerdown', stop);
    btn.addEventListener('mousedown', stop);
    btn.addEventListener('dragstart', event => {
      event.preventDefault();
      event.stopPropagation();
    });
    btn.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      openMenu(row, btn);
    });
    sortButtons.add(btn);
    return btn;
  }

  function onSearchClick(event) {
    event.preventDefault();
    event.stopPropagation();
    closeMenu();
    if (isSearchExpanded()) {
      const input = getSearchInput();
      if (input && input.value.trim() !== '') {
        input.focus({ preventScroll: true });
      } else {
        getClearButton()?.click();
      }
      return;
    }
    getSearchButton()?.click();
    win.requestAnimationFrame?.(() => {
      getSearchInput()?.focus({ preventScroll: true });
    });
  }
  searchButton.addEventListener('click', onSearchClick);

  function setAttrIfChanged(el, name, value) {
    if (!el) return;
    if (value === null) {
      if (el.hasAttribute(name)) el.removeAttribute(name);
    } else if (el.getAttribute(name) !== value) {
      el.setAttribute(name, value);
    }
  }

  function syncHeroActive() {
    if (disposed) return;
    const btn = getNewSessionBtn();
    const conv = doc.querySelector('[data-conversation-content]');
    const isHero = Boolean(conv?.getAttribute('data-content-phase') === 'hero' && !doc.querySelector('[data-global-panel]'));
    setAttrIfChanged(btn, 'data-claude-hero-active', isHero ? 'true' : null);

    const centerCol = doc.querySelector('[class$="_centerCol"], [class*="_centerCol "]');
    const centerSlot = centerCol?.firstElementChild ?? null;
    const mainPanel = doc.querySelector('[class$="_mainPanel"], [class*="_mainPanel "]');
    const viewArea = mainPanel?.lastElementChild ?? null;
    const viewSlot = viewArea && viewArea !== conv ? viewArea.firstElementChild : null;
    const containers = [centerCol, centerSlot, mainPanel, viewArea, viewSlot].filter(
      (node, idx, arr) => node && node !== conv && arr.indexOf(node) === idx,
    );
    const sig = `${containers.length}:${Boolean(conv)}:${containers.map(n => n.tagName).join(',')}`;
    // Always rebind if any tracked node changed reference
    if (
      sig !== observedHeroSignature
      || !syncHeroActive._nodes
      || syncHeroActive._conv !== conv
      || syncHeroActive._nodes.some((n, i) => n !== containers[i])
    ) {
      heroObserver.disconnect();
      observedHeroSignature = sig;
      syncHeroActive._nodes = containers;
      syncHeroActive._conv = conv;
      for (const node of containers) {
        heroObserver.observe(node, { childList: true });
      }
      if (conv) {
        heroObserver.observe(conv, { attributes: true, attributeFilter: ['data-content-phase'] });
      }
    }
  }

  function syncHeaderAndNav() {
    if (disposed) return;
    const strings = currentStrings();
    if (searchTitle.textContent !== strings.search) searchTitle.textContent = strings.search;
    if (searchButton.getAttribute('aria-label') !== strings.searchAria) {
      searchButton.setAttribute('aria-label', strings.searchAria);
      searchButton.title = strings.searchAria;
    }

    const header = getHeader();
    if (header !== observedHeader) {
      headerObserver.disconnect();
      observedHeader = header;
      if (observedHeader) {
        headerObserver.observe(observedHeader, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['class', 'aria-expanded', 'aria-keyshortcuts'],
        });
      }
    }

    const hostSearchBtn = getSearchButton();
    const shortcut = hostSearchBtn?.getAttribute('aria-keyshortcuts') ?? null;
    setAttrIfChanged(searchButton, 'aria-keyshortcuts', shortcut);

    const searchOpen = isSearchExpanded();
    setAttrIfChanged(searchButton, 'aria-expanded', String(searchOpen));

    const listScope = getListArea() ?? scrollport;
    const hasWorkspaceRow = Boolean(listScope.querySelector('[data-row-key^="workspace:"]'));
    const mode = searchOpen ? 'search' : hasWorkspaceRow ? 'collapsed' : 'flat';
    if (header) {
      stampedHeaderNodes.add(header);
      setAttrIfChanged(header, 'data-claude-ws-header', mode);
      const wsRoot = header.parentElement;
      if (wsRoot) {
        stampedHeaderNodes.add(wsRoot);
        setAttrIfChanged(wsRoot, 'data-claude-ws-header', mode);
      }
    }

    const panelList = getPanelList();
    if (panelList) {
      if (panelList.firstElementChild !== searchEntry) {
        panelList.insertBefore(searchEntry, panelList.firstElementChild);
      }
    } else {
      const regionArea = scrollport.querySelector('[class$="_regionArea"], [class*="_regionArea "]');
      if (regionArea && searchEntry.parentElement !== scrollport) {
        scrollport.insertBefore(searchEntry, regionArea);
      }
    }
  }

  function decorateWorkspaceRow(row, strings) {
    const existing = decoratedRows.get(row);
    if (existing?.isConnected && existing.parentElement?.parentElement === row) {
      if (existing.parentElement.firstElementChild !== existing) {
        existing.parentElement.insertBefore(existing, existing.parentElement.firstElementChild);
      }
      if (existing.getAttribute('aria-label') !== strings.sortAria) {
        existing.setAttribute('aria-label', strings.sortAria);
        existing.title = strings.sortAria;
      }
      return;
    }
    let rowActions = null;
    for (let child = row.firstElementChild; child; child = child.nextElementSibling) {
      if (hasToken(child, '_rowActions')) {
        rowActions = child;
        break;
      }
    }
    if (!rowActions) return;
    let sortBtn = rowActions.querySelector(':scope > .claude-workspace-sort-btn');
    if (!sortBtn) {
      sortBtn = createSortButton(row);
      rowActions.insertBefore(sortBtn, rowActions.firstElementChild);
    } else if (rowActions.firstElementChild !== sortBtn) {
      rowActions.insertBefore(sortBtn, rowActions.firstElementChild);
    }
    if (sortBtn.getAttribute('aria-label') !== strings.sortAria) {
      sortBtn.setAttribute('aria-label', strings.sortAria);
      sortBtn.title = strings.sortAria;
    }
    decoratedRows.set(row, sortBtn);
  }

  function syncWorkspaceRows(forceAll = false) {
    if (disposed) return;
    if (activeRow && !activeRow.isConnected) {
      closeMenu();
    }
    for (const btn of Array.from(sortButtons)) {
      if (!btn.isConnected) sortButtons.delete(btn);
    }
    const strings = currentStrings();
    const lang = doc.documentElement.lang || '';
    const langChanged = lang !== lastLang;
    lastLang = lang;
    const listScope = getListArea() ?? scrollport;
    const workspaceRows = listScope.querySelectorAll('[data-row-key^="workspace:"]');
    for (const row of workspaceRows) {
      if (!forceAll && !langChanged && decoratedRows.get(row)?.isConnected) continue;
      decorateWorkspaceRow(row, strings);
    }
  }

  const isOwnNode = node =>
    node === searchEntry
    || (node?.nodeType === 1 && (
      node.classList?.contains('claude-workspace-sort-btn')
      || node.classList?.contains('claude-sidebar-search-entry')
    ));

  const headerObserver = new win.MutationObserver(records => {
    if (disposed) return;
    if (records.every(r => isOwnNode(r.target))) return;
    syncHeaderAndNav();
  });

  const heroObserver = new win.MutationObserver(() => {
    syncHeroActive();
  });

  const scrollportObserver = new win.MutationObserver(records => {
    if (disposed) return;
    let needsHeader = false;
    let needsRows = false;
    for (const r of records) {
      const target = r.target;
      if (target === doc.documentElement) {
        needsHeader = true;
        needsRows = true;
        break;
      }
      if (!target || target.nodeType !== 1) continue;
      // Fast-skip all high-frequency session row mutations (spinners, timestamps, hover actions)
      if (target.closest?.('[data-row-key^="session:"]')) continue;
      const addedNonOwn = Array.from(r.addedNodes).some(n => n.nodeType === 1 && !isOwnNode(n));
      const removedNonOwn = Array.from(r.removedNodes).some(n => n.nodeType === 1 && !isOwnNode(n));
      if (!addedNonOwn && !removedNonOwn) continue;
      needsHeader = true;
      needsRows = true;
      break;
    }
    if (needsHeader) syncHeaderAndNav();
    if (needsRows) syncWorkspaceRows(false);
  });

  scrollportObserver.observe(scrollport, { childList: true, subtree: true });
  if (doc.documentElement) {
    scrollportObserver.observe(doc.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  const unsubscribeStore = resolveViewStore()?.subscribe?.(() => {
    syncHeaderAndNav();
  });

  syncHeaderAndNav();
  syncWorkspaceRows(true);
  syncHeroActive();

  return () => {
    disposed = true;
    headerObserver.disconnect();
    heroObserver.disconnect();
    scrollportObserver.disconnect();
    unsubscribeStore?.();
    closeMenu();
    searchButton.removeEventListener('click', onSearchClick);
    searchEntry.remove();
    setAttrIfChanged(cachedNewSessionBtn, 'data-claude-hero-active', null);
    for (const node of stampedHeaderNodes) {
      node.removeAttribute('data-claude-ws-header');
    }
    stampedHeaderNodes.clear();
    for (const btn of sortButtons) btn.remove();
    sortButtons.clear();
  };
}

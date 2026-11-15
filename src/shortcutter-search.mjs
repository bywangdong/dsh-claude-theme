// Reversible Claude Desktop floating command-palette enhancement for companion `dsh-shortcutter`'s `f` shortcut
// (`<dialog class="sc-root sc-dialog sc-session-search">`).
// - Observes `document.body` direct children only (`subtree: false`) so zero work runs during normal chat/typing.
// - Stamps localized Claude relative-recency buckets (`Today`, `Yesterday`, `Past week`, `Past month`, `Past year`)
//   via `data-claude-reltime` without mutating React-owned text nodes, and restores all attributes on close/unload.

export function observeShortcutterSearch(doc, getSessionsSnapshot) {
  const win = doc?.defaultView;
  if (!win?.MutationObserver || typeof doc?.body?.querySelectorAll !== 'function') {
    return () => {};
  }

  const copy = {
    zh: {
      placeholder: '搜索会话与项目',
      today: '今天',
      yesterday: '昨天',
      pastWeek: '过去一周',
      pastMonth: '过去一个月',
      pastYear: '过去一年',
      older: '更早',
    },
    en: {
      placeholder: 'Search sessions and projects',
      today: 'Today',
      yesterday: 'Yesterday',
      pastWeek: 'Past week',
      pastMonth: 'Past month',
      pastYear: 'Past year',
      older: 'Older',
    },
    ja: {
      placeholder: 'セッションとプロジェクトを検索',
      today: '今日',
      yesterday: '昨日',
      pastWeek: '過去1週間',
      pastMonth: '過去1か月',
      pastYear: '過去1年',
      older: 'それ以前',
    },
    es: {
      placeholder: 'Buscar sesiones y proyectos',
      today: 'Hoy',
      yesterday: 'Ayer',
      pastWeek: 'Última semana',
      pastMonth: 'Último mes',
      pastYear: 'Último año',
      older: 'Anterior',
    },
    fr: {
      placeholder: 'Rechercher des sessions et projets',
      today: "Aujourd'hui",
      yesterday: 'Hier',
      pastWeek: '7 derniers jours',
      pastMonth: '30 derniers jours',
      pastYear: 'Dernière année',
      older: 'Plus ancien',
    },
    de: {
      placeholder: 'Sitzungen und Projekte suchen',
      today: 'Heute',
      yesterday: 'Gestern',
      pastWeek: 'Letzte Woche',
      pastMonth: 'Letzter Monat',
      pastYear: 'Letztes Jahr',
      older: 'Älter',
    },
    ru: {
      placeholder: 'Поиск сеансов и проектов',
      today: 'Сегодня',
      yesterday: 'Вчера',
      pastWeek: 'За неделю',
      pastMonth: 'За месяц',
      pastYear: 'За год',
      older: 'Ранее',
    },
    pt: {
      placeholder: 'Buscar sessões e projetos',
      today: 'Hoje',
      yesterday: 'Ontem',
      pastWeek: 'Última semana',
      pastMonth: 'Último mês',
      pastYear: 'Último ano',
      older: 'Mais antigo',
    },
  };

  function localeCopy() {
    const raw = (doc.documentElement?.lang || win.navigator?.language || 'zh').toLowerCase();
    for (const key of Object.keys(copy)) {
      if (raw.startsWith(key)) return copy[key];
    }
    return copy.en;
  }

  function formatRelativeBucket(rawTimestamp, nowMs, dict) {
    const num = Number(rawTimestamp);
    if (!Number.isFinite(num) || num <= 0) return '';
    const ts = num < 1e11 ? num * 1000 : num;
    const nowDate = new Date(nowMs);
    const startOfToday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()).getTime();
    if (ts >= startOfToday) return dict.today;
    const startOfYesterday = startOfToday - 86_400_000;
    if (ts >= startOfYesterday) return dict.yesterday;
    const ageDays = (nowMs - ts) / 86_400_000;
    if (ageDays < 7) return dict.pastWeek;
    if (ageDays < 30) return dict.pastMonth;
    if (ageDays < 365) return dict.pastYear;
    return dict.older;
  }

  const activeDialogs = new Map();

  function mountDialog(dialog) {
    if (activeDialogs.has(dialog)) return;
    const input = dialog.querySelector('.sc-search-header input');
    const resultsEl = dialog.querySelector('.sc-search-results');
    const statusEl = dialog.querySelector('.sc-search-status');
    const hadPlaceholder = Boolean(input?.hasAttribute('placeholder'));
    const origPlaceholder = hadPlaceholder ? input.getAttribute('placeholder') : null;

    function syncDialog() {
      const dict = localeCopy();
      if (input && input.getAttribute('placeholder') !== dict.placeholder) {
        input.setAttribute('placeholder', dict.placeholder);
      }

      if (statusEl) {
        const text = statusEl.textContent || '';
        const isError = /不可用|失败|unavailable|error/i.test(text);
        if (isError) {
          if (statusEl.getAttribute('data-claude-error') !== 'true') {
            statusEl.setAttribute('data-claude-error', 'true');
          }
        } else if (statusEl.hasAttribute('data-claude-error')) {
          statusEl.removeAttribute('data-claude-error');
        }
      }

      const byId = getSessionsSnapshot?.()?.byId ?? null;
      const nowMs = Date.now();
      const rawQuery = (input?.value || '').normalize('NFKC').trim().toLocaleLowerCase();
      const terms = rawQuery ? rawQuery.split(/\s+/).filter(Boolean) : [];
      const prefix = 'sc-session-result-';

      for (const row of dialog.querySelectorAll('.sc-search-result')) {
        const sessionId = typeof row.id === 'string' && row.id.startsWith(prefix)
          ? row.id.slice(prefix.length)
          : '';
        const updatedAt = sessionId && byId ? byId[sessionId]?.updatedAt : undefined;
        const relLabel = updatedAt ? formatRelativeBucket(updatedAt, nowMs, dict) : '';
        const muted = row.querySelector(':scope > .sc-muted');
        if (muted) {
          if (relLabel) {
            if (muted.getAttribute('data-claude-reltime') !== relLabel) {
              muted.setAttribute('data-claude-reltime', relLabel);
            }
          } else if (muted.hasAttribute('data-claude-reltime')) {
            muted.removeAttribute('data-claude-reltime');
          }
        }

        let projectHit = false;
        if (terms.length > 0) {
          const titleText = (row.querySelector('.sc-search-text strong')?.textContent || '')
            .normalize('NFKC')
            .toLocaleLowerCase();
          const wsText = (row.querySelector('.sc-search-text small')?.textContent || '')
            .normalize('NFKC')
            .toLocaleLowerCase();
          projectHit = Boolean(wsText) && terms.some(term => !titleText.includes(term) && wsText.includes(term));
        }
        if (projectHit) {
          if (row.getAttribute('data-claude-project-hit') !== 'true') {
            row.setAttribute('data-claude-project-hit', 'true');
          }
        } else if (row.hasAttribute('data-claude-project-hit')) {
          row.removeAttribute('data-claude-project-hit');
        }
      }
    }

    const innerObserver = new win.MutationObserver(syncDialog);
    if (resultsEl) innerObserver.observe(resultsEl, { childList: true });
    if (statusEl) innerObserver.observe(statusEl, { childList: true, characterData: true, subtree: true });
    if (doc.documentElement) {
      innerObserver.observe(doc.documentElement, { attributes: true, attributeFilter: ['lang'] });
    }
    input?.addEventListener('input', syncDialog);
    syncDialog();

    activeDialogs.set(dialog, () => {
      innerObserver.disconnect();
      input?.removeEventListener('input', syncDialog);
      if (input) {
        if (hadPlaceholder && origPlaceholder !== null) input.setAttribute('placeholder', origPlaceholder);
        else input.removeAttribute('placeholder');
      }
      statusEl?.removeAttribute('data-claude-error');
      for (const node of dialog.querySelectorAll('[data-claude-reltime]')) {
        node.removeAttribute('data-claude-reltime');
      }
      for (const node of dialog.querySelectorAll('[data-claude-project-hit]')) {
        node.removeAttribute('data-claude-project-hit');
      }
    });
  }

  function reconcileDialogs() {
    for (const [dialog, cleanup] of activeDialogs) {
      if (!dialog.isConnected) {
        cleanup();
        activeDialogs.delete(dialog);
      }
    }
    for (const dialog of doc.body.querySelectorAll(':scope > dialog.sc-session-search')) {
      mountDialog(dialog);
    }
  }

  const bodyObserver = new win.MutationObserver(reconcileDialogs);
  bodyObserver.observe(doc.body, { childList: true });
  reconcileDialogs();

  return () => {
    bodyObserver.disconnect();
    for (const cleanup of activeDialogs.values()) cleanup();
    activeDialogs.clear();
  };
}

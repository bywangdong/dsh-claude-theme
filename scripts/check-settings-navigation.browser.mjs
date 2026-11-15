// Run in a real browser with the exported enhancement function. The detached
// document exercises native MutationObserver delivery without touching app UI.
export async function checkSettingsNavigation(enhance) {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const flush = () => new Promise(resolve => setTimeout(resolve, 0));
  const doc = document.implementation.createHTMLDocument('Navigation checks');
  doc.documentElement.lang = 'en';
  doc.body.innerHTML = '<section><nav aria-label="Original navigation"><div class="test_navList"></div></nav></section>';
  const panel = doc.querySelector('section');
  const list = doc.querySelector('.test_navList');
  const sections = [
    { id: 'account', label: 'Account' },
    { id: 'general', label: 'General' },
    { id: 'models', label: 'Models' },
    { id: 'plugins', label: 'Built-in plugins' },
    { id: 'agent-presets', label: 'Agent presets' },
    { id: 'dsh-shortcutter', label: 'Shortcutter' },
  ];
  const clicks = [];
  const makeButton = section => {
    const button = doc.createElement('button');
    button.textContent = section.label;
    button.addEventListener('click', () => clicks.push(section.id));
    return button;
  };
  list.append(...sections.map(makeButton));
  const dispose = enhance(panel, () => sections);
  let observer;
  try {
    const headings = [...list.querySelectorAll('.claude-settings-nav-heading')];
    assert(headings.length === 2, 'expected two groups');
    const general = list.querySelector('[data-claude-settings-id="general"]');
    general.append(doc.createElementNS('http://www.w3.org/2000/svg', 'svg'));
    await flush();
    assert(headings.every(node => node.isConnected), 'icon hydration must preserve heading nodes');
    assert(headings[0] === list.querySelector('.claude-settings-nav-heading'), 'unrelated nested changes must not rebuild headings');

    for (let i = 0; i < 40; i++) {
      const old = list.querySelector('[data-claude-settings-id="general"]');
      old.replaceWith(makeButton(sections[1]));
      await flush();
      assert(!old.hasAttribute('data-claude-settings-id'), 'removed rows must be restored immediately');
    }
    assert(list.querySelectorAll('[data-claude-settings-id]').length === 6, 'replacement must keep six live rows');

    const input = panel.querySelector('input[type="search"]');
    input.value = 'shortcuts';
    input.dispatchEvent(new Event('input'));
    const visible = [...list.querySelectorAll('button:not([data-claude-search-hidden])')];
    assert(visible.length === 1 && visible[0].textContent === 'Shortcutter', 'keyword search should show only Shortcutter');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    assert(clicks.length === 1 && clicks[0] === 'dsh-shortcutter', 'Enter must call the original row action');

    let repeatedSearchWrites = 0;
    observer = new MutationObserver(records => { repeatedSearchWrites += records.length; });
    observer.observe(panel, { subtree: true, attributes: true, childList: true, characterData: true });
    input.dispatchEvent(new Event('input'));
    await flush();
    assert(repeatedSearchWrites === 0, 'unchanged search results must do no DOM writes');
    observer.disconnect();

    input.value = 'no-such-setting';
    input.dispatchEvent(new Event('input'));
    assert(!panel.querySelector('[role="status"]').hidden, 'empty search should show a status');
    doc.documentElement.lang = 'zh';
    await flush();
    assert(input.placeholder === '搜索', 'locale change must refresh search copy');
    panel.querySelector('.claude-settings-search-clear').click();
    assert(list.querySelectorAll('button:not([data-claude-search-hidden])').length === 6, 'clear should restore all original rows');

    dispose();
    assert(!panel.querySelector('.claude-settings-search'), 'dispose must remove search');
    assert(!list.querySelector('.claude-settings-nav-heading'), 'dispose must remove headings');
    assert(!list.querySelector('[data-claude-settings-id]'), 'dispose must restore row attributes');
    assert(panel.querySelector('nav').getAttribute('aria-label') === 'Original navigation', 'dispose must restore navigation label');
    list.append(makeButton({ id: 'later', label: 'Later' }));
    doc.documentElement.lang = 'en';
    await flush();
    assert(!panel.querySelector('.claude-settings-search'), 'observer must stay disconnected after disposal');
    return { passed: true, rowReplacements: 40, repeatedSearchWrites, preservedHeadings: true, originalClickHandler: true, localeAndCleanup: true };
  } finally {
    observer?.disconnect();
    dispose();
  }
}

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const CONFIG = {
    langs: ['uk', 'ru', 'en'],
    defaultLang: 'uk',
    storageKey: 'lc-lang'
  };

  const langElements  = document.querySelectorAll('[data-lang]');
  const switchButtons = document.querySelectorAll('[data-switch]');
  const faqQuestions  = document.querySelectorAll('.faq-q');

  function getSavedLang() {
    try { return localStorage.getItem(CONFIG.storageKey); }
    catch (e) { return null; }
  }

  function saveLang(lang) {
    try { localStorage.setItem(CONFIG.storageKey, lang); }
    catch (e) { /* storage unavailable — silent */ }
  }

  function setLang(lang) {
    const current = CONFIG.langs.includes(lang) ? lang : CONFIG.defaultLang;
    document.documentElement.lang = current;
    langElements.forEach(el => el.classList.toggle('visible', el.dataset.lang === current));
    switchButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.switch === current));
    saveLang(current);
  }

  setLang(getSavedLang() || CONFIG.defaultLang);
  switchButtons.forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.switch)));

  // FAQ accordion
  faqQuestions.forEach((q, i) => {
    const panelId = `faq-panel-${i + 1}`;
    const item  = q.closest('.faq-item');
    const panel = item?.querySelector('.faq-a');

    q.setAttribute('aria-expanded', 'false');
    q.setAttribute('aria-controls', panelId);
    if (panel) { panel.id = panelId; panel.setAttribute('aria-hidden', 'true'); }

    q.addEventListener('click', () => {
      if (!item) return;
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
        openItem.querySelector('.faq-a')?.setAttribute('aria-hidden', 'true');
      });

      if (!isOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
        panel?.setAttribute('aria-hidden', 'false');
      }
    });
  });
});

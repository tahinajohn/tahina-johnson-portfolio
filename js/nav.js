/* === SHARED NAV (with i18n) === */
const NAV_ITEMS = [
  { key: 'about',      file: 'about.html',      id: 'about',      idx: '01' },
  { key: 'experience', file: 'experience.html', id: 'experience', idx: '02' },
  { key: 'skills',     file: 'skills.html',     id: 'skills',     idx: '03' },
  { key: 'projects',   file: 'projects.html',   id: 'projects',   idx: '04' },
  { key: 'research',   file: 'research.html',   id: 'research',   idx: '05' },
  { key: 'chat',       file: 'chat.html',       id: 'chat',       idx: '06' },
  { key: 'contact',    file: 'contact.html',    id: 'contact',    idx: '07', cta: true },
];

function injectNav(activeId) {
  const inPages  = window.location.pathname.includes('/pages/');
  const base     = inPages ? '' : 'pages/';
  const homeHref = inPages ? 'about.html' : 'pages/about.html';

  const links = NAV_ITEMS.map(item => {
    const cls = ['nav-link', item.cta ? 'nav-link--cta' : '', activeId === item.id ? 'active' : '']
      .filter(Boolean).join(' ');
    return `<li><a href="${base}${item.file}" class="${cls}" data-i18n="nav.${item.key}"></a></li>`;
  }).join('');

  const html = `
    <header class="nav-wrapper">
      <nav class="navbar" id="navbar">
        <a href="${homeHref}" class="nav-logo">
          <span class="logo-bracket">[</span>TJ<span class="logo-bracket">]</span>
        </a>
        <ul class="nav-links" id="navLinks">${links}</ul>
        <div class="nav-right">
          <button class="lang-switch" id="langSwitch" aria-label="Switch language">
            <span class="lang-opt" data-lang="fr">FR</span>
            <span class="lang-sep">/</span>
            <span class="lang-opt" data-lang="en">EN</span>
          </button>
          <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark/light mode">
            <span class="theme-toggle-icon" id="themeIcon">☀️</span>
          </button>
          <button class="hamburger" id="hamburger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </header>`;

  document.body.insertAdjacentHTML('afterbegin', html);

  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');
  const langSwitch = document.getElementById('langSwitch');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });

  updateLangUI(langSwitch);
  langSwitch.addEventListener('click', e => {
    const btn = e.target.closest('[data-lang]');
    if (!btn) return;
    setLang(btn.getAttribute('data-lang'));
    applyTranslations();
    updateLangUI(langSwitch);
  });

  applyTranslations();

  // ── Theme toggle ──
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  initTheme(themeToggle, themeIcon);
}

/* ═══════════════════════════════════
   THEME (dark / light)
═══════════════════════════════════ */

const THEME_KEY = 'portfolio-color-mode';

function getStoredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  // Respect OS preference on first visit
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(mode) {
  document.documentElement.setAttribute('data-color-mode', mode);
  localStorage.setItem(THEME_KEY, mode);
}

function initTheme(btn, iconEl) {
  // Apply saved/OS theme immediately
  const current = getStoredTheme();
  applyTheme(current);
  updateThemeIcon(iconEl, current);

  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-color-mode') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    updateThemeIcon(iconEl, next);
    // Animate icon
    iconEl.style.transform = 'rotate(360deg) scale(0.5)';
    setTimeout(() => { iconEl.style.transform = ''; }, 350);
  });

  // Listen to OS change
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    if (!localStorage.getItem(THEME_KEY)) {
      const mode = e.matches ? 'light' : 'dark';
      applyTheme(mode);
      updateThemeIcon(iconEl, mode);
    }
  });
}

function updateThemeIcon(iconEl, mode) {
  if (!iconEl) return;
  iconEl.textContent = mode === 'dark' ? '☀️' : '🌙';
  iconEl.title = mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
}

function updateLangUI(switcher) {
  const current = getLang();
  switcher.querySelectorAll('.lang-opt').forEach(opt => {
    opt.classList.toggle('lang-active', opt.getAttribute('data-lang') === current);
  });
}

/* Reveal on scroll */
function initReveal() {
  const style = document.createElement('style');
  style.textContent = `.will-reveal.visible{opacity:1!important;transform:translateY(0)!important}`;
  document.head.appendChild(style);
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => {
    el.style.cssText += 'opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease';
    el.classList.add('will-reveal');
    obs.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', initReveal);

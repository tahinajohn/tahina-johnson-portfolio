/* === SKILLS DATA & RENDERER === */

const COMPETENCES = [
  { icon: '../assets/web.svg',                              key: 'backend'   },
  { icon: '../assets/workflows-svgrepo-com.svg',            key: 'auto'      },
  { icon: '../assets/machine-learning-01-svgrepo-com.svg',  key: 'ml'        },
  { icon: '../assets/deep-learning-svgrepo-com.svg',        key: 'dl'        },
  { icon: '../assets/machine-learning-04-svgrepo-com.svg',  key: 'agent'     },
  { icon: '../assets/chat-search-svgrepo-com.svg',          key: 'nlp'       },
  { icon: '../assets/object-detection-svgrepo-com.svg',     key: 'vision'    },
  { icon: '../assets/cloud-computing-seo-and-web-svgrepo-com.svg', key: 'cloud' },
  { icon: '../assets/statistics-graph-svgrepo-com.svg',     key: 'stats'     },
];

const TECHNOLOGIES = [
  { icon: '../assets/python-svgrepo-com.svg',               key: 'python'    },
  { icon: '../assets/huggingface-color.svg',                key: 'hf'        },
  { icon: '../assets/n8n-color.svg',                        key: 'n8n'       },
  { icon: '../assets/ollama.svg',                           key: 'ollama'    },
  { icon: '../assets/langchain-color.svg',                  key: 'langchain' },
  { icon: '../assets/scikit-learn.svg',                     key: 'sklearn'   },
  { icon: '../assets/pandas-svgrepo-com.svg',               key: 'pandas'    },
  { icon: '../assets/pytorch-svgrepo-com.svg',              key: 'pytorch'   },
  { icon: '../assets/sql-database-generic-svgrepo-com.svg', key: 'sql'       },
  { icon: '../assets/fastapi-svgrepo-com.svg',              key: 'fastapi'   },
  { icon: '../assets/postgresql-svgrepo-com.svg',           key: 'postgres'  },
  { icon: '../assets/git-svgrepo-com.svg',                  key: 'git'       },
  { icon: '../assets/docker-svgrepo-com.svg',               key: 'docker'    },
];

function buildCard(item, translations, index) {
  const t = translations[item.key] || { nom: item.key, description: '' };
  const delay = (index % 9) * 60;
  return `
    <div class="sk-card reveal" style="animation-delay:${delay}ms">
      <div class="sk-card-icon-wrap">
        <img src="${item.icon}" alt="${t.nom}" class="sk-card-icon"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
        <div class="sk-card-icon-fallback" style="display:none">◈</div>
      </div>
      <h3 class="sk-card-name">${t.nom}</h3>
      <p class="sk-card-desc">${t.description}</p>
    </div>`;
}

function renderSkills() {
  const lang = typeof getLang === 'function' ? getLang() : 'en';
  const t = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang] && TRANSLATIONS[lang].skills)
    ? TRANSLATIONS[lang].skills
    : {};

  const cGrid = document.getElementById('skillsGrid');
  const tGrid = document.getElementById('techGrid');

  if (cGrid) cGrid.innerHTML = COMPETENCES.map((item, i) => buildCard(item, t.competences || {}, i)).join('');
  if (tGrid) tGrid.innerHTML = TECHNOLOGIES.map((item, i) => buildCard(item, t.technologies || {}, i)).join('');
}

/* Re-render when language switches */
document.addEventListener('langchange', renderSkills);

/* =====================
   ACHIEVEMENTS DATA
   Add your items here — the UI generates automatically.
   cert_image: path to certificate image (null = show placeholder)
===================== */

const ACHIEVEMENTS = {
  certifications: [
    {
      id: 'cert_n8n',
      icon: '⚙️',
      color: '#ff6b35',
      title_fr: 'Introduction à n8n',
      title_en: 'Introduction to n8n',
      org:  'DataCamp',
      date: '2026',
      badge_fr: 'Automatisation',
      badge_en: 'Automation',
      cert_image: '../assets/certs/n8n.png',
    },
    {
      id: 'cert_ai_agents',
      icon: '🤖',
      color: '#a78bfa',
      title_fr: 'Introduction aux agents IA',
      title_en: 'Introduction to AI Agents',
      org:  'DataCamp',
      date: '2026',
      badge_fr: 'Python',
      badge_en: 'Python',
      cert_image: '../assets/certs/ai-agent.png',
    },
  ],
  diplomas: [
    {
      id: 'diploma_master',
      icon: '🎓',
      color: '#fbbf24',
      title_fr: "Master en Informatique",
      title_en: "Master's Degree in Computer Science",
      org_fr: 'Institut Supérieur Polytechnique de Madagascar (ISPM)',
      org_en: 'Higher Polytechnic Institute of Madagascar (ISPM)',
      date: '2025',
      badge_fr: 'Bac+5',
      badge_en: 'Bac+5',
      cert_image: "../assets/certs/master.png",
    },
    {
      id: 'diploma_licence',
      icon: '📘',
      color: '#3cc4ff',
      title_fr: 'Licence en Informatique',
      title_en: "Bachelor's Degree in Computer Science",
      org_fr: 'Institut Supérieur Polytechnique de Madagascar (ISPM)',
      org_en: 'Higher Polytechnic Institute of Madagascar (ISPM)',
      date: '2022',
      badge_fr: 'Bac+3',
      badge_en: 'Bac+3',
      cert_image: "../assets/certs/licence.png",
    },
  ],
  languages: [
    {
      id: 'lang_english',
      icon: '🇬🇧',
      color: '#2dd4bf',
      title_fr: 'Certificat d\'Anglais',
      title_en: 'English Language Certificate',
      org:  'English Teaching Program (ETP)',
      date: '2024',
      badge_fr: 'C1 Avancé',
      badge_en: 'C1 Advanced',
      cert_image: '../assets/certs/english.png',
    },
  ],
  events: [
    {
      id: 'event_dl_indaba',
      icon: '🧠',
      color: '#4f46e5',
      title_fr: 'Deep Learning Indaba 2024',
      title_en: 'Deep Learning Indaba 2024',
      org:  'Dakar, Sénégal',
      date: '2024',
      badge_fr: 'Conférence',
      badge_en: 'Conference',
      cert_image: '../assets/certs/dli.png',
    },
  ],

};

/* ── Render all achievement groups ── */
function renderAchievements() {
  const lang = typeof getLang === 'function' ? getLang() : 'en';

  renderAchGroup('achCerts',    ACHIEVEMENTS.certifications, lang);
  renderAchGroup('achDiplomas', ACHIEVEMENTS.diplomas,       lang);
  renderAchGroup('achLangs',    ACHIEVEMENTS.languages,      lang);
  renderAchGroup('achEvents',   ACHIEVEMENTS.events,         lang);
}

function renderAchGroup(containerId, items, lang) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = items.map(item => buildAchCard(item, lang)).join('');
}

function buildAchCard(item, lang) {
  const title  = lang === 'fr' ? (item.title_fr || item.title_en) : (item.title_en || item.title_fr);
  const org    = lang === 'fr' ? (item.org_fr   || item.org)      : (item.org_en   || item.org);
  const badge  = lang === 'fr' ? (item.badge_fr || item.badge_en) : (item.badge_en || item.badge_fr);

  return `
    <div class="ach-card" onclick="openModal('${item.id}')" style="--ach-color:${item.color}" tabindex="0"
      onkeydown="if(event.key==='Enter')openModal('${item.id}')">
      <div class="ach-card-top">
        <div class="ach-icon-wrap">
          <span class="ach-icon">${item.icon}</span>
        </div>
        <span class="ach-badge">${badge}</span>
      </div>
      <div class="ach-card-body">
        <p class="ach-title">${title}</p>
        <p class="ach-org">${org}</p>
      </div>
      <div class="ach-card-footer">
        <span class="ach-date">${item.date}</span>
        <span class="ach-view-hint">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
        </span>
      </div>
    </div>`;
}

/* ── Modal ── */
function openModal(itemId) {
  const lang = typeof getLang === 'function' ? getLang() : 'en';

  // Find item across all groups
  const all = [
    ...ACHIEVEMENTS.certifications,
    ...ACHIEVEMENTS.diplomas,
    ...ACHIEVEMENTS.languages,
    ...ACHIEVEMENTS.events,
  ];
  const item = all.find(i => i.id === itemId);
  if (!item) return;

  const title = lang === 'fr' ? (item.title_fr || item.title_en) : (item.title_en || item.title_fr);
  const org   = lang === 'fr' ? (item.org_fr   || item.org)      : (item.org_en   || item.org);

  const viewLabel  = lang === 'fr' ? 'Certificat' : 'Certificate';
  const noImgLabel = lang === 'fr' ? 'Document non disponible' : 'Document not available';

  const imgHtml = item.cert_image
    ? `<img src="${item.cert_image}" alt="${title}"
          class="ach-modal-img"
          onerror="this.parentElement.classList.add('ach-modal-img-wrap--empty');this.style.display='none';" />`
    : '';

  document.getElementById('achModalInner').innerHTML = `
    <div class="ach-modal-header" style="--ach-color:${item.color}">
      <span class="ach-modal-icon">${item.icon}</span>
      <div>
        <p class="ach-modal-title">${title}</p>
        <p class="ach-modal-org">${org} · ${item.date}</p>
      </div>
    </div>
    <div class="ach-modal-img-wrap ${item.cert_image ? '' : 'ach-modal-img-wrap--empty'}">
      ${imgHtml}
      <div class="ach-modal-no-img">
        <span>${item.icon}</span>
        <p>${noImgLabel}</p>
      </div>
    </div>`;

  const backdrop = document.getElementById('achModalBackdrop');
  backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // Trap Escape key
  document._modalKeyHandler = e => { if (e.key === 'Escape') closeModal(); };
  document.addEventListener('keydown', document._modalKeyHandler);
}

function closeModal() {
  const backdrop = document.getElementById('achModalBackdrop');
  backdrop.classList.remove('is-open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', document._modalKeyHandler);
}

document.addEventListener('langchange', () => {
  renderAchievements();
});

/* =====================
   SKILLS TABS — Scroll-based sticky nav
===================== */

function initSkillsTabs() {
  const tabs      = document.getElementById('skTabs');
  const sentinel  = document.getElementById('skTabsSentinel');
  const indicator = document.getElementById('skTabIndicator');
  const tabBtns   = tabs ? tabs.querySelectorAll('.sk-tab') : [];
  const navH      = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
  const TAB_H     = 52; // height of tab bar

  if (!tabs || !tabBtns.length) return;

  // ── 1. Sticky via IntersectionObserver on sentinel ──
  // When sentinel leaves viewport, tabs stick; when it re-enters, unstick
  const stickyObs = new IntersectionObserver(
    ([entry]) => {
      tabs.classList.toggle('sk-tabs--sticky', !entry.isIntersecting);
    },
    { rootMargin: `-${navH}px 0px 0px 0px`, threshold: 0 }
  );
  if (sentinel) stickyObs.observe(sentinel);

  // ── 2. Active tab via scrollspy ──
  const sections = ['section-skills', 'section-tech', 'section-achievements']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function getActiveSection() {
    const offset = navH + TAB_H + 24;
    let active = sections[0];
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= offset) active = sec;
    }
    return active;
  }

  function updateActiveTab() {
    const activeId = getActiveSection()?.id;
    tabBtns.forEach(btn => {
      const isActive = btn.dataset.target === activeId;
      btn.classList.toggle('sk-tab--active', isActive);
    });
    moveIndicator();
  }

  // ── 3. Sliding indicator ──
  function moveIndicator() {
    const activeBtn = tabs.querySelector('.sk-tab--active');
    if (!activeBtn || !indicator) return;
    indicator.style.width  = activeBtn.offsetWidth + 'px';
    indicator.style.left   = activeBtn.offsetLeft + 'px';
  }

  window.addEventListener('scroll', updateActiveTab, { passive: true });
  // Keep sticky bar aligned to container on resize
  function syncStickyPosition() {
    const container = tabs.closest('.container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    tabs.style.setProperty('--sk-tabs-left',  rect.left + 'px');
    tabs.style.setProperty('--sk-tabs-width', rect.width + 'px');
    tabs.style.setProperty('--sk-tabs-tx',    '0px');
  }
  syncStickyPosition();
  window.addEventListener('resize', () => { syncStickyPosition(); moveIndicator(); });

  // Set first tab active immediately
  tabBtns[0]?.classList.add('sk-tab--active');
  // Move indicator after fonts/layout settle
  requestAnimationFrame(() => setTimeout(moveIndicator, 80));

  // ── Re-run after i18n re-renders labels ──
  document.addEventListener('langchange', () => {
    requestAnimationFrame(() => setTimeout(moveIndicator, 80));
  });
}

// ── Smooth scroll to section ──
function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const navH  = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
  const TAB_H = 52;
  const top   = el.getBoundingClientRect().top + window.scrollY - navH - TAB_H - 16;
  window.scrollTo({ top, behavior: 'smooth' });
}

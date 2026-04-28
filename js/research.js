/* === RESEARCH DATA & RENDERER === */

const RESEARCH_DATA = {
  fr: {
    axes: [
      { icon: '🧬', label: 'Médecine Génomique & IA', desc: "Application de l'IA à l'analyse des séquences ADN pour la médecine de précision" },
      { icon: '🎯', label: 'Détection de maladies', desc: "Modèles de classification pour la détection précoce du cancer et des maladies infectieuses" },
      { icon: '🧠', label: 'Deep Learning médical', desc: "Architectures de réseaux de neurones appliquées à l'imagerie médicale et aux données cliniques" },
      { icon: '📊', label: 'Science des données en santé', desc: "Analyse statistique et visualisation de données épidémiologiques et cliniques" },
    ],
    projects: [
      {
        title: '🫁 Détection du Cancer du Poumon',
        desc: "Développement d'un modèle de deep learning pour la classification des tumeurs pulmonaires à partir de scanners CT. Utilisation de techniques de transfer learning sur des architectures CNN pré-entraînées.",
        badges: ['Deep Learning', 'Computer Vision', 'PyTorch', 'AI Research'],
      },
      {
        title: '🧬 DNABERT & Médecine Génomique',
        desc: "Exploration du modèle DNABERT pour la compréhension des séquences génomiques. Application aux mutations pathogènes et à la prédiction de l'expression génique.",
        badges: ['DNABERT', 'Genomics', 'NLP', 'Transformers'],
      },
      {
        title: '🦠 Analyse Épidémiologique Mpox',
        desc: "Étude de la propagation du Mpox à travers l'analyse d'images dermatologiques couplée à des données épidémiologiques. Modèles de classification multi-classes.",
        badges: ['Epidemiology', 'Computer Vision', 'Public Health'],
      },
    ],
    engagements: [
      { icon: '🎤', text: 'Deep Learning Indaba 2024 — Dakar, Sénégal' },
      { icon: '🌐', text: "Promotion de l'IA pour la santé en Afrique" },
      { icon: '📚', text: 'Veille active sur les publications ArXiv en IA médicale' },
      { icon: '🤝', text: 'Contribution open-source sur des outils de santé numérique' },
    ],
  },
  en: {
    axes: [
      { icon: '🧬', label: 'Genomic Medicine & AI', desc: 'Applying AI to DNA sequence analysis for precision medicine' },
      { icon: '🎯', label: 'Disease Detection', desc: 'Classification models for early detection of cancer and infectious diseases' },
      { icon: '🧠', label: 'Medical Deep Learning', desc: 'Neural network architectures applied to medical imaging and clinical data' },
      { icon: '📊', label: 'Health Data Science', desc: 'Statistical analysis and visualisation of epidemiological and clinical data' },
    ],
    projects: [
      {
        title: '🫁 Lung Cancer Detection',
        desc: 'Development of a deep learning model for pulmonary tumour classification from CT scans. Transfer learning techniques applied to pre-trained CNN architectures.',
        badges: ['Deep Learning', 'Computer Vision', 'PyTorch', 'AI Research'],
      },
      {
        title: '🧬 DNABERT & Genomic Medicine',
        desc: 'Exploration of the DNABERT model for genomic sequence understanding. Applied to pathogenic mutations and gene expression prediction.',
        badges: ['DNABERT', 'Genomics', 'NLP', 'Transformers'],
      },
      {
        title: '🦠 Mpox Epidemiological Analysis',
        desc: 'Study of Mpox spread through dermatological image analysis combined with epidemiological data. Multi-class classification models.',
        badges: ['Epidemiology', 'Computer Vision', 'Public Health'],
      },
    ],
    engagements: [
      { icon: '🎤', text: 'Deep Learning Indaba 2024 — Dakar, Senegal' },
      { icon: '🌐', text: 'Promoting AI for health in Africa' },
      { icon: '📚', text: 'Active watch on ArXiv publications in medical AI' },
      { icon: '🤝', text: 'Open-source contributions to digital health tools' },
    ],
  },
};

function renderResearch() {
  const lang = typeof getLang === 'function' ? getLang() : 'en';
  const d = RESEARCH_DATA[lang] || RESEARCH_DATA.en;

  // Axes
  const axesEl = document.getElementById('resAxes');
  if (axesEl) {
    axesEl.innerHTML = d.axes.map(a => `
      <li class="res-axis-item">
        <span class="res-axis-icon">${a.icon}</span>
        <div>
          <p class="res-axis-label">${a.label}</p>
          <p class="res-axis-desc">${a.desc}</p>
        </div>
      </li>`).join('');
  }

  // Research projects
  const projEl = document.getElementById('resProjects');
  if (projEl) {
    projEl.innerHTML = d.projects.map((p, i) => `
      <div class="res-proj-card" style="transition-delay:${i * 80}ms">
        <h4 class="res-proj-title">${p.title}</h4>
        <p class="res-proj-desc">${p.desc}</p>
        <div class="res-proj-badges">
          ${p.badges.map(b => `<span class="res-badge">${b}</span>`).join('')}
        </div>
      </div>`).join('');
  }

  // Engagements
  const engEl = document.getElementById('resEngagements');
  if (engEl) {
    engEl.innerHTML = d.engagements.map(e => `
      <li class="res-engage-item">
        <span class="res-engage-item-icon">${e.icon}</span>
        <span class="res-engage-item-text">${e.text}</span>
      </li>`).join('');
  }
}

document.addEventListener('langchange', renderResearch);

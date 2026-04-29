/* === PROJECTS DATA & RENDERER === */

const PROJECTS_FR = [
  {
    emoji:'🤖',
    title: 'Chatbot RAG pour portfolio',
    description: "Un chatbot de type RAG (Retrieval-Augmented Generation) intégré à ce portfolio, capable de répondre à des questions sur mon parcours et mes projets en utilisant une base de données de connaissances.",
    image: '../assets/rag.png',
    techs: ['NLP', 'RAG', 'Python'],
    github: '',
    demo:'https://tahina-johnson.vercel.app/pages/chat'
  },
  {
    emoji: '🔬',
    title: 'Mpox Skin Lesion Detection',
    description: "Modèle de vision par ordinateur entraîné pour détecter et classifier les lésions cutanées liées au Mpox à partir d'images dermatologiques. Le modèle distingue plusieurs classes de lésions avec une haute précision.",
    image: '../assets/mpox.jpeg',
    techs: ['Computer Vision', 'Deep Learning', 'PyTorch'],
    github: 'https://github.com/tahinajohn/skin-lesion-prediction',
    demo:   'https://huggingface.co/spaces/ratah001/skin-lesion-classification',
  },
  {
    emoji: '😷',
    title: 'Disease Prediction AI',
    description: "Application d'IA pour la détection de maladies à partir des symptômes présents dans le patient. L'utilisateur renseigne ses symptômes et le modèle prédit la pathologie la plus probable.",
    image: '../assets/disease-prediction.png',
    techs: ['Machine Learning', 'Random Forest', 'Streamlit'],
    github: 'https://github.com/tahinajohn/disease-prediction',
    demo:   'https://huggingface.co/spaces/ratah001/disease-prediction',
  },
  {
    emoji: '🩸',
    title: 'Prédiction du Diabète',
    description: "Développement d'un modèle de machine learning capable de prédire si une personne est susceptible d'avoir le diabète en se basant sur des indicateurs médicaux tels que l'IMC, la glycémie ou l'âge.",
    image: '../assets/diabete.jpg',
    techs: ['Python', 'Scikit-learn', 'Streamlit'],
    github: 'https://github.com/tahinajohn/diabetes-predictor',
    demo:   'https://huggingface.co/spaces/ratah001/diabetes-prediction',
  },
  {
    emoji: '📊',
    title: 'Prédiction de profit pour startups',
    description: "Un modèle de machine learning qui prédit la rentabilité d'une startup en fonction de diverses caractéristiques telles que le montant du financement, l'industrie et la taille de l'équipe.",
    image: '../assets/startup.jpg',
    techs: ['Machine Learning', 'Linear Regression', 'Python'],
    github: 'https://github.com/tahinajohn/startup-profit-predict',
    demo:   'https://huggingface.co/spaces/ratah001/startup-profit-predict',
  },
  {
    emoji:'🛍️',
    title: 'Segmentation des clients de centre commercial',
    description: "Un modèle de machine learning qui segmente les clients en fonction de leur comportement d'achat dans un centre commercial.",
    image: '../assets/customer.jpg',
    techs: ['Machine Learning', 'Clustering', 'Python'],
    github: 'https://github.com/tahinajohn/mall-customer',
    demo:   'https://huggingface.co/spaces/ratah001/mall-customer',
  },
  {
    emoji: '💼',
    title: 'Prédiction de salaire',
    description: "Un modèle de machine learning qui prédit le salaire d'un employé en fonction de ses années d'expérience.",
    image: '../assets/salary.png',
    techs: ['Machine Learning', 'Regression', 'Python'],
    github: 'https://github.com/tahinajohn/salary-predict',
    demo:   'https://huggingface.co/spaces/ratah001/salary-predict',
  }
];

const PROJECTS_EN = [
  {
    emoji:'🤖',
    title: 'RAG Chatbot for Portfolio',
    description: "A RAG (Retrieval-Augmented Generation) chatbot integrated into this portfolio, capable of answering questions about my background and projects using a knowledge base.",
    image: '../assets/rag.png',
    techs: ['NLP', 'RAG', 'Python'],
    github: '',
    demo:   'https://tahina-johnson.vercel.app/pages/chat',
  },
  {
    emoji: '🔬',
    title: 'Mpox Skin Lesion Detection',
    description: 'Computer vision model trained to detect and classify Mpox-related skin lesions from dermatological images. The model distinguishes several lesion classes with high accuracy.',
    image: '../assets/mpox.jpeg',
    techs: ['Computer Vision', 'Deep Learning', 'PyTorch'],
    github: 'https://github.com/tahinajohn/skin-lesion-prediction',
    demo:   'https://huggingface.co/spaces/ratah001/skin-lesion-classification',
  },
  {
    emoji: '😷',
    title: 'Disease Prediction AI',
    description: 'AI application for disease detection based on patient symptoms. The user inputs their symptoms and the model predicts the most likely pathology.',
    image: '../assets/disease-prediction.png',
    techs: ['Machine Learning', 'Random Forest', 'Streamlit'],
    github: 'https://github.com/tahinajohn/disease-prediction',
    demo:   'https://huggingface.co/spaces/ratah001/disease-prediction',
  },
  {
    emoji: '🩸',
    title: 'Diabetes Prediction',
    description: 'Machine learning model capable of predicting whether a person is likely to have diabetes based on medical indicators such as BMI, blood glucose level, or age.',
    image: '../assets/diabete.jpg',
    techs: ['Python', 'Scikit-learn', 'Streamlit'],
    github: 'https://github.com/tahinajohn/diabetes-predictor',
    demo:   '',
  },
  {
    emoji: '📊',
    title: 'startup profit predict',
    description: 'A machine learning model that predicts the profitability of a startup based on various features such as funding amount, industry, and team size.',
    image: '../assets/startup.jpg',
    techs: ['Machine Learning', 'Linear Regression', 'Python'],
    github: 'https://github.com/tahinajohn/startup-profit-predict',
    demo:   'https://huggingface.co/spaces/ratah001/startup-profit-predict',
  },
  {
    emoji:'🛍️',
    title: 'Mall customer segmentation',
    description: 'A machine learning model that segments customers based on their shopping behavior in a mall.',
    image: '../assets/customer.jpg',
    techs: ['Machine Learning', 'Clustering', 'Python'],
    github: 'https://github.com/tahinajohn/mall-customer',
    demo:   'https://huggingface.co/spaces/ratah001/mall-customer',
  },
  {
    emoji: '💼',
    title: 'Salary prediction',
    description: 'A machine learning model that predicts the salary of an employee based on years of experience.',
    image: '../assets/salary.png',
    techs: ['Machine Learning', 'Regression', 'Python'],
    github: 'https://github.com/tahinajohn/salary-predict',
    demo:   'https://huggingface.co/spaces/ratah001/salary-predict',
  }
];

function buildProjectCard(p, i, lang) {
  const githubLabel = lang === 'fr' ? 'GitHub' : 'GitHub';
  const demoLabel   = lang === 'fr' ? 'Démo' : 'Demo';
  const delay = i * 120;

  const tags = p.techs.map(t =>
    `<span class="proj-tag">${t}</span>`
  ).join('');

  return `
    <article class="proj-card reveal" style="transition-delay:${delay}ms">
      <div class="proj-card-inner">

        <!-- LEFT: visual -->
        <div class="proj-left">
          <h2 class="proj-title">
            <span class="proj-emoji">${p.emoji}</span>
            ${p.title}
          </h2>
          <div class="proj-image-wrap">
            <img
              src="${p.image}"
              alt="${p.title}"
              class="proj-image"
              onerror="this.parentElement.classList.add('proj-image-wrap--fallback');this.style.display='none';"
            />
          </div>
        </div>

        <!-- RIGHT: content -->
        <div class="proj-right">
          <p class="proj-desc">${p.description}</p>

          <div class="proj-tags">${tags}</div>

          <div class="proj-actions">
            <a href="${p.github}" target="_blank" rel="noopener" class="proj-btn proj-btn--github">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              ${githubLabel}
            </a>
            <a href="${p.demo}" target="_blank" rel="noopener" class="proj-btn proj-btn--demo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              ${demoLabel}
            </a>
          </div>
        </div>

      </div>
    </article>`;
}

function renderProjects() {
  const lang = typeof getLang === 'function' ? getLang() : 'en';
  const data = lang === 'fr' ? PROJECTS_FR : PROJECTS_EN;
  const container = document.getElementById('projectsList');
  if (!container) return;
  container.innerHTML = data.map((p, i) => buildProjectCard(p, i, lang)).join('');
}

document.addEventListener('langchange', renderProjects);

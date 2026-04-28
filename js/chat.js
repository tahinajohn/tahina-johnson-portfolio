/* === CHAT ENGINE === */

/* ─────────────────────────────────────────
   API CONFIGURATION
   ───────────────────────────────────────── */
const API_CONFIG = {
  url:        'https://ratah001-test-api.hf.space/chat',
  method:     'POST',
  timeout_ms: 30000,   // 30s — HF Spaces can be slow on cold start
};

/* Error messages per language */
const ERROR_MESSAGES = {
  fr: {
    timeout:  "L'API met trop de temps à répondre (Space en veille ?). Réessayez dans quelques secondes.",
    network:  "Impossible de contacter le serveur. Vérifiez votre connexion.",
    server:   "Le serveur a retourné une erreur. Réessayez plus tard.",
    parse:    "La réponse du serveur est invalide. Contactez le propriétaire du portfolio.",
  },
  en: {
    timeout:  "The API is taking too long (Space might be sleeping). Please retry in a few seconds.",
    network:  "Cannot reach the server. Check your connection.",
    server:   "The server returned an error. Please try again later.",
    parse:    "The server response is invalid. Please contact the portfolio owner.",
  },
};

/* ─────────────────────────────────────────
   CORE API CALL
   ─────────────────────────────────────────
   Returns: { answer: string } on success
   Throws:  Error with .type ∈ 'timeout' | 'network' | 'server' | 'parse'
   ───────────────────────────────────────── */
async function callChatAPI(question, lang) {
  // AbortController for timeout
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_CONFIG.timeout_ms);

  let response;
  try {
    response = await fetch(API_CONFIG.url, {
      method:  API_CONFIG.method,
      headers: {
        'Content-Type': 'application/json',
        // Add 'Authorization': 'Bearer YOUR_TOKEN' here if your Space is private
      },
      body:   JSON.stringify({ question, lang }),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      const e = new Error('timeout'); e.type = 'timeout'; throw e;
    }
    const e = new Error('network'); e.type = 'network'; throw e;
  }
  clearTimeout(timer);

  if (!response.ok) {
    const e = new Error(`server ${response.status}`); e.type = 'server'; throw e;
  }

  let data;
  try {
    data = await response.json();
  } catch {
    const e = new Error('parse'); e.type = 'parse'; throw e;
  }

  // Extract answer field — graceful fallback
  const answer = data?.answer ?? data?.response ?? data?.text ?? null;
  if (!answer) {
    const e = new Error('parse'); e.type = 'parse'; throw e;
  }

  return { answer, sources: data?.source_documents ?? [] };
}

/* ── State ── */
let isActive = false;
let isThinking = false;

/* ── DOM refs (set in initChat) ── */
let shell, idleEl, activeEl, historyEl, historyInner, inputIdle, inputSticky;

function initChat() {
  shell        = document.getElementById('chShell');
  idleEl       = document.getElementById('chIdle');
  activeEl     = document.getElementById('chActive');
  historyEl    = document.getElementById('chHistory');
  inputIdle    = document.getElementById('chInput');
  inputSticky  = document.getElementById('chInputSticky');

  // Create history inner wrapper
  historyInner = document.createElement('div');
  historyInner.className = 'ch-history-inner';
  historyEl.appendChild(historyInner);

  // Populate i18n content
  applyI18n();
  document.addEventListener('langchange', applyI18n);

  // Suggestion chips
  buildSuggestions();

  // Sync the two inputs
  [inputIdle, inputSticky].forEach(inp => {
    if (!inp) return;
    inp.addEventListener('input', () => {
      const other = inp === inputIdle ? inputSticky : inputIdle;
      if (other) other.value = inp.value;
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        doSend(inp.value.trim());
      }
    });
  });

  // Mobile: keep sticky bar above keyboard
  if (typeof window.visualViewport !== 'undefined') {
    window.visualViewport.addEventListener('resize', () => {
      if (isActive) {
        const offset = window.innerHeight - window.visualViewport.height;
        const bar = document.getElementById('chStickyBar');
        if (bar) bar.style.paddingBottom = (offset > 0 ? offset + 12 : 16) + 'px';
      }
    });
  }
}

function applyI18n() {
  const lang = typeof getLang === 'function' ? getLang() : 'en';
  const t = TRANSLATIONS?.[lang]?.chat || {};

  const welcomeEl = document.getElementById('chWelcomeText');
  if (welcomeEl && t.welcome) welcomeEl.textContent = t.welcome;

  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key  = el.getAttribute('data-i18n-placeholder');
    const keys = key.split('.');
    let val = TRANSLATIONS?.[lang];
    keys.forEach(k => { if (val) val = val[k]; });
    if (val) el.setAttribute('placeholder', val);
  });

  // Rebuild suggestions with new lang
  buildSuggestions();
}

function buildSuggestions() {
  const lang = typeof getLang === 'function' ? getLang() : 'en';
  const suggestions = TRANSLATIONS?.[lang]?.chat?.suggestions || [];
  const container = document.getElementById('chSuggestions');
  if (!container) return;
  container.innerHTML = suggestions.map(s =>
    `<button type="button" class="ch-suggestion" onclick="sendSuggestion(this.textContent)">${s}</button>`
  ).join('');
}

/* Called when user clicks a suggestion chip */
function sendSuggestion(text) {
  doSend(text);
}

/* ── Main send handler ── */
function handleSend(e) {
  e.preventDefault();
  const activeInput = isActive ? inputSticky : inputIdle;
  const msg = activeInput?.value.trim();
  if (msg) doSend(msg);
}

async function doSend(msg) {
  if (!msg || isThinking) return;

  const lang = typeof getLang === 'function' ? getLang() : 'en';

  // Clear both inputs
  if (inputIdle)   inputIdle.value   = '';
  if (inputSticky) inputSticky.value = '';

  // Disable send buttons while thinking
  setSendDisabled(true);

  // Transition to active on first message
  if (!isActive) activateChat();

  // Append user bubble
  appendMessage(msg, 'user');

  // Show typing indicator
  isThinking = true;
  const typingEl = appendTyping();

  // Show "slow API" warning banner after 8s (HF Space cold start)
  const bannerTimer = setTimeout(() => showApiBanner(lang), 8000);

  try {
    const { answer } = await callChatAPI(msg, lang);
    clearTimeout(bannerTimer);
    hideApiBanner();
    typingEl.remove();
    appendMessage(answer, 'ai');
  } catch (err) {
    clearTimeout(bannerTimer);
    hideApiBanner();
    typingEl.remove();
    const errType = err.type || 'network';
    const msgs = ERROR_MESSAGES[lang] || ERROR_MESSAGES.en;
    appendMessage(msgs[errType] || msgs.network, 'error');
  } finally {
    isThinking = false;
    setSendDisabled(false);
  }
}

/* Disable/enable all send buttons */
function setSendDisabled(disabled) {
  document.querySelectorAll('.ch-send-btn').forEach(btn => {
    btn.disabled = disabled;
  });
}

/* ── Activate: idle → active ── */
function activateChat() {
  isActive = true;
  shell.classList.add('is-active');
  activeEl.removeAttribute('aria-hidden');

  // Focus sticky input after transition
  setTimeout(() => { inputSticky?.focus(); }, 500);
}

/* ── Append a message bubble ── */
function appendMessage(text, role) {
  const lang = typeof getLang === 'function' ? getLang() : 'en';
  const aiName = TRANSLATIONS?.[lang]?.chat?.ai_name || 'AI';

  const wrap = document.createElement('div');

  if (role === 'ai') {
    wrap.className = 'ch-msg ch-msg--ai';
    wrap.innerHTML = `
      <div class="ch-msg-avatar" aria-label="${aiName}">✦</div>
      <div class="ch-bubble">${formatAnswer(text)}</div>`;
  } else if (role === 'error') {
    wrap.className = 'ch-msg ch-msg--ai ch-msg--error';
    wrap.innerHTML = `
      <div class="ch-msg-avatar ch-msg-avatar--error">⚠</div>
      <div class="ch-bubble ch-bubble--error">${escHtml(text)}</div>`;
  } else {
    wrap.className = 'ch-msg ch-msg--user';
    wrap.innerHTML = `<div class="ch-bubble">${escHtml(text)}</div>`;
  }

  historyInner.appendChild(wrap);
  scrollBottom();
  return wrap;
}

/* ── Format AI answer: convert newlines + basic markdown ── */
function formatAnswer(text) {
  return escHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')   // **bold**
    .replace(/\*(.*?)\*/g, '<em>$1</em>')               // *italic*
    .replace(/`(.*?)`/g, '<code>$1</code>')              // `code`
    .replace(/&lt;br&gt;/g, '<br>')                      // literal <br>
    .replace(/\n/g, '<br>');                             // newlines
}

/* ── Typing indicator ── */
function appendTyping() {
  const wrap = document.createElement('div');
  wrap.className = 'ch-msg ch-msg--ai ch-typing';
  wrap.innerHTML = `
    <div class="ch-msg-avatar">✦</div>
    <div class="ch-bubble">
      <span class="ch-typing-dot"></span>
      <span class="ch-typing-dot"></span>
      <span class="ch-typing-dot"></span>
    </div>`;
  historyInner.appendChild(wrap);
  scrollBottom();
  return wrap;
}

/* ── Slow-API banner ── */
const SLOW_MESSAGES = {
  fr: '⏳ Le Space Hugging Face se réveille, encore quelques secondes…',
  en: '⏳ Hugging Face Space is waking up, just a few more seconds…',
};

function showApiBanner(lang) {
  let banner = document.getElementById('chApiBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'chApiBanner';
    banner.className = 'ch-api-banner';
    const bar = document.getElementById('chStickyBar');
    if (bar) bar.appendChild(banner);
  }
  banner.textContent = SLOW_MESSAGES[lang] || SLOW_MESSAGES.en;
  requestAnimationFrame(() => banner.classList.add('is-visible'));
}

function hideApiBanner() {
  const banner = document.getElementById('chApiBanner');
  if (banner) {
    banner.classList.remove('is-visible');
    setTimeout(() => banner.remove(), 350);
  }
}

/* ── Auto-scroll ── */
function scrollBottom() {
  requestAnimationFrame(() => {
    historyEl.scrollTo({ top: historyEl.scrollHeight, behavior: 'smooth' });
  });
}

/* ── XSS safe text ── */
function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

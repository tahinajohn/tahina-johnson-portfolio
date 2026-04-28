/* === PORTFOLIO MAIN JS === */

const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const allLinks  = document.querySelectorAll('.nav-link[data-page]');

/* ---- Sticky nav background ---- */
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
};

window.addEventListener('scroll', onScroll, { passive: true });

/* ---- Hamburger menu ---- */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

/* ---- Active link scrollspy ---- */
const sections = document.querySelectorAll('section[id], .section[id]');

function updateActiveLink() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });

  allLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === current);
  });
}

/* ---- Reveal on scroll ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.section-header, .coming-soon').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  el.classList.add('will-reveal');
  revealObserver.observe(el);
});

document.addEventListener('animationend', () => {}, { once: true });

const style = document.createElement('style');
style.textContent = `.will-reveal.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

/* ---- Smooth close mobile menu on outside click ---- */
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

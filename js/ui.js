/* ============================================================================
   ui.js — Fonctionnalités UI générales du site Moodbucks
   · En-tête : passage en fond plein + menu mobile
   · Hero : diaporama et pastilles de navigation
   · Carrousel photos de la maison
   · Révélation au défilement
   · Bouton retour en haut
   · Fermeture des modales au clavier
   ========================================================================== */

/* ── EN-TÊTE ───────────────────────────────────────────────────────────────── */

/**
 * Passe l'en-tête en fond plein dès que la page est défilée,
 * et gère l'ouverture / fermeture du menu mobile.
 */
function initHeader() {
  const header = document.getElementById('siteHeader');
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('mobileMenu');
  if (!header) return;

  const onScroll = () => {
    const solid = window.scrollY > 40;
    header.classList.toggle('is-solid', solid);
    header.classList.toggle('is-overlay', !solid);
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (!toggle || !menu) return;

  const setMenu = open => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.classList.toggle('modal-open', open);
  };

  toggle.addEventListener('click', () => setMenu(menu.hidden));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) setMenu(false);
  });
}

/* ── HERO ──────────────────────────────────────────────────────────────────── */

/**
 * Diaporama du hero : rotation automatique de 6,5 s et pastilles cliquables.
 */
function initHeroSlideshow() {
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dotsEl  = document.getElementById('heroDots');
  if (slides.length < 2) return;

  let index = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Photo ${i + 1}`);
    dot.addEventListener('click', () => {
      show(i);
      restart();
    });
    dotsEl?.appendChild(dot);
    return dot;
  });

  function show(next) {
    index = next;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(() => show((index + 1) % slides.length), 6500);
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    show(0);
    return;
  }

  show(0);
  restart();
}

/* ── CARROUSEL DE LA MAISON ────────────────────────────────────────────────── */

/**
 * Fait défiler deux photos encadrées parmi une sélection de la maison.
 */
function initStoryCarousel() {
  const slides = Array.from(document.querySelectorAll('.carousel-slide img'));
  const prev   = document.querySelector('[data-carousel-prev]');
  const next   = document.querySelector('[data-carousel-next]');
  if (slides.length < 2 || !prev || !next) return;

  const photos = [
    'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4b5?w=900&q=80',
    'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=900&q=80',
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&q=80'
  ];

  let start = 0;

  const render = () => {
    slides.forEach((img, i) => {
      img.src = photos[(start + i) % photos.length];
    });
  };

  prev.addEventListener('click', () => {
    start = (start - 1 + photos.length) % photos.length;
    render();
  });

  next.addEventListener('click', () => {
    start = (start + 1) % photos.length;
    render();
  });
}

/* ── ÉCRAN DE CHARGEMENT ───────────────────────────────────────────────────── */

let loaderStartedAt = 0;

/**
 * Verrouille le défilement pendant le chargement et prévoit un filet de sécurité.
 */
function initPageLoader() {
  if (!document.getElementById('pageLoader')) return;

  loaderStartedAt = Date.now();
  document.body.classList.add('is-loading');

  // Ne jamais bloquer la page plus de 5 s, même si les données n'arrivent pas
  window.setTimeout(hidePageLoader, 5000);
}

/**
 * Masque l'écran de chargement après un temps minimum de 600 ms.
 * Appelée par dataLoader.js une fois les données en place.
 */
function hidePageLoader() {
  const loader = document.getElementById('pageLoader');
  document.body.classList.remove('is-loading');

  if (!loader || loader.classList.contains('is-hidden')) return;

  const wait = Math.max(0, 600 - (Date.now() - loaderStartedAt));

  window.setTimeout(() => {
    loader.classList.add('is-hidden');
    window.setTimeout(() => loader.remove(), 600);
  }, wait);
}

/* ── RÉVÉLATION AU DÉFILEMENT ──────────────────────────────────────────────── */

/**
 * Révèle les blocs à leur entrée dans la fenêtre.
 * Sans JavaScript, aucun élément n'est masqué.
 */
function initReveal() {
  const targets = document.querySelectorAll(
    '.story .center-copy, .story-carousel, .menu-section .center-copy, .menu-tabs,' +
    ' .menu-panels, .dark-panel, .events-section .center-copy, .reviews-grid, .contact-card'
  );

  if (!('IntersectionObserver' in window) || targets.length === 0) return;

  document.body.classList.add('js-reveal');
  targets.forEach(el => el.classList.add('reveal-ready'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
}

/* ── BOUTON RETOUR EN HAUT ─────────────────────────────────────────────────── */

function initScrollToTop() {
  const btn = document.createElement('button');
  btn.id = 'scrollTopBtn';
  btn.type = 'button';
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Retour en haut');
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── SOIRÉES (cartes de la section événements) ─────────────────────────────── */

/**
 * Remplit les cartes de soirées avec les données de data.json, selon la langue.
 * Appelé après le chargement des données et à chaque changement de langue.
 */
function renderEvents() {
  if (!window.EVENTS) return;

  const locale = typeof getLocale === 'function' ? getLocale() : 'fr';

  document.querySelectorAll('[data-event]').forEach(card => {
    const event = window.EVENTS[card.dataset.event];
    if (!event) return;

    const dateEl  = card.querySelector('.event-date');
    const titleEl = card.querySelector('h3');
    const descEl  = card.querySelector('p');

    if (dateEl)  dateEl.textContent  = event['date_' + locale]  || event.date;
    if (titleEl) titleEl.textContent = event['title_' + locale] || event.title;
    if (descEl)  descEl.textContent  = event['desc_' + locale]  || event.desc;
  });
}

/* ── CLAVIER ───────────────────────────────────────────────────────────────── */

/**
 * Escape ferme les modales et le panier, et retire le verrou de défilement.
 */
function initKeyboardListeners() {
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (typeof closeModal      === 'function') closeModal();
    if (typeof closeEventModal === 'function') closeEventModal();
    if (typeof closeCart       === 'function') closeCart();
  });
}

/* ── INIT GLOBALE ──────────────────────────────────────────────────────────── */

/**
 * Point d'entrée — appelé depuis dataLoader.js après le chargement des données.
 */
function initUI() {
  initPageLoader();
  initHeader();
  initHeroSlideshow();
  initStoryCarousel();
  initReveal();
  initScrollToTop();
  initKeyboardListeners();
}

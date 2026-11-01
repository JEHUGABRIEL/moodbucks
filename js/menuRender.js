/* ============================================================================
   menuRender.js — Construit la carte à partir de js/menu.json
   Dépendances : dataLoader.js (appelle renderMenu), tabs.js (switchTab),
                 modal.js (openPlat)
   ========================================================================== */

/* Photo d'illustration par catégorie (les fiches plat réutilisent celle de leur catégorie) */
const MENU_CATEGORY_IMAGES = {
  'Plats': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80',
  'Pizza': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
  'Entrées': 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=900&q=80',
  'Sandwiches': 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=900&q=80',
  'Salade': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&q=80',
  'Burgers': 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&q=80',
  'Soupe': 'https://images.unsplash.com/photo-1555396273-367ea4eb4b5?w=900&q=80',
  'Riz': 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=900&q=80',
  'Nouilles': 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=900&q=80',
  'Poulet': 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&q=80',
  'Combo': 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&q=80',
  'Bœuf': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=80',
  'Poisson': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&q=80',
  'Crevettes': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&q=80',
  'Plats végétariens': 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=900&q=80',
  'Plats sizzling': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=80',
  'Petit déjeuner': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
  'default': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80'
};

/**
 * Transforme un libellé en identifiant utilisable dans une URL ou un id HTML.
 * @param {string} text
 * @returns {string}
 */
function menuSlug(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Construit une ligne de carte cliquable.
 * @param {object} item - plat de menu.json (id, name, price, desc)
 * @returns {HTMLButtonElement}
 */
function buildMenuLine(item) {
  const line = document.createElement('button');
  line.type = 'button';
  line.className = 'menu-line';
  line.addEventListener('click', () => {
    if (typeof openPlat === 'function') openPlat(item.id);
  });

  const head = document.createElement('span');
  head.className = 'menu-line-head';

  const name = document.createElement('span');
  name.className = 'menu-line-name';
  name.textContent = item.name;

  const dots = document.createElement('span');
  dots.className = 'menu-line-dots';

  const price = document.createElement('span');
  price.className = 'menu-line-price';
  price.textContent = item.price.replace(/\s*FCFA$/, '');

  const unit = document.createElement('small');
  unit.textContent = 'FCFA';
  price.append(' ', unit);

  head.append(name, dots, price);
  line.append(head);

  if (item.desc) {
    const desc = document.createElement('span');
    desc.className = 'menu-line-desc';
    desc.textContent = item.desc;
    line.append(desc);
  }

  return line;
}

/**
 * Construit les onglets et les panneaux de la carte, puis remplit window.PLATS
 * (consommé par modal.js pour les fiches plat).
 */
function renderMenu() {
  const tabsEl = document.getElementById('menuTabs');
  const panelsEl = document.getElementById('menuPanels');
  const categories = Array.isArray(window.MENU) ? window.MENU : [];

  if (!tabsEl || !panelsEl) return;

  tabsEl.innerHTML = '';
  panelsEl.innerHTML = '';
  window.PLATS = {};

  if (categories.length === 0) {
    const message = document.createElement('p');
    message.className = 'menu-empty';
    message.textContent = 'La carte n’a pas pu être chargée. Écrivez-nous sur WhatsApp pour la recevoir.';
    panelsEl.append(message);
    return;
  }

  categories.forEach(category => {
    const slug = 'cat-' + menuSlug(category.name);

    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'tab-btn';
    tab.textContent = category.name;
    tab.setAttribute('role', 'tab');
    tab.addEventListener('click', () => switchTab(slug, tab));
    tabsEl.append(tab);

    const panel = document.createElement('div');
    panel.id = 'tab-' + slug;
    panel.className = 'menu-panel';
    panel.setAttribute('role', 'tabpanel');

    const image = MENU_CATEGORY_IMAGES[category.name] || MENU_CATEGORY_IMAGES.default;

    category.items.forEach(item => {
      const ingredients = (item.desc || '')
        .split(',')
        .map(part => part.trim())
        .filter(Boolean);

      window.PLATS[item.id] = {
        tag: category.name,
        name: item.name,
        price: item.price,
        desc: item.desc || '',
        ingredients: ingredients.length > 1 ? ingredients : [],
        imgs: [image]
      };

      panel.append(buildMenuLine(item));
    });

    panelsEl.append(panel);
  });
}

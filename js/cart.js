/* ============================================================================
   cart.js — Panier et bouton flottant

   · Les plats s'ajoutent depuis la fiche plat ou le « + » de la carte
   · Contenu mémorisé dans localStorage (moodbucks-cart-v1)
   · Le bouton de commande construit le message WhatsApp avec le récapitulatif
   ========================================================================== */

const CART_KEY = 'moodbucks-cart-v1';
const CART_PHONE = '23672999955';

let cart = loadCart();

/**
 * @returns {Array<{id: string, name: string, price: number, qty: number}>}
 */
function loadCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch (err) {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (err) {
    /* stockage indisponible : le panier tient pour la session */
  }
}

/**
 * "7 500 FCFA" → 7500
 * @param {string|number} price
 * @returns {number}
 */
function parsePrice(price) {
  return Number(String(price).replace(/[^\d]/g, '')) || 0;
}

/**
 * @param {number} value
 * @returns {string}
 */
function formatPrice(value) {
  return `${value.toLocaleString('fr-FR')} FCFA`;
}

/**
 * Ajoute un plat au panier.
 * @param {string} id - identifiant du plat (clé de PLATS)
 */
function addToCart(id) {
  const plat = (window.PLATS || {})[id];
  if (!plat) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id,
      name: plat.name,
      price: parsePrice(plat.price),
      qty: 1
    });
  }

  saveCart();
  renderCart();
  openCart();
}

/**
 * @param {string} id
 * @param {number} delta - +1 ou -1
 */
function changeQty(id, delta) {
  const item = cart.find(entry => entry.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(entry => entry.id !== id);

  saveCart();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(entry => entry.id !== id);
  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.qty * item.price, 0);
}

/**
 * Récapitulatif envoyé sur WhatsApp, selon la langue.
 * @returns {string}
 */
function orderMessage() {
  const lines = cart
    .map(item => `- ${item.qty} × ${item.name} (${formatPrice(item.qty * item.price)})`)
    .join('\n');

  return t('messages.order', { lines, total: formatPrice(cartTotal()) });
}

/**
 * Construit une ligne du panier.
 * @param {{id: string, name: string, price: number, qty: number}} item
 * @returns {HTMLLIElement}
 */
function buildCartItem(item) {
  const li = document.createElement('li');
  li.className = 'cart-item';

  const info = document.createElement('div');
  info.className = 'cart-item-info';

  const name = document.createElement('span');
  name.className = 'cart-item-name';
  name.textContent = item.name;

  const price = document.createElement('span');
  price.className = 'cart-item-price';
  price.textContent = formatPrice(item.qty * item.price);

  info.append(name, price);

  const actions = document.createElement('div');
  actions.className = 'cart-item-actions';

  const qty = document.createElement('div');
  qty.className = 'qty';

  const minus = document.createElement('button');
  minus.type = 'button';
  minus.textContent = '−';
  minus.setAttribute('aria-label', `- ${item.name}`);
  minus.addEventListener('click', () => changeQty(item.id, -1));

  const count = document.createElement('span');
  count.textContent = String(item.qty);

  const plus = document.createElement('button');
  plus.type = 'button';
  plus.textContent = '+';
  plus.setAttribute('aria-label', `+ ${item.name}`);
  plus.addEventListener('click', () => changeQty(item.id, 1));

  qty.append(minus, count, plus);

  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'cart-remove';
  remove.textContent = t('cart.remove');
  remove.addEventListener('click', () => removeItem(item.id));

  actions.append(qty, remove);
  li.append(info, actions);

  return li;
}

/**
 * Affiche le contenu du panier, les compteurs et le bouton de commande.
 */
function renderCart() {
  const list = document.getElementById('cartList');
  const empty = document.getElementById('cartEmpty');
  const foot = document.getElementById('cartFoot');
  if (!list || !empty || !foot) return;

  list.innerHTML = '';
  cart.forEach(item => list.append(buildCartItem(item)));

  const count = cartCount();

  empty.hidden = count > 0;
  list.hidden = count === 0;
  foot.hidden = count === 0;

  const label = document.getElementById('cartCountLabel');
  if (label) {
    label.textContent = count === 0
      ? ''
      : t(count === 1 ? 'cart.item' : 'cart.items', { count });
  }

  const total = document.getElementById('cartTotal');
  if (total) total.textContent = formatPrice(cartTotal());

  const order = document.getElementById('cartOrder');
  if (order) {
    order.href = `https://wa.me/${CART_PHONE}?text=${encodeURIComponent(orderMessage())}`;
  }

  [document.getElementById('cartBadge'), document.getElementById('cartFabBadge')]
    .forEach(badge => {
      if (!badge) return;
      badge.textContent = String(count);
      badge.hidden = count === 0;
    });
}

function openCart() {
  const layer = document.getElementById('cartLayer');
  if (!layer) return;

  layer.hidden = false;
  document.body.classList.add('modal-open');
}

function closeCart() {
  const layer = document.getElementById('cartLayer');
  if (!layer) return;

  layer.hidden = true;
  document.body.classList.remove('modal-open');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  document.getElementById('cartBtn')?.addEventListener('click', event => {
    event.preventDefault();
    openCart();
  });

  document.getElementById('cartFab')?.addEventListener('click', openCart);
  document.getElementById('cartScrim')?.addEventListener('click', closeCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('cartClear')?.addEventListener('click', clearCart);

  // Ajout depuis la fiche plat ouverte
  document.getElementById('modalAdd')?.addEventListener('click', () => {
    if (!window.currentPlatId) return;
    if (typeof closeModal === 'function') closeModal();
    addToCart(window.currentPlatId);
  });
});

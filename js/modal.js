/* ============================================================================
   modal.js — Gestion de la modal des plats
   Dépendances : data.json (chargé via dataLoader.js)
   ========================================================================== */

let curImgs = [];
let curIdx  = 0;

/**
 * Ouvre la modal d'un plat par son identifiant.
 * @param {string} id - Clé du plat dans PLATS (ex: 'poulet-braise')
 */
function openPlat(id) {
  const p = window.PLATS?.[id];
  if (!p) {
    console.warn(`[modal.js] Plat introuvable : "${id}"`);
    return;
  }

  // Remplir les champs texte
  document.getElementById('modalTag').textContent   = p.tag;
  document.getElementById('modalName').textContent  = p.name;
  document.getElementById('modalPrice').textContent = p.price;

  const descEl = document.getElementById('modalDesc');
  descEl.textContent = p.desc || '';
  descEl.hidden = !p.desc;

  // Ingrédients : masqués quand la carte ne les détaille pas
  const ingredients = Array.isArray(p.ingredients) ? p.ingredients : [];
  const ingTitle    = document.querySelector('.modal-ing-title');
  if (ingTitle) ingTitle.hidden = ingredients.length === 0;
  document.getElementById('modalIngredients').innerHTML = ingredients
    .map(i => `<span class="ing-tag">${i}</span>`)
    .join('');

  // Lien WhatsApp pré-rempli
  const msg = encodeURIComponent(
    `Bonjour Moodbucks,\nJe voudrais commander : ${p.name} (${p.price})`
  );
  document.getElementById('modalWA').href = `https://wa.me/23672999955?text=${msg}`;

  // Images
  curImgs = p.imgs;
  curIdx  = 0;
  setImg(0);

  // Afficher la modal
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * Affiche l'image à l'index donné et met à jour les points de navigation.
 * @param {number} idx - Index de l'image
 */
function setImg(idx) {
  curIdx = idx;
  document.getElementById('modalImg').src = curImgs[idx];

  const dots = document.getElementById('modalDots');
  dots.innerHTML = curImgs.length > 1
    ? curImgs
        .map((_, i) =>
          `<button class="img-dot${i === idx ? ' active' : ''}" onclick="setImg(${i})"></button>`
        )
        .join('')
    : '';
}

/**
 * Ferme la modal plat.
 */
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * Ferme la modal si l'utilisateur clique sur l'overlay (fond).
 * @param {MouseEvent} e
 */
function closeOnOverlay(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

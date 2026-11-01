/* ============================================================================
   eventModal.js — Gestion de la modal des événements
   Dépendances : data.json (chargé via dataLoader.js)
   ========================================================================== */

/** Labels lisibles pour les clés de détails d'un événement */
const EVENT_DETAIL_LABELS = {
  heure:       'Horaire',
  genre:       'Genre Musical',
  tarif:       'Tarif Entrée',
  reservation: 'Réservation'
};

/**
 * Ouvre la modal d'un événement par son identifiant.
 * @param {string} id - Clé de l'événement dans EVENTS (ex: 'live-jeudi')
 */
function openEvent(id) {
  const event = window.EVENTS?.[id];
  if (!event) {
    console.warn(`[eventModal.js] Événement introuvable : "${id}"`);
    return;
  }

  // Remplir les champs texte
  document.getElementById('eventModalDate').textContent  = event.date;
  document.getElementById('eventModalTitle').textContent = event.title;
  document.getElementById('eventModalDesc').textContent  = event.desc;

  // Image + bouton fermer
  document.getElementById('eventModalImg').innerHTML = `
    <img src="${event.img}" alt="${event.title}">
    <button class="event-modal-close" onclick="closeEventModal()">✕</button>
  `;

  // Détails (horaire, genre, tarif, réservation)
  document.getElementById('eventModalDetails').innerHTML = Object.entries(event.details)
    .map(([key, val]) => {
      const label = EVENT_DETAIL_LABELS[key] ?? key;
      return `<div class="event-modal-detail-item"><strong>${label} :</strong> ${val}</div>`;
    })
    .join('');

  // Lien WhatsApp pré-rempli
  const msg = encodeURIComponent(
    `Bonjour Moodbucks,\nJe voudrais réserver pour l'événement : ${event.title} (${event.date})`
  );
  document.getElementById('eventModalWA').href = `https://wa.me/23672999955?text=${msg}`;

  // Afficher la modal
  document.getElementById('eventModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * Ferme la modal événement.
 */
function closeEventModal() {
  document.getElementById('eventModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * Ferme la modal si l'utilisateur clique sur l'overlay (fond).
 * @param {MouseEvent} e
 */
function closeEventOnOverlay(e) {
  if (e.target === document.getElementById('eventModalOverlay')) closeEventModal();
}

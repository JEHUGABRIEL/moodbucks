/* ============================================================================
   eventModal.js — Gestion de la modal des événements
   Dépendances : data.json (chargé via dataLoader.js)
   ========================================================================== */

/** Labels lisibles pour les clés de détails d'un événement, par langue */
const EVENT_DETAIL_LABELS = {
  fr: {
    heure:       'Horaire',
    genre:       'Genre Musical',
    tarif:       'Tarif Entrée',
    reservation: 'Réservation'
  },
  en: {
    heure:       'Hours',
    genre:       'Music genre',
    tarif:       'Entry fee',
    reservation: 'Booking'
  }
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

  const locale = typeof getLocale === 'function' ? getLocale() : 'fr';
  const date  = event['date_' + locale]  || event.date;
  const title = event['title_' + locale] || event.title;
  const desc  = event['desc_' + locale]  || event.desc;

  // Mémorisé pour la traduire si la langue change pendant l'ouverture
  window.__openEventId = id;

  // Remplir les champs texte
  document.getElementById('eventModalDate').textContent  = date;
  document.getElementById('eventModalTitle').textContent = title;
  document.getElementById('eventModalDesc').textContent  = desc;

  // Image + bouton fermer
  document.getElementById('eventModalImg').innerHTML = `
    <img src="${event.img}" alt="${title}">
    <button class="event-modal-close" onclick="closeEventModal()" aria-label="Fermer">✕</button>
  `;

  // Détails (horaire, genre, tarif, réservation)
  const labels = (EVENT_DETAIL_LABELS[locale] || EVENT_DETAIL_LABELS.fr);
  document.getElementById('eventModalDetails').innerHTML = Object.entries(event.details)
    .map(([key, val]) => {
      const label = labels[key] ?? key;
      return `<div class="event-modal-detail-item"><strong>${label} :</strong> ${val}</div>`;
    })
    .join('');

  // Lien WhatsApp pré-rempli
  const msg = encodeURIComponent(
    locale === 'en'
      ? `Hello Moodbucks,\nI would like to book for: ${title} (${date})`
      : `Bonjour Moodbucks,\nJe voudrais réserver pour l'événement : ${title} (${date})`
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
  window.__openEventId = null;
}

/**
 * Ferme la modal si l'utilisateur clique sur l'overlay (fond).
 * @param {MouseEvent} e
 */
function closeEventOnOverlay(e) {
  if (e.target === document.getElementById('eventModalOverlay')) closeEventModal();
}

/* ============================================================================
   reviews.js — Avis des hôtes

   Les avis sont lus dans js/reviews.json :
     { "reviews": [ { "name": "...", "text": "...", "date": "...", "rating": 5 } ] }

   Tant que la liste est vide, l'invitation statique écrite dans index.html
   reste affichée : aucun avis n'est inventé.
   ========================================================================== */

/**
 * Construit une carte d'avis.
 * @param {{name?: string, text: string, date?: string, source?: string, rating?: number}} review
 * @returns {HTMLElement}
 */
function buildReview(review) {
  const article = document.createElement('article');
  article.className = 'review';

  const rating = Number(review.rating);

  if (rating >= 1 && rating <= 5) {
    const stars = document.createElement('p');
    stars.className = 'review-rating';
    stars.textContent = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
    stars.setAttribute('aria-label', `${Math.round(rating)} sur 5`);
    article.append(stars);
  }

  const text = document.createElement('p');
  text.className = 'review-text';
  text.textContent = review.text || '';
  article.append(text);

  const author = document.createElement('p');
  author.className = 'review-author';

  const name = document.createElement('span');
  name.textContent = review.name || 'Hôte de la maison';
  author.append(name);

  const meta = [review.date, review.source].filter(Boolean).join(' · ');
  if (meta) {
    const metaEl = document.createElement('span');
    metaEl.className = 'review-meta';
    metaEl.textContent = meta;
    author.append(metaEl);
  }

  article.append(author);
  return article;
}

/**
 * Charge les avis et remplace l'invitation si des avis existent.
 */
async function initReviews() {
  const list = document.getElementById('reviewsList');
  if (!list) return;

  let reviews = [];

  try {
    const response = await fetch('./js/reviews.json');
    if (response.ok) {
      const data = await response.json();
      reviews = Array.isArray(data.reviews) ? data.reviews : [];
    }
  } catch (err) {
    // Pas de réseau ou fichier absent : l'invitation statique reste en place.
    return;
  }

  if (reviews.length === 0) return;

  list.innerHTML = '';
  reviews.forEach(review => list.append(buildReview(review)));
}

document.addEventListener('DOMContentLoaded', initReviews);

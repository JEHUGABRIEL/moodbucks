/* ============================================================================
   dataLoader.js — Chargement des données et initialisation de l'app

   Ordre d'exécution :
   1. Fetch js/menu.json (carte réelle) et js/data.json (événements)
   2. Expose MENU / EVENTS sur window, construit les fiches plat (PLATS)
   3. Lance renderMenu() — onglets et lignes de la carte
   4. Lance initUI()   — en-tête, diaporama, carrousel, révélations, clavier
   5. Lance initTabs() — active la première catégorie
   ========================================================================== */

/**
 * Charge la carte et les événements, expose les données globalement,
 * puis initialise tous les modules UI.
 */
async function loadData() {
  try {
    const [menuResponse, dataResponse] = await Promise.all([
      fetch('./js/menu.json'),
      fetch('./js/data.json')
    ]);

    if (!menuResponse.ok) {
      throw new Error(`[dataLoader.js] Impossible de charger menu.json — HTTP ${menuResponse.status}`);
    }

    const menu = await menuResponse.json();
    const data = dataResponse.ok ? await dataResponse.json() : { events: {} };

    window.MENU   = Array.isArray(menu.categories) ? menu.categories : [];
    window.EVENTS = data.events || {};
    window.PLATS  = {};

    if (typeof renderMenu === 'function') renderMenu();

    console.info(
      `[dataLoader.js] ✅ ${window.MENU.length} catégories, ` +
      `${Object.keys(window.PLATS).length} plats, ` +
      `${Object.keys(window.EVENTS).length} événements`
    );

  } catch (err) {
    console.error('[dataLoader.js] ❌ Erreur de chargement :', err.message);
    // Fallback : structures vides pour éviter les crashes
    window.MENU   = [];
    window.EVENTS = {};
    window.PLATS  = {};
    if (typeof renderMenu === 'function') renderMenu();
  } finally {
    // Initialiser l'interface quelle que soit l'issue du fetch
    initUI();
    initTabs();
  }
}

// Lancer le chargement dès que le DOM est prêt
document.addEventListener('DOMContentLoaded', loadData);

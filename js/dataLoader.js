/* ============================================================================
   dataLoader.js — Chargement des données JSON et initialisation de l'app
   
   Ordre d'exécution :
   1. Fetch data.json
   2. Expose PLATS et EVENTS sur window (accès global)
   3. Lance initUI()   — fond hero, scroll-to-top, progress bar, clavier
   4. Lance initTabs() — active le premier onglet menu
   ========================================================================== */

/**
 * Charge le fichier data.json, expose les données globalement
 * puis initialise tous les modules UI.
 */
async function loadData() {
  try {
    const response = await fetch('./js/data.json');

    if (!response.ok) {
      throw new Error(`[dataLoader.js] Impossible de charger data.json — HTTP ${response.status}`);
    }

    const data = await response.json();

    // Exposer les données globalement pour modal.js et eventModal.js
    window.PLATS  = data.plats;
    window.EVENTS = data.events;

    console.info(`[dataLoader.js] ✅ ${Object.keys(window.PLATS).length} plats chargés`);
    console.info(`[dataLoader.js] ✅ ${Object.keys(window.EVENTS).length} événements chargés`);

  } catch (err) {
    console.error('[dataLoader.js] ❌ Erreur de chargement :', err.message);
    // Fallback : objets vides pour éviter les crashes
    window.PLATS  = {};
    window.EVENTS = {};
  } finally {
    // Initialiser l'interface quelle que soit l'issue du fetch
    initUI();
    initTabs();
  }
}

// Lancer le chargement dès que le DOM est prêt
document.addEventListener('DOMContentLoaded', loadData);

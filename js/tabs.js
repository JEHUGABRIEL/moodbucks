/* ============================================================================
   tabs.js — Gestion des onglets du menu (Locale / International / Boissons)
   ========================================================================== */

/**
 * Active l'onglet correspondant et affiche le panel associé.
 * @param {string} tab  - Identifiant du panel (ex: 'local', 'intl', 'drinks')
 * @param {HTMLElement} btn - Bouton cliqué (reçoit la classe 'active')
 */
function switchTab(tab, btn) {
  // Désactiver tous les panels
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));

  // Désactiver tous les boutons onglets
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  // Activer le panel ciblé
  const panel = document.getElementById('tab-' + tab);
  if (panel) {
    panel.classList.add('active');
  } else {
    console.warn(`[tabs.js] Panel introuvable : "tab-${tab}"`);
  }

  // Activer le bouton cliqué
  if (btn) btn.classList.add('active');
}

/**
 * Initialise le premier onglet actif au chargement de la page.
 * Appelé depuis dataLoader.js après le chargement des données.
 */
function initTabs() {
  const firstBtn = document.querySelector('.tab-btn');
  if (firstBtn) firstBtn.click();
}

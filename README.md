# Moodbucks – Restaurant & Bar · Bangui

Site vitrine de **Moodbucks**, restaurant et bar à Bangui : cuisine locale et
internationale, grillades au feu de bois, cocktails maison et musique live.
HTML, CSS et JavaScript natifs, sans dépendance de build.

## Charte graphique

Inspirée de la maison Restaurant M’ : ivoire, brun profond et or antique.

| Rôle | Valeur |
| --- | --- |
| Fond ivoire | `--cream: #f7f3eb` / `--cream-2: #efe9de` |
| Brun profond | `--ink: #17120e` |
| Or antique | `--gold: #a87f3f` / `--gold-light: #d6b77c` |
| Texte courant | `#4d463d`, secondaire `--muted: #7b7266` |

Typographie : **Marck Script** pour les titres (`--font-script`) et **Jost** pour
le texte (`--font-sans`), chargées depuis Google Fonts.

Les composants éditoriaux réutilisables sont `.script` + `.caps` (paire
script/majuscules espacées), `.ornament` (filet or avec ✦), `.gold-link`,
`.btn` (`-gold`, `-outline-dark`) et le panneau sombre `.dark-panel`.

## Structure

```
index.html   Page unique : en-tête, hero, maison, triptyque, menu,
             bande qualité, événements, carte/contact, pied de page, modales
style.css    Charte, mise en page et responsive (940 / 760 / 560 px)
js/
  menu.json      Carte réelle (17 catégories, 161 plats) relevée sur
                 menu.omegasoftware.ca/moodbucks
  data.json      Événements de la maison
  dataLoader.js  Charge menu.json + data.json, lance renderMenu() et l'UI
  menuRender.js  Construit les onglets et les lignes de la carte, remplit PLATS
  tabs.js        Onglets du menu (switchTab)
  modal.js       Fiche plat (galerie d'images, ingrédients, WhatsApp)
  eventModal.js  Fiche événement (détails, réservation WhatsApp)
  ui.js          En-tête, diaporama du hero, carrousel, révélation, retour en haut
README.md
```

## Personnalisation

- **Couleurs et polices** : variables `:root` en haut de `style.css`.
- **Plats** : `js/menu.json` (`categories[].items[]` avec `id`, `name`, `price`,
  `desc`). La carte est rendue automatiquement au chargement ; la photo de fiche
  est choisie par catégorie dans `MENU_CATEGORY_IMAGES` (`js/menuRender.js`).
- **Événements** : `js/data.json`, plus une carte dans `index.html`
  (`onclick="openEvent('id')"`) dont l'identifiant doit exister dans le JSON.
- **Photos** : URLs Unsplash dans `index.html` et, pour le carrousel de la
  maison, dans `PHOTOS` de `js/ui.js`.
- **Contact** : numéro WhatsApp et liens Maps présents dans `index.html`
  (`wa.me/23672999955`, `tel:+23672999955`, `mailto:khalil.haidar18@gmail.com`,
  Google Maps).

## Utilisation

Ouvrir `index.html` ne suffit pas : le menu et les événements sont chargés par
`fetch` depuis `js/data.json`, donc il faut servir le dossier :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

Aucun test automatisé, aucun lint : vérification manuelle dans le navigateur.

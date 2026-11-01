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
  reviews.json   Avis clients publiés (vide tant qu'aucun avis réel n'est fourni)
  reviews.js     Rend les avis de reviews.json, ou garde l'invitation statique
  dataLoader.js  Charge menu.json + data.json, lance renderMenu(),
                 renderEvents() et l'UI
  menuRender.js  Construit les onglets et les lignes de la carte, remplit PLATS
  tabs.js        Onglets du menu (switchTab)
  i18n.js        Dictionnaire FR/EN, bascule de langue (localStorage), data-i18n
  cart.js        Panier : bouton +, tiroir, badges, total, WhatsApp prérempli
  modal.js       Fiche plat (galerie d'images, ingrédients, ajout panier, WhatsApp)
  eventModal.js  Fiche événement (détails, réservation WhatsApp)
  ui.js          En-tête, diaporama du hero, carrousel, révélation, soirées,
                 retour en haut
README.md
```

## Panier & traduction

- **Bouton flottant** : pastille dorée fixe en bas à droite (`#cartFab`), au-dessus
  du bouton retour en haut, avec le compteur d'articles ; doublée d'un bouton
  panier dans l'en-tête (et dans le menu mobile).
- **Ajout** : bouton `+` sur chaque ligne de la carte et « Ajouter au panier »
  dans la fiche plat ; quantités, suppression, total en FCFA.
- **Commande** : « Commander sur WhatsApp » génère un message prérempli (articles,
  quantités, total) ; validation cuisine côté WhatsApp, aucun paiement en ligne.
- **Persistance** : `localStorage` (`moodbucks-cart`).
- **Traduction FR/EN** : sélecteur dans l'en-tête et le menu mobile, choix gardé
  dans `localStorage` (`moodbucks-locale`). Les textes fixes de `index.html` portent
  `data-i18n` (texte) ou `data-i18n-html` (avec retours à la ligne) ; le
  dictionnaire est dans `js/i18n.js`. Les événements ont des champs `date_en`,
  `title_en`, `desc_en` dans `js/data.json`.
- **Nom des plats en anglais** : si `name_en` / `desc_en` sont ajoutés dans un
  item de `js/menu.json`, ils sont utilisés en EN ; sinon le nom de la source
  est conservé (les 161 plats n'ont pas encore de traduction officielle).
- **Textes restant en FR en anglais** : nom de la maison, noms de plats sans
  `name_en`, avis clients (contenu réel), légal (pages en dur).

## Personnalisation

- **Couleurs et polices** : variables `:root` en haut de `style.css`.
- **Plats** : `js/menu.json` (`categories[].items[]` avec `id`, `name`, `price`,
  `desc`). La carte est rendue automatiquement au chargement ; la photo de fiche
  est choisie par catégorie dans `MENU_CATEGORY_IMAGES` (`js/menuRender.js`).
- **Événements** : `js/data.json`, plus une carte dans `index.html`
  (`data-event="id"` et `onclick="openEvent('id')"`) dont l'identifiant doit
  exister dans le JSON. Prévoir `date_en`, `title_en`, `desc_en` pour l'anglais.
- **Traductions** : ajouter la clé `fr` **et** `en` dans `js/i18n.js`, et poser
  `data-i18n="section.clé"` sur l'élément dans `index.html`.
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

/* ============================================================================
   i18n.js — Dictionnaire français / anglais et sélecteur de langue

   · Les textes traduits portent data-i18n (texte) ou data-i18n-html (HTML simple)
   · La langue choisie est mémorisée dans localStorage (moodbucks-locale)
   · Les rendus dynamiques (carte, soirées, panier) consultent getLocale()
   ========================================================================== */

const I18N = {
  fr: {
    'common.our': 'Notre',
    'common.address': "PK0, à côté de l'ambassade des États-Unis<br />Bangui, République Centrafricaine",

    'nav.house': 'La maison',
    'nav.menu': 'Menu',
    'nav.events': 'Événements',
    'nav.find': 'Nous trouver',
    'nav.reserve': 'Réserver',
    'nav.bookTable': 'Réserver une table',

    'hero.eyebrow': 'Restaurant & bar · Bangui',
    'hero.title1': 'Moodbucks,',
    'hero.title2': "l'âme de Bangui",
    'hero.lead': 'Cuisine locale & internationale, grillades au feu de bois, cocktails maison et musique live tous les soirs.',

    'story.caps': 'Maison',
    'story.text': "À deux pas du centre de Bangui, Moodbucks réunit une salle, une terrasse et un bar. On y vient pour un déjeuner d'affaires, un dîner en famille ou un cocktail au son des musiciens de la maison.",
    'story.link': 'Les soirées de la maison',

    'trip.title': 'Déjeuners<br />&amp; dîners',
    'trip.time': 'Tous les jours<br />8h00 – minuit',

    'menu.caps': 'Menu',
    'menu.text': "Pizzas pétries sur place, plats chinois mijotés, grillades au feu, burgers maison, sandwichs libanais et petits déjeuners : la carte complète de la maison, servie du matin à minuit.",
    'menu.empty': "La carte n'a pas pu être chargée. Écrivez-nous sur WhatsApp pour la recevoir.",

    'takeaway.script': 'À emporter',
    'takeaway.caps': 'Commande WhatsApp',
    'takeaway.text': "Toute la carte est disponible à emporter. Écrivez-nous, nous préparons votre commande pour l'heure souhaitée.",
    'takeaway.btn': 'Commander',

    'quality.title': 'Nous veillons<br />à la qualité de nos plats !',

    'events.script': 'Les',
    'events.caps': 'Événements',
    'events.text': 'Chaque soir a sa couleur : musique live, scène ouverte, DJ, brunch du dimanche et grands matchs sur écran géant.',
    'events.discover': 'Découvrir',
    'events.link': 'Les événements',

    'reviews.script': 'Avis',
    'reviews.caps': 'De nos hôtes',
    'reviews.text': 'Chaque table compte. Vos retours nous aident à ajuster la carte, le service et les soirées.',
    'reviews.link': 'Laisser un avis sur Google',
    'reviews.linkFooter': 'Avis clients',
    'reviews.emptyTitle': 'Votre avis',
    'reviews.emptyText': "Les commentaires de nos hôtes seront publiés ici au fur et à mesure. Vous avez dîné ou passé une soirée chez nous ? Racontez-nous.",
    'reviews.google': 'Avis Google',
    'reviews.write': 'Nous écrire',

    'contact.script': 'Contact',
    'contact.caps': 'Notre restaurant',
    'contact.hours': 'Ouvert tous les jours<br />8h00 – minuit',
    'contact.map': 'Voir sur Google Maps',

    'cta.text': 'Une table pour ce soir ?',
    'cta.btn': 'Réserver sur WhatsApp',

    'footer.tagline': 'Restaurant & bar à Bangui. Cuisine locale et internationale, cocktails maison et musique live tous les soirs.',
    'footer.explore': 'Explorer',
    'footer.find': 'Nous trouver',
    'footer.hoursTitle': 'Horaires',
    'footer.menuLink': 'Le menu',
    'footer.days1': 'Lundi – jeudi',
    'footer.days2': 'Vendredi – samedi',
    'footer.days3': 'Dimanche',
    'footer.time1': '8h – minuit',
    'footer.time2': '8h – 4h',
    'footer.time3': '10h – minuit',
    'footer.note': "Service continu. Cuisine ouverte jusqu'à 23h.",
    'footer.rights': '© 2026 Moodbucks · Bangui, République Centrafricaine',

    'legal.mentions': 'Mentions légales & CGU',
    'legal.privacy': 'Politique de confidentialité',

    'modal.ingredients': 'Ingrédients',
    'modal.add': 'Ajouter au panier',
    'modal.order': 'Commander sur WhatsApp',
    'modal.events': 'Voir les événements',
    'modal.book': 'Réserver sur WhatsApp',
    'modal.menu': 'Voir le menu',

    'cart.title': 'Panier',
    'cart.item': '{count} article',
    'cart.items': '{count} articles',
    'cart.empty': 'Votre panier est vide',
    'cart.total': 'Total',
    'cart.note': 'Votre commande est envoyée sur WhatsApp.',
    'cart.order': 'Commander sur WhatsApp',
    'cart.clear': 'Vider le panier',
    'cart.remove': 'Retirer',
    'cart.orderTitle': 'Commande',

    'loader.name': 'Moodbucks · Bangui',
    'loader.sr': 'Chargement de la carte et des événements',

    'categories': {
      'Plats': 'Plats',
      'Pizza': 'Pizza',
      'Entrées': 'Entrées',
      'Sandwiches': 'Sandwiches',
      'Salade': 'Salade',
      'Burgers': 'Burgers',
      'Soupe': 'Soupe',
      'Riz': 'Riz',
      'Nouilles': 'Nouilles',
      'Poulet': 'Poulet',
      'Combo': 'Combo',
      'Bœuf': 'Bœuf',
      'Poisson': 'Poisson',
      'Crevettes': 'Crevettes',
      'Plats végétariens': 'Plats végétariens',
      'Plats sizzling': 'Plats sizzling',
      'Petit déjeuner': 'Petit déjeuner'
    },

    'eventDetail': {
      'heure': 'Horaire',
      'genre': 'Genre musical',
      'tarif': "Tarif d'entrée",
      'reservation': 'Réservation'
    },

    'messages': {
      'order': 'Bonjour Moodbucks,\nJe voudrais commander :\n{lines}\nTotal : {total}',
      'book': "Bonjour Moodbucks,\nJe voudrais réserver pour l'événement : {title} ({date})",
      'reserve': 'Bonjour Moodbucks,\nJe voudrais réserver une table'
    }
  },

  en: {
    'common.our': 'Our',
    'common.address': "PK0, next to the US Embassy<br />Bangui, Central African Republic",

    'nav.house': 'The house',
    'nav.menu': 'Menu',
    'nav.events': 'Events',
    'nav.find': 'Find us',
    'nav.reserve': 'Book',
    'nav.bookTable': 'Book a table',

    'hero.eyebrow': 'Restaurant & bar · Bangui',
    'hero.title1': 'Moodbucks,',
    'hero.title2': 'the soul of Bangui',
    'hero.lead': 'Local & international cuisine, wood-fired grills, house cocktails and live music every night.',

    'story.caps': 'House',
    'story.text': 'A few steps from downtown Bangui, Moodbucks brings together a dining room, a terrace and a bar. Come for a business lunch, a family dinner or a cocktail to the sound of the house musicians.',
    'story.link': 'Our nights',

    'trip.title': 'Lunches<br />&amp; dinners',
    'trip.time': 'Every day<br />8 am – midnight',

    'menu.caps': 'Menu',
    'menu.text': 'Stone-baked pizzas, slow-cooked Chinese dishes, wood-fired grills, house burgers, Lebanese sandwiches and breakfasts: the complete menu of the house, served from morning to midnight.',
    'menu.empty': "The menu could not be loaded. Message us on WhatsApp to receive it.",

    'takeaway.script': 'Takeaway',
    'takeaway.caps': 'WhatsApp order',
    'takeaway.text': 'The whole menu is available for takeaway. Message us and we prepare your order for the time you want.',
    'takeaway.btn': 'Order',

    'quality.title': 'We take care<br />of the quality of our dishes!',

    'events.script': 'Our',
    'events.caps': 'Events',
    'events.text': 'Every night has its own colour: live music, open mic, DJ, Sunday brunch and big matches on a giant screen.',
    'events.discover': 'Discover',
    'events.link': 'Events',

    'reviews.script': 'Reviews',
    'reviews.caps': 'From our guests',
    'reviews.text': 'Every table matters. Your feedback helps us adjust the menu, the service and the nights.',
    'reviews.link': 'Leave a review on Google',
    'reviews.linkFooter': 'Guest reviews',
    'reviews.emptyTitle': 'Your review',
    'reviews.emptyText': "Our guests' comments will be published here as they come in. Dined or spent an evening with us? Tell us about it.",
    'reviews.google': 'Google review',
    'reviews.write': 'Message us',

    'contact.script': 'Contact',
    'contact.caps': 'Our restaurant',
    'contact.hours': 'Open every day<br />8 am – midnight',
    'contact.map': 'View on Google Maps',

    'cta.text': 'A table for tonight?',
    'cta.btn': 'Book on WhatsApp',

    'footer.tagline': 'Restaurant & bar in Bangui. Local and international cuisine, house cocktails and live music every night.',
    'footer.explore': 'Explore',
    'footer.find': 'Find us',
    'footer.hoursTitle': 'Opening hours',
    'footer.menuLink': 'The menu',
    'footer.days1': 'Monday – Thursday',
    'footer.days2': 'Friday – Saturday',
    'footer.days3': 'Sunday',
    'footer.time1': '8 am – midnight',
    'footer.time2': '8 am – 4 am',
    'footer.time3': '10 am – midnight',
    'footer.note': 'Continuous service. Kitchen open until 11 pm.',
    'footer.rights': '© 2026 Moodbucks · Bangui, Central African Republic',

    'legal.mentions': 'Legal notice & T&Cs',
    'legal.privacy': 'Privacy policy',

    'modal.ingredients': 'Ingredients',
    'modal.add': 'Add to cart',
    'modal.order': 'Order on WhatsApp',
    'modal.events': 'See the events',
    'modal.book': 'Book on WhatsApp',
    'modal.menu': 'See the menu',

    'cart.title': 'Cart',
    'cart.item': '{count} item',
    'cart.items': '{count} items',
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.note': 'Your order is sent on WhatsApp.',
    'cart.order': 'Order on WhatsApp',
    'cart.clear': 'Clear cart',
    'cart.remove': 'Remove',
    'cart.orderTitle': 'Order',

    'loader.name': 'Moodbucks · Bangui',
    'loader.sr': 'Loading the menu and events',

    'categories': {
      'Plats': 'Dishes',
      'Pizza': 'Pizza',
      'Entrées': 'Starters',
      'Sandwiches': 'Sandwiches',
      'Salade': 'Salads',
      'Burgers': 'Burgers',
      'Soupe': 'Soups',
      'Riz': 'Rice',
      'Nouilles': 'Noodles',
      'Poulet': 'Chicken',
      'Combo': 'Combo',
      'Bœuf': 'Beef',
      'Poisson': 'Fish',
      'Crevettes': 'Shrimp',
      'Plats végétariens': 'Vegetarian dishes',
      'Plats sizzling': 'Sizzling dishes',
      'Petit déjeuner': 'Breakfast'
    },

    'eventDetail': {
      'heure': 'Hours',
      'genre': 'Music genre',
      'tarif': 'Entry fee',
      'reservation': 'Booking'
    },

    'messages': {
      'order': 'Hello Moodbucks,\nI would like to order:\n{lines}\nTotal: {total}',
      'book': 'Hello Moodbucks,\nI would like to book for: {title} ({date})',
      'reserve': 'Hello Moodbucks,\nI would like to book a table'
    }
  }
};

let currentLocale = 'fr';

/**
 * Langue active ('fr' ou 'en').
 * @returns {string}
 */
function getLocale() {
  return currentLocale;
}

/**
 * Résout une clé dans un dictionnaire : d'abord telle quelle (clés plates
 * comme 'nav.house'), puis par chemin imbriqué ('messages.order').
 * @param {Record<string, any>} dict
 * @param {string} key
 * @returns {string|undefined} la valeur uniquement si c'est une chaîne
 */
function lookupKey(dict, key) {
  let value = dict[key];

  if (typeof value !== 'string') {
    value = key.split('.').reduce(
      (acc, part) => (acc && typeof acc === 'object') ? acc[part] : undefined,
      dict
    );
  }

  return typeof value === 'string' ? value : undefined;
}

/**
 * Traduit une clé du dictionnaire, avec substitution {variable}.
 * @param {string} key
 * @param {Record<string, string|number>} [vars]
 * @returns {string}
 */
function t(key, vars) {
  const dict = I18N[currentLocale] || I18N.fr;
  let value = lookupKey(dict, key) ?? lookupKey(I18N.fr, key) ?? key;

  if (vars) {
    Object.entries(vars).forEach(([name, replacement]) => {
      value = value.replace(`{${name}}`, String(replacement));
    });
  }

  return value;
}

/**
 * Traduit un nom de catégorie de la carte.
 * @param {string} name
 * @returns {string}
 */
function tCategory(name) {
  const categories = (I18N[currentLocale] || I18N.fr).categories || {};
  return categories[name] || name;
}

/**
 * Applique la langue aux éléments marqués data-i18n / data-i18n-html.
 * @param {ParentNode} [root]
 */
function applyI18n(root) {
  (root || document).querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  (root || document).querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  document.documentElement.lang = currentLocale;
}

/**
 * Change la langue, la mémorise et relance les rendus concernés.
 * @param {string} locale - 'fr' ou 'en'
 */
function setLocale(locale) {
  currentLocale = locale === 'en' ? 'en' : 'fr';

  try {
    localStorage.setItem('moodbucks-locale', currentLocale);
  } catch (err) {
    /* stockage indisponible : la langue reste valable pour la session */
  }

  document.querySelectorAll('.locale-btn').forEach(btn => {
    const active = btn.dataset.locale === currentLocale;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  applyI18n();

  if (typeof refreshMenuLabels === 'function') refreshMenuLabels();
  if (typeof renderEvents === 'function') renderEvents();
  if (typeof renderCart === 'function') renderCart();
  if (window.__openEventId && typeof openEvent === 'function') openEvent(window.__openEventId);
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    currentLocale = localStorage.getItem('moodbucks-locale') === 'en' ? 'en' : 'fr';
  } catch (err) {
    currentLocale = 'fr';
  }

  setLocale(currentLocale);

  document.querySelectorAll('.locale-btn').forEach(btn => {
    btn.addEventListener('click', () => setLocale(btn.dataset.locale));
  });
});

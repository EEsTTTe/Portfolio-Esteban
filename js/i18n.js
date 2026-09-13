/**
 * ============================================================
 *  BILINGUE FR / EN
 * ============================================================
 * Ce fichier contient TOUTES les traductions de l'interface
 * (menus, boutons, titres, formulaire...) ainsi que le petit
 * moteur qui bascule le site d'une langue à l'autre.
 *
 * Trois choses à connaître pour maintenir le site :
 *
 *  1. TEXTES DE L'INTERFACE (ce fichier, objet UI ci-dessous)
 *     Chaque texte a une "clé" (ex: 'nav.projets') et ses deux
 *     versions : { fr: '...', en: '...' }. Dans le HTML, on écrit
 *     <span data-i18n="nav.projets">Projets</span> et le texte est
 *     remplacé automatiquement selon la langue choisie.
 *
 *  2. TEXTES DES PROJETS (assets/js/data.js)
 *     Partout où un texte doit être traduit, on remplace la simple
 *     chaîne par un objet à deux langues :
 *         titre: 'Mariage'
 *     devient
 *         titre: { fr: 'Mariage', en: 'Wedding' }
 *     Idem pour "description" (liste de paragraphes) et "texte".
 *     Si on laisse une simple chaîne, elle s'affiche telle quelle
 *     dans les deux langues (pratique pour un nom propre).
 *
 *  3. MOTS-CLÉS / CATÉGORIES (objet TERMES ci-dessous)
 *     Les catégories et types de vidéos ('Montage vidéo', 'Graphisme'...)
 *     reviennent dans plusieurs projets : plutôt que de les traduire
 *     à chaque fois, elles sont listées UNE SEULE FOIS ici. Si tu
 *     utilises un nouveau mot-clé dans data.js, ajoute simplement sa
 *     traduction dans TERMES, sinon il restera affiché en français.
 * ============================================================
 */

/* ---------- Langues disponibles ---------- */
const LANGUES = ['fr', 'en'];
const LANGUE_DEFAUT = 'fr';
const LANG_STORAGE_KEY = 'es-portfolio-lang';

/**
 * Langue courante.
 *
 * Le site est en FRANÇAIS par défaut. Seul le bouton FR/EN change la langue :
 * la langue du navigateur du visiteur n'est volontairement PAS consultée, pour
 * que personne ne se retrouve en anglais sans l'avoir demandé.
 *
 * Une fois le bouton cliqué, le choix doit suivre le visiteur de page en page.
 * Deux mécanismes, l'un rattrapant l'autre :
 *  1. il est mémorisé dans le navigateur (localStorage) ;
 *  2. il est recopié dans l'adresse (?lang=en) ET sur tous les liens internes
 *     de la page (voir propagerLangueSurLiens plus bas).
 * Le second est indispensable : quand on ouvre les fichiers en local
 * (adresse file://...), les navigateurs bloquent souvent localStorage, et
 * chaque page repartait alors de zéro — c'était la cause des retours en
 * anglais au milieu d'une navigation.
 */
let LANGUE_COURANTE = (function langueDeDepart() {
    // 1. langue transportée par le lien sur lequel on vient de cliquer
    try {
        const parametre = new URLSearchParams(window.location.search).get('lang');
        if (parametre && LANGUES.includes(parametre.toLowerCase())) return parametre.toLowerCase();
    } catch (erreur) {
        /* adresse illisible : on passe à l'étape suivante. */
    }

    // 2. choix précédent mémorisé dans le navigateur
    try {
        const memorisee = localStorage.getItem(LANG_STORAGE_KEY);
        if (memorisee && LANGUES.includes(memorisee)) return memorisee;
    } catch (erreur) {
        /* localStorage indisponible (fichier local, navigation privée stricte). */
    }

    // 3. sinon : français
    return LANGUE_DEFAUT;
})();

function getLang() {
    return LANGUE_COURANTE;
}

/* ---------- Traduction d'une valeur venant de data.js ---------- */
/**
 * Renvoie la version dans la langue courante d'une valeur pouvant être :
 *  - une simple chaîne / un tableau  -> renvoyé tel quel (pas de traduction)
 *  - un objet { fr: ..., en: ... }   -> la version correspondant à la langue
 */
function tr(valeur) {
    if (valeur && typeof valeur === 'object' && !Array.isArray(valeur) && ('fr' in valeur || 'en' in valeur)) {
        const choisie = valeur[LANGUE_COURANTE];
        if (choisie !== undefined) return choisie;
        return valeur.fr !== undefined ? valeur.fr : valeur.en;
    }
    return valeur;
}

/* ---------- Mots-clés réutilisés (catégories de projet et types de vidéo) ---------- */
const TERMES = {
    // Catégories affichées sur les cards de projet
    'Montage vidéo': 'Video editing',
    'Motion design': 'Motion design',
    'Graphisme': 'Graphic design',
    'Captation': 'Filming',
    'Photographie': 'Photography',
    'DA': 'Art direction',
    'Vidéo': 'Video',
    '3D': '3D',

    // Types utilisés par les filtres de la page projet
    'Vidéo YT': 'YouTube video',
    'Interview': 'Interview',
    'Short content': 'Short content',
    'After movie': 'After movie',
    'Publicité': 'Advertising',
    'Montage': 'Editing',
    'Podcast': 'Podcast',
};

/** Traduit un mot-clé de TERMES (renvoyé tel quel s'il n'y est pas listé). */
function trTerme(mot) {
    if (LANGUE_COURANTE === 'fr') return mot;
    return TERMES[mot] || mot;
}

/* ---------- Textes de l'interface ---------- */
const UI = {
    /* Titres d'onglet du navigateur */
    'title.accueil': { fr: 'Esteban Santa', en: 'Esteban Santa' },
    'title.projets': { fr: 'Projets', en: 'Projects' },
    'title.projet': { fr: 'Projet — Esteban Santa', en: 'Project — Esteban Santa' },
    'title.contact': { fr: 'Contact', en: 'Contact' },

    /* Navigation + footer */
    'nav.projets': { fr: 'Projets', en: 'Projects' },
    'nav.contact': { fr: 'Contact', en: 'Contact' },
    'nav.profil': { fr: 'Profil', en: 'Profile' },
    'nav.langue': { fr: 'EN', en: 'FR' },
    'nav.langueAria': { fr: 'Switch to English', en: 'Passer en français' },

    /* Adresse du CV : une version par langue (bouton "Mon CV" de l'accueil).
       C'est un lien, pas un texte : il est posé sur le bouton via
       data-i18n-href="lien.cv" dans index.html. */
    'lien.cv': {
        fr: 'https://featpaper.com/u/rAiZXkep/l6',
        en: 'https://featpaper.com/u/Jyif2F2V/l6',
    },

    /* Boutons communs */
    'btn.tousProjets': { fr: 'Tous mes projets', en: 'All my projects' },
    'btn.contact': { fr: 'Contactez moi !', en: 'Contact' },
    'btn.cv': { fr: 'Mon CV', en: 'My resume' },
    'btn.voirPlus': { fr: 'Voir plus', en: 'See more' },

    /* Accueil — hero */
    'accueil.tag': { fr: 'Monteur vidéo', en: 'Video editor' },
    'accueil.accroche': {
        fr: "Vidéaste polyvalent, curieux et motivé d'apprendre de nouvelles choses pour aller encore plus loin !",
        en: 'Versatile videographer, curious and eager to learn new things to go even further!',
    },

    /* Accueil — carte profil */
    'profil.salut': { fr: 'Salut, je suis Esteban', en: "Hi, I'm Esteban" },
    'profil.sousTitre': { fr: 'Vidéaste polyvalent', en: 'Versatile videographer' },
    'profil.p1': {
        fr: "Depuis mes 12 ans, je regarde presque tous les jours des contenus sur internet et les réseaux sociaux. J'ai toujours rêvé de, moi aussi, laisser ma trace quelque part dans ce vaste monde.",
        en: "Ever since I was 12, I’ve been watching content on the internet and social media almost every day. I’ve always dreamt of leaving my own mark somewhere in this vast world.",
    },
    'profil.p2': {
        fr: "Ce qui me plaît le plus ? Le montage ! J'ai, à plusieurs reprises essayé, étant enfant, d'apprendre sans vraiment y parvenir. Jusqu'à ce que je me plonge pleinement dedans et que j'en fasse aujourd'hui ma raison de sortir de mon lit.",
        en: "What do I enjoy most? Editing! I tried several times as a child to learn how to do it, without really succeeding. That was until I threw myself into it wholeheartedly, and now it’s what gets me out of bed every morning.",
    },
    'profil.p3': {
        fr: "Grâce à mon diplôme de BUT Métier du Multimédia et de l'Internet, j'ai pu approfondir mes compétences dans le large domaine du multimédia en général et travailler sur des projets des plus variés.",
        en: "Thanks to my BUT degree in Multimedia and the Internet, I have been able to develop my skills in the broad field of multimedia in general and work on a wide variety of projects.",
    },
    'profil.p4': {
        fr: "À côté de ça, je me suis passionné pour le sport électronique, le e-sport, c'est ce qui m'a amené à travailler chez Shifters, qui a grandement forgé mes compétences actuelles.",
        en: "Alongside that, I became passionate about esports — which is what led me to work at Shifters, an experience that shaped the skills I have today.",
    },

    /* Accueil — derniers projets */
    'accueil.derniersProjets': { fr: 'Derniers projets', en: 'Latest projects' },

    /* Page projets */
    'projets.tag': { fr: 'Tous mes projets', en: 'All my projects' },
    'projets.titre': { fr: 'Mes réalisations', en: 'My work' },

    /* Page détail projet */
    'projet.filtreTout': { fr: 'Tout', en: 'All' },
    'projet.logiciels': { fr: 'Logiciels utilisés', en: 'Software used' },
    'projet.docLire': { fr: 'Lire', en: 'Read' },
    'projet.docTelecharger': { fr: 'Télécharger', en: 'Download' },
    'projet.docLireAria': { fr: 'Lire "{titre}" en ligne', en: 'Read "{titre}" online' },
    'projet.docTelechargerAria': { fr: 'Télécharger "{titre}"', en: 'Download "{titre}"' },
    'projet.introuvable': { fr: 'Projet introuvable', en: 'Project not found' },
    'projet.retour': { fr: 'Retour aux projets', en: 'Back to projects' },
    'projet.videoManquante': {
        fr: "Ajoute l'URL de ta vidéo<br>dans assets/js/data.js",
        en: 'Add your video URL<br>in assets/js/data.js',
    },
    'projet.voirSurX': { fr: 'Voir la vidéo sur X ↗', en: 'Watch the video on X ↗' },
    'projet.voirSurVimeo': { fr: 'Voir la vidéo sur Vimeo ↗', en: 'Watch the video on Vimeo ↗' },
    'projet.driveCle': {
        fr: 'Configure ta clé Google Drive<br>dans assets/js/data.js (SITE.googleDriveApiKey)',
        en: 'Set your Google Drive key<br>in assets/js/data.js (SITE.googleDriveApiKey)',
    },
    'projet.driveErreur': {
        fr: 'Impossible de charger les photos Drive : vérifie la clé API et le partage du dossier.',
        en: 'Could not load the Drive photos: check the API key and the folder sharing settings.',
    },

    /* Page contact */
    'contact.tag': { fr: 'Discutons', en: "Let's talk" },
    'contact.titre': {
        fr: 'Travaillons<br>Ensemble<br><span class="accent">dès maintenant</span>',
        en: "Let's work<br>Together<br><span class=\"accent\">now</span>",
    },
    'contact.labelMail': { fr: 'Adresse mail', en: 'Email address' },
    'contact.labelTel': { fr: 'Téléphone', en: 'Phone' },
    'form.nom': { fr: 'Nom', en: 'Name' },
    'form.nomPlaceholder': { fr: 'Votre nom', en: 'Your name' },
    'form.mail': { fr: 'Mail', en: 'Email' },
    'form.mailPlaceholder': { fr: 'Votre adresse mail', en: 'Your email address' },
    'form.message': { fr: 'Message', en: 'Message' },
    'form.messagePlaceholder': { fr: 'Votre message', en: 'Your message' },
    'form.envoyer': { fr: 'Envoyer', en: 'Send' },
    'form.succes': {
        fr: 'Merci ! Ton message a bien été envoyé, je te réponds au plus vite.',
        en: "Thanks! Your message has been sent, I'll get back to you as soon as possible.",
    },
    'form.erreur': {
        fr: "Le message n'a pas pu être envoyé. Réessaie plus tard ou écris-moi directement à {email}.",
        en: 'Your message could not be sent. Please try again later or email me directly at {email}.',
    },
    'form.erreurReseau': {
        fr: "Le message n'a pas pu être envoyé (connexion). Réessaie plus tard ou écris-moi directement à {email}.",
        en: 'Your message could not be sent (connection issue). Please try again later or email me directly at {email}.',
    },
    'form.nonConfigure': {
        fr: "Le formulaire n'est pas encore configuré : crée un compte gratuit sur formspree.io et renseigne ton identifiant de formulaire dans assets/js/data.js (SITE.formspreeId).",
        en: 'The form is not configured yet: create a free account on formspree.io and set your form ID in assets/js/data.js (SITE.formspreeId).',
    },
};

/**
 * Renvoie le texte d'interface correspondant à une clé de UI.
 * `variables` permet de remplacer les {balises} du texte,
 * ex : t('form.erreur', { email: 'a@b.c' })
 */
function t(cle, variables) {
    const entree = UI[cle];
    if (!entree) return cle;
    let texte = entree[LANGUE_COURANTE] !== undefined ? entree[LANGUE_COURANTE] : entree.fr;
    if (variables) {
        Object.entries(variables).forEach(([nom, valeur]) => {
            texte = texte.split(`{${nom}}`).join(valeur);
        });
    }
    return texte;
}

/* ---------- Application des traductions sur le HTML statique ---------- */
/**
 * Parcourt la page et remplace :
 *  - data-i18n              -> le texte de l'élément
 *  - data-i18n-html         -> le contenu HTML (quand il y a des <br>, <span>...)
 *  - data-i18n-placeholder  -> l'attribut placeholder d'un champ
 *  - data-i18n-aria         -> l'attribut aria-label
 *  - data-i18n-href         -> l'adresse d'un lien (ex: le CV, qui a une
 *                              version française et une version anglaise)
 */
function appliquerTraductionsStatiques() {
    document.documentElement.lang = LANGUE_COURANTE;

    document.querySelectorAll('[data-i18n]').forEach((noeud) => {
        noeud.textContent = t(noeud.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-href]').forEach((noeud) => {
        noeud.setAttribute('href', t(noeud.dataset.i18nHref));
    });
    document.querySelectorAll('[data-i18n-html]').forEach((noeud) => {
        noeud.innerHTML = t(noeud.dataset.i18nHtml);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((noeud) => {
        noeud.setAttribute('placeholder', t(noeud.dataset.i18nPlaceholder));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((noeud) => {
        noeud.setAttribute('aria-label', t(noeud.dataset.i18nAria));
    });
}

/* ---------- Transport de la langue d'une page à l'autre ---------- */
/**
 * Ajoute ?lang=<langue courante> à tous les liens internes de la page
 * (index.html, projets.html, projet.html?slug=..., index.html#profil...).
 *
 * C'est ce qui garantit qu'on reste dans la même langue en naviguant, même
 * quand le navigateur refuse de mémoriser le choix (fichiers ouverts en local).
 * Les liens externes (réseaux sociaux, CV), les mailto:/tel: et les fichiers
 * (PDF...) ne sont pas touchés.
 *
 * À rappeler après chaque rendu, puisque les cards de projet — donc des liens —
 * sont recréées à chaque changement de langue.
 */
function propagerLangueSurLiens() {
    document.querySelectorAll('a[href]').forEach((lien) => {
        const href = lien.getAttribute('href');
        if (!href) return;
        // Lien absolu (https://..., mailto:, tel:) ou simple ancre : on ne touche pas.
        if (href.startsWith('#') || href.startsWith('//') || /^[a-z][a-z0-9+.-]*:/i.test(href)) return;

        const positionHash = href.indexOf('#');
        const hash = positionHash === -1 ? '' : href.slice(positionHash);
        const cheminEtQuery = positionHash === -1 ? href : href.slice(0, positionHash);

        // Uniquement les pages du site (pas les PDF, images...).
        if (!/\.html(\?|$)/i.test(cheminEtQuery)) return;

        const positionQuery = cheminEtQuery.indexOf('?');
        const chemin = positionQuery === -1 ? cheminEtQuery : cheminEtQuery.slice(0, positionQuery);
        const parametres = new URLSearchParams(positionQuery === -1 ? '' : cheminEtQuery.slice(positionQuery + 1));

        // Le français étant la langue par défaut, inutile de l'écrire dans
        // l'adresse : on ne marque que l'anglais, et les adresses restent
        // propres (index.html, projet.html?slug=shifters...).
        if (LANGUE_COURANTE === LANGUE_DEFAUT) {
            parametres.delete('lang');
        } else {
            parametres.set('lang', LANGUE_COURANTE);
        }

        const query = parametres.toString();
        lien.setAttribute('href', chemin + (query ? `?${query}` : '') + hash);
    });
}

/* ---------- Bouton de changement de langue ---------- */
/** Fonctions à rejouer quand la langue change (enregistrées par site.js). */
const ecouteursLangue = [];

function onLangChange(callback) {
    ecouteursLangue.push(callback);
}

function setLang(langue) {
    if (!LANGUES.includes(langue) || langue === LANGUE_COURANTE) return;
    LANGUE_COURANTE = langue;
    try {
        localStorage.setItem(LANG_STORAGE_KEY, langue);
    } catch (erreur) {
        /* localStorage indisponible : le choix ne sera juste pas mémorisé. */
    }

    // Garde l'adresse cohérente sans recharger la page, pour que la page reste
    // dans la bonne langue si on la rafraîchit ou qu'on copie son lien.
    // (?lang=en en anglais ; rien en français, qui est la langue par défaut.)
    try {
        const url = new URL(window.location.href);
        if (langue === LANGUE_DEFAUT) {
            url.searchParams.delete('lang');
        } else {
            url.searchParams.set('lang', langue);
        }
        window.history.replaceState({}, '', url);
    } catch (erreur) {
        /* URL non modifiable (fichier local ouvert en file://) : sans importance. */
    }

    appliquerTraductionsStatiques();
    ecouteursLangue.forEach((callback) => callback(langue));
}

/** Branche le(s) bouton(s) FR/EN présents dans la page. */
function initLangSwitch() {
    document.querySelectorAll('.lang-switch').forEach((bouton) => {
        bouton.addEventListener('click', () => {
            setLang(LANGUE_COURANTE === 'fr' ? 'en' : 'fr');
        });
    });
}

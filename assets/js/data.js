/**
 * ============================================================
 *  LISTE DES RÉALISATIONS
 * ============================================================
 * Pour ajouter un nouveau projet : copie un bloc ci-dessous et
 * modifie ses valeurs. Rien d'autre à toucher, le site (accueil,
 * page "projets" et page détail) se met à jour automatiquement.
 *
 *  - slug        : identifiant unique utilisé dans l'URL (sans espace/accent)
 *  - titre       : nom du projet, affiché en grand
 *  - categories  : tags affichés sur la card (liste de mots-clés)
 *  - image       : chemin de l'image de couverture (une seule fois, réutilisée
 *                  sur l'accueil, la page "projets" et la page détail)
 *  - imageFit    : 'cover' (par défaut) ou 'contain' (pour un logo/visuel
 *                  qui ne doit pas être rogné)
 *  - description : un ou plusieurs paragraphes de texte de présentation
 *  - softwares   : logiciels utilisés (sigles affichés en badges)
 *  - documents   : (optionnel) un ou plusieurs PDF à présenter (plaquette,
 *                  dossier de presse...). Affichés comme une tuile parmi les
 *                  vidéos, avec les mêmes filtres.
 *      - titre       : texte alternatif (accessibilité), non affiché
 *      - cover       : image de couverture du PDF (ex: sa 1ère page exportée
 *                      en .jpg) — voir le dossier assets/img/documents/
 *      - pdf         : chemin du fichier PDF — voir assets/docs/
 *      - types, orientation : comme pour les vidéos (voir plus bas)
 *  - videos      : chaque entrée = un placeholder vidéo sur la page détail.
 *      - url         : lien de la vidéo (YouTube/Vimeo/Shorts, ou fichier
 *                      vidéo direct .mp4/.webm)
 *      - types       : liste des catégories de la vidéo (une ou plusieurs) ->
 *                      génère automatiquement la barre de filtre (si un seul
 *                      type existe au total pour le projet, la barre de
 *                      filtre ne s'affiche pas). Une vidéo peut appartenir à
 *                      plusieurs catégories, ex: ['Vidéo YT', 'Motion design']
 *      - orientation : 'landscape' (16:9, par défaut) ou 'portrait' (9:16)
 *      - texte       : (optionnel) petit texte de contexte affiché à côté de
 *                      la vidéo (reste attaché à elle pour le filtre)
 *  - driveFolder : (optionnel, remplace "videos") pour une galerie photo :
 *                  colle simplement le lien d'un dossier Google Drive partagé
 *                  ("Tous les utilisateurs disposant du lien"), et toutes les
 *                  photos de ce dossier s'affichent automatiquement, chacune
 *                  avec sa bonne orientation. Nécessite SITE.googleDriveApiKey
 *                  (voir plus bas dans ce fichier).
 *  - driveType   : (optionnel) catégorie/filtre attribué à ces photos
 *                  (par défaut 'Photographie')
 * ============================================================
 */

const PROJECTS = [

    {
        slug: 'shifters',
        titre: 'Shifters',
        categories: ['Montage vidéo', 'Motion design'],
        image: 'assets/img/projects/shifters.jpg',
        description: [
            "Ma 3ᵉ année de BUT MMI a été réalisée en alternance chez Shifters, anciennement Team BDS, une équipe eSport suisse au niveau européen.",
            "Je me suis occupé, pendant une année, du montage des vidéos à destination des réseaux sociaux, en format court ou sur des formats longs.",
            "Interview, publicité, short content, vidéo YouTube, aftermovies et préparation/écriture de media day.",
            "Au total, c'est plus d'une centaine de vidéos montées avec plus de 3M de vues cumulées et un pic à 575k vues sur un réel.",
        ],
        softwares: ['Pr', 'Ae', 'Ps'],
        videos: [
            { url: 'https://www.youtube.com/watch?v=9KRMuGkOzmc&pp=0gcJCU8LAYcqIYzv', types: ['Vidéo YT', 'Motion design'], orientation: 'landscape' },
            { url: 'https://www.youtube.com/watch?v=zZWcePrhv08&t', types: ['Vidéo YT'], orientation: 'landscape' },
            { url: 'https://www.youtube.com/watch?v=e9JFyUHmd2I&t=98s&pp=ygUSemFib3V0aW5lIHRlYW0gYmRz', types: ['Interview'], orientation: 'landscape' },
            { url: '', types: ['Motion design'], orientation: 'landscape' },
            { url: '', types: ['After movie'], orientation: 'portrait' },
            { url: '', types: ['Publicité'], orientation: 'portrait' },
            { url: 'https://www.dropbox.com/scl/fi/rh7rfdrh1sba7fk1vnk7i/Pyke_v1.mp4?rlkey=59w5zm1rqjy3x4aax71lja3et&st=hqhexxlh&dl=0', types: ['Short content'], orientation: 'portrait' },
        ],
    },

    {
        slug: 'le-scarabee',
        titre: 'Le Scarabée',
        categories: ['Graphisme', 'Montage vidéo', 'Captation'],
        image: 'assets/img/projects/scarabee.jpg',
        imageFit: 'contain',
        description: [
            "Stage de chargé de communication au Scarabée, une salle de concert à Chambéry.",
            "Description à compléter : présente ici le contexte du projet, tes missions et ce que tu as produit (affiches, montages, captations...).",
        ],
        softwares: ['Pr', 'Id', 'Ps'],
        documents: [
            {
                titre: 'Rendez-vous au Scarabée — Plaquette de saison',
                cover: 'assets/img/documents/plaquette-scarabee.jpg',
                pdf: 'assets/docs/plaquette-scarabee.pdf',
                types: ['Plaquette de saison 2025-2026'],
                orientation: 'landscape',
            },
        ],
        videos: [
            { url: '', types: ['Montage'], orientation: 'landscape' },
            { url: '', types: ['Montage'], orientation: 'landscape' },
            { url: '', types: ['Captation'], orientation: 'portrait' },
        ],
    },

    {
        slug: 'projets-iut',
        titre: 'Projets IUT',
        categories: ['DA', 'Montage', 'Motion', 'Captation'],
        image: 'assets/img/projects/iut.jpg',
        imageFit: 'contain',
        description: [
            "Sélection de projets réalisés pendant mon BUT MMI à l'IUT de Chambéry.",
            "Description à compléter : détaille ici les différents projets étudiants regroupés dans cette réalisation.",
        ],
        softwares: ['Pr', 'Ae', 'Ai', 'Ps'],
        videos: [
            { url: '', types: ['Montage'], orientation: 'landscape', texte: "Texte de contexte à modifier dans data.js : explique ici le projet, son objectif, ton rôle..." },
            { url: '', types: ['Motion'], orientation: 'portrait', texte: "bla bla" },
            { url: '', types: ['Captation'], orientation: 'portrait' },
        ],
    },

    {
        slug: 'mariage',
        titre: 'Mariage',
        categories: ['Photographie'],
        image: 'assets/img/projects/mariage.jpg',
        description: [
            "Reportage photo réalisé à l'occasion d'un mariage.",
            "Description à compléter.",
        ],
        softwares: ['Lr', 'Ps'],
        driveFolder: 'https://drive.google.com/drive/folders/1YZxln4mXn1hwIdvr8G9gjDPoJE5hYQmx?usp=sharing',
        driveType: 'Photographie',
        videos: [],
    },

    {
        slug: 'printemps-des-iut',
        titre: 'Printemps des IUT',
        categories: ['Photographie'],
        image: 'assets/img/projects/printemps-iut.jpg',
        description: [
            "Reportage photo réalisé lors du Printemps des IUT.",
            "Description à compléter.",
        ],
        softwares: ['Lr', 'Ps'],
        driveFolder: 'https://drive.google.com/drive/folders/COLLE_ICI_L_ID_DU_DOSSIER',
        driveType: 'Photographie',
        videos: [],
    },

];

/**
 * Parcours affiché dans la section "Profil" de la page d'accueil.
 * Ajoute/modifie une entrée : role, lieu, debut, fin.
 */
const EXPERIENCES = [
    { role: ['Alternance', 'Monteur vidéo'], lieu: ['Shifters', 'Genève'], debut: 'sept 2025', fin: 'août 2026' },
    { role: ['Stage', 'Chargé de comm'], lieu: ['Le Scarabée', 'Chambéry'], debut: 'mai 2025', fin: 'juillet 2025' },
    { role: ['Étudiant'], lieu: ['BUT MMI', 'Chambéry'], debut: 'sept 2023', fin: 'juin 2026' },
];

/**
 * Logos affichés dans "Logiciels utilisés" sur la page projet.
 * Le sigle utilisé dans le champ "softwares" de chaque projet (data.js)
 * doit correspondre à une clé ci-dessous. Pour ajouter un logiciel :
 * dépose son logo dans assets/img/software/ et ajoute une ligne ici.
 */
const SOFTWARE_ICONS = {
    Pr: { src: 'assets/img/software/premiere-pro.png', nom: 'Premiere Pro' },
    Ae: { src: 'assets/img/software/after-effects.png', nom: 'After Effects' },
    Ps: { src: 'assets/img/software/photoshop.png', nom: 'Photoshop' },
    Ai: { src: 'assets/img/software/illustrator.png', nom: 'Illustrator' },
    Id: { src: 'assets/img/software/indesign.png', nom: 'InDesign' },
    Lr: { src: 'assets/img/software/lightroom.png', nom: 'Lightroom' },
};

/**
 * Coordonnées et réseaux sociaux, utilisés sur toutes les pages.
 */
const SITE = {
    email: 'santaesteban.pro@gmail.com',
    phone: '+33 6 51 95 02 24',
    socialX: 'https://x.com/EEsTTe_',
    socialInsta: 'https://www.instagram.com/este_png/',
    socialLinkedin: 'https://www.linkedin.com/in/esteban-santa/',
    // Crée un formulaire gratuit sur https://formspree.io (~1 min, sans CB),
    // puis remplace l'ID ci-dessous par celui fourni par Formspree.
    formspreeId: 'https://formspree.io/f/xykrgyob',

    /**
     * Clé API Google Drive — nécessaire pour les pages "photos" qui listent
     * automatiquement le contenu d'un dossier Drive (voir "driveFolder" sur
     * les projets Mariage / Printemps des IUT dans PROJECTS).
     *
     * Pour la créer (gratuit, ~5 minutes) :
     *  1. https://console.cloud.google.com/ → créer un projet
     *  2. "API et services" → "Bibliothèque" → activer "Google Drive API"
     *  3. "API et services" → "Identifiants" → "Créer des identifiants" → "Clé API"
     *  4. Restreins-la : "Restrictions du site" → HTTP referrers → ajoute ton
     *     domaine (ex: esteban-santa.github.io/*) pour que personne d'autre
     *     ne puisse l'utiliser depuis un autre site.
     *  5. Colle la clé ci-dessous à la place de 'YOUR_GOOGLE_DRIVE_API_KEY'.
     *
     * Pour chaque dossier Drive utilisé : clic droit sur le dossier > Partager
     * > "Tous les utilisateurs disposant du lien" > "Lecteur", puis colle le
     * lien du dossier dans "driveFolder" du projet concerné.
     */
    googleDriveApiKey: 'AIzaSyAXBoayBrs3RkoVzTDV3gm-Veav-zUbyBM',
};

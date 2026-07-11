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
 *  - videos      : chaque entrée = un placeholder vidéo sur la page détail.
 *      - url         : lien de la vidéo (YouTube/Vimeo/Shorts, ou fichier
 *                      vidéo direct .mp4/.webm)
 *      - type        : catégorie de la vidéo -> génère automatiquement la
 *                      barre de filtre (si un seul type existe pour le
 *                      projet, la barre de filtre ne s'affiche pas)
 *      - orientation : 'landscape' (16:9, par défaut) ou 'portrait' (9:16)
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
            { url: 'https://www.youtube.com/watch?v=9KRMuGkOzmc&pp=0gcJCU8LAYcqIYzv', type: 'Vidéo YT', orientation: 'landscape' },
            { url: 'https://www.youtube.com/watch?v=zZWcePrhv08&t', type: 'Vidéo YT', orientation: 'landscape' },
            { url: 'https://www.youtube.com/watch?v=e9JFyUHmd2I&t=98s&pp=ygUSemFib3V0aW5lIHRlYW0gYmRz', type: 'Interview', orientation: 'landscape' },
            { url: 'https://x.com/swissesports/status/1981027769015488544/video/1', type: 'Motion design', orientation: 'landscape' },
            { url: 'https://www.instagram.com/reel/DZXiZKQI_oW/', type: 'After movie', orientation: 'portrait' },
            { url: '', type: 'Publicité', orientation: 'portrait' },
            { url: 'https://vimeo.com/share/3dbc7295-25db-4467-8c0c-8c7b37cb4321/', type: 'Short content', orientation: 'portrait' },
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
        videos: [
            { url: '', type: 'Montage', orientation: 'landscape' },
            { url: '', type: 'Montage', orientation: 'landscape' },
            { url: '', type: 'Captation', orientation: 'portrait' },
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
        softwares: ['Pr', 'Ae', 'Ai'],
        videos: [
            { url: '', type: 'Montage', orientation: 'landscape' },
            { url: '', type: 'Motion', orientation: 'portrait' },
            { url: '', type: 'Captation', orientation: 'landscape' },
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
        videos: [
            { url: '', type: 'Photographie', orientation: 'landscape' },
            { url: '', type: 'Photographie', orientation: 'portrait' },
            { url: '', type: 'Photographie', orientation: 'landscape' },
        ],
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
        videos: [
            { url: '', type: 'Photographie', orientation: 'landscape' },
            { url: '', type: 'Photographie', orientation: 'landscape' },
            { url: '', type: 'Photographie', orientation: 'landscape' },
            { url: '', type: 'Photographie', orientation: 'landscape' },
        ],
    },

];

/**
 * Parcours affiché dans la section "Profil" de la page d'accueil.
 * Ajoute/modifie une entrée : role, lieu, debut, fin.
 */
const EXPERIENCES = [
    { role: 'Alternance Monteur vidéo', lieu: 'Shifters — Genève', debut: 'sept 2025', fin: 'août 2026' },
    { role: 'Stage Chargé de comm', lieu: 'Le Scarabée — Chambéry', debut: 'mai 2025', fin: 'juillet 2025' },
    { role: 'Étudiant', lieu: 'BUT MMI — Chambéry', debut: 'sept 2023', fin: 'juin 2026' },
];

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
};

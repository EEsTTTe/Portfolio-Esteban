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
 *      - titre       : titre affiché sur la tuile
 *      - description : court texte affiché sous le titre
 *      - cover       : image de couverture du PDF (ex: sa 1ère page exportée
 *                      en .jpg) — voir le dossier assets/img/documents/
 *      - pdf         : chemin du fichier PDF — voir assets/docs/
 *      - types, orientation : comme pour les vidéos (voir plus bas)
 *  - videos      : chaque entrée = un placeholder vidéo (ou image) sur la page détail.
 *      - url         : lien de la vidéo (YouTube/Vimeo/Shorts, Dropbox, ou
 *                      fichier vidéo direct .mp4/.webm)
 *      - image       : (remplace "url") pour afficher une image fixe à la place
 *                      d'une vidéo (storyboard, visuel, capture d'écran...) —
 *                      dépose l'image dans assets/img/ et indique son chemin ici
 *      - types       : liste des catégories de la vidéo (une ou plusieurs) ->
 *                      génère automatiquement la barre de filtre (si un seul
 *                      type existe au total pour le projet, la barre de
 *                      filtre ne s'affiche pas). Une vidéo peut appartenir à
 *                      plusieurs catégories, ex: ['Vidéo YT', 'Motion design']
 *      - orientation : 'landscape' (16:9, par défaut), 'portrait' (9:16)
 *                      ou 'carre' (1:1)
 *      - texte       : (optionnel) petit texte de contexte affiché à côté de
 *                      la vidéo (reste attaché à elle pour le filtre).
 *                      Pour sauter une ligne, mets \n dans le texte, ex :
 *                      "Première ligne\nDeuxième ligne"
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
            { url: 'https://www.youtube.com/watch?v=zZWcePrhv08&t', types: ['Vidéo YT', 'Motion design'], orientation: 'landscape' },
            { url: 'https://www.youtube.com/watch?v=e9JFyUHmd2I&t=98s&pp=ygUSemFib3V0aW5lIHRlYW0gYmRz', types: ['Interview'], orientation: 'landscape' },
            { url: 'https://www.dropbox.com/scl/fi/f9xpq1bngysdivxtbm808/FER-finals.mp4?rlkey=3dfh2lsonz2z6fmi3hrfa2y8e&st=ux7u8dji&dl=0', types: ['Motion design'], orientation: 'landscape'},

            { url: 'https://www.dropbox.com/scl/fi/y0tm6ng2bk0vq19qo3c6f/LeagueTricks_2.mp4?rlkey=bqwooh1r857pqolfcyopppsc9&st=zsvxmix9&dl=0', types: ['Short content'], orientation: 'portrait' },
            { url: 'https://www.dropbox.com/scl/fi/hivku6auodz4p4v0z8gvl/LeagueTricks_3.mp4?rlkey=evf8pkg0fndtt5onb4sfu7gr3&st=l5nq1zyv&dl=0', types: ['Short content'], orientation: 'portrait' },
            { url: 'https://www.dropbox.com/scl/fi/rh7rfdrh1sba7fk1vnk7i/Pyke_v1.mp4?rlkey=59w5zm1rqjy3x4aax71lja3et&st=hqhexxlh&dl=0', types: ['Short content'], orientation: 'portrait' },
            { url: 'https://www.dropbox.com/scl/fi/2shird6pybpsksd7lixm3/Maysun.mp4?rlkey=athlkdft7tt2b7xihksyn5c5e&st=ulmxfkba&dl=0', types: ['After movie'], orientation: 'portrait' },
            { url: 'https://www.dropbox.com/scl/fi/l2mtxz02188x079r73ysz/Pub_Superstike.mp4?rlkey=d7y2v8krvz60k432o199sn03t&st=yehy00s9&dl=0', types: ['Publicité'], orientation: 'portrait'},
            { url: 'https://www.dropbox.com/scl/fi/oekc2xd9fr5v5edzgwlh9/Superstike_avis.mp4?rlkey=u0z63em9fvaut2wlfya2xnxr7&st=kqso4g3v&dl=0', types: ['Publicité', 'Short content'], orientation: 'portrait'},
            { url: 'https://www.dropbox.com/scl/fi/d4mfe9vhnq8qgq7moyuc3/Alphabet-of-R6-players.mp4?rlkey=hoi4ynr25y42ttn09dl05idy3&st=y9420156&dl=0', types: ['Short content'], orientation: 'portrait'},
            { url: 'https://www.dropbox.com/scl/fi/6jgq58ktrq62cnfd2v453/Edushort_R6.mp4?rlkey=tzscbfwdod8ghlziixpaajw71&st=9vr1cwcm&dl=0', types: ['Short content', 'Motion design'], orientation: 'portrait'},
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
                titre: 'Plaquette saison 2025-2026',
                description: "Bla bla texte modifiable : présente ici la plaquette en une phrase ou deux.",
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
        categories: ['DA', 'Vidéo','3D', 'Graphisme'],
        image: 'assets/img/projects/iut.jpg',
        imageFit: 'contain',
        description: [
            "Sélection de projets réalisés pendant mon BUT MMI à l'IUT de Chambéry.",
            "Description à compléter : détaille ici les différents projets étudiants regroupés dans cette réalisation.",
        ],
        softwares: ['Pr', 'Ae', 'Ai', 'Ps'],
        videos: [
            { url: 'https://www.dropbox.com/scl/fi/b9z8u9tk6zinfrvw3nzpd/bloop.mp4?rlkey=g27gq9nbx3p8o8ei8vh9ixndg&st=8d02jnks&dl=0', types: ['Montage', 'Motion design', 'Captation', 'DA'], orientation: 'landscape', texte: "B-LOOP - Court Métrage \n\n Notre seule indication : b-loop, et faire une réalisation audiovisuelle à partir de ce mot. Cette réalisation montre le quotidien d'une personne prise dans une boucle. Un jour, elle change de musique, met la face B (b-side) de son vinyle et casse ainsi sa boucle, ➡️ BREAK THE LOOP → B-LOOP. En plus du sujet, nous devions utiliser des techniques de colorimétrie et d'animation rajoutées par dessus la vidéo."},
            { url: 'https://www.dropbox.com/scl/fi/66yl74ph0jz4j1bwkd6sv/Rendu-EEVEE-V6.mp4?rlkey=pmeix3mzdl1ge8x1hsymltrf9&st=oycx9dsz&dl=0', types: ['DA', '3D'], orientation: 'landscape', texte:"Cube challenge - 3D Blender Voici le résultat de trois jours sur Blender : À trois, nous avons construit un monde autour de cette idée : un environnement post-apocalyptique, futuriste — où des entités inspirées de 'Ophanim' semblent avoir pris le dessus. Je me suis occupé d'une grande partie de la modélisation des éléments du décor."},
            { url: 'https://www.dropbox.com/scl/fi/lvdddz0owcqz0bd3eke2z/Video-by-scarabee_chambery-DYCxsyojc1t.mp4?rlkey=je2ptvkfnkx2vdtluoeh422ad&st=8lbvkiv0&dl=0', types: ['Montage', 'Motion design', 'Captation'], orientation: 'landscape', texte:""},
            { url: 'https://www.dropbox.com/scl/fi/jl355ep989rwkjr3cvlt1/Video-by-scarabee_chambery-DYm09p-CfiF.mp4?rlkey=9owlw783nvynmgc14e43vkrae&st=hhitcsy8&dl=0', types: ['Montage', 'Motion design', 'Captation'], orientation: 'landscape', texte:""},
            { url: 'https://www.dropbox.com/scl/fi/268bfpabnw25zp45yj3rt/GROUPE_11_MOTION_DESIGN_PistonoBasile_SantaEsteban_2.mp4?rlkey=f9mj7thf0xxtp0m933l42mwpn&st=7yrvtwct&dl=0', types: ['Motion design', 'DA', 'Graphisme'], orientation: 'landscape', texte: "Qu'est ce qu'un hologramme - Motion design En une semaine, nous devions réaliser un motion design sur un sujet imposé. Faire de la vulgarisation scientifique et expliquer ce qu'est un hologramme en 1 minute ! Écriture, storyboard, dessins, réalisation, voix-off, sound design... Peu de temps pour tout faire" },

            { url: 'https://www.dropbox.com/scl/fi/53ztaetmrg0wkjqgiiykk/NOTHING-V5-HQ_1.mp4?rlkey=itwvabvlr56xjlzi6qhesd3t8&st=y7jyyvf0&dl=0', types: ['Captation'], orientation: 'portrait', texte: "Nothing ear - Publicité Pour ce projet, nous devions réaliser une publicité sur le produit de notre choix. Notre choix s'est porté sur les écouteurs de la marque Nothing, pour la DA de la marque ainsi que la possession du produit en physique. 3D, match-cut, vidéo classique -> ce projet nous à permis de tester plusieurs techniques que nous n'avions pas l'habitude de faire" },
            { url: 'https://www.dropbox.com/scl/fi/idpa2adr9leake16vwsy3/Odeves_v4_2.mp4?rlkey=dgfffeiuqwzd0k06w09eeyoj5&st=2aqc3luz&dl=0', types: ['Montage', 'Motion design', 'Captation'], orientation: 'portrait', texte:"Interview O DEVES Pour ce premier projet avec de véritables clients, nous devions réaliser une vidéo de présentation du groupe de musique O'DEVES, un groupe de musique tzigane. Le projet devait respecter plusieurs contraintes et cette vidéo en est le produit final, validé par le groupe !"},
            { url: 'https://www.dropbox.com/scl/fi/yuajavwgydqhm44i72xfx/Radio-Pirates-Delgado-Santa-Pistono_3.mp4?rlkey=koyxapp21758k72urpfmigs8u&st=7tv3358j&dl=0', types: ['Podcast'], orientation: 'carre', texte:"L'histoire des radios pirates - Podcast Pour ce projet, nous devions créer un podcast de A à Z. En quatre jours nous avons dû prendre connaissance du sujet, créer le scénario, enregistrer la voix-off, chercher des archives et enfin monter le tout ! En plus du podcast, nous devions aussi réaliser un aaudiogramme. En bref, un projet très instructif"},
            { url: 'https://www.dropbox.com/scl/fi/a7tjq5ce4x2ja612b05fr/Stop-motion_Esteban_Santa.mp4?rlkey=rq2g4amut26p4y12cgcq6z153&st=zdrspxn9&dl=0', types: ['Montage', 'DA', 'Graphisme'], orientation: 'portrait', texte:"stop motion"},
            { url: 'https://www.dropbox.com/scl/fi/l7u04dmjd5h4gz7z7ctjn/video-finale-vfini_1.mp4?rlkey=3h5d976zha69kp3sj69ltres8&st=wi0q5rui&dl=0', types: ['Motion design', '3D'], orientation: 'portrait', texte:"Paperly - Publicité Lors d'un projet porté sur la création d'une application, je me suis occupé de créer une publicité pour la présenter. Je me suis inspiré de ce qui se fait en terme de présentation d'application pour avoir un rendu similaire et j'ai pu m'essayer à l'incrustration d'objet 3D dans Afters Effects "},
            { url: 'https://www.dropbox.com/scl/fi/sgl651ge3n1v5e41mi7l1/Anim_logo_Esteban_Santa.mov?rlkey=gr4jn36pcdicugz0ltopvdjc8&st=evwyhhvn&dl=0', types: ['Motion design', 'DA'], orientation: 'carre', texte:"anim logo"},
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
        driveFolder: 'https://drive.google.com/drive/folders/1PUlnoE74pLZmkdwBcfCf-8rLfPbQOcx_?usp=drive_link',
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

/**
 * Site 100% statique (HTML/CSS/JS) — aucune dépendance serveur.
 * Toutes les pages incluent data.js puis ce fichier.
 * Chaque fonction de rendu vérifie la présence de son conteneur
 * et ne fait rien si la page courante ne le contient pas.
 */

/** Petit utilitaire de création de DOM (évite innerHTML pour le contenu texte). */
function el(tag, options = {}, children = []) {
    const node = document.createElement(tag);
    if (options.class) node.className = options.class;
    if (options.text !== undefined) node.textContent = options.text;
    if (options.html !== undefined) node.innerHTML = options.html;
    if (options.attrs) {
        Object.entries(options.attrs).forEach(([key, value]) => node.setAttribute(key, value));
    }
    children.forEach((child) => child && node.appendChild(child));
    return node;
}

/**
 * Sprite d'icônes injecté directement dans la page (plutôt que chargé depuis
 * un fichier .svg externe) : un <use> vers un fichier externe ne récupère pas
 * la couleur "currentColor" de son contexte dans tous les navigateurs, ce qui
 * faisait apparaître les icônes en noir. Injecté ici une seule fois, dans le
 * même document, la couleur (blanche/noire selon la classe) s'applique bien.
 */
const ICON_SPRITE = `<svg style="display:none" xmlns="http://www.w3.org/2000/svg">
  <symbol id="icon-x" viewBox="0 0 24 24">
    <path d="M4.5 3.75H9L19.5 20.25H15L4.5 3.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M10.676 13.456L4.5 20.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19.5 3.75L13.324 10.544" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>
  <symbol id="icon-instagram" viewBox="0 0 24 24">
    <path d="M7.5 21C5.015 21 3 18.985 3 16.5V7.5C3 5.015 5.015 3 7.5 3H16.5C18.985 3 21 5.015 21 7.5V16.5C21 18.985 18.985 21 16.5 21H7.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M8.25 12C8.25 9.929 9.929 8.25 12 8.25C14.071 8.25 15.75 9.929 15.75 12C15.75 14.071 14.071 15.75 12 15.75C9.929 15.75 8.25 14.071 8.25 12Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" fill="none"/>
    <path d="M15.75 7.125C15.75 6.504 16.254 6 16.875 6C17.496 6 18 6.504 18 7.125C18 7.746 17.496 8.25 16.875 8.25C16.254 8.25 15.75 7.746 15.75 7.125Z" fill="currentColor"/>
  </symbol>
  <symbol id="icon-linkedin" viewBox="0 0 24 24">
    <path d="M3.75 21C3.336 21 3 20.664 3 20.25V3.75C3 3.336 3.336 3 3.75 3H20.25C20.664 3 21 3.336 21 3.75V20.25C21 20.664 20.664 21 20.25 21H3.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M11.25 10.5V16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.25 10.5V16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.25 13.125C11.25 11.675 12.425 10.5 13.875 10.5C15.325 10.5 16.5 11.675 16.5 13.125V16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.125 7.875C7.125 7.254 7.629 6.75 8.25 6.75C8.871 6.75 9.375 7.254 9.375 7.875C9.375 8.496 8.871 9 8.25 9C7.629 9 7.125 8.496 7.125 7.875Z" fill="currentColor"/>
  </symbol>
  <symbol id="icon-download" viewBox="0 0 24 24">
    <path d="M12 3.75V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.5 11.25L12 15.75L16.5 11.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4.5 16.5V18.75C4.5 19.578 5.172 20.25 6 20.25H18C18.828 20.25 19.5 19.578 19.5 18.75V16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>
</svg>`;

function initIconSprite() {
    if (document.getElementById('icon-sprite')) return;
    const conteneur = document.createElement('div');
    conteneur.id = 'icon-sprite';
    conteneur.innerHTML = ICON_SPRITE;
    document.body.insertBefore(conteneur, document.body.firstChild);
}

/* ---------- Réseaux sociaux / coordonnées (communs à toutes les pages) ---------- */
function initSocialLinks() {
    const liens = {
        x: SITE.socialX,
        insta: SITE.socialInsta,
        linkedin: SITE.socialLinkedin,
        email: 'mailto:' + SITE.email,
        phone: 'tel:' + SITE.phone.replace(/\s+/g, ''),
    };
    document.querySelectorAll('[data-social]').forEach((lien) => {
        const cible = liens[lien.dataset.social];
        if (cible) lien.href = cible;
    });
    document.querySelectorAll('[data-social-text]').forEach((noeud) => {
        if (noeud.dataset.socialText === 'email') noeud.textContent = SITE.email.toUpperCase();
        if (noeud.dataset.socialText === 'phone') noeud.textContent = SITE.phone;
    });
}

function initCopyYear() {
    const yearEl = document.getElementById('copy-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Cards projet (réutilisées accueil + listing) ---------- */
function renderProjectCard(projet) {
    const categories = projet.categories.join(', ').toUpperCase();
    const classeImage = 'card-projet__image' + (projet.imageFit === 'contain' ? ' card-projet__image--contain' : '');

    const inner = el('div', { class: 'card-projet__inner' }, [
        el('img', { class: classeImage, attrs: { src: projet.image, alt: projet.titre, loading: 'lazy' } }),
    ]);

    return el('a', { class: 'card-projet', attrs: { href: `projet.html?slug=${encodeURIComponent(projet.slug)}` } }, [
        inner,
        el('span', { class: 'card-projet__titre', text: projet.titre.toUpperCase() }),
        el('span', { class: 'card-projet__contenu', text: categories }),
    ]);
}

function renderHome() {
    const grille = document.getElementById('home-projects');
    if (grille) {
        PROJECTS.slice(0, 4).forEach((projet) => grille.appendChild(renderProjectCard(projet)));
    }

    const timeline = document.getElementById('timeline');
    if (timeline) {
        EXPERIENCES.forEach((exp) => {
            timeline.appendChild(el('div', { class: 'timeline-item' }, [
                colonneLignes(exp.role),
                colonneLignes(exp.lieu),
                colonneLignes([exp.debut, exp.fin], 'dates'),
            ]));
        });
    }
}

/** Colonne d'une ligne du parcours : une ou plusieurs lignes de texte empilées. */
function colonneLignes(lignes, classe) {
    return el('div', { class: classe || '' }, lignes.map((ligne) => el('span', { text: ligne })));
}

function renderListing() {
    const grille = document.getElementById('all-projects');
    if (!grille) return;
    PROJECTS.forEach((projet) => grille.appendChild(renderProjectCard(projet)));
}

/* ---------- Page détail projet ---------- */
function getVideoTypes(projet) {
    const types = [];
    (projet.documents || []).forEach((doc) => {
        doc.types.forEach((type) => {
            if (!types.includes(type)) types.push(type);
        });
    });
    projet.videos.forEach((video) => {
        if (video.separateur) return;
        video.types.forEach((type) => {
            if (!types.includes(type)) types.push(type);
        });
    });
    if (projet.driveFolder) {
        const type = projet.driveType || 'Photographie';
        if (!types.includes(type)) types.push(type);
    }
    return types;
}

function videoEmbedNode(url) {
    const propre = (url || '').trim();
    if (!propre) return null;

    // Fichier image (storyboard, capture d'écran...) : une vraie balise <img>
    // remplit la tuile (object-fit:cover), contrairement à un iframe générique
    // qui affiche l'image à sa taille native, en boîte au milieu de la tuile.
    if (/\.(jpe?g|png|gif|webp|svg|bmp)(\?.*)?$/i.test(propre)) {
        return el('img', {
            attrs: {
                src: propre,
                alt: '',
                loading: 'lazy',
                style: 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;',
            },
        });
    }

    let match = propre.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/);
    if (match) {
        return el('iframe', { attrs: {
            src: `https://www.youtube.com/embed/${match[1]}`,
            title: 'Vidéo',
            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
            allowfullscreen: '',
            loading: 'lazy',
        } });
    }

    match = propre.match(/vimeo\.com\/(?:.*\/)?(\d+)(?:$|[/?])/);
    if (match) {
        return el('iframe', { attrs: {
            src: `https://player.vimeo.com/video/${match[1]}`,
            title: 'Vidéo',
            allow: 'autoplay; fullscreen; picture-in-picture',
            allowfullscreen: '',
            loading: 'lazy',
        } });
    }

    // Autres liens Vimeo (liens de partage/review sans identifiant numérique) :
    // on passe par l'oEmbed officiel pour récupérer le bon lecteur.
    if (/vimeo\.com\//.test(propre)) {
        return videoEmbedVimeoOembed(propre);
    }

    // Instagram (post/reel public) : astuce du suffixe "/embed"
    if (/instagram\.com\/(?:p|reel|tv)\//.test(propre)) {
        const base = propre.split('?')[0].replace(/\/?$/, '/');
        return el('iframe', { attrs: {
            src: `${base}embed`,
            title: 'Vidéo Instagram',
            loading: 'lazy',
            allow: 'autoplay; clipboard-write; encrypted-media; picture-in-picture',
        } });
    }

    // Dropbox : un lien de partage classique (?dl=0) affiche une page HTML de
    // prévisualisation, pas la vidéo elle-même. On force le lien direct (raw=1).
    if (/dropbox\.com\//.test(propre)) {
        let lienDirect = propre.replace(/([?&])dl=[01]/, '$1raw=1');
        if (!/[?&]raw=1(&|$)/.test(lienDirect)) {
            lienDirect += (lienDirect.includes('?') ? '&' : '?') + 'raw=1';
        }
        return el('video', { attrs: { src: lienDirect, controls: '', preload: 'metadata' } });
    }

    if (/\.(mp4|webm|ogv)(\?.*)?$/i.test(propre)) {
        return el('video', { attrs: { src: propre, controls: '', preload: 'metadata' } });
    }

    // X / Twitter (et toute plateforme sans embed direct simple) : lien de secours,
    // car ces plateformes bloquent l'intégration en iframe sans leur script JS officiel.
    if (/(?:^|\/)(?:x|twitter)\.com\//.test(propre)) {
        return el('a', { class: 'video-placeholder__lien', attrs: { href: propre, target: '_blank', rel: 'noopener' } }, [
            el('span', { text: 'Voir la vidéo sur X ↗' }),
        ]);
    }

    // Dernier recours : tentative d'iframe générique (fonctionne pour la plupart
    // des lecteurs vidéo qui fournissent directement une URL "embed").
    return el('iframe', { attrs: { src: propre, title: 'Vidéo', allowfullscreen: '', loading: 'lazy' } });
}

/** Vimeo n'expose pas toujours un identifiant numérique dans l'URL (liens de
 *  partage/review) : on interroge leur oEmbed public pour obtenir le lecteur. */
function videoEmbedVimeoOembed(url) {
    const conteneur = el('div', { class: 'video-placeholder__embed' });

    fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`)
        .then((reponse) => (reponse.ok ? reponse.json() : Promise.reject(new Error('oEmbed indisponible'))))
        .then((donnees) => {
            if (!donnees.html) throw new Error('Pas de lecteur retourné');
            conteneur.innerHTML = donnees.html;
        })
        .catch(() => {
            conteneur.innerHTML = '';
            conteneur.appendChild(el('a', { class: 'video-placeholder__lien', attrs: { href: url, target: '_blank', rel: 'noopener' } }, [
                el('span', { text: 'Voir la vidéo sur Vimeo ↗' }),
            ]));
        });

    return conteneur;
}

function initFiltre() {
    const boutons = document.querySelectorAll('.filtre-btn');
    boutons.forEach((bouton) => {
        bouton.addEventListener('click', () => {
            const filtre = bouton.dataset.filter;
            boutons.forEach((b) => b.classList.remove('active'));
            bouton.classList.add('active');
            // Un seul niveau : soit une tuile seule, soit le bloc "vidéo + texte"
            // qui l'enveloppe (l'enfant direct évite de compter les deux).
            // Requêté à chaque clic (pas une seule fois au chargement) car les
            // photos d'un dossier Google Drive peuvent arriver après coup.
            document.querySelectorAll('.grille-videos > [data-types]').forEach((item) => {
                const typesItem = item.dataset.types.split('|');
                const visible = filtre === 'tout' || typesItem.includes(filtre);
                item.classList.toggle('is-hidden', !visible);
            });

            // Une barre de séparation n'a de sens qu'entre deux groupes qui ont
            // chacun encore un élément visible. Si un ou plusieurs groupes
            // entièrement vides (et leurs séparateurs) se retrouvent entre deux
            // groupes visibles, il ne faut garder qu'UN SEUL séparateur pour
            // marquer cette frontière (pas les cacher tous, sinon les deux
            // groupes visibles se retrouvent collés sans aucune séparation).
            let aDuVisibleAvant = false;
            let separateursEnAttente = [];
            document.querySelectorAll('.container > .grille-videos, .container > .grille-separateur').forEach((node) => {
                if (node.classList.contains('grille-separateur')) {
                    separateursEnAttente.push(node);
                    return;
                }
                const visible = Array.from(node.querySelectorAll(':scope > [data-types]')).some((el) => !el.classList.contains('is-hidden'));
                if (visible) {
                    separateursEnAttente.forEach((sep, i) => sep.classList.toggle('is-hidden', !(i === 0 && aDuVisibleAvant)));
                    separateursEnAttente = [];
                    aDuVisibleAvant = true;
                }
            });
            separateursEnAttente.forEach((sep) => sep.classList.add('is-hidden'));
        });
    });
}

/** Fine barre de séparation entre deux projets/groupes de la grille (voir
 *  "separateur" dans le schéma des vidéos, en haut de assets/js/data.js). */
function renderSeparateur() {
    return el('div', { class: 'grille-separateur' });
}

/** Un seul média (image ou vidéo), sans badge ni wrapper — utilisé seul ou groupé. */
function renderMedia(media, orientation) {
    const tuile = el('div', { class: `video-placeholder video-placeholder--${orientation}` });
    if (media.image) {
        tuile.appendChild(el('img', {
            attrs: {
                src: media.image,
                alt: '',
                loading: 'lazy',
                style: 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;',
            },
        }));
    } else {
        const embed = videoEmbedNode(media.url);
        tuile.appendChild(embed || el('span', { html: "Ajoute l'URL de ta vidéo<br>dans assets/js/data.js" }));
    }
    return tuile;
}

/** Tuile vidéo (grille de la page projet), avec son texte de contexte si renseigné. */
function renderVideoTile(video) {
    const orientation = video.orientation || 'landscape';

    // Plusieurs médias réunis sous un seul badge/filtre : chaque média garde la
    // même taille qu'une tuile seule (donc s'enchaîne/s'adapte comme des
    // tuiles normales), mais un seul badge est affiché (sur le premier média).
    if (video.medias && video.medias.length) {
        const tuiles = video.medias.map((media, i) => {
            const tuile = renderMedia(media, orientation);
            if (i === 0) tuile.appendChild(el('span', { class: 'badge-type', text: video.types.join(', ') }));
            return tuile;
        });
        const enfants = [...tuiles];
        if (video.texte) enfants.push(el('p', { class: 'video-texte', text: video.texte }));
        return el('div', {
            class: `video-groupe video-groupe--${orientation}`,
            attrs: { 'data-types': video.types.join('|') },
        }, enfants);
    }

    const tuile = el('div', { class: `video-placeholder video-placeholder--${orientation}` }, [
        el('span', { class: 'badge-type', text: video.types.join(', ') }),
    ]);

    if (video.image) {
        tuile.appendChild(el('img', {
            attrs: {
                src: video.image,
                alt: video.types.join(', '),
                loading: 'lazy',
                style: 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;',
            },
        }));
    } else {
        const embed = videoEmbedNode(video.url);
        if (embed) {
            tuile.appendChild(embed);
        } else {
            tuile.appendChild(el('span', { html: "Ajoute l'URL de ta vidéo<br>dans assets/js/data.js" }));
        }
    }

    if (!video.texte) {
        tuile.setAttribute('data-types', video.types.join('|'));
        return tuile;
    }

    return el('div', {
        class: `video-avec-texte video-avec-texte--${orientation}`,
        attrs: { 'data-types': video.types.join('|') },
    }, [tuile, el('p', { class: 'video-texte', text: video.texte })]);
}

/** Tuile "plaquette/document" (PDF à consulter ou télécharger) : cadre carte de projet + layout image/texte. */
function renderDocumentTile(doc) {
    const orientation = doc.orientation || 'landscape';

    const tuile = el('div', { class: `video-placeholder video-placeholder--${orientation} video-placeholder--doc` }, [
        el('span', { class: 'badge-type', text: doc.types.join(', ') }),
        el('img', {
            attrs: {
                src: doc.cover,
                alt: doc.titre,
                loading: 'lazy',
                style: 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;',
            },
        }),
    ]);

    const texte = el('div', { class: 'plaquette-texte' }, [
        el('h3', { class: 'plaquette-tile__titre', text: doc.titre }),
        doc.description ? el('p', { class: 'plaquette-tile__description', text: doc.description }) : null,
        el('div', { class: 'plaquette-tile__actions' }, [
            el('a', {
                class: 'plaquette-tile__lien',
                text: 'Lire',
                attrs: { href: doc.pdf, target: '_blank', rel: 'noopener', 'aria-label': `Lire "${doc.titre}" en ligne` },
            }),
            el('a', {
                class: 'plaquette-tile__lien',
                text: 'Télécharger',
                attrs: { href: doc.pdf, download: '', 'aria-label': `Télécharger "${doc.titre}"` },
            }),
        ]),
    ]);

    return el('div', {
        class: `video-avec-texte video-avec-texte--${orientation}`,
        attrs: { 'data-types': doc.types.join('|') },
    }, [tuile, texte]);
}

/** Extrait l'ID d'un dossier Google Drive depuis un lien complet, ou renvoie
 *  la valeur telle quelle si c'est déjà juste l'ID. */
function extraireIdDossierDrive(lien) {
    const match = (lien || '').match(/folders\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : (lien || '').trim();
}

/** Tuile photo issue de Google Drive : même gabarit que les autres tuiles,
 *  orientation déterminée automatiquement depuis les dimensions du fichier. */
function renderPhotoTile(fichier, type) {
    const meta = fichier.imageMediaMetadata || {};
    const orientation = meta.height > meta.width ? 'portrait' : 'landscape';
    return el('div', {
        class: `video-placeholder video-placeholder--${orientation}`,
        attrs: { 'data-types': type },
    }, [
        el('span', { class: 'badge-type', text: type }),
        el('img', {
            attrs: {
                src: `https://lh3.googleusercontent.com/d/${fichier.id}=s1600`,
                alt: fichier.name || '',
                loading: 'lazy',
                style: 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;',
            },
        }),
    ]);
}

/** Charge et affiche les photos d'un dossier Google Drive public (voir
 *  SITE.googleDriveApiKey et "driveFolder" sur un projet dans data.js). */
async function chargerPhotosDrive(projet, grille) {
    if (!projet.driveFolder) return;
    const type = projet.driveType || 'Photographie';

    if (!SITE.googleDriveApiKey || SITE.googleDriveApiKey === 'YOUR_GOOGLE_DRIVE_API_KEY') {
        grille.appendChild(el('div', { class: 'video-placeholder video-placeholder--landscape', attrs: { 'data-types': type } }, [
            el('span', { class: 'badge-type', text: type }),
            el('span', { html: "Configure ta clé Google Drive<br>dans assets/js/data.js (SITE.googleDriveApiKey)" }),
        ]));
        return;
    }

    const idDossier = extraireIdDossierDrive(projet.driveFolder);
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`'${idDossier}' in parents and mimeType contains 'image/' and trashed = false`)}&fields=${encodeURIComponent('files(id,name,imageMediaMetadata)')}&key=${SITE.googleDriveApiKey}`;

    try {
        const reponse = await fetch(url);
        if (!reponse.ok) throw new Error('Erreur API Google Drive');
        const donnees = await reponse.json();
        const photos = (donnees.files || []).filter((f) => f.imageMediaMetadata);
        photos.forEach((photo) => grille.appendChild(renderPhotoTile(photo, type)));
    } catch (erreur) {
        grille.appendChild(el('div', { class: 'video-placeholder video-placeholder--landscape', attrs: { 'data-types': type } }, [
            el('span', { class: 'badge-type', text: type }),
            el('span', { text: "Impossible de charger les photos Drive : vérifie la clé API et le partage du dossier." }),
        ]));
    }
}

function renderDetail() {
    const root = document.getElementById('projet-app');
    if (!root) return;

    const slug = new URLSearchParams(window.location.search).get('slug');
    const projet = PROJECTS.find((p) => p.slug === slug);

    if (!projet) {
        document.title = 'Projet introuvable — Esteban Santa';
        root.appendChild(el('div', { class: 'container', attrs: { style: 'padding:160px 0;text-align:center;color:#fff;' } }, [
            el('h1', { text: 'Projet introuvable' }),
            el('p', { attrs: { style: 'margin:20px 0' } }, [
                el('a', { class: 'btn', attrs: { href: 'projets.html' } }, [el('span', { text: 'Retour aux projets' })]),
            ]),
        ]));
        return;
    }

    document.title = `${projet.titre} — Esteban Santa`;

    const descriptionDiv = el('div', { class: 'description' }, [el('h1', { text: projet.titre })]);
    projet.description.forEach((paragraphe) => descriptionDiv.appendChild(el('p', { text: paragraphe })));

    const classeImage = 'card-projet__image' + (projet.imageFit === 'contain' ? ' card-projet__image--contain' : '');
    const card = el('div', { class: 'card-projet' }, [
        el('div', { class: 'card-projet__inner' }, [
            el('img', { class: classeImage, attrs: { src: projet.image, alt: projet.titre } }),
        ]),
    ]);

    root.appendChild(el('section', { class: 'projet-header container' }, [descriptionDiv, card]));

    const container = el('div', { class: 'container' });
    root.appendChild(container);

    const types = getVideoTypes(projet);
    if (types.length > 1) {
        const filtre = el('div', { class: 'filtre' }, [
            el('button', { class: 'filtre-btn active', attrs: { type: 'button', 'data-filter': 'tout' } }, [el('span', { text: 'Tout' })]),
        ]);
        types.forEach((type) => {
            filtre.appendChild(el('button', { class: 'filtre-btn', attrs: { type: 'button', 'data-filter': type } }, [el('span', { text: type })]));
        });
        container.appendChild(filtre);
    }

    // Un séparateur découpe la grille en plusieurs grilles indépendantes (voir
    // "separateur" dans data.js), pour que son espacement ne dépende pas de la
    // hauteur d'une ligne de grille.
    const grilles = [el('div', { class: 'grille-videos' })];
    (projet.documents || []).forEach((doc) => grilles[0].appendChild(renderDocumentTile(doc)));
    container.appendChild(grilles[0]);

    projet.videos.forEach((video) => {
        if (video.separateur) {
            container.appendChild(renderSeparateur());
            grilles.push(el('div', { class: 'grille-videos' }));
            container.appendChild(grilles[grilles.length - 1]);
            return;
        }
        grilles[grilles.length - 1].appendChild(renderVideoTile(video));
    });

    grilles.forEach((g, i) => {
        if (i > 0) g.style.marginTop = '0';
        if (i < grilles.length - 1) g.style.marginBottom = '0';
    });

    chargerPhotosDrive(projet, grilles[grilles.length - 1]);

    if (projet.softwares && projet.softwares.length) {
        const badges = el('div', { class: 'badges' });
        projet.softwares.forEach((sigle) => {
            const icone = SOFTWARE_ICONS[sigle];
            if (!icone) return;
            badges.appendChild(el('img', { class: 'software-icon', attrs: { src: icone.src, alt: icone.nom } }));
        });
        container.appendChild(el('div', { class: 'logiciels' }, [badges, el('h2', { text: 'Logiciels utilisés' })]));
    }

    initFiltre();
}

/* ---------- Formulaire de contact (Formspree, aucun backend requis) ---------- */
function afficherMessageFormulaire(type, texte) {
    const slot = document.getElementById('form-message-slot');
    if (!slot) return;
    slot.innerHTML = '';
    slot.appendChild(el('p', { class: `form-message form-message--${type}`, text: texte }));
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const configure = SITE.formspreeId && SITE.formspreeId !== 'YOUR_FORM_ID';
    if (configure) {
        // SITE.formspreeId accepte soit l'URL complète (https://formspree.io/f/xxxxx),
        // soit juste l'identifiant (xxxxx) fourni par Formspree.
        form.action = SITE.formspreeId.startsWith('http')
            ? SITE.formspreeId
            : `https://formspree.io/f/${SITE.formspreeId}`;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const champsObligatoires = form.querySelectorAll('[required]');
        let valide = true;
        champsObligatoires.forEach((champ) => { if (!champ.value.trim()) valide = false; });
        if (!valide || !form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (!configure) {
            afficherMessageFormulaire('erreur', "Le formulaire n'est pas encore configuré : crée un compte gratuit sur formspree.io et renseigne ton identifiant de formulaire dans assets/js/data.js (SITE.formspreeId).");
            return;
        }

        const bouton = form.querySelector('button[type="submit"]');
        bouton.disabled = true;

        try {
            const reponse = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' },
            });

            if (reponse.ok) {
                afficherMessageFormulaire('succes', 'Merci ! Ton message a bien été envoyé, je te réponds au plus vite.');
                form.reset();
            } else {
                afficherMessageFormulaire('erreur', `Le message n'a pas pu être envoyé. Réessaie plus tard ou écris-moi directement à ${SITE.email}.`);
            }
        } catch (erreur) {
            afficherMessageFormulaire('erreur', `Le message n'a pas pu être envoyé (connexion). Réessaie plus tard ou écris-moi directement à ${SITE.email}.`);
        } finally {
            bouton.disabled = false;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initIconSprite();
    initSocialLinks();
    initCopyYear();
    renderHome();
    renderListing();
    renderDetail();
    initContactForm();
});

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
        el('span', { class: 'card-projet__titre', text: projet.titre.toUpperCase() }),
        el('span', { class: 'card-projet__contenu', text: categories }),
    ]);

    return el('a', { class: 'card-projet', attrs: { href: `projet.html?slug=${encodeURIComponent(projet.slug)}` } }, [inner]);
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
                el('span', { text: exp.role }),
                el('span', { text: exp.lieu }),
                el('span', { class: 'dates', text: `${exp.debut} — ${exp.fin}` }),
            ]));
        });
    }
}

function renderListing() {
    const grille = document.getElementById('all-projects');
    if (!grille) return;
    PROJECTS.forEach((projet) => grille.appendChild(renderProjectCard(projet)));
}

/* ---------- Page détail projet ---------- */
function getVideoTypes(projet) {
    const types = [];
    projet.videos.forEach((video) => {
        if (!types.includes(video.type)) types.push(video.type);
    });
    return types;
}

function videoEmbedNode(url) {
    const propre = (url || '').trim();
    if (!propre) return null;

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

    match = propre.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
    if (match) {
        return el('iframe', { attrs: {
            src: `https://player.vimeo.com/video/${match[1]}`,
            title: 'Vidéo',
            allow: 'autoplay; fullscreen; picture-in-picture',
            allowfullscreen: '',
            loading: 'lazy',
        } });
    }

    if (/\.(mp4|webm|ogv)(\?.*)?$/i.test(propre)) {
        return el('video', { attrs: { src: propre, controls: '', preload: 'metadata' } });
    }

    return el('iframe', { attrs: { src: propre, title: 'Vidéo', allowfullscreen: '', loading: 'lazy' } });
}

function initFiltre() {
    const boutons = document.querySelectorAll('.filtre-btn');
    const videos = document.querySelectorAll('.video-placeholder');
    boutons.forEach((bouton) => {
        bouton.addEventListener('click', () => {
            const filtre = bouton.dataset.filter;
            boutons.forEach((b) => b.classList.remove('active'));
            bouton.classList.add('active');
            videos.forEach((video) => {
                const visible = filtre === 'tout' || video.dataset.type === filtre;
                video.classList.toggle('is-hidden', !visible);
            });
        });
    });
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
                el('a', { class: 'btn', text: 'Retour aux projets', attrs: { href: 'projets.html' } }),
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
            el('button', { class: 'filtre-btn active', text: 'Tout', attrs: { type: 'button', 'data-filter': 'tout' } }),
        ]);
        types.forEach((type) => {
            filtre.appendChild(el('button', { class: 'filtre-btn', text: type, attrs: { type: 'button', 'data-filter': type } }));
        });
        container.appendChild(filtre);
    }

    const grille = el('div', { class: 'grille-videos' });
    projet.videos.forEach((video) => {
        const orientation = video.orientation || 'landscape';
        const tuile = el('div', {
            class: `video-placeholder video-placeholder--${orientation}`,
            attrs: { 'data-type': video.type },
        }, [el('span', { class: 'badge-type', text: video.type })]);

        const embed = videoEmbedNode(video.url);
        if (embed) {
            tuile.appendChild(embed);
        } else {
            tuile.appendChild(el('span', { html: "Ajoute l'URL de ta vidéo<br>dans assets/js/data.js" }));
        }
        grille.appendChild(tuile);
    });
    container.appendChild(grille);

    if (projet.softwares && projet.softwares.length) {
        const badges = el('div', { class: 'badges' });
        projet.softwares.forEach((logiciel) => badges.appendChild(el('span', { class: 'software-badge', text: logiciel })));
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
        form.action = `https://formspree.io/f/${SITE.formspreeId}`;
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
    initSocialLinks();
    initCopyYear();
    renderHome();
    renderListing();
    renderDetail();
    initContactForm();
});

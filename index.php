<?php
require_once __DIR__ . '/includes/functions.php';

$page_title = 'Esteban Santa — Monteur vidéo';
require __DIR__ . '/includes/head.php';

$projets = get_projects();
$derniers_projets = array_slice($projets, 0, 4);
$experiences = get_experiences();
?>
    <header class="hero container">
        <span class="tag">Monteur vidéo</span>
        <h1>Esteban Santa</h1>
        <p>Vidéaste polyvalent, curieux et motivé d'apprendre de nouvelles choses pour aller encore plus loin !</p>
        <div class="actions">
            <a class="btn" href="projets.php">Tous mes projets</a>
            <a class="btn" href="contact.php">Contactez moi !</a>
        </div>
    </header>

    <section class="profil container" id="profil">
        <div class="moi">
            <img class="portrait" src="assets/img/esteban.jpg" alt="Esteban Santa">
            <h2>Salut, je suis Esteban</h2>
            <p class="sous-titre">Vidéaste polyvalent</p>
            <div class="reseaux">
                <a class="icon-social" href="<?= e(SOCIAL_X) ?>" target="_blank" rel="noopener" aria-label="X (Twitter)">
                    <svg><use href="assets/img/icons.svg#icon-x"></use></svg>
                </a>
                <span class="reseaux-separateur"></span>
                <a class="icon-social" href="<?= e(SOCIAL_INSTA) ?>" target="_blank" rel="noopener" aria-label="Instagram">
                    <svg><use href="assets/img/icons.svg#icon-instagram"></use></svg>
                </a>
                <span class="reseaux-separateur"></span>
                <a class="icon-social" href="<?= e(SOCIAL_LINKEDIN) ?>" target="_blank" rel="noopener" aria-label="LinkedIn">
                    <svg><use href="assets/img/icons.svg#icon-linkedin"></use></svg>
                </a>
            </div>
            <div class="actions">
                <a class="btn" href="assets/cv-esteban-santa.pdf" target="_blank">Mon CV</a>
                <a class="btn" href="contact.php">Contactez moi !</a>
            </div>
        </div>

        <div class="presentation">
            <p>Depuis mes 12 ans, je regarde presque tous les jours des contenus sur internet et les réseaux sociaux. J'ai toujours rêvé de, moi aussi, laisser ma trace quelque part dans ce vaste monde.</p>
            <p>Ce qui me plaît le plus ? Le montage ! J'ai, à plusieurs reprises essayé, étant enfant, d'apprendre sans vraiment y parvenir. Jusqu'à ce que je me plonge pleinement dedans et que j'en fasse aujourd'hui ma raison de sortir de mon lit.</p>
            <p>Grâce à mon diplôme de BUT Métier du Multimédia et de l'Internet, j'ai pu approfondir mes compétences dans le large domaine du multimédia en général et travailler sur des projets des plus variés.</p>
            <p>À côté de ça, je me suis passionné pour le sport électronique, le e-sport, c'est ce qui m'a amené à travailler chez Shifters, qui a grandement forgé mes compétences actuelles.</p>

            <div class="timeline">
                <?php foreach ($experiences as $exp): ?>
                    <div class="timeline-item">
                        <span><?= e($exp['role']) ?></span>
                        <span><?= e($exp['lieu']) ?></span>
                        <span class="dates"><?= e($exp['debut']) ?> — <?= e($exp['fin']) ?></span>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section class="section-projets container">
        <div class="entete">
            <span class="tag">Derniers projets</span>
            <div class="actions">
                <a class="btn" href="projets.php">Tous mes projets</a>
                <a class="btn" href="contact.php">Contactez moi !</a>
            </div>
        </div>

        <div class="grille-projets">
            <?php foreach ($derniers_projets as $projet): ?>
                <?php render_project_card($projet); ?>
            <?php endforeach; ?>
        </div>

        <div class="voir-plus">
            <a class="btn" href="projets.php">Voir plus</a>
        </div>
    </section>

<?php require __DIR__ . '/includes/footer.php'; ?>

// Sélection des éléments du DOM
const header = document.querySelector("header");
const first_skill = document.querySelector(".skill:first-child"); // Correction du sélecteur
const sk_counters = document.querySelectorAll(".counter span"); // Correction : prendre tous les spans de compteurs
const progrees_bars = document.querySelectorAll(".skills svg circle"); // Correction : prendre toutes les barres de progression

let skillsPlayed = false; // Variable pour suivre si l'animation des compétences a été jouée

// --- Fonctions utilitaires ---

/**
 * Vérifie si un élément est visible à l'écran (dans le viewport).
 * @param {HTMLElement} el - L'élément à vérifier.
 * @returns {boolean} Vrai si l'élément est visible, faux sinon.
 */
function hasReached(el) { // Renommage de la fonction pour une meilleure clarté
    if (!el) return false; // Ajout d'une vérification au cas où l'élément n'existe pas
    const topPosition = el.getBoundingClientRect().top;
    // L'élément est considéré comme atteint si son haut est dans le viewport ou un peu au-delà
    return window.innerHeight >= topPosition + el.offsetHeight / 2; // Ajustement du seuil pour le déclenchement
}

/**
 * Met à jour un compteur de manière incrémentale jusqu'à une valeur maximale.
 * @param {HTMLElement} num - L'élément span contenant le nombre actuel.
 * @param {number} maxnum - La valeur cible du compteur.
 */
function updateCount(num, maxnum) { // Correction du nom de la variable Maxnum en maxnum
    let currentNum = +num.innerText; // Convertit le texte en nombre
    if (currentNum < maxnum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxnum);
        }, 12);
    }
}

// --- Comportement de la barre de navigation ---

/**
 * Ajoute ou retire la classe 'scrolled' à la navigation en fonction du défilement.
 */
function stickyNavbar() {
    header.classList.toggle("scrolled", window.pageYOffset > 0);
}

// Appelle la fonction une fois au chargement pour s'assurer du bon état initial
stickyNavbar();

// Écouteur d'événement pour le défilement afin de gérer la barre de navigation
window.addEventListener("scroll", stickyNavbar);

// --- Animations de révélation (ScrollReveal) ---

// Configuration de ScrollReveal
let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

// Application des animations de révélation
sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: 'top', delay: 700 }); // Correction: 'top' doit être une chaîne de caractères
sr.reveal(".about-grid", { interval: 100 }); // Exemple d'animation en cascade pour les cartes "About"
sr.reveal(".about-info", { delay: 400 });


// --- Animation de progression des compétences ---

/**
 * Déclenche l'animation des compteurs de compétences lorsque le premier élément de compétence est atteint.
 */
function skillCounter() { // Correction du nom de la fonction en skillCounter
    if (!hasReached(first_skill)) return; // Vérifie si la section des compétences est visible

    if (!skillsPlayed) { // S'assure que l'animation ne se joue qu'une seule fois
        skillsPlayed = true;

        sk_counters.forEach((counter, i) => {
            let target = +counter.dataset.target; // Récupère la cible depuis l'attribut data-target
            // Calcul de la valeur de la course pour l'animation du cercle SVG
            // La circonférence du cercle est 2 * PI * rayon (2 * 3.14 * 68 = 427.04)
            // 427 est utilisé comme la circonférence totale du cercle SVG
            let strokeValue = 427 - (427 * (target / 100));

            // Applique la valeur de la course au cercle SVG pour l'animation
            progrees_bars[i].style.setProperty("--target", strokeValue);
            progrees_bars[i].style.animation = "progress 2s ease-in-out forwards"; // Déclenche l'animation CSS

            // Démarre l'incrémentation du compteur numérique
            setTimeout(() => {
                updateCount(counter, target);
            }, 400); // Décalage pour laisser l'animation du cercle commencer
        });
    }
}

// Écouteur d'événement pour le défilement afin de déclencher l'animation des compétences
window.addEventListener("scroll", skillCounter);
// Appelle skillCounter une fois au chargement pour le cas où la section est déjà visible
skillCounter();


// --- Gestion des Modals de Services (Explore More) ---

document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne tous les boutons "Explore More" en utilisant l'attribut data-modal-target
    const exploreButtons = document.querySelectorAll('.srv-card .secondary-btn[data-modal-target]');

    exploreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche le comportement par défaut du lien

            // Récupère l'ID du modal à ouvrir depuis l'attribut `data-modal-target`
            const modalId = button.dataset.modalTarget;

            if (modalId) {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('open');
                    document.body.style.overflow = 'hidden'; // Empêche le défilement du corps quand le modal est ouvert
                }
            }
        });
    });

    // Fermer les modals
    // 1. En cliquant sur le bouton de fermeture
    document.querySelectorAll('.modal-service .close-button').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal-service').classList.remove('open');
            document.body.style.overflow = ''; // Rétablit le défilement du corps
        });
    });

    // 2. En cliquant en dehors du contenu du modal (sur l'overlay)
    document.querySelectorAll('.modal-service').forEach(modal => {
        modal.addEventListener('click', (event) => {
            // Vérifie si le clic a eu lieu directement sur l'élément modal (l'overlay)
            if (event.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = ''; // Rétablit le défilement du corps
            }
        });
    });

    // 3. En appuyant sur la touche Échap
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.modal-service.open');
            if (openModal) {
                openModal.classList.remove('open');
                document.body.style.overflow = ''; // Rétablit le défilement du corps
            }
        }
    });
});
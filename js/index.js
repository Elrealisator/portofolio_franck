// Sélection des éléments DOM
const hamburger = document.querySelector(".hamburger"); // Icône du menu hamburger
const links = document.querySelectorAll(".nav-link"); // Liens de navigation
const toggle_btn = document.querySelector(".toggle-btn"); // Bouton de bascule du thème (jour/nuit)

const ml_section = document.querySelector(".milestones"); // Section des jalons (milestones)
const ml_counters = document.querySelectorAll(".number span"); // Compteurs dans la section des jalons

const prt_section = document.querySelector(".portofolio"); // Section du portfolio
const zoom_icons = document.querySelectorAll(".zoom-icon"); // Icônes de zoom sur les images du portfolio
const modal_overlay = document.querySelector(".modal-overlay"); // Superposition du modal (arrière-plan sombre)
const images = document.querySelectorAll(".images img"); // Toutes les images du portfolio

const prev_btn = document.querySelector(".prev-btn"); // Bouton "précédent" pour le modal d'images
const next_btn = document.querySelector(".next-btn"); // Bouton "suivant" pour le modal d'images

let currentIndex = 0; // Index de l'image actuellement affichée dans le modal
let mlPlayed = false; // Indicateur si l'animation des compteurs de jalons a déjà été jouée

// --- Gestion du menu Hamburger ---
hamburger.addEventListener("click", () => {
    // Bascule la classe "open" sur le body pour afficher/masquer le menu
    document.body.classList.toggle("open");
    // Bascule la classe "stopScrolling" pour empêcher le défilement du body lorsque le menu est ouvert
    document.body.classList.toggle("stopScrolling");
});

// Ferme le menu lorsque l'on clique sur un lien de navigation
links.forEach(link =>
    link.addEventListener("click", () => {
        document.body.classList.remove("open"); // Masque le menu
        document.body.classList.remove("stopScrolling"); // Permet à nouveau le défilement
    })
);

// --- Événements de défilement (Scroll) ---
window.addEventListener("scroll", () => {
    // Déclenche l'animation des compteurs de jalons si elle n'a pas encore été jouée
    if (!mlPlayed) mlCounters();
    // Met à jour le lien de navigation actif en fonction de la position de défilement
    activeLink();
});

// Met en surbrillance le lien de navigation actif en fonction de la section visible
function activeLink() {
    const header = document.querySelector("header"); // Référence à l'en-tête pour le décalage
    let sections = document.querySelectorAll("section[id]"); // Toutes les sections avec un ID
    let passedSections = Array.from(sections)
        .map((sct, i) => {
            return {
                y: sct.getBoundingClientRect().top - header.offsetHeight, // Position Y de la section par rapport au haut de la fenêtre, ajustée par la hauteur de l'en-tête
                id: i, // Index de la section
            };
        })
        .filter((sct) => sct.y <= 0); // Filtre les sections dont le haut a déjà dépassé l'en-tête

    if (passedSections.length === 0) return; // Si aucune section n'a été dépassée, on ne fait rien

    let currSectionID = passedSections.at(-1).id; // L'ID de la dernière section passée (celle qui est visible)

    links.forEach((l) => l.classList.remove("active")); // Retire la classe "active" de tous les liens
    links[currSectionID].classList.add("active"); // Ajoute la classe "active" au lien correspondant à la section actuelle
}

activeLink(); // Appelle la fonction au chargement pour définir le lien actif initial

// --- Gestion du thème (clair/sombre) ---
let firstTheme = localStorage.getItem("dark"); // Récupère la préférence de thème stockée localement
changeTheme(firstTheme === '1'); // Applique le thème sauvegardé au chargement de la page

// Change le thème de l'interface
function changeTheme(isDark) {
    if (isDark) {
        document.body.classList.add("dark"); // Ajoute la classe "dark" au body
        toggle_btn.classList.replace("uil-moon", "uil-sun"); // Change l'icône du bouton (lune vers soleil)
        localStorage.setItem("dark", 1); // Enregistre la préférence "sombre"
    } else {
        document.body.classList.remove("dark"); // Retire la classe "dark" du body
        toggle_btn.classList.replace("uil-sun", "uil-moon"); // Change l'icône du bouton (soleil vers lune)
        localStorage.setItem("dark", 0); // Enregistre la préférence "clair"
    }
}

// Gère le clic sur le bouton de bascule de thème
toggle_btn.addEventListener("click", () => {
    changeTheme(!document.body.classList.contains("dark")); // Inverse le thème actuel
});

// --- Animation des compteurs de services (Milestones) ---
// Met à jour le compteur de manière incrémentale
function updateCount(num, maxNum) {
    let currentNum = +num.innerText; // Convertit le texte en nombre

    if (currentNum < maxNum) {
        num.innerText = currentNum + 1; // Incrémente le nombre
        setTimeout(() => {
            updateCount(num, maxNum); // Rappelle la fonction après un court délai
        }, 12);
    }
}

// Vérifie si un élément est visible dans la fenêtre (a atteint la position)
function hasReached(element) {
    const topPosition = element.getBoundingClientRect().top; // Position du haut de l'élément par rapport au viewport
    return window.innerHeight >= topPosition + element.offsetHeight; // Vrai si l'élément est entièrement visible ou dépassé
}

// Déclenche l'animation des compteurs de jalons lorsque la section est visible
function mlCounters() {
    if (!hasReached(ml_section)) return; // Si la section n'est pas encore visible, ne fait rien
    mlPlayed = true; // Indique que l'animation a été jouée
    ml_counters.forEach((ctr) => {
        let target = +ctr.dataset.target; // Récupère le nombre cible depuis l'attribut data-target
        setTimeout(() => {
            updateCount(ctr, target); // Démarre l'animation du compteur
        }, 400); // Délai avant de commencer l'animation
    });
}

// --- Filtre de Portfolio (MixItUp) ---
// Initialise la bibliothèque MixItUp pour le filtrage des cartes du portfolio
let mixer = mixitup(".portofolio-gallery", {
    selectors: {
        target: '.prt-card' // Sélecteur des éléments à filtrer
    },
    animation: {
        duration: 500 // Durée de l'animation de filtrage
    }
});

// --- Popup modale pour les images du portfolio ---
zoom_icons.forEach((icn, i) =>
    icn.addEventListener("click", () => {
        prt_section.classList.add("open"); // Ouvre le modal
        document.body.classList.add("stopScrolling"); // Empêche le défilement
        currentIndex = i; // Définit l'index de l'image cliquée
        changeImage(currentIndex); // Affiche l'image correspondante
    })
);

// Ferme le modal lorsque l'on clique sur l'arrière-plan
modal_overlay.addEventListener("click", () => {
    prt_section.classList.remove("open"); // Ferme le modal
    document.body.classList.remove("stopScrolling"); // Permet le défilement
});

// Change l'image affichée dans le modal
function changeImage(index) {
    images.forEach(img => img.classList.remove("showImage")); // Cache toutes les images
    images[index].classList.add("showImage"); // Affiche l'image à l'index donné
}

// --- Boutons Précédent et Suivant pour le modal d'images ---
prev_btn.addEventListener("click", () => {
    if (currentIndex === 0) {
        currentIndex = images.length - 1; // Retourne à la dernière image si on est sur la première
    } else {
        currentIndex--; // Passe à l'image précédente
    }
    changeImage(currentIndex); // Affiche la nouvelle image
});

next_btn.addEventListener("click", () => {
    if (currentIndex === images.length - 1) {
        currentIndex = 0; // Retourne à la première image si on est sur la dernière
    } else {
        currentIndex++; // Passe à l'image suivante
    }
    changeImage(currentIndex); // Affiche la nouvelle image
});

// --- Gestion du formulaire de contact avec EmailJS ---
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form'); // Sélectionne le formulaire de contact
    const formStatus = document.getElementById('form-status'); // Sélectionne l'élément pour afficher le statut du formulaire

    if (contactForm) { // Vérifie si le formulaire existe
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêche l'envoi traditionnel du formulaire

            formStatus.textContent = "Envoi en cours..."; // Affiche un message d'attente
            formStatus.style.color = "orange"; // Change la couleur du texte de statut

            // Vérifie si EmailJS est chargé
            if (typeof emailjs === 'undefined') {
                console.error("EmailJS SDK n'est pas chargé. Assurez-vous que le script EmailJS est inclus avant votre script.");
                formStatus.textContent = "Erreur: Le service d'envoi n'est pas disponible.";
                formStatus.style.color = "red";
                return; // Arrête l'exécution si EmailJS n'est pas disponible
            }

            // Capture les valeurs du formulaire
            const formData = new FormData(this); // 'this' fait référence au formulaire
            const userName = formData.get('user_name'); // Récupère le nom de l'utilisateur
            const userEmail = formData.get('user_email'); // Récupère l'email de l'utilisateur
            const userMessage = formData.get('message'); // Récupère le message

            // Identifiants EmailJS (À remplacer par vos propres identifiants)
            const serviceID = 'service_qolrrnq';
            const templateID_pourMoi = 'template_wa0h2p4'; // ID du modèle pour envoyer un email au propriétaire du portfolio
            const templateID_autoReply = 'template_nxjsfqh'; // ID du modèle pour l'auto-réponse à l'expéditeur
            const publicKey = 'gVZN6vJ6DzWhS1-kE';

            // 1. Envoyer le message au propriétaire du portfolio
            emailjs.sendForm(serviceID, templateID_pourMoi, this, publicKey)
                .then(function() {
                    console.log('SUCCESS: Message envoyé au propriétaire avec succès !');

                    // 2. SI le premier envoi est un succès, envoyer l'e-mail de confirmation à l'expéditeur
                    const autoReplyParams = {
                        to_email: userEmail, // L'e-mail de l'expéditeur du formulaire
                        user_name: userName, // Le nom de l'expéditeur pour la personnalisation
                        message_sent_by_user: userMessage // Le message original pour le récapitulatif
                    };

                    // Envoie l'email d'auto-réponse
                    emailjs.send(serviceID, templateID_autoReply, autoReplyParams, publicKey)
                        .then(function() {
                            formStatus.textContent = "Message envoyé avec succès ! Un e-mail de confirmation vous a été envoyé.";
                            formStatus.style.color = "green";
                            contactForm.reset(); // Réinitialise le formulaire
                            console.log('SUCCESS: E-mail de confirmation envoyé à l\'expéditeur !');
                        }, function(error) {
                            // Erreur lors de l'envoi de l'auto-réponse (le message initial est quand même parti)
                            formStatus.textContent = "Message envoyé, mais échec de l'envoi de la confirmation.";
                            formStatus.style.color = "orange"; // Une couleur d'avertissement
                            console.log('FAILED: Échec de l\'envoi de l\'e-mail de confirmation.', error);
                        });

                }, function(error) {
                    // Erreur lors de l'envoi du message au propriétaire
                    formStatus.textContent = "Échec de l'envoi du message. Veuillez réessayer.";
                    formStatus.style.color = "red";
                    console.log('FAILED: Échec de l\'envoi du message initial.', error);
                });
        });
    }
});
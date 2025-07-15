const hamburger = document.querySelector(".hamburger");
const links = document.querySelectorAll(".nav-link");
const toggle_btn = document.querySelector(".toggle-btn");

const ml_section  = document.querySelector(".milestones");
const ml_counters  = document.querySelectorAll(".number span");

const prt_section  = document.querySelector(".portofolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay  = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");

const prev_btn  = document.querySelector(".prev-btn");
const next_btn  = document.querySelector(".next-btn");

let currentIndex = 0;
let mlPlayed = false;

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopScrolling");
});

// Close menu on nav link click
links.forEach(link => 
    link.addEventListener("click", () => {  
        document.body.classList.remove("open");
        document.body.classList.remove("stopScrolling");
    })
);

// Scroll event
window.addEventListener("scroll", () => {
    if(!mlPlayed) mlCounters();
    activeLink();
});
// Active nav link based on scroll position
function activeLink() {
    const header = document.querySelector("header");
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections)
        .map((sct, i) => {
            return{
                y: sct.getBoundingClientRect().top - header.offsetHeight,
                id: i,
            };
        })
        .filter((sct) => sct.y <= 0);
    if(passedSections.length === 0) return;
    let currSectionID = passedSections.at(-1).id;

    links.forEach((l) => l.classList.remove("active"));
    links[currSectionID].classList.add("active");
}

activeLink();

// Theme toggle and save preference
let firstTheme = localStorage.getItem("dark");
changeTheme(firstTheme === '1');

function changeTheme(isDark) {
    if (isDark) {
        document.body.classList.add("dark");
        toggle_btn.classList.replace("uil-moon", "uil-sun");
        localStorage.setItem("dark", 1);
    } else {
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("uil-sun", "uil-moon");
        localStorage.setItem("dark", 0);
    }
}

toggle_btn.addEventListener("click", () => {
    changeTheme(!document.body.classList.contains("dark"));
});

// Services counter animation
function updateCount(num, maxNum){
    let currentNum = +num.innerText;

    if(currentNum < maxNum){
        num.innerText = currentNum + 1;
        setTimeout(() =>{
            updateCount(num, maxNum);
        }, 12);
    }
}

function hasReached(element){
    const topPosition = element.getBoundingClientRect().top;
    return window.innerHeight >= topPosition + element.offsetHeight;
}

function mlCounters() {
    if(!hasReached(ml_section)) return; 
    mlPlayed = true;
    ml_counters.forEach((ctr) => {
        let target = +ctr.dataset.target;
        setTimeout(() => {
            updateCount(ctr, target);
        }, 400);
    });
}

// Portfolio filter (using mixitup library)
let mixer = mixitup(".portofolio-gallery",  {
    selectors: {
        target: '.prt-card'
    },
    animation: {
        duration: 500
    }
});

// Modal popup for portfolio images
zoom_icons.forEach((icn, i) => 
    icn.addEventListener("click", () =>{
        prt_section.classList.add("open");
        document.body.classList.add("stopScrolling");
        currentIndex = i;
        changeImage(currentIndex);
    })
);

modal_overlay.addEventListener("click", () => {
    prt_section.classList.remove("open");
    document.body.classList.remove("stopScrolling");
});

function changeImage(index) {
    images.forEach(img => img.classList.remove("showImage"));
    images[index].classList.add("showImage");
}

// Previous and next buttons for portfolio images
prev_btn.addEventListener("click", () => {
    if(currentIndex === 0){
        currentIndex = images.length - 1;
    } else {
        currentIndex--;
    }
    changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
    if(currentIndex === images.length - 1){
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    changeImage(currentIndex);
});




document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            formStatus.textContent = "Envoi en cours...";
            formStatus.style.color = "orange";

            if (typeof emailjs === 'undefined') {
                console.error("EmailJS SDK n'est pas chargé. Assurez-vous que le script EmailJS est inclus avant votre script.");
                formStatus.textContent = "Erreur: Le service d'envoi n'est pas disponible.";
                formStatus.style.color = "red";
                return;
            }

            // --- Capturez les valeurs du formulaire ICI avant le premier envoi ---
            const formData = new FormData(this); // 'this' fait référence au formulaire
            const userName = formData.get('user_name');
            const userEmail = formData.get('user_email');
            const userMessage = formData.get('message'); // 'message' est l'attribut name du textarea

            // --- VOS IDENTIFIANTS EMAILJS ---
            const serviceID = 'service_qolrrnq';
            const templateID_pourMoi = 'template_wa0h2p4'; // ID du modèle pour vous (le destinataire)
            const templateID_autoReply = 'template_nxjsfqh'; // <--- NOUVEL ID : L'ID de votre nouveau modèle EmailJS pour l'auto-réponse
            const publicKey = 'gVZN6vJ6DzWhS1-kE';

            // 1. Envoyer le message À VOUS (le propriétaire du portfolio)
            emailjs.sendForm(serviceID, templateID_pourMoi, this, publicKey)
                .then(function() {
                    console.log('SUCCESS: Message envoyé au propriétaire avec succès !');

                    // 2. SI LE PREMIER ENVOI EST UN SUCCÈS, ENVOYER L'E-MAIL DE RETOUR À L'EXPÉDITEUR
                    const autoReplyParams = {
                        to_email: userEmail,       // L'e-mail de l'expéditeur du formulaire
                        user_name: userName,       // Le nom de l'expéditeur pour la personnalisation
                        message_sent_by_user: userMessage // Le message original pour le récapitulatif
                    };

                    // Assurez-vous que templateID_autoReply est bien remplacé par l'ID de votre modèle d'auto-réponse
                    emailjs.send(serviceID, templateID_autoReply, autoReplyParams, publicKey)
                        .then(function() {
                            formStatus.textContent = "Message envoyé avec succès ! Un e-mail de confirmation vous a été envoyé.";
                            formStatus.style.color = "green";
                            contactForm.reset();
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
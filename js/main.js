document.addEventListener('DOMContentLoaded', () => {
    const projectModal = document.getElementById('projectModal');
    const closeButton = document.querySelector('.close-button-project');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalLink = document.getElementById('modalLink');

    // Données pour les modales (vous pouvez ajouter plus de projets ici)
    const projectsData = {
        'brand-identity': {
            title: 'Identité de Marque',
            image: 'images/meta.png', // Remplacez par une image pertinente
            description: 'Ma marque incarne la précision, l\'innovation et des solutions web percutantes. Je fusionne le design créatif avec un code robuste, offrant des expériences utilisateur intuitives et performantes qui garantissent un succès numérique mesurable pour chaque projet.',
            link: '#' // Lien vers le projet réel ou plus de détails
        },
        'product-design': {
            title: 'Design Produit',
            image: 'images/web app.png', // Remplacez par une image pertinente
            description: 'Je crée des interfaces intuitives et centrées sur l\'utilisateur, combinant une esthétique époustouflante avec une fonctionnalité transparente. Je me concentre sur des expériences engageantes et des solutions robustes et évolutives, stimulant l\'innovation numérique et la satisfaction des utilisateurs.',
            link: '#'
        },
        'integration-design': {
            title: 'Design d\'Intégration',
            image: 'images/met web.jpg', // Remplacez par une image pertinente
            description: 'Je me spécialise dans la création de connexions transparentes entre divers systèmes. Mon objectif est de développer des API robustes, des flux de données efficaces et des architectures évolutives, assurant une interopérabilité sans faille et des écosystèmes numériques améliorés pour des performances optimales.',
            link: '#'
        },
        'app-design': {
            title: 'Design d\'Applications',
            image: 'images/shopi.jpg', // Remplacez par une image pertinente
            description: 'Je me concentre sur l\'innovation centrée sur l\'utilisateur, traduisant des besoins complexes en solutions intuitives et percutantes. Je combine une pensée stratégique avec une exécution méticuleuse, garantissant des expériences utilisateur optimales et un succès commercial pour chaque produit numérique.',
            link: '#'
        },
        'olido-interaction': {
            title: 'Interaction Olido',
            image: 'images/meta.png', // Utilisez l'image de votre projet
            description: 'Détails sur le projet d\'interaction Olido. Ce projet visait à améliorer l\'engagement utilisateur à travers des interfaces intuitives et des parcours fluides.',
            link: '#'
        },
        'franck-product-design': {
            title: 'Design Produit Franck',
            image: 'images/web app.png', // Utilisez l'image de votre projet
            description: 'Détails sur le design produit de Franck. Ce travail a permis de créer une expérience utilisateur optimale pour notre application phare.',
            link: '#'
        },
        'meta-web-design': {
            title: 'Meta Web Design',
            image: 'images/met web.jpg', // Utilisez l'image de votre projet
            description: 'Ce projet de Meta Web Design a consisté à concevoir une interface web moderne et réactive pour une plateforme innovante.',
            link: '#'
        },
        'shopitech-website': {
            title: 'Site Web ShopiTech',
            image: 'images/shopi.jpg', // Utilisez l'image de votre projet
            description: 'Création du site e-commerce ShopiTech, intégrant des fonctionnalités avancées de panier et de gestion des commandes, avec une attention particulière à l\'expérience utilisateur.',
            link: '#'
        },
        'custom-saas-platform': {
            title: 'Plateforme SaaS Personnalisée',
            image: 'images/saas.jpg', // Utilisez l'image de votre projet
            description: 'Développement d\'une plateforme SaaS sur mesure, offrant une solution complète et évolutive pour la gestion des opérations internes de nos clients.',
            link: '#'
        },
        'franck-portfolio': {
            title: 'Portfolio de Franck',
            image: 'images/porto.png', // Utilisez l'image de votre projet
            description: 'Ce projet est mon portfolio personnel, où je présente mes réalisations et mes compétences en développement web et design. Il est conçu pour être à la fois esthétique et fonctionnel.',
            link: '#'
        }
    };


    function openModal(projectId) {
        const project = projectsData[projectId];
        if (project) {
            modalTitle.textContent = project.title;
            modalImage.src = project.image;
            modalDescription.textContent = project.description;
            modalLink.href = project.link;
            projectModal.style.display = 'flex'; // Affiche la modale
            document.body.style.overflow = 'hidden'; // Empêche le défilement du corps
        }
    }

    function closeModal() {
        projectModal.style.display = 'none'; // Cache la modale
        document.body.style.overflow = ''; // Rétablit le défilement du corps
    }

    // Fermer la modale en cliquant sur le bouton de fermeture
    closeButton.addEventListener('click', closeModal);

    // Fermer la modale en cliquant en dehors du contenu
    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            closeModal();
        }
    });

    // Attacher les écouteurs d'événements aux boutons "Explore More"
    document.querySelectorAll('.services .srv-card .btn.secondary-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche le comportement par défaut du lien
            const card = event.target.closest('.srv-card');
            let projectId = '';
            // Déterminer le projectId en fonction du titre dans la carte
            const titleElement = card.querySelector('h3');
            if (titleElement) {
                const titleText = titleElement.textContent.trim().toLowerCase();
                if (titleText.includes('brand identity')) {
                    projectId = 'brand-identity';
                } else if (titleText.includes('product design')) {
                    projectId = 'product-design';
                } else if (titleText.includes('integration design')) {
                    projectId = 'integration-design';
                } else if (titleText.includes('app design')) {
                    projectId = 'app-design';
                }
            }
            if (projectId) {
                openModal(projectId);
            }
        });
    });

    // Attacher les écouteurs d'événements aux boutons "Read more" dans la section Portfolio
    document.querySelectorAll('.portofolio .prt-card .btn.secondary-btn.sm').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche le comportement par défaut du lien
            const card = event.target.closest('.prt-card');
            let projectId = '';
            // Déterminer le projectId en fonction du titre dans la carte
            const titleElement = card.querySelector('h3');
            if (titleElement) {
                const titleText = titleElement.textContent.trim().toLowerCase();
                if (titleText.includes('olido interction')) {
                    projectId = 'olido-interaction';
                } else if (titleText.includes('franck product design')) {
                    projectId = 'franck-product-design';
                } else if (titleText.includes('meta web design')) {
                    projectId = 'meta-web-design';
                } else if (titleText.includes('shopitech website')) {
                    projectId = 'shopitech-website';
                } else if (titleText.includes('custom saas platform')) {
                    projectId = 'custom-saas-platform';
                } else if (titleText.includes('franck portofolio')) {
                    projectId = 'franck-portfolio';
                }
            }
            if (projectId) {
                openModal(projectId);
            }
        });
    });
});
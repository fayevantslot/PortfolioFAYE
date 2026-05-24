// Scroll animation detection
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes
                if (entry.target.classList.contains('fade-in-left')) {
                    entry.target.style.animation = 'fadeInLeft 0.8s ease-out forwards';
                }
                if (entry.target.classList.contains('fade-in-right')) {
                    entry.target.style.animation = 'fadeInRight 0.8s ease-out forwards';
                }
                if (entry.target.classList.contains('fade-in-up')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
                if (entry.target.classList.contains('stagger-item')) {
                    entry.target.style.animation = 'slideInBottom 0.8s ease-out forwards';
                }
                
                // Stop observing after animation has been triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.fade-in-left, .fade-in-right, .fade-in-up, .stagger-item, .module-block'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax scroll effect for hero section
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', function() {
        if (heroContent) {
            const scrollPosition = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroContent.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
        }
    });

    // Smooth nav highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    function loadProjectDetails() {
        const detailContainer = document.querySelector('.project-detail');
        if (!detailContainer) return;

        const projectData = {
            '1': {
                title: 'Visual Identity Series',
                category: 'Branding / Editorial',
                summary: 'A visual identity project that combines typography, color and layout for a cohesive brand story.',
                description: 'This personal project explores branding through a series of editorial layouts, logo concepts and print experiments. The visuals combine texture, color and minimal composition to create a strong visual language.',
                photos: ['Concept boards', 'Typography study', 'Model photography', 'Final layout']
            },
            '2': {
                title: 'Upcycled Chair',
                category: 'Sustainable Design / Upcycling',
                summary: 'A sustainable chair project made from upcycled fashion materials, raising awareness about overconsumption and environmental footprint in the fashion industry.',
                description: 'With this chair, I want to make people think about their environmental footprint. Producing a single pair of jeans requires around 8000 liters of water, yet people buy them as if it means nothing. How many pairs of jeans do you have in your closet? And not just jeans—most people own far more clothing than they actually need. The hangers symbolize the excessive amount of clothing people purchase, highlighting the issue of overconsumption in the fashion industry.\n\nBy upcycling materials into a chair, this project encourages discussion about sustainability, overconsumption and the environmental footprint (mainly in the fashion industry). Promoting more conscious consumption in everyday life.',
                photos: ['foto%27s/PortfolioChair1.png', 'foto%27s/portfoliochair2.png', 'foto%27s/portfoliochair3.png', 'foto%27s/PortfolioChairScketch.png']
            },
            '3': {
                title: 'Interactive Poster',
                category: 'Motion Graphics',
                summary: 'A poster concept that comes alive with movement, color and dynamic shapes.',
                description: 'The interactive poster project merges digital animation with printed graphics. Each photo shows a phase from sketch to digital motion design, revealing a playful visual approach.',
                photos: ['Sketch phase', 'Color study', 'Digital animation', 'Final poster']
            },
            '4': {
                title: 'AR Fashion Story',
                category: 'Experience Design',
                summary: 'A fashion editorial enriched with AR elements and immersive storytelling.',
                description: 'This project blends fashion imagery with augmented reality concepts. It focuses on how physical editorial design can be enhanced by digital experiences for a modern audience.',
                photos: ['Moodboard', 'AR overlay', 'Styled shoot', 'Story visuals']
            },
            '5': {
                title: 'Type Experiment',
                category: 'Typography',
                summary: 'An exploration of lettering, shapes and color to create expressive typographic forms.',
                description: 'This experiment emphasizes creative typography through hand-drawn letterforms, digital treatments and experimental layouts. It highlights how type can become a visual identity in itself.',
                photos: ['Letter sketches', 'Color mapping', 'Type system', 'Final composition']
            },
            '6': {
                title: 'Photo Diary',
                category: 'Photography',
                summary: 'A personal photography project documenting daily life through color and texture.',
                description: 'The photo diary captures moments of everyday life and travel. The project focuses on mood, light and composition to build a narrative across four visual scenes.',
                photos: ['Morning routine', 'City walk', 'Studio details', 'Evening portrait']
            },
            '7': {
                title: 'Eco Installation',
                category: 'Environmental Design',
                summary: 'A concept for a sustainable installation that highlights natural materials and interactive elements.',
                description: 'This environmental design project explores how physical installations can tell stories about sustainability. It includes mockups, material samples and concept visuals.',
                photos: ['Installation sketch', 'Material studies', 'Spatial model', 'Final concept']
            },
            '8': {
                title: 'Product Prototype',
                category: 'Industrial Design',
                summary: 'A tactile prototype study with a strong focus on form, function and materiality.',
                description: 'This prototype project investigates product design through quick modelling and material exploration. The visuals document the design process from idea to physical model.',
                photos: ['Wireframe design', 'Model build', 'Texture study', 'Prototype shot']
            },
            '9': {
                title: 'Soundscape Lab',
                category: 'Audio / Visual',
                summary: 'A creative experiment blending sound, visuals and interactive narrative.',
                description: 'This soundscape project merges audio composition with graphic and visual direction. It is designed as a multisensory experience for digital presentation.',
                photos: ['Sound concept', 'Visual boards', 'Interactive mockup', 'Final screenshot']
            },
            '10': {
                title: 'Digital Exhibition',
                category: 'UX / UI',
                summary: 'A digital exhibition experience created to showcase work in an immersive online format.',
                description: 'The exhibition project designs a clean digital space for presenting creative work. It includes interactive navigation, rich imagery and an elegant visual system.',
                photos: ['Homepage preview', 'Gallery view', 'Interactive map', 'Detail panel']
            }
        };

        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('project') || '1';
        const project = projectData[projectId] || projectData['1'];

        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-category').textContent = project.category;
        document.getElementById('project-summary').textContent = project.summary;
        document.getElementById('project-description').textContent = project.description;

        const photoGrid = document.getElementById('project-photo-grid');
        photoGrid.innerHTML = '';
        project.photos.forEach(photoPath => {
            const photo = document.createElement('div');
            photo.className = 'project-photo';
            photo.style.backgroundImage = `url('${photoPath}')`;
            photo.style.backgroundSize = 'cover';
            photo.style.backgroundPosition = 'center';
            photoGrid.appendChild(photo);
        });
    }

    loadProjectDetails();

    // --- Music bar controls ---
    const musicBar = document.getElementById('musicBar');
    const audio = document.getElementById('site-audio');
    const musicToggle = document.getElementById('musicToggle');
    const musicMute = document.getElementById('musicMute');
    const trackInfo = document.querySelector('.track-info');

    if (musicBar && audio && musicToggle && musicMute) {
        const src = musicBar.dataset.src || audio.src || '';
        const fileName = src ? src.split('/').pop() : '';
        const customLabel = musicBar.dataset.label || '';
        trackInfo.textContent = customLabel || (fileName ? decodeURIComponent(fileName) : 'No track selected');
        // show actual filename on hover/title so name isn't lost
        trackInfo.title = fileName ? decodeURIComponent(fileName) : '';

        function updatePlayIcon() {
            musicToggle.textContent = audio.paused ? '▶' : '⏸';
        }

        function updateMuteIcon() {
            musicMute.textContent = audio.muted ? '🔈' : '🔊';
        }

        musicToggle.addEventListener('click', async () => {
            if (audio.paused) {
                try {
                    await audio.play();
                    localStorage.setItem('site-audio-playing', 'true');
                } catch (err) {
                    console.warn('Autoplay blocked or play failed', err);
                }
            } else {
                audio.pause();
                localStorage.setItem('site-audio-playing', 'false');
            }
            updatePlayIcon();
        });

        musicMute.addEventListener('click', () => {
            audio.muted = !audio.muted;
            localStorage.setItem('site-audio-muted', audio.muted ? 'true' : 'false');
            updateMuteIcon();
        });

        // Sync icons with audio state
        audio.addEventListener('play', updatePlayIcon);
        audio.addEventListener('pause', updatePlayIcon);
        audio.addEventListener('volumechange', updateMuteIcon);

        // Restore previous state
        const wasMuted = localStorage.getItem('site-audio-muted') === 'true';
        const wasPlaying = localStorage.getItem('site-audio-playing') === 'true';
        audio.muted = wasMuted;
        updateMuteIcon();
        updatePlayIcon();

        if (wasPlaying) {
            audio.play().then(() => updatePlayIcon()).catch(() => {
                // Autoplay may be blocked; keep paused until user interacts.
            });
        }
    }
});

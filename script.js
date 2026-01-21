// Lyon Portfolio - JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // Nav Logo Hacker Animation (Loop)
    // ============================================
    const navName = document.getElementById('nav-name');
    const navCursor = document.getElementById('nav-cursor');
    const originalName = 'Ailton Rocha';
    const hackedText = 'Detection Engineer';
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789';

    function startNavAnimation() {
        let navCharIndex = 0;
        navName.classList.remove('hacked', 'glitching');
        navName.textContent = '';
        navCursor.classList.remove('hidden');

        function typeNavName() {
            if (navCharIndex < originalName.length) {
                navName.textContent = originalName.substring(0, navCharIndex + 1);
                navCharIndex++;
                setTimeout(typeNavName, 80);
            } else {
                setTimeout(startGlitchEffect, 2000);
            }
        }

        function startGlitchEffect() {
            navName.classList.add('glitching');
            navCursor.classList.add('hidden');

            let glitchCount = 0;
            const maxGlitches = 15;

            const glitchInterval = setInterval(() => {
                let glitchedText = '';
                for (let i = 0; i < originalName.length; i++) {
                    if (Math.random() > 0.3) {
                        glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    } else {
                        glitchedText += originalName[i];
                    }
                }
                navName.textContent = glitchedText;
                glitchCount++;

                if (glitchCount >= maxGlitches) {
                    clearInterval(glitchInterval);
                    showHackedText();
                }
            }, 100);
        }

        function showHackedText() {
            navName.classList.remove('glitching');
            navName.textContent = '';

            let hackIndex = 0;
            const typeHacked = () => {
                if (hackIndex < hackedText.length) {
                    navName.textContent = hackedText.substring(0, hackIndex + 1);
                    hackIndex++;
                    setTimeout(typeHacked, 40);
                } else {
                    navName.classList.add('hacked');
                    setTimeout(startNavAnimation, 5000);
                }
            };

            setTimeout(typeHacked, 200);
        }

        typeNavName();
    }

    if (navName) {
        setTimeout(startNavAnimation, 500);
    }

    // ============================================
    // Hero Typing Animation
    // ============================================
    const typingText = document.querySelector('.typing-text');
    const phrases = [
        'Blue Team & Threat Hunter',
        'Detection Engineer',
        'Incident Response',
        'Security Analyst',
        'ツ'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isPaused) {
            setTimeout(typeEffect, currentPhrase === 'ツ' ? 2000 : 1500);
            isPaused = false;
            isDeleting = true;
            return;
        }

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            isPaused = true;
            typeSpeed = 0;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (typingText) {
        setTimeout(typeEffect, 1000);
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(124, 58, 237, 0.15)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // ============================================
    // Timeline Hacking Effect
    // ============================================
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timeline && timelineItems.length > 0) {
        // Timeline progress line based on scroll
        const updateTimelineProgress = () => {
            const timelineRect = timeline.getBoundingClientRect();
            const timelineTop = timelineRect.top;
            const timelineHeight = timelineRect.height;
            const windowHeight = window.innerHeight;

            // Calculate how much of timeline is visible/scrolled
            let progress = 0;
            if (timelineTop < windowHeight) {
                const scrolledIntoTimeline = windowHeight - timelineTop;
                progress = Math.min(100, Math.max(0, (scrolledIntoTimeline / timelineHeight) * 100));
            }

            timeline.style.setProperty('--timeline-progress', `${progress}%`);
        };

        // Hacking reveal effect for timeline items
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('hacking')) {
                    entry.target.classList.add('hacking');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });

        // Update on scroll
        window.addEventListener('scroll', updateTimelineProgress, { passive: true });
        updateTimelineProgress(); // Initial call
    }

    // Observe certification cards
    document.querySelectorAll('.cert-card').forEach(card => {
        observer.observe(card);
    });

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });

    // Glitch effect on hover for hero title
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        glitchText.addEventListener('mouseenter', () => {
            glitchText.style.animation = 'none';
            setTimeout(() => {
                glitchText.style.animation = '';
            }, 10);
        });
    }

    // ============================================
    // Triangle Particles Effect on Cards
    // ============================================
    function createTriangleParticle(container, x, y) {
        const particle = document.createElement('div');
        particle.className = 'triangle-particle';

        const size = Math.random() * 12 + 6;
        const angle = Math.random() * 360;
        const distance = Math.random() * 100 + 50;
        const duration = Math.random() * 0.6 + 0.4;
        const hue = Math.random() > 0.5 ? '270' : '280';

        particle.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            border-left: ${size/2}px solid transparent;
            border-right: ${size/2}px solid transparent;
            border-bottom: ${size}px solid hsla(${hue}, 70%, 50%, ${Math.random() * 0.5 + 0.3});
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 100;
            transform: rotate(${Math.random() * 360}deg);
            animation: triangleBurst ${duration}s ease-out forwards;
            --tx: ${Math.cos(angle * Math.PI / 180) * distance}px;
            --ty: ${Math.sin(angle * Math.PI / 180) * distance}px;
            --rotation: ${Math.random() * 720 - 360}deg;
        `;

        container.appendChild(particle);
        setTimeout(() => particle.remove(), duration * 1000);
    }

    function burstTriangles(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createTriangleParticle(card, x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20);
            }, i * 30);
        }
    }

    // Apply to all card types
    const allCards = document.querySelectorAll('.project-card, .cert-card, .skill-category');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => burstTriangles(e, card));
    });

    // Skills progress animation on scroll
    const skillBars = document.querySelectorAll('.skill-tag');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach((bar, index) => {
        bar.style.opacity = '0';
        bar.style.transform = 'translateY(20px)';
        bar.style.transition = `all 0.3s ease ${index * 0.05}s`;
        skillObserver.observe(bar);
    });

    // Particle effect for hero section (subtle)
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(124, 58, 237, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
                pointer-events: none;
            `;
            hero.appendChild(particle);
        }
    }

    // Add float animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() > 0.5 ? '' : '-'}100px, -100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Console easter egg
    console.log('%c Lyon Portfolio ', 'background: #7C3AED; color: #fff; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Blue Team & Threat Hunter ', 'color: #A855F7; font-size: 14px;');
    console.log('%c > Protecting systems, hunting threats ', 'color: #6B7280; font-size: 12px;');
});

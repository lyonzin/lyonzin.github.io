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
    // Hero Typing Animation (subtítulos abaixo do nome)
    // ============================================
    const typingText = document.querySelector('.typing-text');
    const heroGlitchChars = '!@#$%^&*0123456789ABCDEF<>{}[]';
    const phrases = [
        'Ailton Rocha',
        'Detection Engineer',
        'Threat Hunter',
        'Ethical Hacking'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    let isGlitching = false;
    let isPulsing = false;

    function getHeroGlitchChar() {
        return heroGlitchChars[Math.floor(Math.random() * heroGlitchChars.length)];
    }

    function glitchEffect(callback) {
        isGlitching = true;
        let count = 0;
        const maxCount = 8;
        const interval = setInterval(() => {
            let text = '';
            const len = Math.floor(Math.random() * 8) + 4;
            for (let i = 0; i < len; i++) {
                text += getHeroGlitchChar();
            }
            typingText.textContent = text;
            typingText.style.color = count % 2 === 0 ? '#7c3aed' : '#a855f7';
            count++;
            if (count >= maxCount) {
                clearInterval(interval);
                typingText.style.color = '';
                isGlitching = false;
                callback();
            }
        }, 60);
    }

    function pulseEffect(callback) {
        isPulsing = true;
        typingText.classList.add('pulsing');
        setTimeout(() => {
            typingText.classList.remove('pulsing');
            isPulsing = false;
            callback();
        }, 5000);
    }

    function typeEffect() {
        if (isGlitching) return;
        const currentPhrase = phrases[phraseIndex];

        if (isPaused) {
            isPaused = false;
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            isPaused = true;
            typeSpeed = 0;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            glitchEffect(() => {
                setTimeout(typeEffect, 200);
            });
            return;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (typingText) {
        setTimeout(typeEffect, 1000);
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
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
    // Timeline with Particle Explosions & Growing Lines
    // ============================================
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const revealedItems = new Set();

    if (timeline && timelineItems.length > 0) {
        // Create particle explosion at marker
        function createMarkerExplosion(marker) {
            const rect = marker.getBoundingClientRect();
            const timelineRect = timeline.getBoundingClientRect();
            const x = rect.left - timelineRect.left + rect.width / 2;
            const y = rect.top - timelineRect.top + rect.height / 2;

            const colors = ['#7C3AED', '#A855F7', '#C084FC', '#ffffff', '#E879F9'];
            const particleCount = 24;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'timeline-particle';

                const angle = (i / particleCount) * 360 + Math.random() * 30;
                const distance = 60 + Math.random() * 80;
                const size = 4 + Math.random() * 6;
                const duration = 0.6 + Math.random() * 0.4;
                const color = colors[Math.floor(Math.random() * colors.length)];

                particle.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                    z-index: 100;
                    box-shadow: 0 0 12px ${color}, 0 0 20px ${color};
                    animation: particleExplode ${duration}s ease-out forwards;
                    --tx: ${Math.cos(angle * Math.PI / 180) * distance}px;
                    --ty: ${Math.sin(angle * Math.PI / 180) * distance}px;
                `;

                timeline.appendChild(particle);
                setTimeout(() => particle.remove(), duration * 1000);
            }

            // Ring explosion effect
            const ring = document.createElement('div');
            ring.className = 'explosion-ring';
            ring.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 10px;
                height: 10px;
                border: 2px solid #A855F7;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 99;
                animation: ringBurst 0.6s ease-out forwards;
            `;
            timeline.appendChild(ring);
            setTimeout(() => ring.remove(), 600);
        }

        // Update timeline on scroll
        const updateTimeline = () => {
            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight * 0.65;
            const isNearBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200;
            const isLastItem = (index) => index === timelineItems.length - 1;

            timelineItems.forEach((item, index) => {
                const marker = item.querySelector('.marker-dot');
                const markerLine = item.querySelector('.marker-line');
                if (!marker) return;

                const markerRect = marker.getBoundingClientRect();
                const markerTop = markerRect.top;

                // Explosion when marker reaches trigger point OR when near bottom of page
                const shouldReveal = markerTop < triggerPoint || (isNearBottom && markerTop < windowHeight);
                if (shouldReveal && !revealedItems.has(index)) {
                    revealedItems.add(index);
                    createMarkerExplosion(marker);
                    item.classList.add('revealed');
                }

                // Calculate line progress based on scroll position
                if (revealedItems.has(index) && markerLine) {
                    const lineRect = markerLine.getBoundingClientRect();
                    const lineTop = lineRect.top;
                    const lineHeight = lineRect.height || 100; // Fallback if height is 0

                    // How much of the line should be filled based on scroll
                    let scrollProgress = triggerPoint - lineTop;

                    // If near bottom OR it's the last item and revealed, fill the line completely
                    if (isNearBottom || (isLastItem(index) && markerTop < windowHeight * 0.8)) {
                        scrollProgress = lineHeight;
                    }
                    const progress = Math.min(100, Math.max(0, (scrollProgress / lineHeight) * 100));

                    markerLine.style.setProperty('--line-progress', `${progress}%`);
                }
            });
        };

        window.addEventListener('scroll', updateTimeline, { passive: true });
        setTimeout(updateTimeline, 100);
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

    // ============================================
    // Stats Counter with Hacking Effect
    // ============================================
    const statCounters = document.querySelectorAll('.stat-number[data-count]');
    const hackChars = '!@#$%^&*0123456789ABCDEF';

    function animateCounterWithHack(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 4500; // 4.5 segundos (mais lento)
        let currentValue = 0;
        const startTime = performance.now();

        // Aplicar estilo de glitch (branco)
        counter.classList.add('counter-hacking');

        function getGlitchChar() {
            return hackChars[Math.floor(Math.random() * hackChars.length)];
        }

        function updateCounter(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing mais suave
            const easedProgress = 1 - Math.pow(1 - progress, 2);
            currentValue = Math.floor(easedProgress * target);

            // Fase de glitch: mostrar caracteres aleatórios junto com o número
            const glitchIntensity = 1 - progress;

            if (progress < 1) {
                let displayText = '';
                const numStr = currentValue.toString();

                for (let i = 0; i < numStr.length; i++) {
                    if (Math.random() < glitchIntensity * 0.6) {
                        displayText += getGlitchChar();
                    } else {
                        displayText += numStr[i];
                    }
                }

                if (Math.random() < glitchIntensity * 0.2) {
                    displayText = getGlitchChar() + displayText.slice(1);
                }

                counter.textContent = displayText + suffix;

                requestAnimationFrame(updateCounter);
            } else {
                // Finalizar
                counter.textContent = target + suffix;
                counter.classList.remove('counter-hacking');
                counter.classList.add('counter-complete');

                // Após a animação de complete, iniciar pulsação e partículas
                setTimeout(() => {
                    counter.classList.add('counter-pulsing');
                    const statContainer = counter.closest('.stat');
                    if (statContainer) {
                        statContainer.classList.add('particles-active');
                    }
                }, 500);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Observer para iniciar animação quando visível
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Delay escalonado para cada contador
                const counters = document.querySelectorAll('.stat-number[data-count]');
                counters.forEach((counter, index) => {
                    setTimeout(() => {
                        animateCounterWithHack(counter);
                    }, index * 200);
                });
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    if (statCounters.length > 0) {
        statsObserver.observe(document.querySelector('.hero-stats'));
    }

    // Console easter egg
    console.log('%c Lyon Portfolio ', 'background: #7C3AED; color: #fff; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Blue Team & Threat Hunter ', 'color: #A855F7; font-size: 14px;');
    console.log('%c > Protecting systems, hunting threats ', 'color: #6B7280; font-size: 12px;');
});

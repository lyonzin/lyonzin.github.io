// Lyon Portfolio - JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // Internationalization (i18n) System
    // ============================================
    const i18n = {
        currentLang: localStorage.getItem('language') || 'pt-br',
        translations: {},

        async loadTranslations(lang) {
            try {
                const response = await fetch(`locales/${lang}.json`);
                if (!response.ok) throw new Error(`Failed to load ${lang}`);
                this.translations[lang] = await response.json();
                return true;
            } catch (error) {
                console.error(`Error loading translations for ${lang}:`, error);
                return false;
            }
        },

        async init() {
            // Setup language selector FIRST (so clicks work even if fetch fails)
            this.setupLanguageSelector();

            // Then load and apply translations
            try {
                await this.loadTranslations(this.currentLang);
                this.applyTranslations();
            } catch (error) {
                console.warn('Could not load translations:', error);
            }
        },

        applyTranslations() {
            const elements = document.querySelectorAll('[data-i18n]');
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = this.getNestedValue(this.translations[this.currentLang], key);
                if (translation) {
                    element.innerHTML = translation;
                }
            });

            // Update HTML lang attribute
            document.documentElement.lang = this.currentLang === 'pt-br' ? 'pt-BR' :
                                            this.currentLang === 'zh' ? 'zh-CN' :
                                            this.currentLang;

            // Update current flag
            this.updateCurrentFlag();
        },

        getNestedValue(obj, path) {
            if (!obj) return null;
            return path.split('.').reduce((current, key) =>
                current && current[key] !== undefined ? current[key] : null, obj);
        },

        updateCurrentFlag() {
            const currentFlag = document.getElementById('current-flag');
            if (!currentFlag) return;

            const flagMap = {
                'pt-br': 'br',
                'en': 'us',
                'es': 'es',
                'ru': 'ru',
                'zh': 'cn'
            };

            const countryCode = flagMap[this.currentLang] || 'br';
            currentFlag.src = `https://flagcdn.com/w20/${countryCode}.png`;
            currentFlag.alt = this.currentLang.toUpperCase();
        },

        setupLanguageSelector() {
            // Mark current language option as active
            const options = document.querySelectorAll('.lang-option');
            options.forEach(option => {
                if (option.getAttribute('data-lang') === this.currentLang) {
                    option.classList.add('active');
                }
            });
        }
    };

    // Initialize i18n
    i18n.init();

    // ============================================
    // Language Selector - Click Handler
    // ============================================
    const langSelector = document.querySelector('.lang-selector');
    const langCurrentBtn = document.querySelector('.lang-current');

    if (langSelector && langCurrentBtn) {
        // Toggle dropdown on button click
        langCurrentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            langSelector.classList.toggle('active');
        });

        // Prevent clicks inside dropdown from closing it
        langSelector.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            langSelector.classList.remove('active');
        });

        // Handle language option clicks
        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const lang = this.getAttribute('data-lang');
                const flagMap = {
                    'pt-br': 'br',
                    'en': 'us',
                    'es': 'es',
                    'ru': 'ru',
                    'zh': 'cn'
                };

                // Update current flag
                const currentFlag = document.getElementById('current-flag');
                if (currentFlag) {
                    currentFlag.src = `https://flagcdn.com/w20/${flagMap[lang]}.png`;
                }

                // Update active state
                document.querySelectorAll('.lang-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');

                // Save preference
                localStorage.setItem('language', lang);

                // Close dropdown
                langSelector.classList.remove('active');

                // Try to apply translations
                if (i18n.translations[lang]) {
                    i18n.currentLang = lang;
                    i18n.applyTranslations();
                } else {
                    i18n.loadTranslations(lang).then(() => {
                        i18n.currentLang = lang;
                        i18n.applyTranslations();
                    });
                }
            });
        });
    }

    // ============================================
    // Nav Logo Hacker Animation (Loop com múltiplas frases)
    // ============================================
    const navName = document.getElementById('nav-name');
    const navCursor = document.getElementById('nav-cursor');
    const navPhrases = [
        'Ailton Rocha',
        'Detection Engineer',
        'Threat Hunter',
        'Ethical Hacking'
    ];
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789';
    let navPhraseIndex = 0;

    function startNavAnimation() {
        const currentPhrase = navPhrases[navPhraseIndex];
        let navCharIndex = 0;
        navName.classList.remove('hacked', 'glitching');
        navName.textContent = '';
        navCursor.classList.remove('hidden');

        function typeNavPhrase() {
            if (navCharIndex < currentPhrase.length) {
                navName.textContent = currentPhrase.substring(0, navCharIndex + 1);
                navCharIndex++;
                setTimeout(typeNavPhrase, 60);
            } else {
                setTimeout(startGlitchEffect, 2500);
            }
        }

        function startGlitchEffect() {
            navName.classList.add('glitching');
            navCursor.classList.add('hidden');

            let glitchCount = 0;
            const maxGlitches = 12;

            const glitchInterval = setInterval(() => {
                let glitchedText = '';
                const len = Math.max(currentPhrase.length, 8);
                for (let i = 0; i < len; i++) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                }
                navName.textContent = glitchedText;
                glitchCount++;

                if (glitchCount >= maxGlitches) {
                    clearInterval(glitchInterval);
                    navName.classList.remove('glitching');
                    navPhraseIndex = (navPhraseIndex + 1) % navPhrases.length;
                    setTimeout(startNavAnimation, 150);
                }
            }, 80);
        }

        typeNavPhrase();
    }

    if (navName) {
        setTimeout(startNavAnimation, 500);
    }

    // ============================================
    // Hero Pulsing Text - "Transformando Ameaças em Segurança"
    // ============================================
    const typingText = document.querySelector('.typing-text');
    const heroPhrase = 'Transformando Ameaças em Segurança';
    const heroGlitchChars = '!@#$%^&*0123456789ABCDEF<>{}[]';

    function heroTypeAndPulse() {
        let charIndex = 0;
        typingText.textContent = '';
        typingText.classList.remove('hero-pulsing');

        // Glitch inicial antes de digitar
        let glitchCount = 0;
        const glitchInterval = setInterval(() => {
            let glitched = '';
            for (let i = 0; i < 12; i++) {
                glitched += heroGlitchChars[Math.floor(Math.random() * heroGlitchChars.length)];
            }
            typingText.textContent = glitched;
            typingText.style.color = glitchCount % 2 === 0 ? '#7c3aed' : '#a855f7';
            glitchCount++;

            if (glitchCount >= 8) {
                clearInterval(glitchInterval);
                typingText.style.color = '';
                typingText.textContent = '';
                startTyping();
            }
        }, 60);

        function startTyping() {
            const typeInterval = setInterval(() => {
                charIndex++;
                typingText.textContent = heroPhrase.substring(0, charIndex);

                if (charIndex >= heroPhrase.length) {
                    clearInterval(typeInterval);
                    // Ativa efeito pulsante permanente
                    setTimeout(() => {
                        typingText.classList.add('hero-pulsing');
                    }, 500);
                }
            }, 50);
        }
    }

    if (typingText) {
        setTimeout(heroTypeAndPulse, 1000);
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

    // ============================================
    // Active Nav Link on Scroll
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ============================================
    // Scroll Progress Bar
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // ============================================
    // Back to Top Button
    // ============================================
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    // ============================================
    // 3D Tilt Effect on Cards
    // ============================================
    const tiltCards = document.querySelectorAll('.project-card, .edu-card, .cert-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ============================================
    // Magnetic Effect on Buttons
    // ============================================
    const magneticBtns = document.querySelectorAll('.btn, .contact-link');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ============================================
    // Text Reveal Animation for Section Titles
    // ============================================
    const sectionTitles = document.querySelectorAll('.section-title');

    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('title-revealed');
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });

    // ============================================
    // Staggered Card Reveal
    // ============================================
    const cardContainers = document.querySelectorAll('.projects-grid, .cert-grid, .skills-grid, .education-grid');

    const cardContainerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.project-card, .cert-card, .skill-category, .edu-card, .cert-category');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('card-revealed');
                    }, index * 100);
                });
                cardContainerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cardContainers.forEach(container => {
        cardContainerObserver.observe(container);
    });

    // ============================================
    // Cursor Glow Effect
    // ============================================
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    function animateCursorGlow() {
        glowX += (cursorX - glowX) * 0.1;
        glowY += (cursorY - glowY) * 0.1;

        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';

        requestAnimationFrame(animateCursorGlow);
    }

    animateCursorGlow();

    // Hide cursor glow on touch devices
    if ('ontouchstart' in window) {
        cursorGlow.style.display = 'none';
    }

    // ============================================
    // Parallax Effect on Hero
    // ============================================
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const gridOverlay = document.querySelector('.grid-overlay');

    if (heroSection && heroContent) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = heroSection.offsetHeight;

            if (scrollY < heroHeight) {
                const parallaxSpeed = 0.4;
                heroContent.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
                heroContent.style.opacity = 1 - (scrollY / heroHeight) * 0.8;

                if (gridOverlay) {
                    gridOverlay.style.transform = `translateY(${scrollY * 0.2}px)`;
                }
            }
        }, { passive: true });
    }

    // ============================================
    // Nav Links Hover Effect Enhancement
    // ============================================
    const navLinksHover = document.querySelectorAll('.nav-link');

    navLinksHover.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px var(--accent-primary), 0 0 20px var(--accent-secondary)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });

    // ============================================
    // Glitch Effect on Section Number Hover
    // ============================================
    const titleNumbers = document.querySelectorAll('.title-number');

    titleNumbers.forEach(num => {
        num.addEventListener('mouseenter', function() {
            const original = this.textContent;
            let count = 0;
            const glitchChars = '!@#$%^&*01';

            const glitchInterval = setInterval(() => {
                let glitched = '';
                for (let i = 0; i < original.length; i++) {
                    if (Math.random() > 0.5) {
                        glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    } else {
                        glitched += original[i];
                    }
                }
                this.textContent = glitched;
                count++;

                if (count > 6) {
                    clearInterval(glitchInterval);
                    this.textContent = original;
                }
            }, 50);
        });
    });

    // ============================================
    // Skill Tags Hover Wave Effect
    // ============================================
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            const tags = this.querySelectorAll('.skill-tag');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-3px) scale(1.05)';
                    setTimeout(() => {
                        tag.style.transform = '';
                    }, 200);
                }, index * 30);
            });
        });
    });

    // ============================================
    // Image Lazy Loading with Fade
    // ============================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    lazyImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // ============================================
    // Keyboard Navigation Enhancement
    // ============================================
    document.addEventListener('keydown', (e) => {
        // Press 'T' to go to top
        if (e.key === 't' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Press numbers 1-8 to go to sections
        const sectionKeys = ['1', '2', '3', '4', '5', '6', '7', '8'];
        const sectionIds = ['about', 'experience', 'education', 'projects', 'certifications', 'skills', 'languages', 'contact'];

        if (sectionKeys.includes(e.key) && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
            const index = parseInt(e.key) - 1;
            const section = document.getElementById(sectionIds[index]);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

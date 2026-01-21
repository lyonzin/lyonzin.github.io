// Lyon Portfolio - JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Typing Animation
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

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

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

    // Certification card hover effect
    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
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

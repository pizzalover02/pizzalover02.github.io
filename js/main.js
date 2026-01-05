// ===== AI RESEARCHER PORTFOLIO - MAIN JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // ===== NAVBAR SCROLL EFFECT =====
    let ticking = false;
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // ===== MOBILE NAVIGATION =====
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbar.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ===== SMOOTH SCROLLING =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ANIMATED STAT COUNTERS =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        
        const heroSection = document.querySelector('.hero');
        const heroRect = heroSection.getBoundingClientRect();
        
        if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target.toLocaleString();
                    }
                };
                
                updateCounter();
            });
        }
    }

    // Initial check
    animateStats();
    window.addEventListener('scroll', animateStats);

    // ===== TYPING EFFECT FOR ROLE =====
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const roles = [
            'AI Research Scientist',
            'LLM Architect',
            'Neural Network Engineer',
            'ML Infrastructure Lead',
            'AI Safety Researcher'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeRole() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before new word
            }

            setTimeout(typeRole, typingSpeed);
        }

        // Start after initial animation
        setTimeout(typeRole, 3000);
    }

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-text, .experience-timeline, .skills-section, ' +
        '.research-card, .publication-item, .talk-card, .contact-card, .terminal-window'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeInObserver.observe(el);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ===== STAGGERED ANIMATION FOR GRIDS =====
    const staggeredContainers = document.querySelectorAll('.research-grid, .talks-grid, .publications-list');
    
    staggeredContainers.forEach(container => {
        const items = container.children;
        Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // ===== PARALLAX EFFECT FOR BACKGROUND =====
    let parallaxTicking = false;
    const bgGradient = document.querySelector('.bg-gradient');
    
    function updateParallax() {
        if (bgGradient) {
            const scrolled = window.pageYOffset;
            bgGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        parallaxTicking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!parallaxTicking) {
            requestAnimationFrame(updateParallax);
            parallaxTicking = true;
        }
    });

    // ===== BUTTON RIPPLE EFFECT =====
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ===== CODE WINDOW SYNTAX HIGHLIGHTING ANIMATION =====
    const codeContent = document.querySelector('.code-content code');
    if (codeContent) {
        // Add subtle glow animation to code window on hover
        const codeWindow = document.querySelector('.code-window');
        if (codeWindow) {
            codeWindow.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 60px rgba(99, 102, 241, 0.3)';
                this.style.borderColor = 'rgba(99, 102, 241, 0.3)';
            });
            codeWindow.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
                this.style.borderColor = '';
            });
        }
    }

    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // Add active link style
    const activeLinkStyle = document.createElement('style');
    activeLinkStyle.textContent = `
        .nav-link.active {
            color: var(--text-primary);
        }
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeLinkStyle);

    // ===== PUBLICATION CARDS HOVER EFFECT =====
    const pubItems = document.querySelectorAll('.publication-item');
    pubItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(145deg, rgba(99, 102, 241, 0.05), rgba(26, 26, 37, 0.9))';
        });
        item.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });

    // ===== TALK CARDS VIDEO OVERLAY =====
    const talkCards = document.querySelectorAll('.talk-card');
    talkCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add subtle pulse effect on click
            this.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });

    // Add pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(pulseStyle);

    // ===== SKILL TAGS HOVER EFFECT =====
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            // Highlight related tags
            const tagText = this.textContent.toLowerCase();
            skillTags.forEach(otherTag => {
                if (otherTag !== this) {
                    otherTag.style.opacity = '0.5';
                }
            });
        });
        tag.addEventListener('mouseleave', function() {
            skillTags.forEach(otherTag => {
                otherTag.style.opacity = '1';
            });
        });
    });

    // ===== TERMINAL TYPING EFFECT =====
    const terminalOutput = document.querySelectorAll('.terminal-content .output');
    terminalOutput.forEach(output => {
        const text = output.innerHTML;
        output.innerHTML = '';
        let i = 0;
        
        function typeTerminal() {
            if (i < text.length) {
                output.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeTerminal, 10);
            }
        }
        
        // Trigger when terminal is visible
        const terminalObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeTerminal, 500);
                    terminalObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        terminalObserver.observe(output.closest('.terminal-window'));
    });

    // ===== SCROLL PROGRESS INDICATOR =====
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    function updateProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }

    window.addEventListener('scroll', updateProgress);

    // ===== EASTER EGG: KONAMI CODE =====
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            triggerEasterEgg();
            konamiCode = [];
        }
    });

    function triggerEasterEgg() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.5s ease;
        `;
        overlay.innerHTML = `
            <div style="text-align: center; color: white;">
                <h2 style="font-size: 3rem; margin-bottom: 1rem; background: linear-gradient(135deg, #6366f1, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    🚀 You found the secret!
                </h2>
                <p style="font-size: 1.2rem; color: #a0a0b0; max-width: 500px;">
                    Training complete. Model accuracy: 99.97%. 
                    You have the makings of a great AI researcher.
                </p>
                <p style="font-size: 0.9rem; color: #6a6a7a; margin-top: 2rem;">
                    Click anywhere to close
                </p>
            </div>
        `;
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
        });
    }

    // Add fade animations
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(fadeStyle);

    // ===== MOUSE CURSOR GLOW EFFECT =====
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
        pointer-events: none;
        z-index: -1;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Hide on mobile
    if ('ontouchstart' in window) {
        cursorGlow.style.display = 'none';
    }

    // ===== CONSOLE EASTER EGG =====
    console.log('%c🧠 Dr. Brianna Rhee - AI Research Scientist', 
        'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #6366f1, #a855f7); -webkit-background-clip: text; color: transparent;'
    );
    console.log('%cLooking for the source code? Smart move. That\'s how the best engineers learn.', 
        'font-size: 14px; color: #a0a0b0;'
    );
    console.log('%cInterested in collaborating? Reach out: brianna.rhee@research.ai', 
        'font-size: 12px; color: #6366f1;'
    );
});

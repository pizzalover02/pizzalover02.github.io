// ===== SMOOTH SCROLL AND NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // ===== NAVBAR SCROLL EFFECT (THROTTLED) =====
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

    // ===== MOBILE NAVIGATION TOGGLE =====
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbar.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Handle home link
            if (targetId === '#' || targetId === '') {
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

    // ===== OPTIMIZED INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Stop observing once animated to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for animation (reduced set for better performance)
    const animatedElements = document.querySelectorAll('.section');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ===== FLOATING SHAPES MOUSE INTERACTION =====
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach(shape => {
        shape.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(180deg)';
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });

        shape.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // ===== OPTIMIZED PARALLAX EFFECT FOR HERO SECTION =====
    let parallaxTicking = false;
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const speed = 0.3; // Reduced for smoother performance
        
        // Only apply parallax when in viewport
        if (scrolled < window.innerHeight) {
            parallaxElements.forEach((element, index) => {
                const yPos = -(scrolled * speed * (index + 1) * 0.05);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }
        parallaxTicking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!parallaxTicking) {
            requestAnimationFrame(updateParallax);
            parallaxTicking = true;
        }
    });



    // ===== CARD HOVER EFFECTS =====
    const cards = document.querySelectorAll('.about-card, .recipe-card, .study-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
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
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ===== OPTIMIZED SCROLL PROGRESS INDICATOR =====
    const createScrollProgress = function() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--terminal-green);
            box-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
            z-index: 1001;
            will-change: width;
            transition: none;
        `;
        document.body.appendChild(progressBar);

        let progressTicking = false;
        
        function updateProgress() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
            progressTicking = false;
        }

        window.addEventListener('scroll', function() {
            if (!progressTicking) {
                requestAnimationFrame(updateProgress);
                progressTicking = true;
            }
        });
    };

    createScrollProgress();

    // ===== LOGO LONG PRESS FUNCTIONALITY =====
    const logo = document.querySelector('.logo-text');
    let pressTimer = null;
    let isLongPress = false;

    if (logo) {
        // Mouse down - start timer
        logo.addEventListener('mousedown', function(e) {
            e.preventDefault();
            isLongPress = false;
            
            pressTimer = setTimeout(function() {
                isLongPress = true;
                // Add visual feedback for long press
                logo.style.transform = 'scale(1.1)';
                logo.style.transition = 'transform 0.2s ease';
                
                // Redirect to rexyrex.github.io after long press
                setTimeout(() => {
                    window.open('https://rexyrex.github.io', '_blank');
                }, 100);
            }, 800); // 0.8 seconds
        });

        // Mouse up - handle click or cancel long press
        logo.addEventListener('mouseup', function(e) {
            clearTimeout(pressTimer);
            
            // Reset visual state
            logo.style.transform = 'scale(1)';
            
            // If it wasn't a long press, do normal navigation
            if (!isLongPress) {
                window.location.href = '/';
            }
        });

        // Mouse leave - cancel long press
        logo.addEventListener('mouseleave', function(e) {
            clearTimeout(pressTimer);
            logo.style.transform = 'scale(1)';
            isLongPress = false;
        });

        // Touch events for mobile
        logo.addEventListener('touchstart', function(e) {
            e.preventDefault();
            isLongPress = false;
            
            pressTimer = setTimeout(function() {
                isLongPress = true;
                logo.style.transform = 'scale(1.1)';
                logo.style.transition = 'transform 0.2s ease';
                
                setTimeout(() => {
                    window.open('https://rexyrex.github.io', '_blank');
                }, 100);
            }, 800);
        });

        logo.addEventListener('touchend', function(e) {
            clearTimeout(pressTimer);
            logo.style.transform = 'scale(1)';
            
            if (!isLongPress) {
                window.location.href = '/';
            }
        });

        logo.addEventListener('touchmove', function(e) {
            clearTimeout(pressTimer);
            logo.style.transform = 'scale(1)';
            isLongPress = false;
        });
    }

    // ===== CONTACT FORM ANIMATION (if form exists) =====
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('fade-in-up');
    });

    // ===== SECTION TITLE ANIMATION =====
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const titleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });



    // ===== EASTER EGG: KONAMI CODE =====
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

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

    const triggerEasterEgg = function() {
        // Create confetti effect
        const colors = ['#e8b4b8', '#d4949a', '#f5d7d7', '#f8e8e8'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: fall 3s linear forwards;
                `;
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
        
        // Show easter egg message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(232, 180, 184, 0.3);
            text-align: center;
            z-index: 10000;
            animation: fadeInUp 0.5s ease-out;
        `;
        message.innerHTML = `
            <h3 style="color: var(--deep-pink); margin-bottom: 1rem;">🎉 You found the secret!</h3>
            <p style="color: var(--text-light);">Thanks for exploring! Have a pizza slice on me! 🍕</p>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    };


});

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fall {
        from {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
        }
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
    }
`;
document.head.appendChild(style); 
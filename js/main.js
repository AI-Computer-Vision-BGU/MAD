// ============================================
// MAD - Maintenance Actions Dataset
// Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initStatCounter();
    initScrollAnimations();
    initScrollSpy();
});

// ============================================
// Navbar Scroll Effect
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Animated Stat Counter
// ============================================
function initStatCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.dataset.target);
                animateCounter(target, finalValue);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString() + '+';
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.news-card, .char-card, .stat-card, .download-card, .benchmark-card, .team-member'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ============================================
// Copy Bibtex to Clipboard
// ============================================
function copyBibtex() {
    const bibtex = document.querySelector('.citation-box code').textContent;
    navigator.clipboard.writeText(bibtex).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.background = '#28a745';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ============================================
// Scroll Spy - Highlight Active Navigation Link
// ============================================
function initScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Get nav sections in order (only sections with corresponding nav links)
    const navSections = ['about', 'stats', 'download', 'benchmark', 'team'];
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 150;
        
        let current = '';
        
        // Check each nav section
        for (let i = 0; i < navSections.length; i++) {
            const sectionId = navSections[i];
            const section = document.getElementById(sectionId);
            
            if (!section) continue;
            
            const sectionTop = section.offsetTop;
            
            // Get the next section's top (or page bottom)
            let nextSectionTop = document.body.scrollHeight;
            if (i + 1 < navSections.length) {
                const nextSection = document.getElementById(navSections[i + 1]);
                if (nextSection) {
                    nextSectionTop = nextSection.offsetTop;
                }
            }
            
            // If we're between this section and the next, this is current
            if (scrollPosition >= sectionTop && scrollPosition < nextSectionTop) {
                current = sectionId;
                break;
            }
        }
        
        // Handle hero/news area (before About - no active link)
        const aboutSection = document.getElementById('about');
        if (aboutSection && scrollPosition < aboutSection.offsetTop) {
            current = '';
        }
        
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update on scroll with throttling for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Update on load
    updateActiveLink();
}

// ============================================
// Video Wall Animation (if videos are added)
// ============================================
function initVideoWall() {
    const cells = document.querySelectorAll('.video-cell');
    
    cells.forEach((cell, index) => {
        // Add hover effect
        cell.addEventListener('mouseenter', () => {
            cell.style.transform = 'scale(1.1)';
            cell.style.zIndex = '10';
        });
        
        cell.addEventListener('mouseleave', () => {
            cell.style.transform = 'scale(1)';
            cell.style.zIndex = '1';
        });
    });
}


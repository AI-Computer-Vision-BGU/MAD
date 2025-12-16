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
    initHeroVideoCarousel();
    initExplorer();
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
            // Check if this is the "Million Frames" stat
            const label = element.nextElementSibling;
            if (label && label.textContent.includes('Million')) {
                element.textContent = target + 'M+';
            } else {
                element.textContent = target.toLocaleString() + '+';
            }
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
    const navSections = ['about', 'stats', 'explore', 'download', 'benchmark', 'team'];
    
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
// Hero Video Carousel - Cycles Through Dataset Videos
// ============================================
function initHeroVideoCarousel() {
    const videoElement = document.getElementById('hero-video');
    
    if (!videoElement) return;
    
    // List your video files here (add them to assets/videos/ folder)
    const videos = [
        'assets/videos/GH010195.MP4',
        'assets/videos/GH012499.MP4',
        'assets/videos/GH013456.MP4',
        'assets/videos/GH013926.MP4',
        'assets/videos/GH016142%281%29.MP4',  // URL encoded parentheses
        'assets/videos/GH016196.MP4',
        'assets/videos/GH016242.MP4',
        'assets/videos/GH016282.MP4',
        'assets/videos/GH017494.MP4',
        'assets/videos/GOPR4110.MP4',
        'assets/videos/plier.MP4',
        'assets/videos/screwdriver%281%29.MP4',  // URL encoded parentheses
        'assets/videos/uncover2hands.MP4'
    ];
    
    let currentVideoIndex = 0;
    
    // Function to load and play a video
    function loadVideo(index) {
        const videoSrc = videos[index];
        console.log('Loading video:', videoSrc);

        // Fade out
        videoElement.classList.add('fade-out');

        setTimeout(() => {
            // Remove old source and set new one
            videoElement.src = videoSrc;

            // Ensure video attributes are set for autoplay
            videoElement.muted = true;
            videoElement.playsInline = true;
            videoElement.loop = false; // We handle looping manually
            videoElement.preload = 'auto';
            videoElement.setAttribute('playsinline', '');
            videoElement.setAttribute('webkit-playsinline', '');

            // Handle load errors
            videoElement.onerror = (e) => {
                console.error('Video load error for:', videoSrc, e);
                // Try next video
                setTimeout(nextVideo, 500);
            };

            // When video can play, start it
            videoElement.oncanplay = () => {
                console.log('Video can play:', videoSrc);
                const playPromise = videoElement.play();

                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('Video playing:', videoSrc);
                        videoElement.classList.remove('fade-out');
                    }).catch(err => {
                        console.error('Video play error:', err);
                        // Try next video
                        setTimeout(nextVideo, 500);
                    });
                }
            };

            videoElement.load();
        }, 500); // Wait for fade out
    }
    
    // Function to move to next video
    function nextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        loadVideo(currentVideoIndex);
    }
    
    // Don't load first video - it's already set in HTML src attribute
    // Just ensure it can play
    videoElement.muted = true;
    videoElement.play().catch(function(e) {
        console.log('Initial play failed:', e);
    });
    
    // When video ends, move to next one
    videoElement.addEventListener('ended', function() {
        console.log('Video ended, moving to next');
        nextVideo();
    });
    
    // Change video every 4 seconds
    setInterval(function() {
        nextVideo();
    }, 4000);
    
    console.log('Hero video carousel initialized');
}

// ============================================
// Video Wall Animation (Legacy - if needed)
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

// ============================================
// Explorer Section - Dataset Visualization
// ============================================
function initExplorer() {
    const randomBtn = document.getElementById('explore-random');
    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');
    const imageContainer = document.getElementById('explore-image-container');
    const exploreImage = document.getElementById('explore-image');
    const annotationCanvas = document.getElementById('annotation-canvas');
    const imageCounter = document.getElementById('image-counter');
    const filterAction = document.getElementById('filter-action');
    const filterObject = document.getElementById('filter-object');
    const filterAnnotation = document.getElementById('filter-annotation');
    const annotationList = document.getElementById('annotation-list');
    const galleryGrid = document.getElementById('gallery-grid');
    
    // If explore elements don't exist, skip initialization
    if (!randomBtn) return;
    
    // State
    let currentImages = [];
    let currentIndex = 0;
    let annotations = {};
    
    // Sample data structure (replace with actual data loading)
    // This is the infrastructure - you'll connect this to your actual data
    const sampleData = {
        images: [
            // Example structure:
            // {
            //     id: 'frame_001',
            //     url: 'assets/explore/frame_001.jpg',
            //     video_id: 'GH010195',
            //     frame_num: 1234,
            //     action: 'assemble',
            //     participant: 'P01',
            //     annotations: [
            //         { type: 'bbox', label: 'screwdriver', coords: [100, 150, 200, 300], color: '#E94560' },
            //         { type: 'bbox', label: 'hand_left', coords: [250, 200, 350, 400], color: '#00D9FF' }
            //     ]
            // }
        ]
    };
    
    // Function to load data (placeholder - implement your data fetching logic)
    async function loadExplorerData() {
        // TODO: Implement actual data loading
        // Options:
        // 1. Load from JSON file: fetch('assets/explore/annotations.json')
        // 2. Load from external API
        // 3. Load from static JS file with data
        
        console.log('Explorer: Data loading not yet implemented');
        return sampleData;
    }
    
    // Function to filter images based on current selections
    function filterImages(data) {
        const actionFilter = filterAction.value;
        const objectFilter = filterObject.value;
        
        return data.images.filter(img => {
            const actionMatch = actionFilter === 'all' || img.action === actionFilter;
            const objectMatch = objectFilter === 'all' || img.annotations?.some(a => a.category === objectFilter);
            return actionMatch && objectMatch;
        });
    }
    
    // Function to display an image with annotations
    function displayImage(imageData) {
        if (!imageData) return;
        
        // Hide placeholder
        const placeholder = imageContainer.querySelector('.placeholder-message');
        if (placeholder) placeholder.style.display = 'none';
        
        // Show image
        exploreImage.src = imageData.url;
        exploreImage.style.display = 'block';
        
        // Update metadata
        document.getElementById('meta-video').textContent = imageData.video_id || '-';
        document.getElementById('meta-frame').textContent = imageData.frame_num || '-';
        document.getElementById('meta-action').textContent = imageData.action || '-';
        document.getElementById('meta-participant').textContent = imageData.participant || '-';
        
        // Draw annotations
        drawAnnotations(imageData.annotations || []);
        
        // Update annotation list
        updateAnnotationList(imageData.annotations || []);
        
        // Update counter
        imageCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
        
        // Update nav buttons
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === currentImages.length - 1;
    }
    
    // Function to draw annotations on canvas
    function drawAnnotations(annotations) {
        const ctx = annotationCanvas.getContext('2d');
        const annotationType = filterAnnotation.value;
        
        // Clear canvas
        ctx.clearRect(0, 0, annotationCanvas.width, annotationCanvas.height);
        
        if (annotationType === 'none') return;
        
        // Wait for image to load to get dimensions
        exploreImage.onload = () => {
            annotationCanvas.width = exploreImage.offsetWidth;
            annotationCanvas.height = exploreImage.offsetHeight;
            
            const scaleX = exploreImage.offsetWidth / exploreImage.naturalWidth;
            const scaleY = exploreImage.offsetHeight / exploreImage.naturalHeight;
            
            annotations.forEach(anno => {
                if (anno.type === 'bbox' && annotationType === 'bbox') {
                    drawBoundingBox(ctx, anno, scaleX, scaleY);
                } else if (anno.type === 'segmentation' && annotationType === 'segmentation') {
                    drawSegmentation(ctx, anno, scaleX, scaleY);
                } else if (anno.type === 'keypoints' && annotationType === 'hands') {
                    drawKeypoints(ctx, anno, scaleX, scaleY);
                }
            });
        };
    }
    
    function drawBoundingBox(ctx, anno, scaleX, scaleY) {
        const [x, y, w, h] = anno.coords;
        ctx.strokeStyle = anno.color || '#E94560';
        ctx.lineWidth = 3;
        ctx.strokeRect(x * scaleX, y * scaleY, w * scaleX, h * scaleY);
        
        // Label
        ctx.fillStyle = anno.color || '#E94560';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.fillText(anno.label, x * scaleX, y * scaleY - 5);
    }
    
    function drawSegmentation(ctx, anno, scaleX, scaleY) {
        if (!anno.polygon) return;
        
        ctx.fillStyle = (anno.color || '#E94560') + '40'; // 25% opacity
        ctx.strokeStyle = anno.color || '#E94560';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        anno.polygon.forEach((point, i) => {
            if (i === 0) {
                ctx.moveTo(point[0] * scaleX, point[1] * scaleY);
            } else {
                ctx.lineTo(point[0] * scaleX, point[1] * scaleY);
            }
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    
    function drawKeypoints(ctx, anno, scaleX, scaleY) {
        if (!anno.keypoints) return;
        
        ctx.fillStyle = anno.color || '#00D9FF';
        
        anno.keypoints.forEach(kp => {
            ctx.beginPath();
            ctx.arc(kp.x * scaleX, kp.y * scaleY, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    function updateAnnotationList(annotations) {
        if (annotations.length === 0) {
            annotationList.innerHTML = '<p class="no-annotations">No annotations</p>';
            return;
        }
        
        annotationList.innerHTML = annotations.map(anno => `
            <div class="annotation-item">
                <span class="annotation-color" style="background-color: ${anno.color || '#E94560'}"></span>
                <span>${anno.label}</span>
                <span style="color: var(--gray); font-size: 0.8rem">${anno.type}</span>
            </div>
        `).join('');
    }
    
    // Event Listeners
    randomBtn.addEventListener('click', async () => {
        const data = await loadExplorerData();
        currentImages = filterImages(data);
        
        if (currentImages.length === 0) {
            console.log('Explorer: No images match current filters (or no data loaded)');
            // Show message
            const placeholder = imageContainer.querySelector('.placeholder-message');
            if (placeholder) {
                placeholder.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <p>No images available yet</p>
                    <span class="coming-soon">Add images to assets/explore/ and annotations.json</span>
                `;
                placeholder.style.display = 'block';
            }
            return;
        }
        
        // Random starting point
        currentIndex = Math.floor(Math.random() * currentImages.length);
        displayImage(currentImages[currentIndex]);
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            displayImage(currentImages[currentIndex]);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < currentImages.length - 1) {
            currentIndex++;
            displayImage(currentImages[currentIndex]);
        }
    });
    
    // Re-draw annotations when filter changes
    filterAnnotation.addEventListener('change', () => {
        if (currentImages[currentIndex]) {
            drawAnnotations(currentImages[currentIndex].annotations || []);
        }
    });
    
    console.log('Explorer section initialized');
}


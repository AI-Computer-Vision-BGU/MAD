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
        'assets/videos/GH010195_web.mp4',
        'assets/videos/GH012499_web.mp4',
        'assets/videos/GH013456_web.mp4',
        'assets/videos/GH013926_web.mp4',
        'assets/videos/GH016142%281%29_web.mp4',  // URL encoded parentheses
        'assets/videos/GH016196_web.mp4',
        'assets/videos/GH016242_web.mp4',
        'assets/videos/GH016282_web.mp4',
        'assets/videos/GH017494_web.mp4',
        'assets/videos/GOPR4110_web.mp4',
        'assets/videos/plier_web.mp4',
        'assets/videos/screwdriver%281%29_web.mp4',  // URL encoded parentheses
        'assets/videos/uncover2hands_web.mp4'
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
            videoElement.preload = 'metadata';
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
    
    // Change video every 3 seconds
    setInterval(function() {
        nextVideo();
    }, 3000);
    
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
// Explorer Section - Dataset Visualization (COCO Format)
// ============================================
function initExplorer() {
    const randomBtn = document.getElementById('explore-random');
    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');
    const imageContainer = document.getElementById('explore-image-container');
    const exploreImage = document.getElementById('explore-image');
    const annotationCanvas = document.getElementById('annotation-canvas');
    const imageCounter = document.getElementById('image-counter');
    const filterCategory = document.getElementById('filter-category');
    const filterAnnotation = document.getElementById('filter-annotation');
    const annotationList = document.getElementById('annotation-list');
    const galleryGrid = document.getElementById('gallery-grid');
    
    if (!randomBtn) return;
    
    // State
    let cocoData = null;
    let categories = {};
    let annotationsByImage = {};
    let currentImages = [];
    let currentIndex = 0;
    
    // Color palette for categories
    const colors = [
        '#E94560', '#00D9FF', '#4CAF50', '#FF9800', '#9C27B0',
        '#00BCD4', '#FFEB3B', '#795548', '#607D8B', '#E91E63',
        '#3F51B5', '#8BC34A', '#FF5722', '#673AB7', '#009688'
    ];
    
    // Load COCO format data
    async function loadExplorerData() {
        if (cocoData) return cocoData;
        
        try {
            const response = await fetch('assets/explore/annotations_sample.json');
            cocoData = await response.json();
            
            // Build category lookup
            cocoData.categories.forEach((cat, i) => {
                categories[cat.id] = {
                    ...cat,
                    color: colors[i % colors.length]
                };
            });
            
            // Build annotations by image lookup
            cocoData.annotations.forEach(anno => {
                if (!annotationsByImage[anno.image_id]) {
                    annotationsByImage[anno.image_id] = [];
                }
                annotationsByImage[anno.image_id].push(anno);
            });
            
            // Populate category filter
            populateCategoryFilter();
            
            console.log('Explorer: Loaded', cocoData.images.length, 'images');
            return cocoData;
        } catch (err) {
            console.error('Explorer: Failed to load data', err);
            return null;
        }
    }
    
    function populateCategoryFilter() {
        filterCategory.innerHTML = '<option value="all">All Categories</option>';
        cocoData.categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            filterCategory.appendChild(option);
        });
    }
    
    function filterImages() {
        const categoryFilter = filterCategory.value;
        
        if (categoryFilter === 'all') {
            return [...cocoData.images];
        }
        
        // Filter images that have annotations with this category
        const catId = parseInt(categoryFilter);
        return cocoData.images.filter(img => {
            const annos = annotationsByImage[img.id] || [];
            return annos.some(a => a.category_id === catId);
        });
    }
    
    function displayImage(imageData) {
        if (!imageData) return;
        
        const placeholder = imageContainer.querySelector('.placeholder-message');
        if (placeholder) placeholder.style.display = 'none';
        
        // Build image URL (use images_sample for web demo)
        const imageUrl = `assets/explore/images_sample/${imageData.file_name}`;
        exploreImage.src = imageUrl;
        exploreImage.style.display = 'block';
        
        // Update metadata
        document.getElementById('meta-id').textContent = imageData.id;
        document.getElementById('meta-filename').textContent = imageData.file_name;
        document.getElementById('meta-size').textContent = `${imageData.width} × ${imageData.height}`;
        
        // Get annotations for this image
        const imageAnnotations = annotationsByImage[imageData.id] || [];
        
        // Draw annotations when image loads
        exploreImage.onload = () => {
            drawAnnotations(imageAnnotations, imageData);
        };
        
        // Update annotation list
        updateAnnotationList(imageAnnotations);
        
        // Update counter
        imageCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
        
        // Update nav buttons
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === currentImages.length - 1;
    }
    
    function drawAnnotations(annotations, imageData) {
        const ctx = annotationCanvas.getContext('2d');
        const annotationType = filterAnnotation.value;
        
        // Get the actual rendered size and position of the image
        const imgRect = exploreImage.getBoundingClientRect();
        const containerRect = imageContainer.getBoundingClientRect();
        
        // Position canvas exactly over the image
        annotationCanvas.style.left = (imgRect.left - containerRect.left) + 'px';
        annotationCanvas.style.top = (imgRect.top - containerRect.top) + 'px';
        annotationCanvas.width = imgRect.width;
        annotationCanvas.height = imgRect.height;
        
        ctx.clearRect(0, 0, annotationCanvas.width, annotationCanvas.height);
        
        if (annotationType === 'none') return;
        
        const scaleX = imgRect.width / imageData.width;
        const scaleY = imgRect.height / imageData.height;
        
        annotations.forEach(anno => {
            const cat = categories[anno.category_id] || { name: 'unknown', color: '#E94560' };
            
            if (annotationType === 'both') {
                // Draw both segmentation and bounding box
                if (anno.segmentation && anno.segmentation.length > 0) {
                    drawSegmentation(ctx, anno.segmentation, cat, scaleX, scaleY);
                }
                if (anno.bbox && anno.bbox.length === 4) {
                    drawBoundingBox(ctx, anno.bbox, cat, scaleX, scaleY);
                }
            } else if (annotationType === 'segmentation' && anno.segmentation && anno.segmentation.length > 0) {
                drawSegmentation(ctx, anno.segmentation, cat, scaleX, scaleY);
            } else if (annotationType === 'bbox' && anno.bbox && anno.bbox.length === 4) {
                drawBoundingBox(ctx, anno.bbox, cat, scaleX, scaleY);
            }
        });
    }
    
    function drawBoundingBox(ctx, bbox, cat, scaleX, scaleY) {
        const [x, y, w, h] = bbox;
        ctx.strokeStyle = cat.color;
        ctx.lineWidth = 3;
        ctx.strokeRect(x * scaleX, y * scaleY, w * scaleX, h * scaleY);
        
        // Label background
        ctx.fillStyle = cat.color;
        const labelText = cat.name;
        ctx.font = 'bold 12px Inter, sans-serif';
        const textWidth = ctx.measureText(labelText).width;
        ctx.fillRect(x * scaleX, y * scaleY - 18, textWidth + 8, 18);
        
        // Label text
        ctx.fillStyle = 'white';
        ctx.fillText(labelText, x * scaleX + 4, y * scaleY - 5);
    }
    
    function drawSegmentation(ctx, segmentation, cat, scaleX, scaleY) {
        segmentation.forEach(seg => {
            // seg is array of points: [[x1,y1], [x2,y2], ...] or [x1,y1,x2,y2,...]
            let points = [];
            
            if (Array.isArray(seg[0])) {
                // Format: [[x1,y1], [x2,y2], ...]
                points = seg;
            } else {
                // Format: [x1,y1,x2,y2,...] - convert to pairs
                for (let i = 0; i < seg.length; i += 2) {
                    points.push([seg[i], seg[i + 1]]);
                }
            }
            
            if (points.length < 3) return;
            
            ctx.fillStyle = cat.color + '50'; // 30% opacity
            ctx.strokeStyle = cat.color;
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            ctx.moveTo(points[0][0] * scaleX, points[0][1] * scaleY);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i][0] * scaleX, points[i][1] * scaleY);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        });
    }
    
    function updateAnnotationList(annotations) {
        if (annotations.length === 0) {
            annotationList.innerHTML = '<p class="no-annotations">No annotations</p>';
            return;
        }
        
        // Get unique categories only
        const uniqueCategories = [...new Set(annotations.map(anno => anno.category_id))];
        annotationList.innerHTML = uniqueCategories.map(catId => {
            const cat = categories[catId] || { name: 'unknown', color: '#E94560' };
            return `
                <div class="annotation-item">
                    <span class="annotation-color" style="background-color: ${cat.color}"></span>
                    <span>${cat.name}</span>
                </div>
            `;
        }).join('');
    }
    
    // Populate gallery with thumbnails
    function populateGallery(images) {
        galleryGrid.innerHTML = '';
        const thumbs = images.slice(0, 6);
        
        thumbs.forEach((img, i) => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `<img src="assets/explore/images_sample/${img.file_name}" alt="Sample ${i + 1}">`;
            div.addEventListener('click', () => {
                currentIndex = i;
                displayImage(currentImages[currentIndex]);
            });
            galleryGrid.appendChild(div);
        });
    }
    
    // Event Listeners
    randomBtn.addEventListener('click', async () => {
        const data = await loadExplorerData();
        if (!data) {
            const placeholder = imageContainer.querySelector('.placeholder-message');
            if (placeholder) {
                placeholder.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Failed to load annotations</p>
                `;
                placeholder.style.display = 'block';
            }
            return;
        }
        
        currentImages = filterImages();
        
        if (currentImages.length === 0) {
            return;
        }
        
        // Random starting point
        currentIndex = Math.floor(Math.random() * currentImages.length);
        displayImage(currentImages[currentIndex]);
        populateGallery(currentImages);
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
    
    filterAnnotation.addEventListener('change', () => {
        if (currentImages[currentIndex]) {
            const imageData = currentImages[currentIndex];
            const imageAnnotations = annotationsByImage[imageData.id] || [];
            drawAnnotations(imageAnnotations, imageData);
        }
    });
    
    filterCategory.addEventListener('change', async () => {
        const data = await loadExplorerData();
        if (!data) return;
        
        currentImages = filterImages();
        if (currentImages.length > 0) {
            currentIndex = 0;
            displayImage(currentImages[currentIndex]);
            populateGallery(currentImages);
        }
    });
    
    console.log('Explorer section initialized');
}


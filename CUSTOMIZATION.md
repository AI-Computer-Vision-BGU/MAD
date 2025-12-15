# Customization Guide

Quick reference for customizing the MAD project page.

## 📊 Update Statistics

In `index.html`, find the stats cards and update `data-target`:

```html
<div class="stat-number" data-target="100">0</div>  <!-- Hours -->
<div class="stat-number" data-target="1000">0</div> <!-- Segments -->
<div class="stat-number" data-target="50">0</div>   <!-- Participants -->
<div class="stat-number" data-target="150">0</div>  <!-- Classes -->
```

## 📰 Update News Items

Replace the news cards:

```html
<div class="news-card featured">
    <div class="news-date">Dec 2024</div>
    <div class="news-content">
        <h3>Your Headline</h3>
        <p>Your news text here.</p>
    </div>
</div>
```

## 👥 Add Team Members

### Principal Investigator:
```html
<div class="team-member pi">
    <div class="member-photo">
        <img src="assets/team/pi-name.jpg" alt="PI Name">
    </div>
    <div class="member-info">
        <h3>Prof. Full Name</h3>
        <span class="member-role">Principal Investigator</span>
        <span class="member-affiliation">Ben-Gurion University</span>
        <div class="member-links">
            <a href="https://website.com"><i class="fas fa-globe"></i></a>
            <a href="https://scholar.google.com"><i class="fab fa-google-scholar"></i></a>
            <a href="https://linkedin.com"><i class="fab fa-linkedin"></i></a>
        </div>
    </div>
</div>
```

### Regular Team Member:
```html
<div class="team-member">
    <div class="member-photo">
        <img src="assets/team/member-name.jpg" alt="Member Name">
    </div>
    <div class="member-info">
        <h3>Full Name</h3>
        <span class="member-role">PhD Student</span>
        <span class="member-affiliation">Ben-Gurion University</span>
    </div>
</div>
```

**Photo Requirements:**
- Size: 400x400px minimum
- Format: JPG or PNG
- Location: `assets/team/`
- Naming: `firstname-lastname.jpg`

## 📚 Update Citation

Replace in the Download section:

```html
<div class="citation-box">
    <pre><code>@article{yourname2024mad,
    title={MAD: Maintenance Actions Dataset for Egocentric Video Understanding},
    author={Your Name and Co-Author Name},
    journal={Conference/Journal Name},
    year={2024},
    volume={XX},
    pages={XX--XX}
}</code></pre>
    <button class="copy-btn" onclick="copyBibtex()">
        <i class="fas fa-copy"></i> Copy
    </button>
</div>
```

## 📥 Add Download Links

Update download cards:

```html
<!-- Video Data -->
<a href="https://actual-download-url.com/videos.zip" class="download-btn">
    <i class="fas fa-download"></i> Download
</a>

<!-- Annotations -->
<a href="https://github.com/AI-Computer-Vision-BGU/MAD-annotations" class="download-btn">
    <i class="fas fa-download"></i> Download
</a>

<!-- Code Repository -->
<a href="https://github.com/AI-Computer-Vision-BGU/MAD" class="download-btn" target="_blank">
    <i class="fab fa-github"></i> Repository
</a>
```

## 📊 Add Visualizations

Replace figure placeholders:

```html
<!-- Before -->
<div class="figure-placeholder">
    <div class="figure-icon"><i class="fas fa-chart-pie"></i></div>
    <p>Action Distribution Chart</p>
</div>

<!-- After -->
<div class="figure-image">
    <img src="assets/figures/action-distribution.png" alt="Action Distribution">
    <p class="figure-caption">Distribution of action classes in MAD</p>
</div>
```

Add this CSS for image figures:

```css
.figure-image {
    text-align: center;
}

.figure-image img {
    max-width: 100%;
    border-radius: 12px;
    box-shadow: var(--shadow-md);
}

.figure-caption {
    margin-top: 12px;
    color: var(--gray);
    font-size: 0.9rem;
}
```

## 🎨 Change Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    /* Primary color (buttons, accents) */
    --primary: #e94560;        /* Current: Red */
    --primary-dark: #c73e54;
    
    /* Secondary color (headers) */
    --secondary: #0f3460;      /* Current: Dark Blue */
    --secondary-light: #16213e;
    
    /* Background colors */
    --dark: #1a1a2e;          /* Current: Very Dark Blue */
    --light: #f5f5f7;         /* Current: Light Gray */
    
    /* Accent color */
    --accent: #ffc107;        /* Current: Yellow */
}
```

**Color Scheme Suggestions:**

**Blue/Teal:**
```css
--primary: #00bcd4;
--secondary: #0277bd;
```

**Green/Nature:**
```css
--primary: #4caf50;
--secondary: #1b5e20;
```

**Purple/Tech:**
```css
--primary: #9c27b0;
--secondary: #4a148c;
```

## 🎬 Add Video Wall

Replace gradient cells with videos:

```html
<div class="video-cell">
    <video autoplay muted loop playsinline>
        <source src="assets/videos/sample1.mp4" type="video/mp4">
    </video>
    <div class="video-overlay">
        <span class="video-label">tighten bolt</span>
    </div>
</div>
```

Add CSS for video overlay:

```css
.video-cell {
    position: relative;
}

.video-cell video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.video-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.8));
    padding: 20px 10px 10px;
}

.video-label {
    color: white;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: lowercase;
}
```

## 🏆 Add Benchmark Tasks

Modify or add new benchmark cards:

```html
<div class="benchmark-card">
    <div class="benchmark-header">
        <h3>Your Task Name</h3>
        <span class="task-badge">Task X</span>
    </div>
    <div class="benchmark-body">
        <p><strong>Task:</strong> Description of the task.</p>
        <p><strong>Metrics:</strong> Evaluation metrics.</p>
    </div>
    <div class="benchmark-links">
        <a href="#" class="bench-link"><i class="fas fa-rocket"></i> Get Started</a>
        <a href="#" class="bench-link"><i class="fas fa-trophy"></i> Leaderboard</a>
    </div>
</div>
```

## 💰 Update Funding

In the Team section:

```html
<div class="funding-section">
    <h3>Research Funding</h3>
    <p>This research was supported by:</p>
    <ul class="funding-list">
        <li>Israel Science Foundation (ISF) Grant #12345</li>
        <li>BGU Research Authority</li>
        <li>European Research Council (ERC)</li>
    </ul>
</div>
```

## 📱 Test Responsive Design

Check on different devices:
- Desktop: 1920px, 1440px, 1024px
- Tablet: 768px
- Mobile: 375px, 414px

Use browser DevTools (F12) → Device Toolbar

## 🔍 SEO Optimization

Add to `<head>` in `index.html`:

```html
<meta name="description" content="MAD - Maintenance Actions Dataset: A large-scale egocentric video dataset for maintenance and repair action recognition.">
<meta name="keywords" content="egocentric vision, maintenance, action recognition, dataset, computer vision">
<meta name="author" content="AI-Computer-Vision-BGU">

<!-- Open Graph / Social Media -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://ai-computer-vision-bgu.github.io/MAD/">
<meta property="og:title" content="MAD - Maintenance Actions Dataset">
<meta property="og:description" content="Large-scale egocentric dataset for maintenance action recognition">
<meta property="og:image" content="https://ai-computer-vision-bgu.github.io/MAD/assets/preview.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://ai-computer-vision-bgu.github.io/MAD/">
<meta property="twitter:title" content="MAD - Maintenance Actions Dataset">
<meta property="twitter:description" content="Large-scale egocentric dataset for maintenance action recognition">
<meta property="twitter:image" content="https://ai-computer-vision-bgu.github.io/MAD/assets/preview.jpg">
```

## Need Help?

Open an issue on GitHub or contact the team.


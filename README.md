# MAD - Maintenance Actions Dataset

Project page for the Maintenance Actions Dataset (MAD) - an egocentric video dataset for maintenance and repair actions.

## 🚀 Quick Start

### Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

### Deploy to GitHub Pages

1. **Create a new repository** in the `AI-Computer-Vision-BGU` organization:
   - Go to https://github.com/organizations/AI-Computer-Vision-BGU/repositories/new
   - Name it: `MAD` (or `maintenance-actions-dataset`)
   - Make it public

2. **Push this code:**
   ```bash
   cd /Users/saeednaamneh/Desktop/MaintenanceActions
   git init
   git add .
   git commit -m "Initial commit: MAD project page"
   git branch -M main
   git remote add origin https://github.com/AI-Computer-Vision-BGU/MAD.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `main`, folder: `/ (root)`
   - Save

4. **Your site will be live at:**
   ```
   https://ai-computer-vision-bgu.github.io/MAD/
   ```

## 📁 Project Structure

```
MaintenanceActions/
├── index.html          # Main page
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # JavaScript functionality
├── assets/
│   ├── team/           # Team member photos
│   ├── figures/        # Dataset statistics/visualizations
│   └── videos/         # Sample video thumbnails
└── README.md           # This file
```

## ✏️ Customization Guide

### 1. Update Dataset Info

In `index.html`, update these sections:

- **Hero section**: Change title, tagline, badges
- **Stats cards**: Update the `data-target` attributes:
  ```html
  <div class="stat-number" data-target="YOUR_NUMBER">0</div>
  ```

### 2. Add Team Members

Replace the placeholder team members in the Team section:

```html
<div class="team-member">
    <div class="member-photo">
        <img src="assets/team/name.jpg" alt="Name">
    </div>
    <div class="member-info">
        <h3>Full Name</h3>
        <span class="member-role">Role (PhD Student, etc.)</span>
        <span class="member-affiliation">Ben-Gurion University</span>
    </div>
</div>
```

### 3. Update Citation

Replace the BibTeX citation in the download section with your paper's actual citation.

### 4. Add Figures/Charts

Replace the placeholder figures in the Stats section with actual images:

```html
<div class="figure-placeholder">
    <img src="assets/figures/distribution.png" alt="Action Distribution">
</div>
```

### 5. Update Download Links

Add actual download links for:
- Video data
- Annotations
- GitHub repository links

### 6. Add Video Wall (Optional)

Replace the gradient backgrounds in `.video-cell` with actual video thumbnails or videos:

```html
<div class="video-cell">
    <video autoplay muted loop>
        <source src="assets/videos/sample1.mp4" type="video/mp4">
    </video>
    <span class="video-label">action name</span>
</div>
```

## 🎨 Color Scheme

The current theme uses an industrial/technical color palette:

| Variable | Color | Usage |
|----------|-------|-------|
| `--primary` | #e94560 | Accent, buttons, highlights |
| `--secondary` | #0f3460 | Dark blue for headers |
| `--dark` | #1a1a2e | Dark backgrounds |

To change colors, edit the CSS variables in `css/style.css`:

```css
:root {
    --primary: #YOUR_COLOR;
    --secondary: #YOUR_COLOR;
    /* ... */
}
```

## 📱 Responsive Design

The page is fully responsive:
- Desktop: Full layout
- Tablet: Adjusted grids
- Mobile: Single column, hamburger menu

## 🔧 Dependencies

External resources (loaded via CDN):
- Google Fonts: Bebas Neue, Source Sans 3
- Font Awesome 6.4.0 (icons)

No npm/node dependencies required.

## 📄 License

The website code is available for use. The dataset itself should be licensed under CC BY-NC 4.0 (as shown in footer).

---

**Need help?** Contact the team or open an issue on GitHub.


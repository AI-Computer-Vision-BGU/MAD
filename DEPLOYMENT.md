# Deployment Guide

## Step-by-Step Deployment to GitHub Pages

### 1. Prepare Your Content

Before deploying, customize the following:

#### Required Updates:
- [ ] Update dataset statistics in `index.html` (stat-number data-target values)
- [ ] Add your team member information in the Team section
- [ ] Update the BibTeX citation with your paper details
- [ ] Add actual download links for dataset/annotations
- [ ] Replace placeholder images in `assets/team/` folder

#### Optional Enhancements:
- [ ] Add dataset visualizations to `assets/figures/`
- [ ] Add sample video thumbnails to `assets/videos/`
- [ ] Update color scheme in CSS variables if desired
- [ ] Add your university/lab logo

### 2. Create GitHub Repository

```bash
# Navigate to project directory
cd /Users/saeednaamneh/Desktop/MaintenanceActions

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: MAD dataset project page"

# Rename branch to main
git branch -M main
```

### 3. Push to GitHub Organization

**Option A: Using GitHub CLI (recommended)**
```bash
# Install gh if not installed: brew install gh

# Login to GitHub
gh auth login

# Create repository in organization
gh repo create AI-Computer-Vision-BGU/MAD --public --source=. --remote=origin --push

# Or if repository already exists:
git remote add origin https://github.com/AI-Computer-Vision-BGU/MAD.git
git push -u origin main
```

**Option B: Manual Method**
1. Go to https://github.com/organizations/AI-Computer-Vision-BGU/repositories/new
2. Repository name: `MAD` (or `maintenance-actions-dataset`)
3. Description: "Maintenance Actions Dataset - Project Page"
4. Make it **Public**
5. Do NOT initialize with README (you already have one)
6. Click "Create repository"

Then push:
```bash
git remote add origin https://github.com/AI-Computer-Vision-BGU/MAD.git
git push -u origin main
```

### 4. Enable GitHub Pages

#### Via GitHub Web Interface:
1. Go to your repository: `https://github.com/AI-Computer-Vision-BGU/MAD`
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source":
   - Select branch: `main`
   - Select folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment

Your site will be available at:
```
https://ai-computer-vision-bgu.github.io/MAD/
```

#### Via GitHub CLI:
```bash
gh repo edit --enable-pages --pages-branch main --pages-path /
```

### 5. Verify Deployment

After 1-2 minutes, visit your site:
```
https://ai-computer-vision-bgu.github.io/MAD/
```

Check that:
- [ ] All sections load correctly
- [ ] Navigation works on mobile
- [ ] Images load (if you added any)
- [ ] Download links work
- [ ] External links open in new tabs

### 6. Custom Domain (Optional)

If you have a custom domain:

1. Add DNS records at your domain provider:
   ```
   Type: CNAME
   Name: mad (or www)
   Value: ai-computer-vision-bgu.github.io
   ```

2. Update the `CNAME` file:
   ```bash
   echo "mad.yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

3. In GitHub Settings → Pages, add your custom domain and enable HTTPS

### 7. Future Updates

To update the site:

```bash
# Make your changes to files
# Then:
git add .
git commit -m "Update: description of changes"
git push

# Site will automatically rebuild in 1-2 minutes
```

## Troubleshooting

### Site not loading?
- Wait 2-3 minutes after first deployment
- Check repository Settings → Pages shows green checkmark
- Check Actions tab for build errors

### Images not loading?
- Ensure paths are relative: `assets/team/photo.jpg` not `/assets/team/photo.jpg`
- Image files must be committed to git
- Check file names are case-sensitive

### CSS/JS not loading?
- Check browser console for errors
- Verify paths in `index.html` are correct
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Mobile menu not working?
- Ensure JavaScript is enabled
- Check browser console for errors
- Try hard refresh

## Advanced: GitHub Actions Auto-Deploy

The site auto-deploys on push to `main`. To customize:

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

## Contact

For issues with the website code, open an issue on the GitHub repository.


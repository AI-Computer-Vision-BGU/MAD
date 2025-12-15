# ✅ Pre-Deployment Checklist

Before deploying your MAD project page, go through this checklist:

## 📊 Content Updates

### Critical (Must Do):
- [ ] Update dataset statistics in About section (lines with `data-target`)
  - Hours of video
  - Action segments
  - Participants
  - Action classes

- [ ] Update BibTeX citation in Download section
  - Author names
  - Paper title
  - Conference/Journal
  - Year, volume, pages

- [ ] Add team members in Team section
  - Replace placeholder with real names
  - Update roles (PI, PhD, MSc, etc.)
  - Add affiliations

- [ ] Update download links
  - Video data link
  - Annotations link
  - Code repository link

- [ ] Update news items with your announcements

### Important (Should Do):
- [ ] Add team member photos to `assets/team/`
  - Format: `firstname-lastname.jpg`
  - Size: 400x400px minimum
  - Update `<img>` src attributes

- [ ] Customize About section text
  - Dataset description
  - Unique characteristics
  - Research focus

- [ ] Update hero section
  - Title (keep or modify "MAINTENANCE ACTIONS DATASET")
  - Tagline
  - Badges

- [ ] Update funding sources in Team section

### Optional (Nice to Have):
- [ ] Add dataset visualizations to `assets/figures/`
- [ ] Replace gradient video wall with actual videos
- [ ] Customize color scheme in CSS
- [ ] Add custom logo
- [ ] Add benchmark/challenge details
- [ ] Setup custom domain (CNAME file)

## 🔗 Link Verification

- [ ] GitHub organization correct: `AI-Computer-Vision-BGU`
- [ ] Repository name decided: `MAD` or `maintenance-actions-dataset`
- [ ] All external links use `target="_blank"`
- [ ] Email addresses updated in footer
- [ ] Social media links added (if any)

## 📱 Testing

- [ ] Open `index.html` in browser
- [ ] Test navigation menu
- [ ] Test mobile hamburger menu
- [ ] Click all internal links (smooth scroll works)
- [ ] Click all external links (open in new tab)
- [ ] Test copy BibTeX button
- [ ] Check on mobile device or DevTools
- [ ] Verify no console errors (F12)

## 🎨 Visual Check

- [ ] All images load properly
- [ ] No placeholder text remains
- [ ] Stats counter animates on scroll
- [ ] Cards have hover effects
- [ ] Footer displays correctly
- [ ] Colors look professional
- [ ] Typography is readable

## 🚀 Pre-Deployment

- [ ] Review `DEPLOYMENT.md` instructions
- [ ] Ensure you have GitHub organization access
- [ ] Create repository in `AI-Computer-Vision-BGU`
- [ ] Or prepare to use `quick-deploy.sh` script

## 📝 Quick Customization Commands

### Update Stats:
Search for: `data-target=""`
Files: `index.html`

### Update Team:
Search for: `<div class="team-member"`
Files: `index.html`

### Update Citation:
Search for: `@article{`
Files: `index.html`

### Update Colors:
Search for: `:root {`
Files: `css/style.css`

## 🎯 Deployment Steps

Once checklist is complete:

```bash
# Option 1: Use quick deploy script
cd /Users/saeednaamneh/Desktop/MaintenanceActions
./quick-deploy.sh

# Option 2: Manual deployment
git init
git add .
git commit -m "Initial commit: MAD project page"
git remote add origin https://github.com/AI-Computer-Vision-BGU/MAD.git
git push -u origin main
```

Then:
1. Go to GitHub repo Settings → Pages
2. Select branch: `main`, folder: `/`
3. Save and wait 1-2 minutes
4. Visit: `https://ai-computer-vision-bgu.github.io/MAD/`

## ⚠️ Common Issues

**Images not loading?**
- Use relative paths: `assets/team/photo.jpg`
- Check file names (case-sensitive)
- Ensure files are committed to git

**Menu not working?**
- Check JavaScript console for errors
- Ensure `js/main.js` is loaded

**Styling broken?**
- Check `css/style.css` path in HTML
- Clear browser cache (Cmd+Shift+R)

## 📞 Need Help?

Refer to these files:
- `CUSTOMIZATION.md` - How to change content
- `DEPLOYMENT.md` - Deployment instructions
- `PROJECT_SUMMARY.md` - Complete overview

---

**Once deployed, share your dataset with the world! 🎉**


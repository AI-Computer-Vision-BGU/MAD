#!/bin/bash

# MAD Dataset - Quick Deployment Script
# This script helps you deploy to GitHub Pages quickly

set -e

echo "🔧 MAD Dataset - Quick Deployment to GitHub Pages"
echo "=================================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
    git branch -M main
else
    echo "✓ Git repository already initialized"
fi

# Get organization and repo name
read -p "Enter GitHub organization name [AI-Computer-Vision-BGU]: " ORG
ORG=${ORG:-AI-Computer-Vision-BGU}

read -p "Enter repository name [MAD]: " REPO
REPO=${REPO:-MAD}

REMOTE_URL="https://github.com/$ORG/$REPO.git"

echo ""
echo "📍 Repository: $REMOTE_URL"
echo ""

# Check if remote exists
if git remote | grep -q "^origin$"; then
    echo "✓ Remote 'origin' already exists"
    CURRENT_REMOTE=$(git remote get-url origin)
    echo "  Current: $CURRENT_REMOTE"
    read -p "Do you want to update it? [y/N]: " UPDATE_REMOTE
    if [[ $UPDATE_REMOTE =~ ^[Yy]$ ]]; then
        git remote set-url origin $REMOTE_URL
        echo "✓ Remote updated"
    fi
else
    echo "📡 Adding remote 'origin'..."
    git remote add origin $REMOTE_URL
fi

echo ""
read -p "Have you customized the content (team, stats, etc.)? [y/N]: " CUSTOMIZED
if [[ ! $CUSTOMIZED =~ ^[Yy]$ ]]; then
    echo ""
    echo "⚠️  Please customize your content first!"
    echo "   See CUSTOMIZATION.md for details"
    echo ""
    read -p "Continue anyway? [y/N]: " CONTINUE
    if [[ ! $CONTINUE =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled. Customize your content and run this script again."
        exit 0
    fi
fi

echo ""
echo "📝 Staging all files..."
git add .

echo "💾 Creating commit..."
read -p "Enter commit message [Initial commit: MAD project page]: " COMMIT_MSG
COMMIT_MSG=${COMMIT_MSG:-Initial commit: MAD project page}
git commit -m "$COMMIT_MSG" || echo "Nothing to commit"

echo ""
echo "🚀 Pushing to GitHub..."
read -p "Push to main branch? [Y/n]: " PUSH_CONFIRM
if [[ ! $PUSH_CONFIRM =~ ^[Nn]$ ]]; then
    git push -u origin main
    echo ""
    echo "✓ Successfully pushed to GitHub!"
    echo ""
    echo "=================================================="
    echo "🎉 Deployment Complete!"
    echo "=================================================="
    echo ""
    echo "Next steps:"
    echo "1. Go to: https://github.com/$ORG/$REPO/settings/pages"
    echo "2. Under 'Source', select:"
    echo "   - Branch: main"
    echo "   - Folder: / (root)"
    echo "3. Click Save"
    echo ""
    echo "Your site will be available at:"
    echo "🌐 https://$(echo $ORG | tr '[:upper:]' '[:lower:]').github.io/$REPO/"
    echo ""
    echo "Allow 1-2 minutes for the first deployment."
else
    echo "Push cancelled. You can push manually with: git push -u origin main"
fi


# Quick Start - Deploy to GitHub Pages

## 🚀 5-Minute Deployment Guide

### Step 1: Determine Your GitHub Pages Type

**Choose ONE:**

- **Option A**: User/Org Page → Repository name: `yourusername.github.io`  
  ✅ Keep `next.config.js` as-is (no changes needed)

- **Option B**: Project Page → Repository name: any name (e.g., `vylor`)  
  ⚠️ Must uncomment basePath in `next.config.js`:
  ```javascript
  basePath: '/vylor',  // Use your repo name
  assetPrefix: '/vylor/',
  ```

### Step 2: Push to GitHub

```bash
# If not already on GitHub
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### Step 3: Enable GitHub Pages

1. Go to GitHub repository → **Settings** → **Pages**
2. Under "Build and deployment" → **Source**: Select **GitHub Actions**
3. Done! ✨

### Step 4: Wait & Access

- Check **Actions** tab for deployment progress (~2-3 min)
- Access your site at:
  - User page: `https://yourusername.github.io/`
  - Project page: `https://yourusername.github.io/vylor/`

---

## 📝 What Was Set Up For You

✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)  
✅ Next.js configured for static export  
✅ `.nojekyll` file to prevent Jekyll processing  
✅ Automatic deployments on every push to `main`

## 🔧 Common Issues

**Assets not loading?**  
→ Check basePath in `next.config.js` matches your setup

**Permission error?**  
→ Settings → Actions → General → Enable "Read and write permissions"

---

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)


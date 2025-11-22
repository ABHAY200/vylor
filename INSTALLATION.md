# Installation & Deployment Guide

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** version 18.0.0 or higher
- **npm** (comes with Node.js) or **yarn**

### Check Your Node Version
```bash
node --version
```

If you need to install or update Node.js, visit: https://nodejs.org/

## 🚀 Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd /Users/abhay/Sandbox/Vylor
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- All other dependencies

**Expected time**: 2-5 minutes (depending on internet speed)

### Step 3: Verify Installation

Check if installation was successful:

```bash
npm list next react framer-motion
```

You should see the installed versions.

## 🖥️ Development

### Start Development Server

```bash
npm run dev
```

**Output should show**:
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

✓ Ready in 2.5s
```

### View Your Site

Open your browser and go to:
**http://localhost:3000**

### Hot Reload

Any changes you make to the code will automatically update in the browser!

## 🏗️ Building for Production

### Create Production Build

```bash
npm run build
```

This will:
1. Compile TypeScript
2. Build React components
3. Optimize CSS
4. Generate static HTML
5. Create the `out/` folder

**Expected time**: 30-60 seconds

### Test Production Build Locally

After building, you can test the static files:

```bash
# Install a simple HTTP server (if you don't have one)
npm install -g serve

# Serve the out directory
serve out
```

Then visit: **http://localhost:3000**

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - FREE)

**Why Vercel?**
- Made by Next.js creators
- Zero configuration
- Automatic HTTPS
- Global CDN
- Free tier available

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"
   - Done! Your site is live!

**Your site will be at**: `your-project-name.vercel.app`

### Option 2: Netlify (FREE)

1. **Build the site**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `out/` folder
   - Done!

**Or use Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=out
```

### Option 3: GitHub Pages (FREE)

1. **Build the site**
   ```bash
   npm run build
   ```

2. **Setup GitHub Pages**
   - Push the `out/` folder to a `gh-pages` branch
   - Enable GitHub Pages in repository settings
   - Your site will be at: `username.github.io/repository-name`

### Option 4: Any Web Host

The `out/` folder contains pure static HTML/CSS/JS. You can upload it to:
- AWS S3 + CloudFront
- Google Cloud Storage
- DigitalOcean
- Hostinger
- Bluehost
- Any hosting service

Just upload the contents of the `out/` folder to your web host's public directory.

## 🔧 Customization Before Deploy

### 1. Update Contact Information

Edit `app/page.tsx`:

**Email** (around line 475):
```typescript
<li>Email: info@vylor.com</li>  // Change this
```

**Phone** (around line 476):
```typescript
<li>Phone: +1 (555) 123-4567</li>  // Change this
```

**Social Links** (around line 411):
```typescript
<a href="#" className="...">Instagram</a>  // Add your Instagram URL
<a href="#" className="...">Twitter</a>     // Add your Twitter URL
<a href="#" className="...">Facebook</a>    // Add your Facebook URL
```

### 2. Update Metadata

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Vylor - The Visionary Tailor',
  description: 'Premium clothing brand...',  // Customize this
  keywords: 'fashion, clothing...',           // Add your keywords
}
```

### 3. Add Google Analytics (Optional)

In `app/layout.tsx`, add before the closing `</body>` tag:

```typescript
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `,
  }}
/>
```

## 📊 Performance Checklist

Before deploying, verify:

- [ ] All images are in `public/images/` folder
- [ ] Contact info is updated
- [ ] Social media links are correct
- [ ] Site builds without errors (`npm run build`)
- [ ] No console errors in browser
- [ ] Mobile responsive (test at different screen sizes)
- [ ] Links work correctly
- [ ] Forms are functional

## 🐛 Troubleshooting

### "npm install" fails

**Solution 1**: Clear npm cache
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Solution 2**: Use legacy peer deps
```bash
npm install --legacy-peer-deps
```

### "npm run dev" fails

**Check**:
- Is port 3000 already in use?
- Try port 3001: `npm run dev -- -p 3001`

### Images not showing

**Check**:
- Images are in `public/images/` folder
- Image names match exactly (case-sensitive)
- No special characters in filenames

### Build fails

**Check**:
- Run `npm run build` and read error messages
- Ensure all imports are correct
- Check for TypeScript errors

### Animations not working

**Check**:
- JavaScript is enabled in browser
- framer-motion is installed: `npm list framer-motion`

## 📱 Testing Checklist

Before going live:

### Desktop Testing
- [ ] Chrome
- [ ] Firefox  
- [ ] Safari
- [ ] Edge

### Mobile Testing
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Responsive design (resize browser)

### Functionality Testing
- [ ] All links work
- [ ] Images load
- [ ] Animations play
- [ ] Newsletter form accepts input
- [ ] Smooth scrolling works

## 🎯 Post-Deployment

After deploying:

1. **Test live site** on multiple devices
2. **Share the URL** with friends for feedback
3. **Monitor performance** using Google PageSpeed Insights
4. **Set up analytics** to track visitors
5. **Add to search engines** (Google Search Console)

## 🔄 Making Updates

To update your live site:

1. Make changes locally
2. Test with `npm run dev`
3. Build: `npm run build`
4. Deploy the new `out/` folder

**If using Vercel/Netlify**: Just push to GitHub, auto-deploys!

## 📞 Need Help?

Common issues and solutions:

**Issue**: "Module not found"
**Fix**: `npm install`

**Issue**: "Port already in use"
**Fix**: `npm run dev -- -p 3001`

**Issue**: "Build failed"
**Fix**: Check the error message, usually a syntax error

**Issue**: "Images not loading"
**Fix**: Ensure images are in `public/` folder

## ✅ Success Checklist

Your site is ready when:

- [x] npm install completes without errors
- [x] npm run dev shows the site at localhost:3000
- [x] npm run build creates the out/ folder
- [x] All images display correctly
- [x] Animations work smoothly
- [x] Site is responsive on mobile
- [x] Contact info is updated
- [x] Social links are set

## 🎊 You're Ready!

Your Vylor website is production-ready! Choose a deployment option above and launch your beautiful new site!

---

**Questions?** Review the README.md, SETUP.md, and FEATURES.md files for more details.


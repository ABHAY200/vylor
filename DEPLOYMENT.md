# Deploying Vylor to GitHub Pages

This guide will walk you through deploying your Vylor website to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your machine
- Your repository pushed to GitHub

## Deployment Steps

### 1. Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub (github.com/new)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/vylor.git
git branch -M main
git push -u origin main
```

### 2. Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. In the left sidebar, click on **Pages**
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
   
That's it! The GitHub Actions workflow will automatically trigger.

### 3. Configure Base Path (Important!)

Your site can be deployed in two ways:

#### Option A: User/Organization Page (Recommended if available)
- URL format: `https://yourusername.github.io/`
- Repository name must be: `yourusername.github.io`
- **No changes needed** - your current `next.config.js` works as-is

#### Option B: Project Page
- URL format: `https://yourusername.github.io/vylor/`
- Repository can have any name (e.g., "vylor")
- **Action required**: Uncomment these lines in `next.config.js`:

```javascript
basePath: '/vylor',
assetPrefix: '/vylor/',
```

**Note**: Replace `'/vylor'` with your actual repository name if different.

### 4. Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 2-3 minutes)
4. Once complete, your site will be live!

### 5. Access Your Site

Your site will be available at:
- **User page**: `https://yourusername.github.io/`
- **Project page**: `https://yourusername.github.io/vylor/`

## Automatic Deployments

Every time you push to the `main` branch, the site will automatically rebuild and redeploy. The workflow does the following:

1. Checks out your code
2. Sets up Node.js
3. Installs dependencies
4. Builds the static site (`npm run build`)
5. Deploys the `out` folder to GitHub Pages

## Manual Deployment

You can also trigger a deployment manually:

1. Go to **Actions** tab
2. Select "Deploy to GitHub Pages" workflow
3. Click **Run workflow**
4. Click the green **Run workflow** button

## Troubleshooting

### Issue: Assets not loading (404 errors)

**Solution**: Make sure you've configured the correct `basePath` in `next.config.js`:
- If using project page (`username.github.io/vylor`), uncomment the basePath lines
- If using user page (`username.github.io`), keep them commented out

### Issue: Workflow fails with permission error

**Solution**: 
1. Go to repository **Settings** → **Actions** → **General**
2. Scroll to "Workflow permissions"
3. Select "Read and write permissions"
4. Click Save

### Issue: CSS/JS files not loading

**Solution**: The `.nojekyll` file should be in your `public` folder. This file is automatically copied to the `out` folder during build and tells GitHub Pages not to use Jekyll processing.

### Issue: Custom domain not working

**Solution**:
1. Add a `CNAME` file to the `public` folder with your domain name
2. Configure DNS settings with your domain provider
3. In GitHub Pages settings, add your custom domain

## Testing Locally

Before deploying, you can test the production build locally:

```bash
# Build the static site
npm run build

# Serve the out directory (you can use any static server)
npx serve out
```

Then visit `http://localhost:3000` to see your production build.

## Environment Variables

If you need environment variables:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add your secrets
4. Reference them in `.github/workflows/deploy.yml` under the build step

Example:
```yaml
- name: Build with Next.js
  env:
    NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
  run: npm run build
```

## Advanced Configuration

### Custom Domain

To use a custom domain (e.g., `www.vylor.com`):

1. Create a file `public/CNAME` with your domain:
```
www.vylor.com
```

2. Configure DNS with your domain provider:
   - For apex domain (vylor.com): Add A records pointing to GitHub's IPs
   - For subdomain (www.vylor.com): Add CNAME record pointing to `yourusername.github.io`

3. In GitHub Pages settings, add your custom domain

### Build Optimization

The current setup is already optimized with:
- Static export (`output: 'export'`)
- Unoptimized images (required for static export)
- Automatic caching of `node_modules`

## Support

If you encounter issues:
1. Check the Actions tab for build logs
2. Verify your `next.config.js` settings
3. Ensure `.nojekyll` file exists in the `public` folder
4. Check GitHub Pages settings

## Resources

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)


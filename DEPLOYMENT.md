# Portfolio Deployment Guide

## 🚀 Free Deployment Options

### Option 1: Vercel (Recommended - Easiest & Best for Next.js)

**Why Vercel?**
- Created by the Next.js team - perfect integration
- Free tier includes:
  - Unlimited personal projects
  - Automatic HTTPS
  - Global CDN
  - Automatic deployments from Git
  - Preview deployments for pull requests
  - 100GB bandwidth/month

**Steps:**

1. **Prepare your code:**
   ```bash
   # Make sure everything is committed
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `your-project-name.vercel.app`

3. **Custom Domain (Optional):**
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

**Build Command:** `npm run build` (auto-detected)
**Output Directory:** `.next` (auto-detected)
**Install Command:** `npm install` (auto-detected)

---

### Option 2: Netlify (Alternative)

**Why Netlify?**
- Great free tier
- Easy Git integration
- Good for static sites

**Steps:**

1. **Build Configuration:**
   Create `netlify.toml` in root:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Netlify will use the `netlify.toml` config
   - Click "Deploy site"

---

### Option 3: GitHub Pages (Free but requires extra setup)

**Note:** Requires static export configuration

1. **Update `next.config.ts`:**
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',
     // ... rest of config
   };
   ```

2. **Deploy:**
   - Install `gh-pages`: `npm install --save-dev gh-pages`
   - Add to `package.json`:
     ```json
     "scripts": {
       "deploy": "npm run build && gh-pages -d out"
     }
     ```
   - Run: `npm run deploy`

---

## ✅ Pre-Deployment Checklist

- [x] All images optimized and loading correctly
- [x] No console errors
- [x] Mobile responsive design tested
- [x] All links working
- [x] PDF files accessible
- [x] Performance optimized
- [x] SEO metadata configured
- [x] Build completes without errors

## 🔧 Build & Test Locally

Before deploying, test the production build:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm start

# Visit http://localhost:3000
```

## 📝 Environment Variables (if needed)

If you add environment variables later:
- **Vercel:** Settings → Environment Variables
- **Netlify:** Site settings → Environment variables

## 🎯 Recommended: Vercel

**Best choice because:**
1. Zero configuration needed
2. Automatic deployments on git push
3. Preview deployments for every PR
4. Built-in analytics
5. Free SSL certificates
6. Global CDN
7. Perfect Next.js integration

## 🚨 Important Notes

1. **The "N 1 Issue" notification** is from Next.js dev overlay and will NOT appear in production builds
2. **Mobile navbar** is now always visible (no dropdown menu)
3. **All images** should be optimized before deployment
4. **PDF files** must be in `public` folder to be accessible

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment


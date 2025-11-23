# 🚀 Complete Step-by-Step Deployment Guide

## Prerequisites
- ✅ Git installed on your computer ([Download Git](https://git-scm.com/downloads))
- ✅ GitHub account ([Sign up here](https://github.com/signup))
- ✅ Vercel account (we'll create this during deployment)

---

## Step 1: Prepare Your Code

### 1.1 Open Terminal/Command Prompt
- **Windows**: Press `Win + R`, type `cmd`, press Enter
- **Mac/Linux**: Open Terminal

### 1.2 Navigate to Your Project Folder
```bash
cd "C:\Users\pro13\OneDrive\Desktop\Portfolio 2.0"
```

### 1.3 Check if Git is Initialized
```bash
git status
```

**If you see "not a git repository":**
```bash
git init
```

**If you see file names listed:** Git is already initialized ✅

---

## Step 2: Create .gitignore File (If Not Exists)

Create a file named `.gitignore` in your project root with this content:

```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

---

## Step 3: Stage and Commit Your Code

### 3.1 Stage All Files
```bash
git add .
```

### 3.2 Commit Your Code
```bash
git commit -m "Initial commit - Portfolio ready for deployment"
```

---

## Step 4: Create GitHub Repository

### 4.1 Go to GitHub
1. Open your browser and go to [github.com](https://github.com)
2. Sign in to your account

### 4.2 Create New Repository
1. Click the **"+"** icon in the top right corner
2. Select **"New repository"**

### 4.3 Repository Settings
- **Repository name**: `portfolio` (or any name you like)
- **Description**: "My professional portfolio website"
- **Visibility**: Choose **Public** (free) or **Private**
- **DO NOT** check "Initialize with README" (we already have code)
- **DO NOT** add .gitignore or license (we already have them)

### 4.4 Create Repository
Click the green **"Create repository"** button

---

## Step 5: Connect Local Code to GitHub

### 5.1 Copy Repository URL
After creating the repository, GitHub will show you a page with commands. 
**Copy the repository URL** - it looks like:
```
https://github.com/your-username/portfolio.git
```

### 5.2 Add Remote Repository
In your terminal, run:
```bash
git remote add origin https://github.com/your-username/portfolio.git
```
*(Replace with your actual repository URL)*

### 5.3 Rename Branch to Main (if needed)
```bash
git branch -M main
```

### 5.4 Push Code to GitHub
```bash
git push -u origin main
```

**You'll be prompted to enter:**
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)

---

## Step 6: Create GitHub Personal Access Token

### 6.1 Generate Token
1. Go to GitHub → Click your profile picture (top right)
2. Click **"Settings"**
3. Scroll down → Click **"Developer settings"** (left sidebar)
4. Click **"Personal access tokens"** → **"Tokens (classic)"**
5. Click **"Generate new token"** → **"Generate new token (classic)"**

### 6.2 Configure Token
- **Note**: "Portfolio Deployment"
- **Expiration**: Choose 90 days (or No expiration)
- **Scopes**: Check **"repo"** (this gives full repository access)
- Click **"Generate token"** at the bottom

### 6.3 Copy Token
**⚠️ IMPORTANT**: Copy the token immediately - you won't see it again!
It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 6.4 Use Token as Password
When pushing code, use:
- **Username**: Your GitHub username
- **Password**: Paste the Personal Access Token (not your GitHub password)

---

## Step 7: Verify Code is on GitHub

1. Go to your GitHub repository page
2. You should see all your files:
   - `src/` folder
   - `public/` folder
   - `package.json`
   - `next.config.ts`
   - etc.

✅ **If you see your files, you're ready for deployment!**

---

## Step 8: Deploy to Vercel

### 8.1 Go to Vercel
1. Open [vercel.com](https://vercel.com) in your browser
2. Click **"Sign Up"** (or **"Log In"** if you have an account)

### 8.2 Sign Up with GitHub
1. Click **"Continue with GitHub"**
2. Authorize Vercel to access your GitHub account
3. Complete your profile setup

### 8.3 Import Your Project
1. On the Vercel dashboard, click **"Add New..."**
2. Select **"Project"**
3. You'll see a list of your GitHub repositories
4. Find and click on your **portfolio** repository

### 8.4 Configure Project
Vercel will auto-detect Next.js settings:
- **Framework Preset**: Next.js ✅ (auto-detected)
- **Root Directory**: `./` ✅ (default)
- **Build Command**: `npm run build` ✅ (auto-detected)
- **Output Directory**: `.next` ✅ (auto-detected)
- **Install Command**: `npm install` ✅ (auto-detected)

**You don't need to change anything!** Just click **"Deploy"**

### 8.5 Wait for Deployment
- Vercel will:
  1. Install dependencies
  2. Build your project
  3. Deploy to production
- This takes **2-5 minutes**
- You'll see a progress log

### 8.6 Deployment Complete! 🎉
Once finished, you'll see:
- ✅ **"Congratulations! Your project has been deployed"**
- Your live URL: `your-project-name.vercel.app`

---

## Step 9: Test Your Live Site

1. Click on your deployment URL
2. Test all pages:
   - Home page
   - About page
   - Projects pages
   - Navigation links
   - Mobile version
3. Check that:
   - Images load correctly
   - PDFs are downloadable
   - All links work
   - Mobile navbar is visible

---

## Step 10: Set Up Custom Domain (Optional)

### 10.1 Add Domain in Vercel
1. Go to your project in Vercel dashboard
2. Click **"Settings"** tab
3. Click **"Domains"** in the left sidebar
4. Enter your domain name (e.g., `aleksaleksandrov.com`)
5. Click **"Add"**

### 10.2 Configure DNS
Vercel will show you DNS records to add:
1. Go to your domain registrar (where you bought the domain)
2. Add the DNS records Vercel provides
3. Wait 24-48 hours for DNS propagation

---

## Step 11: Automatic Deployments (Future Updates)

### 11.1 Make Changes Locally
Edit your code as usual

### 11.2 Push to GitHub
```bash
git add .
git commit -m "Updated portfolio content"
git push origin main
```

### 11.3 Vercel Auto-Deploys
- Vercel automatically detects the push
- Creates a new deployment
- Your site updates automatically! 🚀

---

## Troubleshooting

### Problem: "Command failed: npm run build"
**Solution**: 
- Check for errors in the build log
- Make sure all dependencies are in `package.json`
- Run `npm run build` locally first to test

### Problem: "Module not found"
**Solution**:
- Make sure all imports are correct
- Check file paths are correct
- Verify all dependencies are installed

### Problem: Images not loading
**Solution**:
- Ensure images are in `public/` folder
- Use paths starting with `/` (e.g., `/images/about/photo.jpg`)
- Check image file names match exactly

### Problem: "Build timeout"
**Solution**:
- This is rare, but if it happens, contact Vercel support
- Check your `package.json` for heavy dependencies

---

## Quick Reference Commands

```bash
# Navigate to project
cd "C:\Users\pro13\OneDrive\Desktop\Portfolio 2.0"

# Check status
git status

# Stage changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Pull latest changes (if working on multiple computers)
git pull origin main
```

---

## 🎉 Congratulations!

Your portfolio is now live! Share your Vercel URL with employers, add it to your resume, and keep it updated by pushing changes to GitHub.

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- GitHub Docs: https://docs.github.com
- Next.js Deployment: https://nextjs.org/docs/deployment


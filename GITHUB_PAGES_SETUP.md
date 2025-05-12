# GitHub Pages Setup Instructions

## 1. Repository Configuration

Ensure that GitHub Pages is properly enabled in your repository:

1. Go to your repository on GitHub (https://github.com/aleks131/Aleks.-Aleksandrov)
2. Click on "Settings"
3. Scroll down to the "Pages" section in the left sidebar
4. Under "Build and deployment":
   - Source: Select "GitHub Actions"
5. If you don't see GitHub Actions as an option:
   - First select "Deploy from a branch"
   - Select "main" branch and "/root" folder
   - Click "Save"
   - Then come back and change to "GitHub Actions"

## 2. DNS Configuration (if using a custom domain)

If you're using a custom domain:

1. In the "Custom domain" section, enter your domain
2. Check "Enforce HTTPS" if available
3. Ensure your DNS records are properly configured with your domain provider

## 3. Action Permissions

Ensure GitHub Actions have proper permissions:

1. Go to "Settings" > "Actions" > "General"
2. Under "Workflow permissions":
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
3. Click "Save"

## 4. GitHub Pages Configuration 

The repository should have these key elements:

- `.github/workflows/nextjs-deploy.yml`: Deployment workflow file
- `.nojekyll` file in both repository root and `/out` directory
- Proper `next.config.ts` configuration
- Correct `.env.production` settings

## 5. Troubleshooting Common Issues

If you're seeing a 404 page:

1. Check if the GitHub Actions workflow completed successfully
2. Verify that the `main` branch contains all required files
3. Check if GitHub Pages is using the correct branch
4. Try adding a simple `index.html` at the root of the repository

## 6. Repository Names with Special Characters

Since your repository name contains dots and dashes (Aleks.-Aleksandrov), this can sometimes cause issues with GitHub Pages routing. Some solutions:

1. Use a proper `basePath` in your Next.js config
2. Add a custom 404.html with JavaScript redirection
3. Consider renaming the repository to avoid special characters

## 7. Check Build Output

Ensure your `/out` directory contains all necessary files:
- All static content from your Next.js build
- A `.nojekyll` file
- A root `index.html` file 
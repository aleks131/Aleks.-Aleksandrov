# GitHub Pages Deployment Guide

This guide documents the steps and configurations needed to properly deploy this Next.js portfolio to GitHub Pages, especially with a repository name containing special characters like periods.

## Configuration Changes

### 1. Next.js Configuration

The `next.config.ts` file has been updated to:
- Set the correct `basePath` to match the repository name `/Aleks.-Aleksandrov`
- Configure `output: 'export'` for static site generation
- Enable `trailingSlash` for consistent URL handling
- Set `unoptimized: true` for images to work with static export

### 2. API Routes

For each API route, we've added:
```typescript
export const dynamic = 'force-static';
```

This makes the API routes compatible with static export by forcing them to be statically generated.

### 3. Client-Side Window References

To handle `window` references during server-side rendering:
- Added an `isBrowser()` function to check if code is running in browser environment
- Wrapped all `window` references in conditional checks

### 4. Special Files for GitHub Pages

The following files have been created to ensure proper routing:

- `.nojekyll` - Prevents GitHub from using Jekyll to process the site
- `404.html` - Custom 404 page with redirect to the homepage
- `redirect.html` - Handles redirects for paths with special characters
- `index-redirect.html` - Root index that redirects to the correct base path

### 5. GitHub Actions Workflow

The workflow has been updated to:
- Build the Next.js site with the correct base path
- Copy all necessary redirection and special files
- Create fallbacks for different URL patterns
- Deploy the static output to GitHub Pages

## Deployment Process

1. Code is pushed to the `main` branch
2. GitHub Actions workflow is triggered
3. The workflow builds the site using `npm run build`
4. Special files are added to the build output
5. The output is deployed to GitHub Pages

## Troubleshooting

If you encounter a 404 error after deployment:

1. **Check GitHub Pages settings**: Make sure GitHub Pages is enabled in repository settings and pointing to the correct branch.
2. **URL Structure**: Access the site using the correct URL pattern: `https://aleks131.github.io/Aleks.-Aleksandrov/`
3. **Alternative URLs**: If the URL with a period isn't working, try:
   - `https://aleks131.github.io/Aleks.-Aleksandrov/redirect.html?path=about`
   - Use the redirect page with the path as a query parameter
4. **Clear Cache**: Try clearing your browser cache or accessing the site in incognito mode
5. **Wait for Propagation**: GitHub Pages deployments can take several minutes to propagate

## Special Character Handling

The repository name `Aleks.-Aleksandrov` contains a period, which can cause routing issues. Our solution includes:

1. Adding redirect files to handle different URL patterns
2. Creating fallback HTML files with matching names 
3. Using JavaScript redirects with the correct base path

## Manual Deployment

If you need to deploy manually:

1. Run `npm run build` locally
2. Copy the special files to the `out` directory
3. Push the `out` directory to the `gh-pages` branch

## Future Considerations

For easier maintenance, consider:

1. Renaming the repository to avoid special characters
2. Using a custom domain for cleaner URLs
3. Setting up a more robust CI/CD pipeline

## References

- [Next.js Static Exports Documentation](https://nextjs.org/docs/advanced-features/static-html-export)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Troubleshooting GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites) 
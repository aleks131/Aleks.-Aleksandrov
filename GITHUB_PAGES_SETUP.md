# GitHub Pages Setup Guide

To successfully deploy your portfolio to GitHub Pages, you need to complete the following setup steps:

## 1. Configure GitHub Pages in Repository Settings

1. Go to your GitHub repository: https://github.com/aleks131/Aleks.-Aleksandrov
2. Click on "Settings" (tab at the top)
3. Scroll down to the "Pages" section in the left sidebar
4. Under "Build and deployment" > "Source", select "GitHub Actions"
5. Click "Save"

## 2. Create a Personal Access Token (Optional - only if the workflow still fails)

If the GitHub Actions workflow still fails, you may need to create a Personal Access Token (PAT):

1. Go to your GitHub account settings (click your profile picture > Settings)
2. Scroll down to "Developer settings" (bottom of the left sidebar)
3. Click on "Personal access tokens" > "Tokens (classic)"
4. Click "Generate new token" > "Generate new token (classic)"
5. Give your token a name (e.g., "Portfolio Deployment")
6. Select the following scopes:
   - `repo` (full control of private repositories)
   - `workflow` (to update GitHub Action workflows)
   - `admin:repo_hook` (for webhooks)
7. Click "Generate token"
8. **IMPORTANT**: Copy the generated token immediately! You won't be able to see it again.

## 3. Add the Personal Access Token to Your Repository (Only if needed)

1. Go back to your repository: https://github.com/aleks131/Aleks.-Aleksandrov
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Name: `GH_PAGES_TOKEN`
5. Value: Paste your Personal Access Token
6. Click "Add secret"

## 4. Update the Workflow File (Only if you added a PAT)

If you had to create a PAT and add it as a secret, you would need to update the `.github/workflows/nextjs-deploy.yml` file to use it:

```yaml
- name: Deploy to GitHub Pages
  id: deployment
  uses: actions/deploy-pages@v2
  with:
    token: ${{ secrets.GH_PAGES_TOKEN }}
```

## 5. Re-run the Workflow

1. Go to the "Actions" tab in your repository
2. Find the failed workflow run
3. Click "Re-run all jobs" button

## Troubleshooting

If you still encounter issues:

1. **Repository Visibility**: Make sure your repository is public, or that you have GitHub Pages enabled for private repositories (requires GitHub Pro)
2. **Branch Protection**: Ensure the `main` branch doesn't have protection rules that prevent the GitHub Actions workflow from pushing
3. **Workflow Permissions**: In repository Settings > Actions > General > Workflow permissions, ensure "Read and write permissions" is selected

## Final Notes

- The first deployment may take a few minutes to complete
- After successful deployment, your site will be available at: https://aleks131.github.io/Aleks.-Aleksandrov/
- Future commits to the `main` branch will automatically trigger redeployment 
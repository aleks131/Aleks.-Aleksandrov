@echo off
echo.
echo ========================================
echo Deploying your portfolio to GitHub Pages
echo ========================================
echo.

REM Check if Git is already initialized
if exist .git (
  echo Git repository already initialized.
) else (
  echo Initializing Git repository...
  git init
)

REM Set the remote URL
echo Setting remote URL to https://github.com/aleks131/Aleks.-Aleksandrov.git
git remote remove origin 2>nul
git remote add origin https://github.com/aleks131/Aleks.-Aleksandrov.git

REM Switch to main branch
echo Switching to main branch...
git checkout -b main 2>nul || git checkout main

REM Add all files
echo Adding files to git...
git add .

REM Commit changes
echo Committing changes...
git commit -m "Deploy portfolio to GitHub Pages"

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main --force

echo.
echo ===========================================
echo Deployment initiated! Your site should be 
echo available soon at:
echo https://aleks131.github.io/Aleks.-Aleksandrov/
echo -------------------------------------------
echo NOTE: The GitHub Pages deployment may take
echo a few minutes to complete.
echo Check the Actions tab in your GitHub repository
echo to monitor the deployment status.
echo ===========================================
echo.

pause 
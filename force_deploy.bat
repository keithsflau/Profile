@echo off
chcp 65001 >nul
echo ========================================
echo Force Portal Deployment Script
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Checking current status...
git status

echo.
echo Step 2: Adding ALL files (including deleted ones)...
git add -A
git add --all
git add .

echo.
echo Step 3: Checking what will be committed...
git status --short

echo.
echo Step 4: Committing ALL changes...
git commit -am "Force update all portals and re-upload all files - %date% %time%"

echo.
echo Step 5: Checking remote repository...
git remote -v

echo.
echo Step 6: Pushing to GitHub (with force if needed)...
git push origin main --force
if %errorlevel% neq 0 (
    echo Trying master branch...
    git push origin master --force
)

echo.
echo Step 7: Verifying push...
git log --oneline -3
git status

echo.
echo ========================================
echo Force deployment completed!
echo ========================================
pause

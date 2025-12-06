@echo off
chcp 65001 >nul
echo ========================================
echo Portal Deployment Script
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Adding all files...
git add -A
if %errorlevel% neq 0 (
    echo [ERROR] Git add failed
    pause
    exit /b 1
)

echo.
echo Step 2: Committing changes...
git commit -m "Update all portals and re-upload all files"
if %errorlevel% neq 0 (
    echo [WARNING] Commit failed or no changes to commit
)

echo.
echo Step 3: Checking remote repository...
git remote -v
if %errorlevel% neq 0 (
    echo [ERROR] No remote repository configured
    echo Please configure remote: git remote add origin https://github.com/yourusername/your-repo.git
    pause
    exit /b 1
)

echo.
echo Step 4: Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo Trying master branch...
    git push origin master
)

echo.
echo ========================================
echo Deployment completed!
echo ========================================
pause

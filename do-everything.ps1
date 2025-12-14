# Complete script to commit and push everything
$ErrorActionPreference = "Continue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Complete Git Commit and Push Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Change to project directory
$projectPath = "c:\Users\keith\OneDrive\Desktop\Profile"
Set-Location $projectPath

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
    Write-Host "Git repository initialized." -ForegroundColor Green
    Write-Host ""
}

# Check current status
Write-Host "Checking git status..." -ForegroundColor Yellow
$status = git status --porcelain 2>&1
if ($status -and $status.Count -gt 0) {
    Write-Host "Found changes:" -ForegroundColor Green
    $status | ForEach-Object { Write-Host "  $_" }
    Write-Host ""
    
    # Add all changes
    Write-Host "Adding all changes..." -ForegroundColor Yellow
    git add -A 2>&1 | Out-Null
    Write-Host "All changes staged." -ForegroundColor Green
    Write-Host ""
    
    # Commit
    Write-Host "Committing changes..." -ForegroundColor Yellow
    $commitMsg = "Fix build script, update dashboards, add visit counters, fix bugs`n`n- Fixed build-all-apps.ps1: removed emojis, fixed encoding issues`n- Updated Primary School and Biology dashboards with all apps`n- Added visit counters to all apps (26 apps)`n- Fixed logic bugs: allopatric-speciation, gel-electrophoresis`n- Added build scripts and documentation`n- Verified academic accuracy of biology simulations"
    
    git commit -m $commitMsg 2>&1 | ForEach-Object { Write-Host $_ }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Commit successful!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "Commit completed (may have been empty or already committed)." -ForegroundColor Yellow
    }
} else {
    Write-Host "No changes to commit (everything is already committed)." -ForegroundColor Yellow
}

Write-Host ""

# Check for remote
Write-Host "Checking for remote repository..." -ForegroundColor Yellow
$remoteOutput = git remote -v 2>&1
if ($remoteOutput -and $remoteOutput -notmatch "fatal") {
    Write-Host "Remote repository found:" -ForegroundColor Green
    $remoteOutput | ForEach-Object { Write-Host "  $_" }
    Write-Host ""
    
    # Get current branch
    $branch = git branch --show-current 2>&1
    if (-not $branch -or $branch -match "fatal") {
        $branch = "main"
        Write-Host "Setting branch to 'main'..." -ForegroundColor Yellow
        git branch -M main 2>&1 | Out-Null
    }
    
    Write-Host "Current branch: $branch" -ForegroundColor Cyan
    Write-Host ""
    
    # Push to GitHub
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    $pushOutput = git push -u origin $branch 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "Push output:" -ForegroundColor Yellow
        $pushOutput | ForEach-Object { Write-Host "  $_" }
        Write-Host ""
        Write-Host "If push failed, you may need to:" -ForegroundColor Red
        Write-Host "  1. Configure authentication (GitHub token or SSH key)" -ForegroundColor Yellow
        Write-Host "  2. Check your remote URL" -ForegroundColor Yellow
        Write-Host "  3. Push manually: git push -u origin $branch" -ForegroundColor Yellow
    }
} else {
    Write-Host "No remote repository configured." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To add a remote repository, run:" -ForegroundColor Cyan
    Write-Host "  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git" -ForegroundColor White
    Write-Host ""
    Write-Host "Or use SSH:" -ForegroundColor Cyan
    Write-Host "  git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git" -ForegroundColor White
    Write-Host ""
    Write-Host "Then run this script again to push." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Script completed!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

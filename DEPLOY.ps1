# Portal Deployment Script
# Execute this script to upload all portals to GitHub

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Portal Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check current directory
$currentDir = Get-Location
Write-Host "Current Directory: $currentDir" -ForegroundColor Yellow

# Step 1: Check Git Repository
Write-Host "`nStep 1: Checking Git Repository..." -ForegroundColor Green
if (Test-Path ".git") {
    Write-Host "[OK] Git Repository found" -ForegroundColor Green
} else {
    Write-Host "[!] Git Repository not found, initializing..." -ForegroundColor Yellow
    git init
    Write-Host "[OK] Git Repository initialized" -ForegroundColor Green
}

# Step 2: Add all files
Write-Host "`nStep 2: Adding all files..." -ForegroundColor Green
git add -A
$status = git status --porcelain
if ($status) {
    Write-Host "[OK] Files ready to commit:" -ForegroundColor Green
    Write-Host $status -ForegroundColor Gray
} else {
    Write-Host "[!] No changes to commit" -ForegroundColor Yellow
}

# Step 3: Commit changes
Write-Host "`nStep 3: Committing changes..." -ForegroundColor Green
$commitMessage = "Update all portals and re-upload all files"
git commit -m $commitMessage
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Changes committed" -ForegroundColor Green
} else {
    Write-Host "[!] Commit failed or no changes to commit" -ForegroundColor Yellow
}

# Step 4: Check remote repository
Write-Host "`nStep 4: Checking remote repository..." -ForegroundColor Green
$remote = git remote -v
if ($remote) {
    Write-Host "[OK] Remote repository configured:" -ForegroundColor Green
    Write-Host $remote -ForegroundColor Gray
    
    # Step 5: Push to GitHub
    Write-Host "`nStep 5: Pushing to GitHub..." -ForegroundColor Green
    Write-Host "Pushing to main branch..." -ForegroundColor Yellow
    git push origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Push successful!" -ForegroundColor Green
    } else {
        Write-Host "Trying to push to current branch..." -ForegroundColor Yellow
        $branch = git branch --show-current
        if ($branch) {
            git push origin $branch
        }
    }
} else {
    Write-Host "[ERROR] Remote repository not configured" -ForegroundColor Red
    Write-Host "`nPlease configure remote repository:" -ForegroundColor Yellow
    Write-Host "git remote add origin https://github.com/yourusername/your-repo-name.git" -ForegroundColor Gray
    Write-Host "`nOr update existing:" -ForegroundColor Yellow
    Write-Host "git remote set-url origin https://github.com/yourusername/your-repo-name.git" -ForegroundColor Gray
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Deployment Script Completed" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Display all Portal status
Write-Host "All Portals List:" -ForegroundColor Cyan
Write-Host "1. Chinese Monopoly (chinesemonopoly)" -ForegroundColor White
Write-Host "2. Chinese Millionaire (millionaire)" -ForegroundColor White
Write-Host "3. Rhetoric Defense (Rhetoric_Defense)" -ForegroundColor White
Write-Host "4. Story Dice Generator (story_dice)" -ForegroundColor White
Write-Host "5. Typo Surgeon (typo_surgeon)" -ForegroundColor White
Write-Host "6. Ancient Chinese Particle (ac_particle_fill_in)" -ForegroundColor White
Write-Host "7. Idiom Zoo Race (idiom-zoo-race)" -ForegroundColor White

# Final commit and push script
$ErrorActionPreference = "Stop"

Write-Host "=== Final Commit and Push ===" -ForegroundColor Cyan
Write-Host ""

# Check git status
Write-Host "Checking git status..." -ForegroundColor Yellow
$status = git status --porcelain 2>&1
if ($status) {
    Write-Host "Found changes to commit:" -ForegroundColor Green
    Write-Host $status
    
    # Add all changes
    Write-Host "`nAdding all changes..." -ForegroundColor Yellow
    git add -A
    
    # Commit
    Write-Host "Committing changes..." -ForegroundColor Yellow
    $commitMsg = @"
Fix build script, update dashboards, add visit counters, fix bugs

- Fixed build-all-apps.ps1: removed emojis, fixed encoding issues
- Updated Primary School and Biology dashboards with all apps
- Added visit counters to all apps (26 apps)
- Fixed logic bugs: allopatric-speciation, gel-electrophoresis
- Added build scripts and documentation
- Verified academic accuracy of biology simulations
"@
    
    git commit -m $commitMsg
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Commit successful!" -ForegroundColor Green
    } else {
        Write-Host "Commit failed!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "No changes to commit." -ForegroundColor Yellow
}

# Check for remote
Write-Host "`nChecking for remote repository..." -ForegroundColor Yellow
$remote = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote found: $remote" -ForegroundColor Green
    
    # Get current branch
    $branch = git branch --show-current 2>&1
    if (-not $branch) {
        $branch = "main"
        git branch -M main 2>&1 | Out-Null
    }
    
    Write-Host "`nPushing to GitHub (branch: $branch)..." -ForegroundColor Yellow
    git push -u origin $branch 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nSuccessfully pushed to GitHub!" -ForegroundColor Green
    } else {
        Write-Host "`nPush failed. You may need to:" -ForegroundColor Red
        Write-Host "  1. Configure authentication" -ForegroundColor Yellow
        Write-Host "  2. Check your remote URL" -ForegroundColor Yellow
        Write-Host "  3. Push manually: git push -u origin $branch" -ForegroundColor Yellow
    }
} else {
    Write-Host "No remote repository configured." -ForegroundColor Yellow
    Write-Host "`nTo add a remote repository:" -ForegroundColor Yellow
    Write-Host "  git remote add origin <your-github-url>" -ForegroundColor Cyan
    Write-Host "`nThen run this script again to push." -ForegroundColor Yellow
}

Write-Host "`n=== Done ===" -ForegroundColor Cyan

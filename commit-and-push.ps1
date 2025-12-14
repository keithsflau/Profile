# Script to commit and push all changes to GitHub

$ErrorActionPreference = "Stop"

Write-Host "📝 Preparing to commit and push changes..." -ForegroundColor Cyan

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "🔧 Initializing git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
}

# Check if remote exists
$remote = git remote get-url origin 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  No remote repository configured." -ForegroundColor Yellow
    Write-Host "Please add your GitHub remote with:" -ForegroundColor Yellow
    Write-Host "  git remote add origin <your-github-url>" -ForegroundColor Yellow
    exit 1
}

# Add all changes
Write-Host "`n📦 Staging all changes..." -ForegroundColor Cyan
git add -A

# Check if there are changes to commit
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "ℹ️  No changes to commit." -ForegroundColor Yellow
    exit 0
}

# Show what will be committed
Write-Host "`n📋 Changes to be committed:" -ForegroundColor Cyan
git status --short

# Commit
$commitMessage = "Update dashboard, add visit counters, fix bugs, and build all apps

- Updated Primary School and Biology dashboards with all apps
- Added visit counters to all apps
- Fixed logic bugs in allopatric-speciation and gel-electrophoresis
- Added build scripts and documentation
- Verified academic accuracy of biology simulations"

Write-Host "`n💾 Committing changes..." -ForegroundColor Cyan
git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Changes committed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Commit failed" -ForegroundColor Red
    exit 1
}

# Push to GitHub
Write-Host "`n🚀 Pushing to GitHub..." -ForegroundColor Cyan
$branch = git branch --show-current
if ([string]::IsNullOrWhiteSpace($branch)) {
    $branch = "main"
    git branch -M main
}

git push -u origin $branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "❌ Push failed. You may need to:" -ForegroundColor Red
    Write-Host "   1. Set up your GitHub remote" -ForegroundColor Yellow
    Write-Host "   2. Configure authentication" -ForegroundColor Yellow
    Write-Host "   3. Push manually: git push -u origin $branch" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n🎉 All done! Changes are now on GitHub." -ForegroundColor Green

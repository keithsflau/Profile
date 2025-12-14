# Build script for all apps
# This script builds all Vite/React apps in the project

$ErrorActionPreference = "Continue"
$apps = @(
    "Secondary_School\Biology\apps\allopatric-speciation",
    "Secondary_School\Biology\apps\antibiotic-resistance",
    "Secondary_School\Biology\apps\cellular-respiration",
    "Secondary_School\Biology\apps\energy-flow",
    "Secondary_School\Biology\apps\flowering-plants-reproduction",
    "Secondary_School\Biology\apps\food-test-simulation",
    "Secondary_School\Biology\apps\gel-electrophoresis",
    "Secondary_School\Biology\apps\immune-response",
    "Secondary_School\Biology\apps\menstrual-cycle",
    "Secondary_School\Biology\apps\photosynthesis",
    "Secondary_School\Biology\apps\protein-synthesis",
    "Secondary_School\Biology\apps\recombinant-dna",
    "Secondary_School\Biology\apps\translocation-in-phloem",
    "Secondary_School\Biology\apps\muscle-contraction",
    "Secondary_School\Biology\apps\genetics-punnett-pedigree",
    "Secondary_School\Biology\apps\oxygen-dissociation",
    "Secondary_School\Biology\apps\action-potential",
    "Secondary_School\Biology\apps\glucose-regulation",
    "Secondary_School\Biology\apps\transpiration-lab",
    "Secondary_School\Biology\apps\mechanisms-of-movement",
    "Secondary_School\Biology\apps\fluid-mosaic-model",
    "Secondary_School\Biology\apps\enzyme-kinetics",
    "Secondary_School\Biology\apps\cholinergic-synapse",
    "Secondary_School\Biology\apps\cell-cycle-mitosis",
    "Primary_School\English_Vocabulary",
    "Primary_School\PrimaryChinese\story_dice",
    "Primary_School\PrimaryChinese\粵語伴讀：濫竽充數",
    "Secondary_School\Junior Science\F2_JS_BioCycle",
    "Secondary_School\Economy\Hong_Kong_Tycoon_Dream"
)

$successCount = 0
$failCount = 0
$failedApps = @()

Write-Host "🚀 Starting build process for all apps...`n" -ForegroundColor Cyan

foreach ($app in $apps) {
    $appPath = Join-Path $PSScriptRoot $app
    
    if (-not (Test-Path (Join-Path $appPath "package.json"))) {
        Write-Host "⏭️  Skipping $app - no package.json" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "`n🔨 Building $app..." -ForegroundColor Green
    
    try {
        # Check if node_modules exists
        if (-not (Test-Path (Join-Path $appPath "node_modules"))) {
            Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
            Push-Location $appPath
            npm install
            Pop-Location
        }
        
        # Build the app
        Push-Location $appPath
        npm run build
        Pop-Location
        
        Write-Host "✅ Successfully built $app" -ForegroundColor Green
        $successCount++
    }
    catch {
        Write-Host "❌ Failed to build $app : $_" -ForegroundColor Red
        $failCount++
        $failedApps += $app
        Pop-Location
    }
}

Write-Host "`n📊 Build Summary:" -ForegroundColor Cyan
Write-Host "✅ Successful: $successCount" -ForegroundColor Green
Write-Host "❌ Failed: $failCount" -ForegroundColor Red

if ($failCount -gt 0) {
    Write-Host "`n❌ Failed apps:" -ForegroundColor Red
    foreach ($app in $failedApps) {
        Write-Host "  - $app" -ForegroundColor Red
    }
    exit 1
}

Write-Host "`n🎉 All apps built successfully!" -ForegroundColor Green

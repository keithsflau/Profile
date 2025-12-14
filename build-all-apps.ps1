# Comprehensive build script for all apps
# This script builds all Vite/React apps and reports results

$ErrorActionPreference = "Continue"
$apps = @(
    @{ Path = "Secondary_School\Biology\apps\allopatric-speciation"; Name = "Allopatric Speciation" },
    @{ Path = "Secondary_School\Biology\apps\antibiotic-resistance"; Name = "Antibiotic Resistance" },
    @{ Path = "Secondary_School\Biology\apps\cellular-respiration"; Name = "Cellular Respiration" },
    @{ Path = "Secondary_School\Biology\apps\energy-flow"; Name = "Energy Flow" },
    @{ Path = "Secondary_School\Biology\apps\flowering-plants-reproduction"; Name = "Flowering Plants Reproduction" },
    @{ Path = "Secondary_School\Biology\apps\food-test-simulation"; Name = "Food Test Simulation" },
    @{ Path = "Secondary_School\Biology\apps\gel-electrophoresis"; Name = "Gel Electrophoresis" },
    @{ Path = "Secondary_School\Biology\apps\immune-response"; Name = "Immune Response" },
    @{ Path = "Secondary_School\Biology\apps\menstrual-cycle"; Name = "Menstrual Cycle" },
    @{ Path = "Secondary_School\Biology\apps\photosynthesis"; Name = "Photosynthesis" },
    @{ Path = "Secondary_School\Biology\apps\protein-synthesis"; Name = "Protein Synthesis" },
    @{ Path = "Secondary_School\Biology\apps\recombinant-dna"; Name = "Recombinant DNA" },
    @{ Path = "Secondary_School\Biology\apps\translocation-in-phloem"; Name = "Translocation in Phloem" },
    @{ Path = "Secondary_School\Biology\apps\muscle-contraction"; Name = "Muscle Contraction" },
    @{ Path = "Secondary_School\Biology\apps\genetics-punnett-pedigree"; Name = "Genetics Punnett Pedigree" },
    @{ Path = "Secondary_School\Biology\apps\oxygen-dissociation"; Name = "Oxygen Dissociation" },
    @{ Path = "Secondary_School\Biology\apps\action-potential"; Name = "Action Potential" },
    @{ Path = "Secondary_School\Biology\apps\glucose-regulation"; Name = "Glucose Regulation" },
    @{ Path = "Secondary_School\Biology\apps\transpiration-lab"; Name = "Transpiration Lab" },
    @{ Path = "Secondary_School\Biology\apps\mechanisms-of-movement"; Name = "Mechanisms of Movement" },
    @{ Path = "Secondary_School\Biology\apps\fluid-mosaic-model"; Name = "Fluid Mosaic Model" },
    @{ Path = "Secondary_School\Biology\apps\enzyme-kinetics"; Name = "Enzyme Kinetics" },
    @{ Path = "Secondary_School\Biology\apps\cholinergic-synapse"; Name = "Cholinergic Synapse" },
    @{ Path = "Secondary_School\Biology\apps\cell-cycle-mitosis"; Name = "Cell Cycle Mitosis" },
    @{ Path = "Primary_School\English_Vocabulary"; Name = "English Vocabulary" },
    @{ Path = "Primary_School\PrimaryChinese\story_dice"; Name = "Story Dice" },
    @{ Path = "Primary_School\PrimaryChinese\粵語伴讀：濫竽充數"; Name = "Cantonese Reading Companion"; SkipIfNotExists = $true },
    @{ Path = "Secondary_School\Junior Science\F2_JS_BioCycle"; Name = "F2 JS BioCycle" },
    @{ Path = "Secondary_School\Economy\Hong_Kong_Tycoon_Dream"; Name = "Hong Kong Tycoon Dream" }
)

$successCount = 0
$failCount = 0
$failedApps = @()
$successApps = @()

Write-Host ""
Write-Host "Starting build process for all apps..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Total apps to build: $($apps.Count)" -ForegroundColor Yellow
Write-Host ""

foreach ($appInfo in $apps) {
    $app = $appInfo.Path
    $appName = $appInfo.Name
    $appPath = Join-Path $PSScriptRoot $app
    
    # Skip if directory doesn't exist and SkipIfNotExists is set
    if ($appInfo.SkipIfNotExists -and -not (Test-Path $appPath)) {
        Write-Host "Skipping $appName - directory not found" -ForegroundColor Yellow
        continue
    }
    
    if (-not (Test-Path (Join-Path $appPath "package.json"))) {
        Write-Host "Skipping $appName - no package.json" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "Building $appName..." -ForegroundColor Green
    
    try {
        Push-Location $appPath
        
        # Check if node_modules exists
        if (-not (Test-Path "node_modules")) {
            Write-Host "  Installing dependencies..." -ForegroundColor Yellow
            $installOutput = npm install 2>&1
            if ($LASTEXITCODE -ne 0) {
                throw "npm install failed"
            }
        }
        
        # Build the app
        Write-Host "  Running build..." -ForegroundColor Yellow
        $buildOutput = npm run build 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  Build successful" -ForegroundColor Green
            $successCount++
            $successApps += $appName
        } else {
            Write-Host "  Build failed" -ForegroundColor Red
            Write-Host $buildOutput -ForegroundColor Red
            $failCount++
            $failedApps += @{ Name = $appName; Path = $app; Error = $buildOutput }
        }
        
        Pop-Location
    }
    catch {
        Write-Host "  Error: $_" -ForegroundColor Red
        $failCount++
        $failedApps += @{ Name = $appName; Path = $app; Error = $_.ToString() }
        Pop-Location
    }
}

# Summary
Write-Host ""
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host "Build Summary" -ForegroundColor Cyan
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host "Successful: $successCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor Red

if ($successCount -gt 0) {
    Write-Host ""
    Write-Host "Successfully built apps:" -ForegroundColor Green
    $successApps | ForEach-Object { Write-Host "   - $_" -ForegroundColor Green }
}

if ($failCount -gt 0) {
    Write-Host ""
    Write-Host "Failed apps:" -ForegroundColor Red
    $failedApps | ForEach-Object { 
        Write-Host "   - $($_.Name)" -ForegroundColor Red
        Write-Host "     Path: $($_.Path)" -ForegroundColor Gray
    }
    exit 1
}

Write-Host ""
Write-Host "All apps built successfully!" -ForegroundColor Green

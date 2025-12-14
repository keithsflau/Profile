# Simplified build and check script
# This will build apps one by one and report errors

$ErrorActionPreference = "Continue"
$apps = @(
    "Secondary_School\Biology\apps\allopatric-speciation",
    "Secondary_School\Biology\apps\cellular-respiration",
    "Secondary_School\Biology\apps\photosynthesis"
)

$results = @()

foreach ($app in $apps) {
    $appPath = Join-Path $PSScriptRoot $app
    
    if (-not (Test-Path (Join-Path $appPath "package.json"))) {
        continue
    }
    
    Write-Host "`n🔨 Building $app..." -ForegroundColor Green
    
    try {
        Push-Location $appPath
        
        # Install if needed
        if (-not (Test-Path "node_modules")) {
            Write-Host "  Installing dependencies..." -ForegroundColor Yellow
            npm install --silent 2>&1 | Out-Null
        }
        
        # Build
        Write-Host "  Running build..." -ForegroundColor Yellow
        $buildOutput = npm run build 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ Build successful" -ForegroundColor Green
            $results += @{ App = $app; Status = "Success" }
        } else {
            Write-Host "  ❌ Build failed" -ForegroundColor Red
            Write-Host $buildOutput
            $results += @{ App = $app; Status = "Failed"; Error = $buildOutput }
        }
        
        Pop-Location
    }
    catch {
        Write-Host "  ❌ Error: $_" -ForegroundColor Red
        $results += @{ App = $app; Status = "Error"; Error = $_.ToString() }
        Pop-Location
    }
}

Write-Host "`n📊 Summary:" -ForegroundColor Cyan
$results | ForEach-Object {
    if ($_.Status -eq "Success") {
        Write-Host "  ✅ $($_.App)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $($_.App): $($_.Status)" -ForegroundColor Red
    }
}

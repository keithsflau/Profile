# Batch fix all index.html files that still reference /src/main.jsx
$ErrorActionPreference = "Continue"

$basePath = "c:\Users\keith\OneDrive\Desktop\Profile\Secondary_School\Biology\apps"
$redirectHtml = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=dist/index.html" />
    <script>window.location.href = "dist/index.html";</script>
    <title>Redirecting...</title>
</head>
<body>
    <p>Redirecting to <a href="dist/index.html">dist/index.html</a>...</p>
</body>
</html>
"@

$appsToFix = @(
    "protein-synthesis",
    "recombinant-dna",
    "muscle-contraction",
    "flowering-plants-reproduction",
    "translocation-in-phloem",
    "cholinergic-synapse",
    "enzyme-kinetics",
    "fluid-mosaic-model",
    "mechanisms-of-movement",
    "action-potential",
    "transpiration-lab",
    "oxygen-dissociation",
    "glucose-regulation",
    "genetics-punnett-pedigree"
)

$fixed = 0

foreach ($appName in $appsToFix) {
    $appPath = Join-Path $basePath $appName
    $indexHtml = Join-Path $appPath "index.html"
    $distHtml = Join-Path $appPath "dist\index.html"
    
    if ((Test-Path $indexHtml) -and (Test-Path $distHtml)) {
        $content = Get-Content $indexHtml -Raw -Encoding UTF8
        if ($content -match '/src/main.jsx') {
            Write-Host "Fixing: $appName" -ForegroundColor Yellow
            Set-Content -Path $indexHtml -Value $redirectHtml -Encoding UTF8 -NoNewline
            Write-Host "  Fixed!" -ForegroundColor Green
            $fixed++
        } else {
            Write-Host "Skipping: $appName (already fixed)" -ForegroundColor Gray
        }
    } else {
        Write-Host "Skipping: $appName (missing files)" -ForegroundColor DarkYellow
    }
}

Write-Host ""
Write-Host "Fixed: $fixed apps" -ForegroundColor Cyan

# Fix all Biology apps index.html to redirect to dist/index.html
$ErrorActionPreference = "Continue"

$basePath = "c:\Users\keith\OneDrive\Desktop\Profile\Secondary_School\Biology\apps"
$apps = Get-ChildItem -Path $basePath -Directory

$fixed = 0
$skipped = 0

foreach ($app in $apps) {
    $indexHtml = Join-Path $app.FullName "index.html"
    $distHtml = Join-Path $app.FullName "dist\index.html"
    
    # Only fix if index.html exists and dist/index.html exists
    if (Test-Path $indexHtml) {
        if (Test-Path $distHtml) {
            Write-Host "Fixing: $($app.Name)" -ForegroundColor Yellow
            
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
            
            Set-Content -Path $indexHtml -Value $redirectHtml -Encoding UTF8 -NoNewline
            Write-Host "  Added redirect" -ForegroundColor Green
            $fixed++
        } else {
            Write-Host "Skipping: $($app.Name) (no dist/index.html)" -ForegroundColor DarkYellow
            $skipped++
        }
    }
}

Write-Host ""
Write-Host "Fixed: $fixed apps" -ForegroundColor Green
Write-Host "Skipped: $skipped apps" -ForegroundColor Yellow

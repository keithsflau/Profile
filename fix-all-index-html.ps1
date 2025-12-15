# Fix all index.html files to redirect to dist/index.html for GitHub Pages
$ErrorActionPreference = "Continue"

$basePath = "c:\Users\keith\OneDrive\Desktop\Profile\Secondary_School\Biology\apps"
$apps = Get-ChildItem -Path $basePath -Directory

$fixed = 0

foreach ($app in $apps) {
    $indexHtml = Join-Path $app.FullName "index.html"
    $distHtml = Join-Path $app.FullName "dist\index.html"
    
    # Only fix if both files exist
    if ((Test-Path $indexHtml) -and (Test-Path $distHtml)) {
        Write-Host "Fixing: $($app.Name)" -ForegroundColor Yellow
        
        # Create a redirect HTML that points to dist/index.html
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
        Write-Host "  Added redirect to dist/index.html" -ForegroundColor Green
        $fixed++
    }
}

Write-Host ""
Write-Host "Fixed $fixed apps" -ForegroundColor Cyan

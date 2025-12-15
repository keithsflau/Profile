# Final fix: Replace all index.html with proper redirect pages
$ErrorActionPreference = "Continue"

$basePath = "c:\Users\keith\OneDrive\Desktop\Profile\Secondary_School\Biology\apps"
$apps = Get-ChildItem -Path $basePath -Directory

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

$fixed = 0

foreach ($app in $apps) {
    $indexHtml = Join-Path $app.FullName "index.html"
    $distHtml = Join-Path $app.FullName "dist\index.html"
    
    if ((Test-Path $indexHtml) -and (Test-Path $distHtml)) {
        $content = Get-Content $indexHtml -Raw -Encoding UTF8
        
        # Check if it needs fixing (has /src/main.jsx or redirect in wrong place)
        if ($content -match '/src/main.jsx' -or ($content -match 'dist/index.html' -and $content -notmatch '<!DOCTYPE html>')) {
            Write-Host "Fixing: $($app.Name)" -ForegroundColor Yellow
            Set-Content -Path $indexHtml -Value $redirectHtml -Encoding UTF8 -NoNewline
            Write-Host "  Fixed!" -ForegroundColor Green
            $fixed++
        }
    }
}

Write-Host ""
Write-Host "Fixed: $fixed apps" -ForegroundColor Cyan

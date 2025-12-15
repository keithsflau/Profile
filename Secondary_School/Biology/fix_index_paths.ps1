
$appsDir = "c:\Users\keith\OneDrive\Desktop\Profile\Secondary_School\Biology\apps"
$apps = Get-ChildItem -Path $appsDir -Directory

foreach ($app in $apps) {
    $indexPath = Join-Path $app.FullName "dist\index.html"
    if (Test-Path $indexPath) {
        Write-Host "Fixing paths in $($app.Name)/dist/index.html..."
        
        $content = Get-Content -Path $indexPath -Raw
        
        # Check if replacement is needed
        if ($content -match "\.\./\.\./\.\./\.\./visit-counter") {
            # Add one more ../
            $newContent = $content -replace "\.\./\.\./\.\./\.\./visit-counter", "../../../../../visit-counter"
            Set-Content -Path $indexPath -Value $newContent
            Write-Host "Fixed visit-counter path."
        }
        else {
            Write-Host "No visit-counter path found, or already fixed."
        }
    }
}

# Batch Add Visit Counter to All Pages
# This script adds visit counter to every HTML page in the Profile directory

param(
    [string]$ScriptUrl = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE",
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Stop"
$basePath = "c:\Users\keith\OneDrive\Desktop\Profile"

Write-Host "=== Visit Counter Batch Installer ===" -ForegroundColor Cyan
Write-Host "Base Path: $basePath" -ForegroundColor Yellow
Write-Host "Script URL: $ScriptUrl" -ForegroundColor Yellow
Write-Host "Dry Run: $DryRun" -ForegroundColor Yellow
Write-Host ""

# Counter for statistics
$stats = @{
    Total = 0
    Added = 0
    Skipped = 0
    AlreadyHas = 0
    Errors = 0
}

# Function to generate page ID from file path
function Get-PageId {
    param([string]$FilePath)
    
    $relativePath = $FilePath.Replace($basePath, "").Replace("\", "/").TrimStart("/")
    $relativePath = $relativePath -replace "\.html$", ""
    $relativePath = $relativePath -replace "/index$", ""
    $relativePath = $relativePath -replace "[^a-zA-Z0-9/-]", "-"
    $relativePath = $relativePath.ToLower()
    
    if ([string]::IsNullOrEmpty($relativePath)) {
        return "main-portal"
    }
    
    return $relativePath -replace "^/", "" -replace "/$", ""
}

# Function to check if file already has visit counter
function Has-VisitCounter {
    param([string]$Content)
    
    return $Content -match "VisitCounter\.init\(" -or 
           $Content -match "visit-counter\.js"
}

# Function to add visit counter to HTML
function Add-VisitCounter {
    param(
        [string]$FilePath,
        [string]$Content,
        [string]$PageId
    )
    
    # Check if already has counter
    if (Has-VisitCounter -Content $Content) {
        return $null, "Already has visit counter"
    }
    
    # Check if has </body> tag
    if ($Content -notmatch "</body>") {
        return $null, "No </body> tag found"
    }
    
    # Create visit counter container div
    $containerDiv = "`n    <!-- Visit Counter -->`n    <div id=`"visit-counter-container`" class=`"text-center my-4`"></div>`n"
    
    # Create visit counter script
    $counterScript = @"

    <!-- Visit Counter Script -->
    <script src="/visit-counter.js"></script>
    <script>
        const SCRIPT_URL = '$ScriptUrl';
        VisitCounter.init('$PageId', {
            scriptUrl: SCRIPT_URL,
            containerId: 'visit-counter-container'
        });
    </script>
"@

    # Try to add container before closing main/body tag
    $newContent = $Content
    
    # Strategy 1: Add before </main> if exists
    if ($Content -match "</main>") {
        $newContent = $Content -replace "</main>", "$containerDiv</main>"
    }
    # Strategy 2: Add before </body>
    else {
        $newContent = $Content -replace "</body>", "$containerDiv</body>"
    }
    
    # Add script before </body>
    $newContent = $newContent -replace "</body>", "$counterScript`n</body>"
    
    return $newContent, "Added successfully"
}

# Get all HTML files
Write-Host "Scanning for HTML files..." -ForegroundColor Cyan
$htmlFiles = Get-ChildItem -Path $basePath -Recurse -Include *.html -File | 
    Where-Object { 
        $_.FullName -notmatch "\\node_modules\\" -and 
        $_.FullName -notmatch "\\dist\\" -and
        $_.FullName -notmatch "\\.git\\"
    }

$stats.Total = $htmlFiles.Count
Write-Host "Found $($stats.Total) HTML files`n" -ForegroundColor Green

# Process each file
foreach ($file in $htmlFiles) {
    $relativePath = $file.FullName.Replace($basePath, "").TrimStart("\")
    Write-Host "Processing: $relativePath" -ForegroundColor White
    
    try {
        # Read file content
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        
        # Generate page ID
        $pageId = Get-PageId -FilePath $file.FullName
        Write-Host "  Page ID: $pageId" -ForegroundColor Gray
        
        # Add visit counter
        $newContent, $message = Add-VisitCounter -FilePath $file.FullName -Content $content -PageId $pageId
        
        if ($null -eq $newContent) {
            Write-Host "  ⚠ Skipped: $message" -ForegroundColor Yellow
            if ($message -like "*Already has*") {
                $stats.AlreadyHas++
            } else {
                $stats.Skipped++
            }
        }
        else {
            if ($DryRun) {
                Write-Host "  ✓ Would add visit counter (DRY RUN)" -ForegroundColor Cyan
            }
            else {
                # Write updated content
                Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
                Write-Host "  ✓ Added visit counter" -ForegroundColor Green
            }
            $stats.Added++
        }
    }
    catch {
        Write-Host "  ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
        $stats.Errors++
    }
    
    Write-Host ""
}

# Print summary
Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "Total files scanned: $($stats.Total)" -ForegroundColor White
Write-Host "Successfully added: $($stats.Added)" -ForegroundColor Green
Write-Host "Already has counter: $($stats.AlreadyHas)" -ForegroundColor Yellow
Write-Host "Skipped: $($stats.Skipped)" -ForegroundColor Yellow
Write-Host "Errors: $($stats.Errors)" -ForegroundColor Red

if ($DryRun) {
    Write-Host "`nThis was a DRY RUN. No files were modified." -ForegroundColor Cyan
    Write-Host "Run without -DryRun to apply changes." -ForegroundColor Cyan
}

Write-Host "`nDone!" -ForegroundColor Green

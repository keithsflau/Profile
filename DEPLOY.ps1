# Portal 部署腳本 | Portal Deployment Script
# 執行此腳本來上傳所有 portal 到 GitHub

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Portal 部署腳本 | Portal Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 檢查是否在正確的目錄
$currentDir = Get-Location
Write-Host "當前目錄: $currentDir" -ForegroundColor Yellow

# 步驟 1: 檢查 Git 狀態
Write-Host "`n步驟 1: 檢查 Git Repository..." -ForegroundColor Green
if (Test-Path ".git") {
    Write-Host "✓ 找到 Git Repository" -ForegroundColor Green
} else {
    Write-Host "✗ 未找到 Git Repository，正在初始化..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Git Repository 已初始化" -ForegroundColor Green
}

# 步驟 2: 添加所有檔案
Write-Host "`n步驟 2: 添加所有檔案..." -ForegroundColor Green
git add -A
$status = git status --porcelain
if ($status) {
    Write-Host "✓ 已找到需要提交的檔案:" -ForegroundColor Green
    Write-Host $status -ForegroundColor Gray
} else {
    Write-Host "! 沒有需要提交的變更" -ForegroundColor Yellow
}

# 步驟 3: 提交變更
Write-Host "`n步驟 3: 提交變更..." -ForegroundColor Green
$commitMessage = "更新所有 portal 並重新上傳所有檔案 - Update all portals and re-upload all files"
git commit -m $commitMessage
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ 變更已提交" -ForegroundColor Green
} else {
    Write-Host "! 提交失敗或沒有變更需要提交" -ForegroundColor Yellow
}

# 步驟 4: 檢查遠程倉庫
Write-Host "`n步驟 4: 檢查遠程倉庫..." -ForegroundColor Green
$remote = git remote -v
if ($remote) {
    Write-Host "✓ 遠程倉庫配置:" -ForegroundColor Green
    Write-Host $remote -ForegroundColor Gray
    
    # 步驟 5: 推送到 GitHub
    Write-Host "`n步驟 5: 推送到 GitHub..." -ForegroundColor Green
    Write-Host "正在推送到 main 分支..." -ForegroundColor Yellow
    git push origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ 推送成功！" -ForegroundColor Green
    } else {
        Write-Host "嘗試推送到當前分支..." -ForegroundColor Yellow
        $branch = git branch --show-current
        git push origin $branch
    }
} else {
    Write-Host "✗ 未找到遠程倉庫配置" -ForegroundColor Red
    Write-Host "`n請先設置遠程倉庫:" -ForegroundColor Yellow
    Write-Host "git remote add origin https://github.com/你的用戶名/你的倉庫名.git" -ForegroundColor Gray
    Write-Host "`n或者使用:" -ForegroundColor Yellow
    Write-Host "git remote set-url origin https://github.com/你的用戶名/你的倉庫名.git" -ForegroundColor Gray
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  部署腳本執行完成" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 顯示所有 Portal 狀態
Write-Host "所有 Portal 列表:" -ForegroundColor Cyan
Write-Host "1. 語文大富翁 (chinesemonopoly)" -ForegroundColor White
Write-Host "2. 語文百萬富翁 (millionaire)" -ForegroundColor White
Write-Host "3. 修辭防衛戰 (Rhetoric_Defense)" -ForegroundColor White
Write-Host "4. 故事骰子生成器 (story_dice)" -ForegroundColor White
Write-Host "5. 錯別字手術室 (typo_surgeon)" -ForegroundColor White
Write-Host "6. 虛詞大搜查 (ac_particle_fill_in)" -ForegroundColor White
Write-Host "7. 成語動物園競賽 (idiom-zoo-race)" -ForegroundColor White

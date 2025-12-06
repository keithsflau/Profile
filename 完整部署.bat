@echo off
chcp 65001 >nul
cls
echo ========================================
echo   完整 Portal 部署腳本
echo   Complete Portal Deployment Script
echo ========================================
echo.

cd /d "%~dp0"
echo 當前目錄: %CD%
echo.

echo [步驟 1/7] 檢查所有 Portal 文件...
echo Checking all Portal files...
dir /b /s PrimaryChinese\*.html | find /c ".html" > temp_count.txt
set /p PORTAL_COUNT=<temp_count.txt
del temp_count.txt
echo 找到 %PORTAL_COUNT% 個 HTML 文件
echo.

echo [步驟 2/7] 檢查 Git 狀態...
echo Checking Git status...
git status
echo.

echo [步驟 3/7] 強制添加所有文件（包括被刪除的）...
echo Force adding ALL files (including deleted ones)...
git add -A .
git add --all .
git add -f .
echo.

echo [步驟 4/7] 檢查暫存區狀態...
echo Checking staged files...
git status --short
echo.

echo [步驟 5/7] 提交所有變更...
echo Committing all changes...
git commit -m "Complete portal update - %date% %time%"
if %errorlevel% neq 0 (
    echo [警告] 提交失敗或沒有變更，嘗試強制提交...
    git commit --allow-empty -m "Force update all portals - %date% %time%"
)
echo.

echo [步驟 6/7] 檢查遠程倉庫...
echo Checking remote repository...
git remote -v
echo.

echo [步驟 7/7] 推送到 GitHub（強制模式）...
echo Pushing to GitHub (force mode)...
git branch
echo.
echo 嘗試推送到 main 分支...
git push -f origin main
if %errorlevel% neq 0 (
    echo 嘗試推送到 master 分支...
    git push -f origin master
)
if %errorlevel% neq 0 (
    echo 嘗試普通推送...
    git push origin main
)
echo.

echo ========================================
echo   部署完成！
echo   Deployment completed!
echo ========================================
echo.
echo 請檢查 GitHub 上的更新是否成功
echo Please check if the update on GitHub was successful
echo.
pause

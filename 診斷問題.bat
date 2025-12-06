@echo off
chcp 65001 >nul
cls
echo ========================================
echo   Git 上傳問題診斷工具
echo ========================================
echo.

cd /d "%~dp0"
echo 當前目錄: %CD%
echo.

echo [檢查 1/8] 是否為 Git Repository...
if exist ".git" (
    echo [OK] 找到 .git 目錄
) else (
    echo [錯誤] 未找到 .git 目錄！
    echo 這不是一個 Git Repository
    echo.
    echo 是否要初始化? (Y/N)
    set /p INIT_CHOICE=
    if /i "%INIT_CHOICE%"=="Y" (
        git init
        echo Git Repository 已初始化
    )
)
echo.

echo [檢查 2/8] Git 版本...
git --version
echo.

echo [檢查 3/8] 當前分支...
git branch
echo.

echo [檢查 4/8] 遠程倉庫配置...
git remote -v
echo.
if %errorlevel% neq 0 (
    echo [警告] 無法獲取遠程倉庫信息
)
echo.

echo [檢查 5/8] Git 狀態...
git status
echo.

echo [檢查 6/8] 最近的提交記錄...
git log --oneline -5
echo.

echo [檢查 7/8] 檢查是否有未推送的提交...
git log origin/main..HEAD 2>nul
if %errorlevel% neq 0 (
    echo 無法檢查（可能遠程分支不存在或無法連接）
)
echo.

echo [檢查 8/8] 嘗試推送並顯示錯誤訊息...
echo 正在嘗試推送到 main 分支...
echo ----------------------------------------
git push origin main 2>&1
echo ----------------------------------------
echo 推送命令執行完成，退出碼: %errorlevel%
echo.

echo ========================================
echo   診斷完成
echo ========================================
echo.
echo 請查看上面的錯誤訊息，常見問題：
echo 1. 沒有遠程倉庫配置 - 需要 git remote add origin ...
echo 2. 認證失敗 - 需要使用 Personal Access Token
echo 3. 分支名稱錯誤 - 可能需要使用 master 而不是 main
echo.
pause



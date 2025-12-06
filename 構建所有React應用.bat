@echo off
chcp 65001 >nul
cls
echo ========================================
echo   構建所有 React/Vite 應用
echo   Build All React/Vite Applications
echo ========================================
echo.

cd /d "%~dp0"

echo [應用 1/4] 構建語文百萬富翁 (millionaire)...
cd PrimaryChinese\millionaire
if exist "package.json" (
    echo 安裝依賴...
    call npm install
    echo 構建應用...
    call npm run build
    if exist "dist" (
        echo [成功] 構建完成，輸出在 dist 文件夾
        REM 將構建後的內容複製到根目錄
        xcopy /E /I /Y dist\* .
    ) else (
        echo [錯誤] 構建失敗
    )
) else (
    echo [錯誤] 找不到 package.json
)
cd ..\..
echo.

echo [應用 2/4] 構建修辭防衛戰 (Rhetoric_Defense)...
cd PrimaryChinese\Rhetoric_Defense
if exist "package.json" (
    echo 安裝依賴...
    call npm install
    echo 構建應用...
    call npm run build
    if exist "dist" (
        echo [成功] 構建完成，輸出在 dist 文件夾
        xcopy /E /I /Y dist\* .
    ) else (
        echo [錯誤] 構建失敗
    )
) else (
    echo [錯誤] 找不到 package.json
)
cd ..\..
echo.

echo [應用 3/4] 構建故事骰子生成器 (story_dice)...
cd PrimaryChinese\story_dice
if exist "package.json" (
    echo 安裝依賴...
    call npm install
    echo 構建應用...
    call npm run build
    if exist "dist" (
        echo [成功] 構建完成，輸出在 dist 文件夾
        xcopy /E /I /Y dist\* .
    ) else (
        echo [錯誤] 構建失敗
    )
) else (
    echo [錯誤] 找不到 package.json
)
cd ..\..
echo.

echo [應用 4/4] 構建成語動物園競賽 (idiom-zoo-race)...
cd PrimaryChinese\idiom-zoo-race
if exist "package.json" (
    echo 安裝依賴...
    call npm install
    echo 構建應用...
    call npm run build
    if exist "build" (
        echo [成功] 構建完成，輸出在 build 文件夾
        REM React 應用使用 build 而不是 dist
        xcopy /E /I /Y build\* .
    ) else (
        echo [錯誤] 構建失敗
    )
) else (
    echo [錯誤] 找不到 package.json
)
cd ..\..
echo.

echo ========================================
echo   構建完成！
echo   Build Complete!
echo ========================================
echo.
echo 接下來請執行完整部署腳本來上傳到 GitHub
echo Next, run the deployment script to upload to GitHub
pause

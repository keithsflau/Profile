@echo off
chcp 65001 >nul
cls
echo ========================================
echo   構建所有 React 應用
echo   Build All React Applications
echo ========================================
echo.

cd /d "%~dp0"

echo 這些應用需要構建後才能運行：
echo - millionaire (Vite)
echo - Rhetoric_Defense (Vite)
echo - story_dice (Vite)
echo - idiom-zoo-race (React)
echo.

echo [步驟 1] 構建 millionaire...
cd PrimaryChinese\millionaire
if exist "node_modules" (
    echo 安裝依賴中...
    call npm install
    echo 構建中...
    call npm run build
    if exist "dist\index.html" (
        echo [OK] millionaire 構建成功
        echo 將 dist 內容複製到根目錄...
        xcopy /E /I /Y dist\*.* ..\..\PrimaryChinese\millionaire\
    ) else (
        echo [錯誤] millionaire 構建失敗
    )
) else (
    echo [警告] 未找到 node_modules，請先執行 npm install
)
cd ..\..
echo.

echo [步驟 2] 構建 Rhetoric_Defense...
cd PrimaryChinese\Rhetoric_Defense
if exist "node_modules" (
    echo 安裝依賴中...
    call npm install
    echo 構建中...
    call npm run build
    if exist "dist\index.html" (
        echo [OK] Rhetoric_Defense 構建成功
        echo 將 dist 內容複製到根目錄...
        xcopy /E /I /Y dist\*.* ..\..\PrimaryChinese\Rhetoric_Defense\
    ) else (
        echo [錯誤] Rhetoric_Defense 構建失敗
    )
) else (
    echo [警告] 未找到 node_modules，請先執行 npm install
)
cd ..\..
echo.

echo [步驟 3] 構建 story_dice...
cd PrimaryChinese\story_dice
if exist "node_modules" (
    echo 安裝依賴中...
    call npm install
    echo 構建中...
    call npm run build
    if exist "dist\index.html" (
        echo [OK] story_dice 構建成功
        echo 將 dist 內容複製到根目錄...
        xcopy /E /I /Y dist\*.* ..\..\PrimaryChinese\story_dice\
    ) else (
        echo [錯誤] story_dice 構建失敗
    )
) else (
    echo [警告] 未找到 node_modules，請先執行 npm install
)
cd ..\..
echo.

echo [步驟 4] 構建 idiom-zoo-race...
cd PrimaryChinese\idiom-zoo-race
if exist "node_modules" (
    echo 安裝依賴中...
    call npm install
    echo 構建中...
    call npm run build
    if exist "build\index.html" (
        echo [OK] idiom-zoo-race 構建成功
        echo 將 build 內容複製到根目錄...
        xcopy /E /I /Y build\*.* ..\..\PrimaryChinese\idiom-zoo-race\
    ) else (
        echo [錯誤] idiom-zoo-race 構建失敗
    )
) else (
    echo [警告] 未找到 node_modules，請先執行 npm install
)
cd ..\..
echo.

echo ========================================
echo   構建完成！
echo ========================================
echo.
echo 現在可以上傳到 GitHub 了
pause

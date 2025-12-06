# 🚀 GitHub Pages 部署指南（無需本地 Node.js）

## 方案一：使用 GitHub Actions（推薦）✨

GitHub Actions 會在**雲端自動構建**，您不需要本地安裝 Node.js！

### 步驟：

1. **推送代碼到 GitHub**
   ```bash
   git add .
   git commit -m "準備部署到 GitHub Pages"
   git push
   ```

2. **啟用 GitHub Pages**
   - 進入您的 GitHub 倉庫
   - 點擊 **Settings**（設置）
   - 左側菜單選擇 **Pages**（頁面）
   - **Source** 選擇 **"GitHub Actions"**
   - 點擊 **Save**（保存）

3. **自動部署**
   - GitHub Actions 會自動開始構建（使用雲端的 Node.js）
   - 可以在 **Actions** 標籤頁查看進度
   - 通常 2-5 分鐘完成

4. **訪問網站**
   - 部署完成後，網站地址會顯示在 Settings > Pages
   - 通常是：`https://YOUR_USERNAME.github.io/REPO_NAME/`

### 如果您的倉庫結構不同：

**情況 A：整個 Profile 是一個倉庫**
- 工作流文件已配置好，直接使用即可
- 部署後訪問：`https://YOUR_USERNAME.github.io/Profile/PrimaryChinese/millionaire/`

**情況 B：millionaire 是獨立倉庫**
- 需要修改 `.github/workflows/deploy.yml`
- 將所有 `PrimaryChinese/millionaire/` 路徑改為 `./`
- 部署後訪問：`https://YOUR_USERNAME.github.io/millionaire/`

---

## 方案二：手動上傳 dist 文件夾（如果不想用 GitHub Actions）

如果您已經在本地構建好了：

1. **本地構建**（需要 Node.js）
   ```bash
   npm install
   npm run build
   ```

2. **上傳 dist 文件夾**
   - 將 `dist` 文件夾的**內容**（不是文件夾本身）
   - 上傳到 GitHub 倉庫的根目錄或 `docs` 文件夾
   - 在 GitHub Pages 設置中選擇對應的文件夾

---

## ⚙️ 調整 Base Path（如果需要）

如果部署後資源加載失敗，可能需要調整 `vite.config.js` 中的 `base`：

```javascript
// 當前設置（相對路徑，適用於大部分情況）
base: './'

// 如果部署到子目錄，例如：https://username.github.io/Profile/PrimaryChinese/millionaire/
base: '/Profile/PrimaryChinese/millionaire/'

// 如果部署到倉庫根目錄
base: '/'
```

修改後需要：
1. 重新構建（或讓 GitHub Actions 自動構建）
2. 推送更改

---

## ✅ 驗證部署

部署成功後應該能夠：
- ✅ 看到遊戲主頁面（不是"載入中"）
- ✅ 點擊「開始遊戲」按鈕
- ✅ 所有功能正常運作
- ✅ 瀏覽器控制台沒有 CORS 錯誤

---

## 🐛 常見問題

### 問題：頁面一直顯示"載入中"

**解決方案：**
1. 檢查瀏覽器控制台（F12）是否有錯誤
2. 確認 `vite.config.js` 中的 `base` 路徑正確
3. 清除瀏覽器緩存（Ctrl+F5）

### 問題：GitHub Actions 構建失敗

**解決方案：**
1. 檢查 `.github/workflows/deploy.yml` 文件是否存在
2. 查看 Actions 標籤頁的錯誤日誌
3. 確認 `package.json` 中的構建腳本正確

### 問題：資源路徑錯誤（404）

**解決方案：**
1. 確認 `vite.config.js` 中 `base: './'` 使用相對路徑
2. 檢查構建後的 `dist/index.html` 中的資源路徑
3. 確保所有資源文件都在 `dist/assets/` 文件夾中

---

## 📝 更新內容

每次更新代碼後：

```bash
git add .
git commit -m "更新內容描述"
git push
```

GitHub Actions 會自動重新構建和部署！

---

## 🎉 完成！

現在您的遊戲已經在 GitHub Pages 上運行，**完全不需要本地 Node.js 環境**！


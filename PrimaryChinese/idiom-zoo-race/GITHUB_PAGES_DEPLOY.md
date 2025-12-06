# 🚀 GitHub Pages 部署指南 - Idiom Zoo Race

## 問題診斷

目前遇到的問題：
1. ✅ **已修復**：`react-scripts` 版本錯誤（已改為 `5.0.1`）
2. ⚠️ 應用程式仍顯示預設 React 模板（需要開發實際功能）
3. ⚠️ 需要正確的部署設定

---

## 方案一：使用 GitHub Actions（推薦）✨

GitHub Actions 會在**雲端自動構建**，您不需要本地安裝 Node.js！

### 步驟：

1. **推送代碼到 GitHub**
   ```bash
   git add .
   git commit -m "修復 idiom-zoo-race 部署設定"
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
   - 應該是：`https://YOUR_USERNAME.github.io/Profile/PrimaryChinese/idiom-zoo-race/`

---

## 方案二：手動構建和部署（如果需要本地測試）

如果您想在本地測試：

1. **安裝依賴**
   ```bash
   cd PrimaryChinese/idiom-zoo-race
   npm install
   ```

2. **本地開發**
   ```bash
   npm start
   ```
   會在 `http://localhost:3000` 開啟開發伺服器

3. **構建生產版本**
   ```bash
   npm run build
   ```
   會產生 `build` 文件夾

4. **測試構建結果**
   ```bash
   npx serve -s build
   ```

---

## ⚙️ 重要設定說明

### `package.json` 中的 `homepage`

目前設定為 `"."`（相對路徑），這適用於部署到子目錄的情況。

如果部署後資源加載失敗，可能需要調整：

```json
{
  "homepage": "/Profile/PrimaryChinese/idiom-zoo-race"
}
```

或者如果部署到倉庫根目錄：
```json
{
  "homepage": "/"
}
```

修改後需要重新構建。

---

## 🐛 常見問題

### 問題：頁面顯示 "Getting Started with Create React App"

**原因**：應用程式還是預設模板，需要開發實際功能。

**解決方案**：
- 編輯 `src/App.tsx` 來開發您的成語動物賽跑遊戲
- 或者如果已經有代碼，檢查是否有未提交的更改

### 問題：GitHub Actions 構建失敗

**解決方案**：
1. 檢查 `.github/workflows/deploy-idiom-zoo-race.yml` 文件是否存在
2. 查看 Actions 標籤頁的錯誤日誌
3. 確認 `package.json` 中的構建腳本正確
4. 確認 `react-scripts` 版本已更新為 `5.0.1`

### 問題：資源路徑錯誤（404）

**解決方案**：
1. 確認 `package.json` 中 `homepage: "."` 使用相對路徑
2. 檢查構建後的 `build/index.html` 中的資源路徑
3. 確保所有資源文件都在 `build/static/` 文件夾中
4. 清除瀏覽器緩存（Ctrl+F5）

### 問題：部署後路徑不正確

如果您的 GitHub Pages 基礎 URL 是 `https://username.github.io/Profile/`，那麼：
- 應用程式應該在 `PrimaryChinese/idiom-zoo-race/` 子目錄
- `homepage: "."` 應該可以正常工作
- 如果不行，試試 `homepage: "/Profile/PrimaryChinese/idiom-zoo-race"`

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

## 🎯 下一步

1. **開發應用程式功能**
   - 編輯 `src/App.tsx` 和相關組件
   - 實現成語動物賽跑遊戲的邏輯

2. **測試本地開發**
   ```bash
   npm start
   ```

3. **部署到 GitHub Pages**
   - 推送代碼
   - 啟用 GitHub Actions
   - 等待自動部署完成

---

## 🎉 完成！

現在您的應用程式已經準備好部署到 GitHub Pages！

**注意**：目前應用程式還是預設的 React 模板。您需要開發實際的成語動物賽跑遊戲功能。


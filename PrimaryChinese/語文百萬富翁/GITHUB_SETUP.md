# GitHub Pages 部署指南

## 方法一：使用 GitHub Actions（推薦）

項目已配置 GitHub Actions 自動部署，只需：

1. **將代碼推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: 語文百萬富翁遊戲"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **啟用 GitHub Pages**
   - 進入 GitHub 倉庫
   - 點擊 Settings（設置）
   - 左側菜單選擇 Pages（頁面）
   - Source 選擇 "GitHub Actions"
   - 保存設置

3. **自動部署**
   - 每次推送到 main 分支時，GitHub Actions 會自動構建並部署
   - 部署完成後，網站地址為：`https://YOUR_USERNAME.github.io/Profile/PrimaryChinese/語文百萬富翁/`

## 方法二：手動部署

如果不想使用 GitHub Actions，可以手動構建並部署：

1. **本地構建**
   ```bash
   npm install
   npm run build
   ```

2. **部署 dist 文件夾**
   - 將 `dist` 文件夾的內容上傳到 GitHub Pages
   - 或者使用 gh-pages 分支：
   ```bash
   npm install --save-dev gh-pages
   ```
   
   在 `package.json` 中添加：
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
   
   然後運行：
   ```bash
   npm run deploy
   ```

## 重要提示

### Base Path 配置

如果您的 GitHub Pages URL 路徑不同，需要修改 `vite.config.js` 中的 `base` 配置：

```javascript
base: '/您的倉庫路徑/'
```

例如：
- 如果 URL 是 `https://username.github.io/Profile/PrimaryChinese/語文百萬富翁/`
- 則 base 應該是 `'/Profile/PrimaryChinese/語文百萬富翁/'`

### 如果使用 GitHub Pages 的默認域名

如果您的倉庫名是 `username.github.io`，則：
```javascript
base: '/'
```

## 測試本地構建

在推送到 GitHub 之前，可以先測試構建：

```bash
npm run build
npm run preview
```

這會在本地預覽構建後的版本，確保一切正常。

## 故障排除

### 問題：頁面顯示空白

**解決方案：**
1. 檢查 `vite.config.js` 中的 `base` 路徑是否正確
2. 檢查瀏覽器控制台是否有錯誤
3. 確保所有資源路徑都是相對路徑

### 問題：GitHub Actions 部署失敗

**解決方案：**
1. 檢查 `.github/workflows/deploy.yml` 文件是否存在
2. 確保倉庫設置中已啟用 GitHub Pages
3. 檢查 Actions 標籤頁中的錯誤信息

### 問題：路徑中包含中文導致問題

**解決方案：**
如果遇到中文路徑問題，可以：
1. 將文件夾重命名為英文（如 `chinese-millionaire`）
2. 或確保 Git 配置正確處理 UTF-8：
   ```bash
   git config --global core.quotepath false
   ```

## 更新內容

每次更新代碼後：

1. 提交更改：
   ```bash
   git add .
   git commit -m "更新內容"
   git push
   ```

2. GitHub Actions 會自動重新部署（通常需要幾分鐘）

3. 部署完成後，刷新頁面即可看到更新


# GitHub 部署指南

## 快速開始

### 1. 準備 GitHub Repository

```bash
# 初始化 Git (如果還沒有)
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 成語太空戰機"

# 添加遠程倉庫 (替換為你的 repository URL)
git remote add origin https://github.com/[username]/[repository-name].git

# 推送到 main 分支
git push -u origin main
```

### 2. 啟用 GitHub Pages

1. 前往你的 GitHub Repository
2. 點擊 **Settings** → **Pages**
3. 在 **Source** 部分，選擇 **GitHub Actions**
4. 保存設置

### 3. 自動部署

當你推送代碼到 `main` 或 `master` 分支時，GitHub Actions 會自動：
- 安裝依賴
- 構建項目
- 部署到 GitHub Pages

### 4. 訪問你的遊戲

部署完成後，你的遊戲將在以下 URL 可用：
```
https://[username].github.io/[repository-name]
```

## 手動部署 (使用 gh-pages)

如果你想手動部署：

```bash
# 安裝依賴
npm install

# 構建項目
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 故障排除

### 問題：頁面顯示空白

**解決方案**：
1. 檢查 `vite.config.js` 中的 `base` 設置為 `'./'`
2. 檢查瀏覽器控制台是否有錯誤
3. 確保所有資源路徑都是相對路徑

### 問題：GitHub Actions 部署失敗

**解決方案**：
1. 檢查 `.github/workflows/deploy.yml` 文件是否存在
2. 確保 Repository Settings → Actions → General → Workflow permissions 設置為 "Read and write permissions"
3. 檢查 Actions 標籤頁中的錯誤日誌

### 問題：資源加載失敗 (404)

**解決方案**：
1. 確保 `vite.config.js` 中 `base: './'`
2. 檢查構建後的 `dist/index.html` 中的資源路徑
3. 清除瀏覽器緩存

## 驗證部署

部署成功後，檢查：
- ✅ 遊戲可以正常加載
- ✅ 所有資源（圖片、字體、CSS、JS）都能正確加載
- ✅ 遊戲可以正常運行
- ✅ 控制按鍵正常工作

## 更新遊戲

每次更新代碼後：

```bash
git add .
git commit -m "Update: [描述你的更改]"
git push origin main
```

GitHub Actions 會自動重新構建和部署。


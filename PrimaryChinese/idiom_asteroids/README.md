# 成語太空戰機 (Idiom Asteroids)

一個垂直滾動的射擊遊戲，通過射擊帶有正確答案的小行星來學習中文成語。

## 遊戲說明

- **目標**：射擊帶有正確答案的綠色小行星
- **控制**：
  - 左右方向鍵 或 A/D：移動飛船
  - 空格鍵：發射子彈
- **規則**：
  - 射中正確答案（綠色小行星）：+10 分，更換新成語
  - 射中錯誤答案（灰色小行星）：-1 生命
  - 被小行星撞到：-1 生命
  - 生命歸零：遊戲結束

## 開發

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 構建生產版本
npm run build

# 預覽構建版本
npm run preview

# 部署到 GitHub Pages (使用 gh-pages)
npm run deploy
```

## 技術棧

- React 18
- Vite
- HTML5 Canvas API
- Tailwind CSS

## 部署到 GitHub Pages

### 方法 1: 使用 GitHub Actions (推薦)

1. **啟用 GitHub Pages**：
   - 前往 Repository Settings → Pages
   - Source 選擇 "GitHub Actions"

2. **推送代碼**：
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **自動部署**：
   - GitHub Actions 會自動構建並部署
   - 部署完成後，可在 `https://[username].github.io/[repository-name]` 訪問

### 方法 2: 使用 gh-pages

```bash
# 構建並部署
npm run deploy
```

這會將 `dist` 文件夾部署到 `gh-pages` 分支。

### 確保 GitHub Pages 設置正確

1. Repository Settings → Pages
2. Source: 選擇 "GitHub Actions" 或 "Deploy from a branch" (選擇 `gh-pages` 分支)
3. 確保 `.github/workflows/deploy.yml` 文件存在

## 文件結構

```
idiom_asteroids/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 工作流
├── src/
│   ├── IdiomAsteroids.jsx  # 主遊戲組件
│   ├── main.jsx            # 入口文件
│   └── index.css           # 樣式文件
├── index.html              # HTML 模板
├── vite.config.js          # Vite 配置
├── package.json            # 項目配置
├── _redirects              # 重定向規則（用於 SPA）
├── .gitignore             # Git 忽略文件
└── README.md               # 說明文件
```

## 注意事項

- `vite.config.js` 中設置了 `base: './'`，確保資源路徑正確
- GitHub Actions 會自動構建和部署
- 如果使用子目錄部署，可能需要調整 `base` 路徑


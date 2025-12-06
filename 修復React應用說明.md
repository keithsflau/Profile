# 修復 React 應用無法運行的問題

## 問題分析

這些應用無法運行是因為：
- 它們是 **React/Vite 應用**，需要先構建（build）才能運行
- 目前 GitHub Pages 訪問的是源碼的 `index.html`
- 源碼的 `index.html` 引用了 `/src/main.jsx` 等源文件
- 但生產環境中這些源文件不存在

## 受影響的應用

1. **millionaire** - Vite + React (已修復 base 為 './')
2. **Rhetoric_Defense** - Vite + React (base 已經是 './')
3. **story_dice** - Vite + React (base 已經是 './')
4. **idiom-zoo-race** - React (create-react-app)

## 解決方案選項

### 方案 1: 手動構建並部署（快速）

在每個應用目錄執行：

```bash
# 1. 進入應用目錄
cd PrimaryChinese/millionaire

# 2. 安裝依賴
npm install

# 3. 構建應用
npm run build

# 4. 構建後，dist 文件夾包含所有構建文件
# 需要將 dist 內容複製到應用根目錄或上傳到 GitHub
```

**問題**：構建後的文件很大，全部上傳會讓倉庫變大。

### 方案 2: 使用 GitHub Actions 自動構建（推薦）

為每個應用配置 GitHub Actions，自動構建和部署。

#### 示例：為 Rhetoric_Defense 創建 GitHub Actions

在 `PrimaryChinese/Rhetoric_Defense/.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: PrimaryChinese/Rhetoric_Defense/package-lock.json
      
      - name: Install dependencies
        working-directory: PrimaryChinese/Rhetoric_Defense
        run: npm ci
      
      - name: Build
        working-directory: PrimaryChinese/Rhetoric_Defense
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './PrimaryChinese/Rhetoric_Defense/dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 方案 3: 簡化為純 HTML 版本（臨時解決方案）

如果不需要 React 功能，可以創建簡單的 HTML 版本。

## 快速修復步驟

### 步驟 1: 確認配置

所有應用的 `base` 配置應該是 `'./'`（相對路徑）：
- ✅ millionaire - 已修復
- ✅ Rhetoric_Defense - 已經是 './'
- ✅ story_dice - 已經是 './'
- ✅ idiom-zoo-race - 已添加 homepage: "."

### 步驟 2: 構建應用

在每個應用目錄執行：

```bash
npm install
npm run build
```

構建輸出位置：
- Vite 應用：`dist/` 文件夾
- React 應用：`build/` 文件夾

### 步驟 3: 部署構建文件

**選項 A**: 將構建後的內容上傳到 GitHub
- 將 `dist/` 或 `build/` 的內容複製到應用根目錄
- 提交並推送

**選項 B**: 使用 GitHub Actions（推薦）
- 每個應用配置獨立的 GitHub Actions
- 自動構建和部署到 GitHub Pages

### 步驟 4: 訪問測試

構建並部署後，訪問：
- https://keithsflau.github.io/Profile/PrimaryChinese/millionaire/index.html
- https://keithsflau.github.io/Profile/PrimaryChinese/Rhetoric_Defense/index.html
- https://keithsflau.github.io/Profile/PrimaryChinese/story_dice/index.html
- https://keithsflau.github.io/Profile/PrimaryChinese/idiom-zoo-race/index.html

## 當前狀態

- ✅ 配置已修復（base 路徑）
- ⚠️ 需要構建應用
- ⚠️ 需要部署構建後的文件

## 建議

由於構建需要 Node.js 和安裝依賴，建議：

1. **本地構建**：在本地構建後上傳 dist/build 文件
2. **或者使用 GitHub Actions**：自動構建和部署（類似 millionaire 的配置）

您希望使用哪種方案？我可以幫您配置 GitHub Actions 自動構建。

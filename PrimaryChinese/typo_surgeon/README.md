# 錯別字手術室 (The Typo Surgeon)

一個專為中一學生設計的中文錯別字學習遊戲。

## 遊戲簡介

玩家扮演「文字醫生」，需要找出文章中的錯別字並進行修正，拯救「病人」（文章）。

## 技術棧

- React 18
- Tailwind CSS
- Lucide React (圖標)
- Vite

## 安裝與運行

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 構建生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 部署到 GitHub Pages

### 自動部署（推薦）

1. **啟用 GitHub Pages**
   - 進入 GitHub 倉庫的 Settings > Pages
   - Source 選擇 **"GitHub Actions"**
   - 保存設置

2. **推送代碼**
   - 當你推送代碼到 `main` 或 `master` 分支時
   - GitHub Actions 會自動構建和部署
   - 可以在 Actions 標籤頁查看部署進度

3. **訪問網站**
   - 部署完成後，訪問：`https://YOUR_USERNAME.github.io/Profile/PrimaryChinese/typo_surgeon/`

### 手動部署

如果需要手動構建和部署：

```bash
# 構建專案
npm run build

# dist 文件夾會包含構建後的文件
# 將 dist 文件夾的內容部署到 GitHub Pages
```

## 遊戲特色

- 🏥 醫療主題界面設計
- 🎯 互動式文字點擊
- 💚 生命值系統
- 📊 分數統計
- 📚 多關卡設計
- 💡 詳細解釋說明

## 遊戲玩法

1. 閱讀文章內容
2. 點擊文章中的錯誤字符
3. 從選項中選擇正確的字
4. 成功修正可獲得解釋說明
5. 錯誤選擇會降低生命值
6. 修正所有錯別字即可過關

## 關卡

目前包含 3 個關卡，涵蓋常見的錯別字：
- 躁/燥
- 辯/辨/辦
- 即使/既然
- 佈/布

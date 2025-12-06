# 修辭防衛戰 (Rhetoric Defense)

一個以塔防遊戲為基礎的中文修辭學習遊戲，適合中一學生學習修辭手法。

## 遊戲簡介

玩家需要識別句子中的修辭手法（擬人、比喻、誇張、排比），點擊正確的按鈕來擊敗敵人。如果敵人到達左側基地，遊戲就會結束。

## 遊戲特色

- 🎮 塔防風格遊戲玩法
- 📚 學習四種修辭手法：擬人、比喻、誇張、排比
- 🎨 中國水墨畫風格背景
- ⚡ 流暢的動畫效果（使用 framer-motion）
- 📈 難度隨分數增加而提升

## 技術棧

- React 18
- Vite
- Framer Motion
- CSS3

## 安裝與運行

### 前置需求

- Node.js 16+ 
- npm 或 yarn

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

遊戲將在 `http://localhost:3001` 開啟

### 構建生產版本

```bash
npm run build
```

## 遊戲玩法

1. 點擊「開始遊戲」按鈕
2. 敵人會從右側出現，攜帶一個句子
3. 識別句子中的修辭手法
4. 點擊底部對應的修辭手法按鈕來擊敗敵人
5. 正確擊敗敵人獲得10分
6. 錯誤點擊會扣5分
7. 如果敵人到達左側基地，遊戲結束

## 修辭手法

- **擬人** (Personification): 將非人類的事物賦予人類的特徵
- **比喻** (Metaphor): 用一個事物來比喻另一個事物
- **誇張** (Exaggeration): 誇大描述事物的特徵
- **排比** (Parallelism): 使用結構相似的句子排列

## 項目結構

```
Rhetoric_Defense/
├── src/
│   ├── components/
│   │   ├── Enemy.jsx          # 敵人組件
│   │   ├── Enemy.css
│   │   ├── DefenseButtons.jsx # 防禦按鈕組件
│   │   ├── DefenseButtons.css
│   │   ├── GameOverModal.jsx  # 遊戲結束彈窗
│   │   └── GameOverModal.css
│   ├── data/
│   │   └── rhetoricalDevices.js # 修辭例句資料庫
│   ├── App.jsx                # 主遊戲邏輯
│   ├── App.css                # 主樣式（包含水墨畫背景）
│   ├── main.jsx               # 入口文件
│   └── index.css              # 全局樣式
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 自定義

### 添加新的修辭例句

編輯 `src/data/rhetoricalDevices.js`，在對應的修辭類型陣列中添加新對象：

```javascript
{ sentence: "你的句子", type: "Personification", chinese: "擬人" }
```

### 調整遊戲難度

在 `src/App.jsx` 中修改：

- `getEnemySpeed()`: 調整敵人速度計算
- 敵人生成間隔: 修改 `setInterval` 中的時間參數

## 授權

本項目僅供教育用途。

# 語文百萬富翁

一個專為中一學生設計的中文學習遊戲，結合 React、Three.js 和 HTML5 技術。

## 遊戲特色

- 🎮 經典的「誰想成為百萬富翁」遊戲玩法
- 🎨 使用 Three.js 創建的 3D 視覺效果
- 📚 15 道適合中一學生的中文題目
- 💰 15 個獎金等級，最高獎金 $1,000,000
- 🆘 三種生命線：50/50、打電話給朋友、問觀眾
- 🎯 安全線機制，保證最低獎金

## 技術棧

- **React 18** - 用戶界面框架
- **Three.js** - 3D 圖形渲染
- **@react-three/fiber** - React 的 Three.js 渲染器
- **@react-three/drei** - Three.js 實用工具
- **Vite** - 構建工具

## 安裝和運行

### 本地開發

#### 安裝依賴

```bash
npm install
```

#### 開發模式

```bash
npm run dev
```

遊戲將在 `http://localhost:3000` 運行

#### 構建生產版本

```bash
npm run build
```

#### 預覽生產版本

```bash
npm run preview
```

### GitHub Pages 部署

#### 方法一：自動部署（推薦）

1. 將代碼推送到 GitHub 倉庫
2. 在倉庫 Settings > Pages 中選擇 "GitHub Actions" 作為來源
3. 每次推送到 main 分支會自動部署

詳細說明請查看 [GITHUB_SETUP.md](./GITHUB_SETUP.md)

#### 方法二：手動部署

```bash
npm install --save-dev gh-pages
npm run deploy
```

這會將構建後的文件部署到 `gh-pages` 分支。

## 遊戲規則

1. 玩家需要回答 15 道中文題目
2. 每道題目有 4 個選項，只有一個正確答案
3. 答對可以繼續下一題，答錯則遊戲結束
4. 玩家可以隨時選擇退出，帶走當前獎金
5. 在安全線（第 4、8、12 題）答錯，可以獲得保證獎金
6. 每種生命線只能使用一次：
   - **50/50**: 移除兩個錯誤答案
   - **打電話**: 獲得朋友的建議（70% 準確率）
   - **問觀眾**: 查看觀眾投票結果

## 獎金等級

1. $100
2. $200
3. $300
4. $500 (安全線)
5. $1,000
6. $2,000
7. $4,000
8. $8,000 (安全線)
9. $16,000
10. $32,000
11. $64,000
12. $125,000 (安全線)
13. $250,000
14. $500,000
15. $1,000,000

## 題目類別

題目涵蓋以下中文學習範疇：
- 詞彙（同義詞、反義詞）
- 語法（詞性、句子成分）
- 成語（含義、用法）
- 修辭手法
- 文學常識

## 項目結構

```
語文百萬富翁/
├── src/
│   ├── components/        # React 組件
│   │   ├── GameScene.jsx      # Three.js 3D 場景
│   │   ├── QuestionPanel.jsx  # 問題顯示面板
│   │   ├── PrizeLadder.jsx    # 獎金等級顯示
│   │   ├── Lifelines.jsx      # 生命線組件
│   │   └── GameOverModal.jsx  # 遊戲結束模態框
│   ├── data/
│   │   └── questions.js        # 題目數據庫
│   ├── App.jsx            # 主應用組件
│   ├── App.css            # 主樣式文件
│   ├── main.jsx           # 應用入口
│   └── index.css          # 全局樣式
├── index.html             # HTML 模板
├── package.json           # 項目配置
├── vite.config.js         # Vite 配置
└── README.md             # 項目說明
```

## 開發說明

### 添加新題目

編輯 `src/data/questions.js` 文件，按照現有格式添加新題目：

```javascript
{
  question: "問題內容",
  options: ["選項A", "選項B", "選項C", "選項D"],
  correct: 0, // 正確答案的索引 (0-3)
  explanation: "解釋說明"
}
```

### 自定義 3D 場景

編輯 `src/components/GameScene.jsx` 來修改 Three.js 3D 場景。

### 調整獎金等級

在 `src/App.jsx` 中修改 `prizeLevels` 數組。

## 瀏覽器支持

- Chrome (推薦)
- Firefox
- Safari
- Edge

## 許可證

本項目僅供教育用途使用。

## 作者

Prepared by SF Lau

---

*「耶和華用能力創造大地，用智慧建立世界，用聰明鋪張穹蒼。」 耶利米書 10:12*


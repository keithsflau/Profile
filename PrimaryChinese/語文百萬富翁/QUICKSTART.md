# 快速開始指南

## 安裝步驟

1. 打開終端機（Terminal）或命令提示字元（Command Prompt）

2. 進入項目目錄：
```bash
cd PrimaryChinese/語文百萬富翁
```

3. 安裝依賴：
```bash
npm install
```

4. 啟動開發伺服器：
```bash
npm run dev
```

5. 在瀏覽器中打開顯示的網址（通常是 http://localhost:3000）

## 遊戲玩法

1. 點擊「開始遊戲」按鈕
2. 閱讀問題並選擇答案
3. 點擊「確認答案」
4. 答對可以繼續下一題，答錯則遊戲結束
5. 可以使用生命線幫助答題：
   - **50/50**: 移除兩個錯誤答案
   - **打電話**: 獲得朋友建議
   - **問觀眾**: 查看觀眾投票
6. 隨時可以選擇「退出遊戲」帶走當前獎金

## 獎金等級

- 第 4、8、12 題是安全線
- 在安全線答錯可以獲得保證獎金
- 最高獎金：$1,000,000

## 故障排除

### 如果 npm install 失敗

確保已安裝 Node.js（版本 16 或以上）：
```bash
node --version
```

如果沒有安裝 Node.js，請訪問 https://nodejs.org/ 下載安裝。

### 如果端口被佔用

修改 `vite.config.js` 中的端口號：
```javascript
server: {
  port: 3001, // 改為其他端口
}
```

### 如果 Three.js 無法載入

確保所有依賴都已正確安裝：
```bash
npm install --force
```

## 部署到 GitHub Pages

1. 構建項目：
```bash
npm run build
```

2. 將 `dist` 文件夾的內容上傳到 GitHub Pages

或者使用 GitHub Actions 自動部署（需要配置工作流程文件）


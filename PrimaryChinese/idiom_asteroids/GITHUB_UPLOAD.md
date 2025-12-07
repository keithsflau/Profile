# 上傳到 GitHub 的簡單步驟

## 方法 1: 創建獨立 Repository (推薦)

### 步驟：

1. **在 GitHub 創建新 Repository**
   - 前往 https://github.com/new
   - Repository 名稱：`idiom-asteroids` 或 `成語太空戰機`
   - 選擇 Public
   - **不要**初始化 README、.gitignore 或 license
   - 點擊 "Create repository"

2. **在本地執行以下命令**：

```bash
# 確保在項目目錄
cd PrimaryChinese/idiom_asteroids

# 移除現有的遠程倉庫（如果有的話）
git remote remove origin

# 添加新的遠程倉庫（替換為你的 repository URL）
git remote add origin https://github.com/keithsflau/idiom-asteroids.git

# 確保所有文件已添加
git add .

# 提交（如果還沒有提交）
git commit -m "Initial commit: 成語太空戰機"

# 推送到 GitHub
git push -u origin main
```

3. **啟用 GitHub Pages**：
   - 前往 Repository Settings → Pages
   - Source: 選擇 "GitHub Actions"
   - 保存

4. **等待自動部署**：
   - GitHub Actions 會自動構建和部署
   - 幾分鐘後，遊戲將在 `https://keithsflau.github.io/idiom-asteroids` 可用

## 方法 2: 推送到現有的 Profile Repository

如果你想把遊戲保留在 Profile repository 中：

```bash
# 確保在項目目錄
cd PrimaryChinese/idiom_asteroids

# 添加所有文件
git add .

# 提交
git commit -m "Add idiom asteroids game"

# 推送到 Profile repository
git push origin main
```

**注意**：如果 Profile repository 已經有 index.html，可能會需要解決衝突。

## 驗證部署

部署成功後：
1. 前往 Repository → Actions 標籤頁
2. 查看部署進度
3. 部署完成後，訪問 GitHub Pages URL
4. 測試遊戲是否正常運行

## 故障排除

### 如果推送失敗：
```bash
# 先拉取遠程更改
git pull origin main --rebase

# 解決任何衝突後
git push origin main
```

### 如果 GitHub Actions 失敗：
1. 檢查 `.github/workflows/deploy.yml` 文件是否存在
2. 確保 Repository Settings → Actions → General → Workflow permissions 設置為 "Read and write permissions"
3. 查看 Actions 標籤頁中的錯誤日誌


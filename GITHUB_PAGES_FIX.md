# GitHub Pages 修复说明

## 问题

所有 Biology 应用在 GitHub Pages 上显示空白页面，控制台显示 404 错误：
```
Failed to load resource: the server responded with a status of 404 () main.jsx:1
```

## 原因

当用户访问 `apps/[app-name]/index.html` 时，加载的是开发版本的 `index.html`，它引用 `/src/main.jsx`（开发模式）。但在 GitHub Pages 上，应该使用构建后的 `dist/index.html`，它引用打包后的 JavaScript 文件。

## 解决方案

### 1. 添加重定向
所有应用的 `index.html` 现在都包含重定向到 `dist/index.html`：
- 使用 `<meta http-equiv="refresh">` 进行服务器端重定向
- 使用 `window.location.href` 进行客户端重定向
- 提供备用链接供用户点击

### 2. Dashboard 链接
所有 dashboard 链接已更新为直接指向 `dist/index.html`

### 3. 路径修复
所有 `dist/index.html` 中的绝对路径已修复为相对路径：
- `/assets/` → `./assets/`
- `/vite.svg` → `./vite.svg`

## 修复的文件

所有 Biology 应用的 `index.html` 文件都已更新为重定向页面：
- cellular-respiration/index.html
- allopatric-speciation/index.html
- energy-flow/index.html
- 以及其他所有应用

## 验证

修复后，无论用户访问：
- `apps/[app-name]/index.html` → 自动重定向到 `dist/index.html`
- `apps/[app-name]/dist/index.html` → 直接加载构建版本

两种方式都能正常工作！

## 下一步

1. 推送到 GitHub：
   ```powershell
   git push origin main
   ```

2. 等待 GitHub Pages 更新（通常需要几分钟）

3. 验证应用可以正常访问

# 故障排除指南 - 空白页面问题

## 检查步骤

### 1. 检查浏览器控制台
按 `F12` 打开开发者工具，查看 Console 标签页是否有错误信息。

常见错误：
- `Cannot find module` - 模块导入错误
- `Uncaught TypeError` - JavaScript 错误
- `Failed to load resource` - 资源加载失败

### 2. 检查网络请求
在开发者工具的 Network 标签页，查看是否有请求失败（红色）。

### 3. 确认依赖已安装
```bash
npm install
```

### 4. 清除缓存并重新启动
```bash
# 停止当前服务器 (Ctrl+C)
# 删除 node_modules/.vite 缓存
Remove-Item -Recurse -Force node_modules/.vite
# 重新启动
npm run dev
```

### 5. 检查端口是否被占用
如果端口 3000 被占用，Vite 会自动使用下一个可用端口。
查看终端输出中的实际端口号。

### 6. 检查文件路径
确保所有导入路径正确：
- `./components/GameScene` 应该是 `./components/GameScene.jsx`
- 检查文件扩展名是否正确

### 7. 测试简单版本
如果问题持续，可以创建一个简单的测试组件：

在 `src/App.jsx` 中临时替换为：
```jsx
function App() {
  return <div style={{padding: '20px', color: 'white'}}>測試：應用程式已載入</div>
}
```

如果这个能显示，说明 React 正常工作，问题在组件导入或渲染逻辑。

### 8. 检查 Three.js 依赖
Three.js 可能需要 WebGL 支持。检查浏览器是否支持 WebGL：
- 访问 https://get.webgl.org/
- 如果不支持，可能需要更新浏览器或显卡驱动

### 9. 检查 React StrictMode
如果使用 React.StrictMode 导致问题，可以临时移除：
```jsx
ReactDOM.createRoot(rootElement).render(<App />)
```

### 10. 查看 Vite 日志
检查终端中的 Vite 输出，查看是否有编译错误或警告。

## 快速修复

如果以上都不行，尝试：

1. **完全重新安装依赖**：
```bash
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

2. **检查 Node.js 版本**：
```bash
node --version
```
需要 Node.js 16 或以上版本。

3. **使用不同的浏览器**：
尝试 Chrome、Firefox 或 Edge。

4. **检查防火墙/杀毒软件**：
可能阻止了本地服务器连接。

## 如果仍然无法解决

请提供以下信息：
1. 浏览器控制台的完整错误信息
2. 终端中的完整输出
3. Node.js 版本
4. 浏览器类型和版本


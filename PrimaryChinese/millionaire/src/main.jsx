import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 确保 root 元素存在
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('找不到 #root 元素！')
}

// 清除加载提示
rootElement.innerHTML = ''

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} catch (error) {
  console.error('React 渲染錯誤:', error)
  rootElement.innerHTML = `
    <div style="padding: 20px; color: white; background: red; text-align: center;">
      <h1>錯誤：無法載入應用程式</h1>
      <p>${error.message}</p>
      <p>請檢查瀏覽器控制台以獲取更多信息</p>
    </div>
  `
}


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // 🌟 確保引入的是上面的 App
import './index.css' // 你的 Tailwind 樣式

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App /> {/* 🌟 這裡渲染 <App /> */}
  </React.StrictMode>,
)
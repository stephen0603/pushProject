// src/pages/404.tsx
import React from "react"
import { Link } from "react-router-dom"

export default function Page404(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 select-none">
      <div className="text-center max-w-md w-full">
        {/* 大大的 404 數字 */}
        <h1 className="text-9xl font-extrabold text-indigo-600 tracking-widest drop-shadow-sm animate-pulse">
          404
        </h1>
        
        {/* 裝飾線與標題 */}
        <div className="bg-indigo-600 text-white px-2 text-sm rounded rotate-12 absolute transform -translate-y-16 translate-x-32 hidden sm:block">
          Page Not Found
        </div>

        <h2 className="mt-6 text-3xl font-bold text-gray-900 tracking-tight">
          糟糕！網頁迷路了
        </h2>
        
        <p className="mt-4 text-base text-gray-500 leading-relaxed">
          您尋找的頁面可能已經被移走、更名，或者暫時無法使用。別擔心，點擊下方按鈕就能回到安全的地方。
        </p>

        {/* 按鈕 */}
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            返回首頁
          </Link>
        </div>
      </div>
    </div>
  )
}
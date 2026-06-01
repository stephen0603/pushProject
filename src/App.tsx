import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import LoginPage from "@/pages/LoginPage"
import DashboardPage from "@/pages/DashboardPage"
import ForgotPassWord from "@/pages/ForgotPassWord"
import NotFoundPage from "@/pages/404"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 當網址是 / 時，顯示登入頁 */}
        <Route path="/" element={<LoginPage />} />
        
        {/* 當網址是 /dashboard 時，顯示後台頁 */}
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* 當網址是 /forgot-password 時，顯示忘記密碼頁 */}
        <Route path="/forgotPassword" element={<ForgotPassWord />} />

        {/* 2. 萬用路由：當以上網址都不匹配時，顯示 404 頁面 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
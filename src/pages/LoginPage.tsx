import { useState } from "react"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // 🌟 現代化寫法：移除 FormEvent，改用原生的 FormData
  const handleSignIn = async (formData: FormData) => {
    // 如果未來要接 API，可以直接這樣抓欄位數值：
    const email = formData.get("email")
    const password = formData.get("password")
    console.log("登入資料：", { email, password })
    
    // 💡 這裡放你的登入驗證 API ...
    
    // 驗證成功後，使用 navigate 跳轉頁面
    navigate("/dashboard") 
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* --- Left Column: Form --- */}
      <div className="flex items-center justify-center bg-white px-6 md:px-20 py-10">
        <div className="w-full max-w-[420px]">
          {/* Header / Logo */}
          <div className="mb-10 text-center">
            <div className="mb-4 flex flex-col items-center gap-4">
              <div
                className="
                  flex
                  h-[64px]
                  w-[64px]
                  items-center
                  justify-center
                  rounded-[20px]
                  bg-gradient-to-b
                  from-[#7F7FD5]
                  to-[#86A8E7]
                  text-white
                  shadow-[0_8px_16px_rgba(134,168,231,0.3)]
                "
              >
                {/* Simulated Notification Bell Icon */}
                <div className="relative h-7 w-7">
                  <div className="absolute top-[2px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white opacity-90" />
                  <div className="absolute top-1.5 left-1/2 h-4 w-5 -translate-x-1/2 rounded-t-full bg-white" />
                  <div className="absolute bottom-[2px] left-1/2 h-[3px] w-[24px] -translate-x-1/2 rounded-full bg-white" />
                  <div className="absolute -bottom-[2px] left-1/2 h-1.5 w-2 -translate-x-1/2 rounded-b-full bg-white opacity-80" />
                </div>
              </div>

              <h1 className="text-[32px] font-semibold tracking-tight text-[#0F172A]">
                Promotion center
              </h1>
            </div>

            <p className="text-base text-slate-400">
              Welcome back
            </p>
          </div>

          {/* 🌟 修改點 1：將 onSubmit 改為 action={handleSignIn} */}
          <form className="space-y-6" action={handleSignIn}>
            {/* Email Field */}
            <div>
              <Label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  type="email"
                  name="email" // 🌟 修改點 2：加入 name 屬性，方便 FormData 抓取
                  placeholder="test@gmail.com"
                  className="
                    h-13
                    rounded-xl
                    border-slate-200
                    pl-12
                    text-base
                    placeholder:text-slate-300
                    focus-visible:ring-2
                    focus-visible:ring-[#86A8E7]
                  "
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <Label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password" // 🌟 修改點 3：加入 name 屬性
                  placeholder="••••••••"
                  className="
                    h-13
                    rounded-xl
                    border-slate-200
                    pl-12
                    pr-12
                    text-base
                    tracking-widest
                    placeholder:text-slate-300
                    focus-visible:ring-2
                    focus-visible:ring-[#86A8E7]
                  "
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-[#4E54C8] focus:ring-[#86A8E7]"
                />
                Remember me
              </label>
              <button
                type="button"
                className="font-medium text-[#5B63E4] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            {/* 🌟 修改點 4：明確加上 type="submit" 觸發點擊送出 */}
            <Button
              type="submit"
              className="
                h-13
                w-full
                rounded-xl
                bg-[#0B0F19]
                text-base
                font-medium
                text-white
                hover:bg-[#151B2C]
                transition-colors
              "
            >
              Sign In
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-1">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-sm text-slate-400">or</span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            {/* Google Sign In */}
            <Button
              type="button"
              variant="outline"
              className="
                h-13
                w-full
                rounded-xl
                border-slate-200
                bg-white
                text-base
                font-medium
                text-slate-700
                hover:bg-slate-50
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {/* SVG Google Logo */}
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.314 2.673 1.34 6.577l3.926 3.188z"
                />
                <path
                  fill="#4285F4"
                  d="M23.491 12.275c0-.796-.073-1.564-.205-2.305H12v4.355h6.436a5.524 5.524 0 01-2.4 3.627l3.745 2.905c2.191-2.023 3.71-5 3.71-8.587z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.266 14.235A7.115 7.115 0 014.909 12c0-.782.132-1.532.357-2.235L1.34 6.577A11.942 11.942 0 000 12c0 1.923.455 3.74 1.259 5.364l4.007-3.129z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.955-1.077 7.94-2.918l-3.745-2.905c-1.037.695-2.364 1.11-4.195 1.11-3.227 0-5.96-2.182-6.936-5.123L1.26 17.29A11.944 11.944 0 0012 24z"
                />
              </svg>
              Continue with Google
            </Button>

            {/* Footer Sign Up Link */}
            <p className="text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <span className="cursor-pointer font-semibold text-[#5B63E4] hover:underline">
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* --- Right Column: Cover Image (保持你的最新設計) --- */}
      <div className="relative hidden overflow-hidden lg:flex">
        <div className="absolute inset-0 z-10">
          <img
            src="/coverImage.png"
            alt="Promotion Center 3D Graphics"
            className="h-full w-full object-contain"
          />
        </div>
        <div
          className="
            absolute
            inset-0
            z-20
            bg-gradient-to-br
            from-indigo-500/10
            via-white/5
            to-purple-500/10
          "
        />
      </div>
    </div>
  )
}
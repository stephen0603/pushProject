import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function ForgotPasswordPage() {
  const [countdown, setCountdown] = useState(() => {
  const expireTime = localStorage.getItem(
    "forgotPasswordExpire"
  )

  if (!expireTime) return 0

  const remain = Math.floor(
    (Number(expireTime) - Date.now()) / 1000
  )

  return remain > 0 ? remain : 0
})

  // 倒數計時
  useEffect(() => {
    if (countdown <= 0) {
      localStorage.removeItem("forgotPasswordExpire")
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown])

  const handleSubmit = async (formData: FormData) => {
    // 已在倒數中
    if (countdown > 0) return

    const email = formData.get("email")

    console.log(email)

    // TODO:
    // 呼叫 reset password API

    alert("Reset password email sent!")

    // 設定 60 秒後到期
    const expireTime = Date.now() + 60000

    // 存入 localStorage
    localStorage.setItem(
      "forgotPasswordExpire",
      expireTime.toString()
    )

    // 開始倒數
    setCountdown(60)
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left */}
      <div className="flex items-center justify-center bg-white px-6 md:px-20 py-10">
        <div className="w-full max-w-[420px]">
          {/* Header */}
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
                  from-[#F6C453]
                  to-[#F59E0B]
                  text-white
                  shadow-[0_8px_16px_rgba(255,184,0,0.35)]
                "
              >
                <Mail className="h-7 w-7" />
              </div>

              <h1 className="text-[32px] font-semibold tracking-tight text-[#0F172A]">
                Forgot Password
              </h1>
            </div>

            <p className="text-base text-slate-400">
              Enter your email to receive a reset link
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" action={handleSubmit}>
            <div>
              <Label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </Label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  type="email"
                  name="email"
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

            {/* Submit */}
            <Button
              type="submit"
              disabled={countdown > 0}
              className="
                h-13
                w-full
                rounded-xl
                bg-[#0B0F19]
                text-base
                font-medium
                text-white
                hover:bg-[#151B2C]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {countdown > 0
                ? `Resend in ${countdown}s`
                : "Send Reset Link"}
            </Button>

            {/* Back */}
            <div className="text-center">
              <Link
                to="/"
                className="text-sm font-medium text-[#5B63E4] hover:underline"
              >
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative hidden overflow-hidden lg:flex">
        <div className="absolute inset-0 z-10">
          <img
            src="/forgotImage.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div
          className="
            absolute
            inset-0
            z-20
            bg-gradient-to-br
            from-yellow-500/10
            via-white/5
            to-orange-500/10
          "
        />
      </div>
    </div>
  )
}
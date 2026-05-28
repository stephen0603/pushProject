import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <Card className="w-[400px] shadow-xl">
        <CardContent className="p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">
              Login
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Welcome back
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <Label>Email</Label>

              <Input
                type="email"
                placeholder="test@gmail.com"
              />
            </div>

            <div>
              <Label>Password</Label>

              <Input
                type="password"
                placeholder="******"
              />
            </div>

            <Button className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
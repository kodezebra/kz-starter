import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { signOut, useSession } from "@/lib/auth"

export function AppHeader() {
  const { data: session } = useSession()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate("/auth/signin")
  }

  return (
    <header className="h-14 border-b bg-background flex items-center px-6 justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {session?.user && (
          <span className="text-sm text-zinc-500 hidden sm:inline-block">
            {session.user.email}
          </span>
        )}
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          Logout
        </Button>
      </div>
    </header>
  )
}
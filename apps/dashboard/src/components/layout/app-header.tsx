import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function AppHeader() {
  return (
    <header className="h-14 border-b bg-background flex items-center px-6 justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          Logout
        </Button>
      </div>
    </header>
  )
}

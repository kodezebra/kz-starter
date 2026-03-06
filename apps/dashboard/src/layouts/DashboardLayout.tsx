import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/components/layout/app-siderbar"
import { AppHeader } from "@/components/layout/app-header"

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

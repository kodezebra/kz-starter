import { LayoutDashboard, FileText, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Pages",
    href: "/pages",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={cn(
      "border-r bg-sidebar hidden md:flex flex-col transition-all duration-300 relative",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className={cn(
        "h-14 flex items-center border-b font-semibold overflow-hidden whitespace-nowrap transition-all duration-300",
        isCollapsed ? "px-4 justify-center" : "px-6"
      )}>
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded bg-primary flex-shrink-0" />
          {!isCollapsed && <span>CMS Dashboard</span>}
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-hidden">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200 whitespace-nowrap overflow-hidden",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  isCollapsed && "justify-center px-0 w-10 h-10 mx-auto"
                )
              }
              title={isCollapsed ? item.title : ""}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && <span className="transition-opacity duration-300">{item.title}</span>}
            </NavLink>
          )
        })}
      </nav>

      <div className="p-3 border-t">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full h-9 hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : (
            <div className="flex items-center gap-2 px-1 w-full">
              <ChevronLeft className="h-4 w-4" />
              <span className="text-xs font-medium">Collapse</span>
            </div>
          )}
        </Button>
      </div>
    </aside>
  )
}

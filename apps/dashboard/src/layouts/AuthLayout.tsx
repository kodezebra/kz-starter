import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl border border-zinc-200 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900">KZ CMS</h1>
          <p className="text-zinc-500 mt-1">Manage your site with ease</p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

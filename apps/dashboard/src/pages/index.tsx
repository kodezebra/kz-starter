export default function Overview() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">Welcome back to your dashboard!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Placeholder cards */}
        <div className="p-6 border rounded-lg bg-card">
          <p className="text-sm font-medium text-muted-foreground uppercase">Status</p>
          <p className="text-2xl font-bold text-green-600">Active</p>
        </div>
      </div>
    </div>
  )
}
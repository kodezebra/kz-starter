import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, MoreVertical, Trash, Edit2 } from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function PagesList() {
  const [pages, setPages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    loadPages()
  }, [])

  const loadPages = async () => {
    try {
      const data = await api.get("/pages") as any[]
      setPages(data)
    } catch (error) {
      toast.error("Failed to load pages")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return

    try {
      await api.delete(`/pages/${id}`)
      toast.success("Page deleted")
      loadPages()
    } catch (error) {
      toast.error("Failed to delete page")
    }
  }

  const filteredPages = pages.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="p-8 text-center">Loading pages...</div>

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground">Manage your website content.</p>
        </div>
        <Button asChild>
          <Link to="/pages/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Page
          </Link>
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search pages..."
          className="w-full bg-background border rounded-md pl-10 pr-4 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filteredPages.length > 0 ? (
          filteredPages.map((page) => (
            <Card key={page.id} className="p-4 flex items-center justify-between group hover:border-blue-500/50 transition-colors">
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{page.title}</span>
                <span className="text-sm text-muted-foreground">/{page.slug}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant={page.isPublished ? "default" : "secondary"}>
                  {page.isPublished ? "Published" : "Draft"}
                </Badge>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/pages/${page.id}`} className="flex items-center">
                        <Edit2 className="h-4 w-4 mr-2" /> Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600 focus:text-red-600 focus:bg-red-50"
                      onClick={() => handleDelete(page.id)}
                    >
                      <Trash className="h-4 w-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center p-12 border-2 border-dashed rounded-lg text-muted-foreground">
            No pages found.
          </div>
        )}
      </div>
    </div>
  )
}

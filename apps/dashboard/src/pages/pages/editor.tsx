import { useState, useEffect } from 'react';
import { Save, Settings, ChevronLeft } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';

// Modular Components
import { BLOCK_TYPES } from './components/config';
import { LayerTree } from './components/layer-tree';
import { Canvas } from './components/canvas';
import { Inspector } from './components/inspector';
import { AddBlockModal } from './components/add-block-modal';

export default function PageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState<any[]>([]);
  const [page, setPage] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (id && id !== 'new' && id !== 'global') {
      loadPage();
    } else if (id === 'global') {
      loadGlobalBlocks();
    } else {
      setPage({ title: 'New Page', slug: 'new-page' });
      setBlocks([
        { id: `b_initial`, type: 'hero', content: { ...BLOCK_TYPES.hero.defaultContent } }
      ]);
      setLoading(false);
      // Automatically open settings for new pages
      setIsSettingsOpen(true);
    }
  }, [id]);

  const loadGlobalBlocks = async () => {
    try {
      setPage({ title: 'Global Blocks', slug: 'global' });
      const blocksData = await api.get(`/blocks/page/global`) as any[];
      
      const hydratedBlocks = (blocksData || []).map((b: any) => {
        const config = BLOCK_TYPES[b.type];
        if (!config) return b;
        return {
          ...b,
          content: { ...config.defaultContent, ...b.content }
        };
      });
      
      setBlocks(hydratedBlocks);
    } catch (error) {
      toast.error('Failed to load global blocks');
      navigate('/settings');
    } finally {
      setLoading(false);
    }
  };

  const loadPage = async () => {
    try {
      const pageData = await api.get(`/pages/${id}`) as any;
      setPage(pageData);
      
      const blocksData = await api.get(`/blocks/page/${pageData.id}`) as any[];
      
      const hydratedBlocks = (blocksData || []).map((b: any) => {
        const config = BLOCK_TYPES[b.type];
        if (!config) return b;
        return {
          ...b,
          content: { ...config.defaultContent, ...b.content }
        };
      });
      
      setBlocks(hydratedBlocks);
    } catch (error) {
      toast.error('Failed to load page');
      navigate('/pages');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBlock = (blockId: string, newContent: any) => {
    setBlocks(prev => prev.map(b => b.id === blockId ? { ...b, content: newContent } : b));
  };

  const handleMoveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(b => b.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const handleDeleteBlock = (blockId: string) => {
    if (confirm('Delete this block?')) {
      setBlocks(prev => prev.filter(b => b.id !== blockId));
      if (selectedId === blockId) setSelectedId(null);
    }
  };

  const handleAddBlock = (typeId: string) => {
    const typeConfig = BLOCK_TYPES[typeId];
    const newBlock = {
      id: `b_${Date.now()}`,
      type: typeId,
      content: { ...typeConfig.defaultContent }
    };
    
    setBlocks(prev => [...prev, newBlock]);
    setIsModalOpen(false);
    setSelectedId(newBlock.id);
  };

  const handleSave = async () => {
    try {
      let pageId = id;
      
      const pageData = { 
        title: page.title, 
        slug: page.slug, 
        isPublished: page.isPublished || false 
      };

      if (id === 'new') {
        const newPage = await api.post('/pages', pageData) as any;
        pageId = newPage.id;
      } else if (id !== 'global') {
        await api.put(`/pages/${id}`, pageData);
      }

      if (pageId) {
        await api.put(`/blocks/page/${pageId}`, blocks);
      }
      
      toast.success(id === 'global' ? 'Global blocks saved' : 'Page saved successfully');
      navigate(id === 'global' ? '/settings' : '/pages');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save page');
    }
  };

  if (loading) return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-muted/10">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading editor...</p>
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-background text-foreground overflow-hidden">
      <div className="h-14 border-b flex items-center justify-between px-6 shrink-0 z-10 bg-card">
        <div className="flex items-center gap-4">
          <Link 
            to={id === 'global' ? "/settings" : "/pages"} 
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{page?.title}</span>
            {id !== 'global' && (
              <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">/{page?.slug}</code>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {id !== 'global' && (
            <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings size={16} className="mr-2" /> Page Settings
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Page Settings</SheetTitle>
                  <SheetDescription>
                    Configure the basic information for this page.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="page-title">Page Title</Label>
                    <Input 
                      id="page-title" 
                      value={page?.title || ''} 
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        const newSlug = id === 'new' ? newTitle.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : page.slug;
                        setPage({ ...page, title: newTitle, slug: newSlug });
                      }}
                      placeholder="My Page"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="page-slug">Page Slug</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">/</span>
                      <Input 
                        id="page-slug" 
                        className="pl-6"
                        value={page?.slug || ''} 
                        onChange={(e) => setPage({ ...page, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                        placeholder="my-page"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                    <div className="space-y-0.5">
                      <Label htmlFor="page-publish">Publish Page</Label>
                      <p className="text-xs text-muted-foreground">Make this page visible to the public.</p>
                    </div>
                    <Switch 
                      id="page-publish" 
                      checked={page?.isPublished || false} 
                      onCheckedChange={(checked) => setPage({ ...page, isPublished: checked })}
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Done</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          )}
          <Button onClick={handleSave} size="sm" className="shadow-md">
            <Save size={16} className="mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <LayerTree 
          blocks={blocks} 
          selectedId={selectedId} 
          onSelect={setSelectedId}
          onMove={handleMoveBlock}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={() => setIsModalOpen(true)}
        />
        <Canvas 
          blocks={blocks} 
          selectedId={selectedId} 
          onSelect={setSelectedId} 
        />
        <Inspector 
          block={blocks.find(b => b.id === selectedId)} 
          onUpdate={handleUpdateBlock}
          onDelete={handleDeleteBlock}
        />
      </div>

      <AddBlockModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddBlock} 
      />
    </div>
  );
}


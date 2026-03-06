import { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import { 
  Layout, Image as ImageIcon, Type, AlignVerticalSpaceAround, 
  Search, Plus, Trash, Save, X, Settings, Upload, HelpCircle
} from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// --- 1. Configuration & Data ---

const BLOCK_TYPES: any = {
  hero: {
    id: 'hero',
    label: 'Hero Section',
    icon: Layout,
    defaultContent: { title: 'New Hero', description: 'Subheadline goes here', bg: '#ffffff', color: '#000000' },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Subheadline', type: 'textarea' },
      { key: 'bg', label: 'Background Color', type: 'color' },
      { key: 'color', label: 'Text Color', type: 'color' },
    ]
  },
  text: {
    id: 'text',
    label: 'Text Block',
    icon: Type,
    defaultContent: { body: 'Enter your text content here...' },
    fields: [
      { key: 'body', label: 'Body Content', type: 'textarea' }
    ]
  },
  image: {
    id: 'image',
    label: 'Image',
    icon: ImageIcon,
    defaultContent: { url: 'https://picsum.photos/seed/react/800/400', alt: 'Description' },
    fields: [
      { key: 'url', label: 'Image Source', type: 'file' },
      { key: 'alt', label: 'Alt Text', type: 'text' },
    ]
  },
  spacer: {
    id: 'spacer',
    label: 'Spacer',
    icon: AlignVerticalSpaceAround,
    defaultContent: { height: 50 },
    fields: [
      { key: 'height', label: 'Height (px)', type: 'number' }
    ]
  },
  features: {
    id: 'features',
    label: 'Features',
    icon: Layout,
    defaultContent: { 
      title: 'Our Features', 
      description: 'What we offer',
      items: [
        { title: 'Feature 1', description: 'Detail about this feature.', icon: 'Zap' },
        { title: 'Feature 2', description: 'Detail about this feature.', icon: 'Shield' },
        { title: 'Feature 3', description: 'Detail about this feature.', icon: 'Star' },
      ]
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { 
        key: 'items', 
        label: 'Feature Items', 
        type: 'list', 
        itemFields: [
          { key: 'icon', label: 'Icon Name (Lucide)', type: 'icon' },
          { key: 'title', label: 'Item Title', type: 'text' },
          { key: 'description', label: 'Item Description', type: 'textarea' },
        ]
      }
    ]
  },
  cta: {
    id: 'cta',
    label: 'Call to Action',
    icon: Layout,
    defaultContent: { title: 'Ready to start?', buttonText: 'Get Started' },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'buttonText', label: 'Button Text', type: 'text' },
    ]
  },
  newsletter: {
    id: 'newsletter',
    label: 'Newsletter',
    icon: Layout,
    defaultContent: { title: 'Subscribe', description: 'Get updates' },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ]
  },
  'social-proof': {
    id: 'social-proof',
    label: 'Social Proof',
    icon: Layout,
    defaultContent: { title: 'Trusted by companies' },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
    ]
  }
};

const IconPicker = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const iconNames = Object.keys(Icons).filter(name => 
    name !== 'createLucideIcon' && 
    name.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 100); // Limit for performance

  const SelectedIcon = (Icons as any)[value] || HelpCircle;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex items-center justify-between px-3 h-9">
          <div className="flex items-center gap-2">
            <SelectedIcon size={16} />
            <span className="text-xs">{value || 'Select Icon'}</span>
          </div>
          <Search size={14} className="opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Select Icon</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input 
            placeholder="Search icons..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="grid grid-cols-6 gap-2 max-h-[300px] overflow-y-auto p-1">
            {iconNames.map(name => {
              const Icon = (Icons as any)[name];
              return (
                <button
                  key={name}
                  onClick={() => {
                    onChange(name);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground border transition-all",
                    value === name ? "border-primary bg-primary/5 text-primary" : "border-transparent"
                  )}
                  title={name}
                >
                  <Icon size={20} />
                  <span className="text-[8px] mt-1 truncate w-full text-center">{name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// --- 2. Sub-Components ---

const LayerTree = ({ blocks, selectedId, onSelect, onAddClick, searchTerm, onSearchChange }: any) => {
  const filteredBlocks = blocks.filter((b: any) => {
    const config = BLOCK_TYPES[b.type];
    if (!config) return false;
    return config.label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <aside className="w-64 bg-card border-r flex flex-col shrink-0">
      <div className="p-4 border-b">
        <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-2 block">Structure</label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 text-muted-foreground" size={14} />
          <Input 
            type="text" 
            placeholder="Search blocks..." 
            className="h-8 pl-8 text-xs"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredBlocks.map((block: any) => {
          const config = BLOCK_TYPES[block.type];
          if (!config) return null;
          const Icon = config.icon;
          return (
            <div 
              key={block.id}
              onClick={() => onSelect(block.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-sm transition-all border ${
                selectedId === block.id 
                ? 'bg-primary/10 text-primary border-primary/20' 
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground border-transparent'
              }`}
            >
              <Icon size={14} className="opacity-70" />
              <span className="truncate flex-1 font-medium">{config.label}</span>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t">
        <Button 
          onClick={onAddClick}
          className="w-full h-9 text-xs"
          variant="default"
        >
          <Plus size={14} className="mr-2" /> Add Block
        </Button>
      </div>
    </aside>
  );
};

const CanvasBlock = ({ block, isSelected, onClick }: any) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  if (!config) {
    return (
      <div onClick={onClick} className="p-4 border-2 border-dashed border-destructive text-destructive text-xs">
        Unknown block type: {block.type}
      </div>
    );
  }

  let contentStyle: any = {};
  let innerContent = null;

  if (block.type === 'hero') {
    contentStyle = { backgroundColor: c.bg, color: c.color, padding: '80px 40px', textAlign: 'center' };
    innerContent = (
      <>
        <h1 style={{ margin: '0 0 16px 0', fontSize: '3rem', lineHeight: '1.1', fontWeight: 800 }}>{c.title || 'Headline'}</h1>
        <p style={{ margin: 0, fontSize: '1.25rem', opacity: 0.8 }}>{c.description || 'Subhead'}</p>
      </>
    );
  } else if (block.type === 'text') {
    contentStyle = { padding: '20px 40px' };
    innerContent = <div style={{ lineHeight: '1.6', fontSize: '1rem' }}>{c.body || 'Text content...'}</div>;
  } else if (block.type === 'image') {
    contentStyle = { padding: '20px 0' };
    const imageUrl = c.url?.startsWith('/v1/assets/') 
      ? `${import.meta.env.VITE_API_URL || 'http://localhost:8787'}${c.url}`
      : c.url;
    innerContent = <img src={imageUrl || 'https://picsum.photos/seed/placeholder/800/400'} alt={c.alt || 'Placeholder'} style={{ width: '100%', display: 'block' }} />;
  } else if (block.type === 'spacer') {
    contentStyle = { height: `${c.height || 50}px`, backgroundColor: 'var(--muted)' };
    innerContent = (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px]">
        Spacer ({c.height || 50}px)
      </div>
    );
    } else if (block.type === 'features') {
      contentStyle = { padding: '60px 40px', backgroundColor: 'var(--background)' };
      const items = c.items || [];
      innerContent = (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{c.title || 'Features'}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">{c.description || 'Description'}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((item: any, i: number) => {
              const IconComponent = (Icons as any)[item.icon] || Layout;
              return (
                <div key={i} className="p-6 bg-card rounded-xl shadow-sm border text-left">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                    <IconComponent size={20} />
                  </div>
                  <h3 className="font-bold mb-2 text-sm text-card-foreground">{item.title || 'Item Title'}</h3>
                  <p className="text-xs text-muted-foreground">{item.description || 'Item Description'}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
   else if (block.type === 'cta') {
    contentStyle = { padding: '80px 40px', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', textAlign: 'center' };
    innerContent = (
      <div>
        <h2 className="text-3xl font-bold mb-6">{c.title || 'Ready to start?'}</h2>
        <Button variant="secondary" className="rounded-full px-8 h-12 font-bold">
          {c.buttonText || 'Get Started'}
        </Button>
      </div>
    );
  } else if (block.type === 'newsletter') {
    contentStyle = { padding: '60px 40px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' };
    innerContent = (
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">{c.title || 'Newsletter'}</h2>
        <p className="text-muted-foreground mb-6">{c.description || 'Subscribe for updates'}</p>
        <div className="flex gap-2">
          <Input type="email" placeholder="Enter your email" className="flex-1" readOnly />
          <Button variant="default">Subscribe</Button>
        </div>
      </div>
    );
  } else if (block.type === 'social-proof') {
    contentStyle = { padding: '40px 40px', backgroundColor: 'var(--muted)/10', textAlign: 'center' };
    innerContent = (
      <div className="max-w-4xl mx-auto opacity-50 grayscale flex flex-col items-center gap-6">
        <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground">{c.title || 'Trusted by'}</p>
        <div className="flex flex-wrap justify-center gap-12 items-center grayscale opacity-50">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-6 w-24 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative group transition-all duration-200 border-2 ${
        isSelected ? 'border-primary z-10' : 'border-transparent hover:border-primary/50'
      }`}
      style={contentStyle}
    >
      <div className={`absolute -top-6 left-0 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-t-sm pointer-events-none transition-opacity ${
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        {config.label}
      </div>
      {innerContent}
    </div>
  );
};

const Canvas = ({ blocks, selectedId, onSelect }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedId && containerRef.current) {
      const el = containerRef.current.querySelector(`[data-block-id="${selectedId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedId]);

  return (
    <main className="flex-1 bg-muted/30 overflow-y-auto relative flex justify-center p-8">
      <div 
        ref={containerRef}
        className="w-full max-w-[900px] bg-background min-h-screen shadow-lg border relative text-foreground"
      >
        {blocks.length === 0 && (
          <div className="h-96 flex flex-col items-center justify-center text-muted-foreground">
            <Layout size={48} className="mb-4 opacity-20" />
            <p>Your canvas is empty. Add a block to start.</p>
          </div>
        )}
        {blocks.map((block: any) => (
          <div key={block.id} data-block-id={block.id}>
            <CanvasBlock 
              block={block} 
              isSelected={selectedId === block.id} 
              onClick={() => onSelect(block.id)} 
            />
          </div>
        ))}
      </div>
    </main>
  );
};

const Inspector = ({ block, onUpdate, onDelete }: any) => {
  if (!block) {
    return (
      <aside className="w-80 bg-card border-l p-6 shrink-0">
        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
          <Settings size={24} className="mb-2 opacity-20" />
          <p>Select a block to edit</p>
        </div>
      </aside>
    );
  }

  const config = BLOCK_TYPES[block.type];

  if (!config) {
    return (
      <aside className="w-80 bg-card border-l p-6 shrink-0">
        <div className="flex flex-col items-center justify-center h-40 text-destructive text-sm border-2 border-dashed border-destructive/20 rounded-lg bg-destructive/5">
          <Settings size={24} className="mb-2 opacity-20" />
          <p>Unknown type: {block.type}</p>
        </div>
      </aside>
    );
  }

  const handleChange = (key: string, value: any) => {
    onUpdate(block.id, { ...block.content, [key]: value });
  };

  return (
    <aside className="w-80 bg-card border-l flex flex-col shrink-0">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold">{config.label}</h3>
          <span className="text-[10px] text-muted-foreground font-mono">{block.id}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => onDelete(block.id)}>
          <Trash size={16} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {config.fields.map((field: any) => (
          <div key={field.key} className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
              {field.label}
            </label>
            
            {field.type === 'textarea' ? (
              <Textarea
                className="text-sm min-h-[100px]"
                value={block.content[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            ) : field.type === 'color' ? (
              <div className="flex gap-2 items-center">
                <input 
                  type="color" 
                  className="h-9 w-9 rounded-md cursor-pointer border bg-background p-1"
                  value={block.content[field.key] || '#000000'}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
                <Input 
                  type="text" 
                  className="flex-1 h-9 font-mono text-xs"
                  value={block.content[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              </div>
            ) : field.type === 'list' ? (
              <div className="space-y-3">
                {(block.content[field.key] || []).map((item: any, idx: number) => (
                  <div key={idx} className="p-3 bg-muted/50 border rounded-lg relative group">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        const newList = [...(block.content[field.key] || [])];
                        newList.splice(idx, 1);
                        handleChange(field.key, newList);
                      }}
                      className="absolute top-1 right-1 h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash size={12} />
                    </Button>
                    <div className="space-y-3">
                      {field.itemFields.map((itemField: any) => (
                        <div key={itemField.key} className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-muted-foreground block">
                            {itemField.label}
                          </label>
                          {itemField.type === 'textarea' ? (
                            <Textarea
                              className="text-xs min-h-[60px] bg-background"
                              value={item[itemField.key] || ''}
                              onChange={(e) => {
                                const newList = [...(block.content[field.key] || [])];
                                newList[idx] = { ...newList[idx], [itemField.key]: e.target.value };
                                handleChange(field.key, newList);
                              }}
                            />
                          ) : itemField.type === 'icon' ? (
                            <IconPicker 
                              value={item[itemField.key] || ''} 
                              onChange={(val) => {
                                const newList = [...(block.content[field.key] || [])];
                                newList[idx] = { ...newList[idx], [itemField.key]: val };
                                handleChange(field.key, newList);
                              }}
                            />
                          ) : (
                            <Input
                              type="text"
                              className="h-8 text-xs bg-background"
                              value={item[itemField.key] || ''}
                              onChange={(e) => {
                                const newList = [...(block.content[field.key] || [])];
                                newList[idx] = { ...newList[idx], [itemField.key]: e.target.value };
                                handleChange(field.key, newList);
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newItem = field.itemFields.reduce((acc: any, f: any) => ({ ...acc, [f.key]: '' }), {});
                    handleChange(field.key, [...(block.content[field.key] || []), newItem]);
                  }}
                  className="w-full h-8 text-[10px] border-dashed"
                >
                  <Plus size={10} className="mr-1" /> Add Item
                </Button>
              </div>
            ) : field.type === 'file' ? (
              <div className="space-y-2">
                <Input 
                  type="text" 
                  className="h-9 text-xs"
                  value={block.content[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder="URL or upload file..."
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full h-8 text-[10px]"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = async (e: any) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      
                      const formData = new FormData();
                      formData.append('file', file);
                      
                      try {
                        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8787'}/v1/assets/upload`, {
                          method: 'POST',
                          body: formData
                        });
                        const data = await res.json();
                        handleChange(field.key, data.url);
                        toast.success('File uploaded');
                      } catch (error) {
                        toast.error('Upload failed');
                      }
                    };
                    input.click();
                  }}
                >
                  <Upload size={12} className="mr-1" /> Upload Image
                </Button>
              </div>
            ) : (
              <Input
                type={field.type}
                className="h-9 text-sm"
                value={block.content[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

const AddBlockModal = ({ isOpen, onClose, onAdd }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl p-6 relative">
        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
          <X size={18} />
        </Button>
        <h3 className="text-xl font-bold mb-6">Add Content Block</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.values(BLOCK_TYPES).map((type: any) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => onAdd(type.id)}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-transparent hover:border-primary hover:bg-primary/5 transition-all group text-center"
              >
                <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Icon size={24} />
                </div>
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default function PageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState<any[]>([]);
  const [page, setPage] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && id !== 'new') {
      loadPage();
    } else {
      setPage({ title: 'New Page', slug: 'new-page' });
      setBlocks([
        { id: `b_initial`, type: 'hero', content: { ...BLOCK_TYPES.hero.defaultContent } }
      ]);
      setLoading(false);
    }
  }, [id]);

  const loadPage = async () => {
    try {
      const pageData = await api.get(`/pages/${id}`) as any;
      setPage(pageData);
      
      // Fetch blocks separately
      const blocksData = await api.get(`/blocks/page/${pageData.id}`) as any[];
      
      // Hydrate blocks: Merge existing content with defaults to ensure all fields have keys
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

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(b => b.id !== blockId));
    if (selectedId === blockId) setSelectedId(null);
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
      
      // 1. Save Page Meta
      if (id === 'new') {
        const newPage = await api.post('/pages', { title: page.title, slug: page.slug }) as any;
        pageId = newPage.id;
      } else {
        await api.put(`/pages/${id}`, { title: page.title, slug: page.slug });
      }

      // 2. Save Blocks (Bulk Sync)
      if (pageId) {
        await api.put(`/blocks/page/${pageId}`, blocks);
      }
      
      toast.success('Page saved successfully');
      navigate('/pages');
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
      {/* Local Header */}
      <div className="h-14 border-b flex items-center justify-between px-6 shrink-0 z-10 bg-card">
        <div className="flex items-center gap-2">
          <Link to="/pages" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Pages /</Link>
          <span className="font-semibold text-sm">{page?.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link to="/pages">Cancel</Link>
          </Button>
          <Button 
            onClick={handleSave}
            size="sm"
            className="shadow-md"
          >
            <Save size={16} className="mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <LayerTree 
          blocks={blocks} 
          selectedId={selectedId} 
          onSelect={setSelectedId}
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
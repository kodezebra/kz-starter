import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BLOCK_TYPES, BLOCK_CATEGORIES } from './config';

interface AddBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (type: string) => void;
}

type CategoryKey = keyof typeof BLOCK_CATEGORIES;

export const AddBlockModal = ({ isOpen, onClose, onAdd }: AddBlockModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | 'all'>('all');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Get categorized and filtered blocks
  const getFilteredBlocks = () => {
    const allBlocks = Object.values(BLOCK_TYPES);
    
    let filtered = allBlocks.filter((type: any) => {
      const matchesSearch = searchTerm === '' || 
        type.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || type.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    return filtered;
  };

  const filteredBlocks = getFilteredBlocks();
  const flatBlockList = filteredBlocks;

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedCategory('all');
      setFocusedIndex(0);
      // Focus search input after a short delay
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => Math.min(prev + 1, flatBlockList.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setFocusedIndex(prev => Math.min(prev + 2, flatBlockList.length - 1));
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setFocusedIndex(prev => Math.max(prev - 2, 0));
          break;
        case 'Enter':
          if (flatBlockList[focusedIndex]) {
            e.preventDefault();
            handleSelect((flatBlockList[focusedIndex] as any).id);
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, flatBlockList, focusedIndex, onClose]);

  // Scroll focused item into view
  useEffect(() => {
    const focusedElement = gridRef.current?.querySelector(`[data-index="${focusedIndex}"]`);
    if (focusedElement) {
      focusedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [focusedIndex]);

  const handleSelect = (typeId: string) => {
    onAdd(typeId);
    onClose();
  };

  const clearSearch = () => {
    setSearchTerm('');
    searchInputRef.current?.focus();
  };

  // Group blocks by category for display
  const getBlocksByCategory = () => {
    if (selectedCategory !== 'all') {
      return { [selectedCategory]: filteredBlocks };
    }
    
    const grouped: Record<string, any[]> = {};
    filteredBlocks.forEach((block: any) => {
      if (!grouped[block.category]) {
        grouped[block.category] = [];
      }
      grouped[block.category].push(block);
    });
    return grouped;
  };

  const blocksByCategory = getBlocksByCategory();
  const categories = Object.keys(blocksByCategory) as CategoryKey[];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold mb-1">Add Content Block</DialogTitle>
              <DialogDescription>
                Choose a block type to add to your page. Use arrow keys to navigate, Enter to select.
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 -mt-2 -mr-2">
              <X size={18} />
            </Button>
          </div>
        </DialogHeader>

        {/* Search and Category Tabs */}
        <div className="px-6 py-4 border-b bg-muted/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                ref={searchInputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search blocks..."
                className="pl-10 h-10"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={clearSearch}
                >
                  <X size={14} />
                </Button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="shrink-0"
            >
              All Blocks
            </Button>
            {Object.entries(BLOCK_CATEGORIES).map(([key, label]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(key as CategoryKey)}
                className="shrink-0"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Blocks Grid */}
        <div 
          ref={gridRef}
          className="flex-1 overflow-y-auto p-6"
        >
          {filteredBlocks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg font-medium">No blocks found</p>
              <p className="text-sm">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category}>
                  {selectedCategory === 'all' && (
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      {BLOCK_CATEGORIES[category as CategoryKey]}
                    </h3>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {blocksByCategory[category].map((type: any) => {
                      const globalIndex = flatBlockList.findIndex((b: any) => b.id === type.id);
                      const Icon = type.icon;
                      const isFocused = globalIndex === focusedIndex;

                      return (
                        <button
                          key={type.id}
                          data-index={globalIndex}
                          onClick={() => handleSelect(type.id)}
                          className={`
                            flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center
                            ${isFocused 
                              ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                              : 'border-transparent hover:border-primary/50 hover:bg-primary/5'
                            }
                            bg-muted/30 group
                          `}
                        >
                          <div className={`
                            p-2.5 rounded-xl transition-colors
                            ${isFocused 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-muted group-hover:bg-primary/10 group-hover:text-primary'
                            }
                          `}>
                            <Icon size={20} />
                          </div>
                          <span className="text-sm font-medium leading-tight">{type.label}</span>
                          <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {type.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with count */}
        <div className="px-6 py-3 border-t bg-muted/30 text-xs text-muted-foreground flex items-center justify-between">
          <span>{filteredBlocks.length} block{filteredBlocks.length !== 1 ? 's' : ''} available</span>
          <span className="hidden sm:inline">Press Esc to close</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

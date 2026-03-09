import { Search, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BLOCK_TYPES } from './config';
import { cn } from '@/lib/utils';

interface LayerTreeProps {
  blocks: any[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onAddClick: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const LayerTree = ({ 
  blocks, 
  selectedId, 
  onSelect, 
  onMove,
  onAddClick, 
  searchTerm, 
  onSearchChange 
}: LayerTreeProps) => {
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
        {filteredBlocks.map((block: any, index: number) => {
          const config = BLOCK_TYPES[block.type];
          if (!config) return null;
          const Icon = config.icon;
          const isSelected = selectedId === block.id;

          return (
            <div 
              key={block.id}
              onClick={() => onSelect(block.id)}
              className={cn(
                "group flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-sm transition-all border",
                isSelected 
                ? 'bg-primary/10 text-primary border-primary/20' 
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground border-transparent'
              )}
            >
              <Icon size={14} className="opacity-70 flex-shrink-0" />
              <span className="truncate flex-1 font-medium">{config.label}</span>
              
              <div className={cn(
                "flex items-center opacity-0 group-hover:opacity-100 transition-opacity",
                isSelected && "opacity-100"
              )}>
                <button
                  disabled={index === 0}
                  onClick={(e) => { e.stopPropagation(); onMove(block.id, 'up'); }}
                  className="p-1 hover:text-primary disabled:opacity-20 transition-colors"
                >
                  <ChevronUp size={12} />
                </button>
                <button
                  disabled={index === filteredBlocks.length - 1}
                  onClick={(e) => { e.stopPropagation(); onMove(block.id, 'down'); }}
                  className="p-1 hover:text-primary disabled:opacity-20 transition-colors"
                >
                  <ChevronDown size={12} />
                </button>
              </div>
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

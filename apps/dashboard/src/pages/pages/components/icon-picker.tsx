import { useState } from 'react';
import * as Icons from 'lucide-react';
import { Search, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface IconPickerProps {
  value: string;
  onChange: (val: string) => void;
}

export const IconPicker = ({ value, onChange }: IconPickerProps) => {
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
        <Button variant="outline" className="w-full flex items-center justify-between px-3 h-9 text-foreground">
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

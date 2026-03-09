import { Settings, Trash, Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { BLOCK_TYPES } from './config';
import { IconPicker } from './icon-picker';

interface ListFieldProps {
  value: any[];
  itemFields: any[];
  onChange: (newValue: any[]) => void;
}

const ListField = ({ value, itemFields, onChange }: ListFieldProps) => {
  return (
    <div className="space-y-3">
      {value.map((item, idx) => (
        <div key={idx} className="p-3 bg-muted/50 border rounded-lg relative group">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const newList = [...value];
              newList.splice(idx, 1);
              onChange(newList);
            }}
            className="absolute top-1 right-1 h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors z-10"
          >
            <Trash size={12} />
          </Button>
          <div className="space-y-3">
            {itemFields.map((itemField) => (
              <div key={itemField.key} className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-muted-foreground block">
                  {itemField.label}
                </label>
                {itemField.type === 'textarea' ? (
                  <Textarea
                    className="text-xs min-h-[60px] bg-background"
                    value={item[itemField.key] || ''}
                    onChange={(e) => {
                      const newList = [...value];
                      newList[idx] = { ...newList[idx], [itemField.key]: e.target.value };
                      onChange(newList);
                    }}
                  />
                ) : itemField.type === 'icon' ? (
                  <IconPicker
                    value={item[itemField.key] || ''}
                    onChange={(val) => {
                      const newList = [...value];
                      newList[idx] = { ...newList[idx], [itemField.key]: val };
                      onChange(newList);
                    }}
                  />
                ) : itemField.type === 'list' ? (
                  <ListField
                    value={item[itemField.key] || []}
                    itemFields={itemField.itemFields}
                    onChange={(nestedValue) => {
                      const newList = [...value];
                      newList[idx] = { ...newList[idx], [itemField.key]: nestedValue };
                      onChange(newList);
                    }}
                  />
                ) : (
                  <Input
                    type="text"
                    className="h-8 text-xs bg-background"
                    value={item[itemField.key] || ''}
                    onChange={(e) => {
                      const newList = [...value];
                      newList[idx] = { ...newList[idx], [itemField.key]: e.target.value };
                      onChange(newList);
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
          const newItem = itemFields.reduce((acc, f) => ({ ...acc, [f.key]: f.type === 'list' ? [] : '' }), {});
          onChange([...value, newItem]);
        }}
        className="w-full h-8 text-[10px] border-dashed"
      >
        <Plus size={10} className="mr-1" /> Add Item
      </Button>
    </div>
  );
};

interface InspectorProps {
  block: any;
  onUpdate: (id: string, content: any) => void;
  onDelete: (id: string) => void;
}

export const Inspector = ({ block, onUpdate, onDelete }: InspectorProps) => {
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
            
            {field.type === 'select' ? (
              <Select
                value={block.content[field.key] || field.options?.[0]?.value}
                onValueChange={(val) => handleChange(field.key, val)}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((opt: any) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === 'textarea' ? (
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
              <ListField
                value={block.content[field.key] || []}
                itemFields={field.itemFields}
                onChange={(newValue) => handleChange(field.key, newValue)}
              />
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
            ) : field.type === 'checkbox' ? (
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  id={`field-${field.key}`}
                  checked={!!block.content[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor={`field-${field.key}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {field.label}
                </label>
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

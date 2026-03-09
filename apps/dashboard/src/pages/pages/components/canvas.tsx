import { useEffect, useRef } from 'react';
import { Layout } from 'lucide-react';
import { BLOCK_COMPONENTS } from './blocks';
import type { BlockType } from './blocks';

interface CanvasBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

const CanvasBlock = ({ block, isSelected, onClick }: CanvasBlockProps) => {
  const BlockComponent = BLOCK_COMPONENTS[block.type as BlockType];

  if (!BlockComponent) {
    return (
      <div
        onClick={onClick}
        className="p-4 border-2 border-dashed border-destructive text-destructive text-xs"
      >
        Unknown block type: {block.type}
      </div>
    );
  }

  return <BlockComponent block={block} isSelected={isSelected} onClick={onClick} />;
};

interface CanvasProps {
  blocks: any[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const Canvas = ({ blocks, selectedId, onSelect }: CanvasProps) => {
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
            <CanvasBlock block={block} isSelected={selectedId === block.id} onClick={() => onSelect(block.id)} />
          </div>
        ))}
      </div>
    </main>
  );
};

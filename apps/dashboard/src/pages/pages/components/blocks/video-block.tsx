import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';

interface VideoBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

export const VideoBlock = ({ block, isSelected, onClick }: VideoBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const contentStyle: React.CSSProperties = { padding: '80px 40px', backgroundColor: 'var(--background)' };

  const innerContent = (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{c.title || 'Video'}</h2>
        <p className="text-muted-foreground">{c.description || 'Description'}</p>
      </div>
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted shadow-lg">
        <iframe
          src={c.url || ''}
          title={c.title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );

  return (
    <BaseBlock isSelected={isSelected} onClick={onClick} config={config} contentStyle={contentStyle}>
      {innerContent}
    </BaseBlock>
  );
};

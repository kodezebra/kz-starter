import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';

interface SocialProofBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

export const SocialProofBlock = ({ block, isSelected, onClick }: SocialProofBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const contentStyle: React.CSSProperties = {
    padding: '40px 40px',
    backgroundColor: 'var(--muted)/10',
    textAlign: 'center',
  };

  const innerContent = (
    <div className="max-w-4xl mx-auto opacity-50 grayscale flex flex-col items-center gap-6">
      <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
        {c.title || 'Trusted by'}
      </p>
      <div className="flex flex-wrap justify-center gap-12 items-center grayscale opacity-50">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-6 w-24 bg-muted rounded animate-pulse" />
        ))}
      </div>
    </div>
  );

  return (
    <BaseBlock isSelected={isSelected} onClick={onClick} config={config} contentStyle={contentStyle}>
      {innerContent}
    </BaseBlock>
  );
};

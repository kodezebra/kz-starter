import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';

interface NewsletterBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

export const NewsletterBlock = ({ block, isSelected, onClick }: NewsletterBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const contentStyle: React.CSSProperties = {
    padding: '60px 40px',
    borderTop: '1px solid var(--border)',
    borderBottom: '1px solid var(--border)',
  };

  const innerContent = (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2">{c.title || 'Newsletter'}</h2>
      <p className="text-muted-foreground mb-6">{c.description || 'Subscribe for updates'}</p>
      <div className="flex gap-2">
        <Input type="email" placeholder="Enter your email" className="flex-1" readOnly />
        <Button variant="default">Subscribe</Button>
      </div>
    </div>
  );

  return (
    <BaseBlock isSelected={isSelected} onClick={onClick} config={config} contentStyle={contentStyle}>
      {innerContent}
    </BaseBlock>
  );
};

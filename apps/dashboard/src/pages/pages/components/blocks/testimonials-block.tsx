import { Quote } from 'lucide-react';
import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';
import { useAssetUrl } from '../hooks/use-asset-url';

interface TestimonialsBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

const TestimonialCard = ({ item }: { item: any }) => {
  const resolvedAvatar = useAssetUrl(item.avatar);

  return (
    <div className="flex flex-col p-8 bg-card rounded-2xl border transition-all duration-200 hover:shadow-md">
      <Quote size={24} className="mb-4 text-primary opacity-50" aria-hidden="true" />
      <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
        {item.quote || 'Quote text goes here.'}
      </blockquote>
      <div className="flex items-center gap-3 mt-6">
        {resolvedAvatar ? (
          <img
            src={resolvedAvatar}
            alt={item.author}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm"
            aria-hidden="true"
          >
            {(item.author || '?').charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-foreground">{item.author || 'Author'}</p>
          <p className="text-xs text-muted-foreground">{item.role || 'Role'}</p>
        </div>
      </div>
    </div>
  );
};

export const TestimonialsBlock = ({ block, isSelected, onClick }: TestimonialsBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const contentStyle: React.CSSProperties = {
    padding: '80px 40px',
    backgroundColor: 'var(--muted)/20',
  };

  const innerContent = (
    <div>
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {c.title || 'Testimonials'}
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
          {c.description || 'Trusted by thousands of businesses worldwide.'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {(c.items || []).map((item: any, i: number) => (
          <TestimonialCard key={item.id || i} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <BaseBlock
      isSelected={isSelected}
      onClick={onClick}
      config={config}
      contentStyle={contentStyle}
    >
      {innerContent}
    </BaseBlock>
  );
};

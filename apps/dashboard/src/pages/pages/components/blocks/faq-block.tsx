import { ChevronDown } from 'lucide-react';
import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';

interface FaqBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

const FaqItem = ({ item }: { item: any }) => {
  return (
    <details className="group p-6 bg-card rounded-xl border transition-all duration-200 open:shadow-sm">
      <summary className="flex items-center justify-between cursor-pointer font-medium list-none text-foreground">
        <span>{item.question || 'Question'}</span>
        <span className="ml-4 transition-transform duration-200 group-open:rotate-180">
          <ChevronDown size={18} aria-hidden="true" />
        </span>
      </summary>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {item.answer || 'Answer'}
      </p>
    </details>
  );
};

export const FaqBlock = ({ block, isSelected, onClick }: FaqBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const contentStyle: React.CSSProperties = {
    padding: '80px 40px',
    backgroundColor: 'var(--background)',
  };

  const innerContent = (
    <div>
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {c.title || 'FAQ'}
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
          {c.description || 'Find answers to common questions.'}
        </p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {(c.items || []).map((item: any, i: number) => (
          <FaqItem key={item.id || i} item={item} />
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

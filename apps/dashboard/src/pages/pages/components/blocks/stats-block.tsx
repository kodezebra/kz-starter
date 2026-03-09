import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';

interface StatsBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

const StatItem = ({ stat }: { stat: any }) => {
  return (
    <div className="text-center">
      <div className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        {stat.value || '0'}
        <span className="text-2xl md:text-3xl">{stat.suffix || ''}</span>
      </div>
      <p className="text-sm text-muted-foreground">{stat.label || 'Label'}</p>
    </div>
  );
};

export const StatsBlock = ({ block, isSelected, onClick }: StatsBlockProps) => {
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
          {c.title || 'Stats'}
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
          {c.description || 'Numbers that speak for themselves.'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 max-w-4xl mx-auto">
        {(c.items || []).map((stat: any, i: number) => (
          <StatItem key={stat.id || i} stat={stat} />
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

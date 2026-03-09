import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';

interface PricingBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

const PricingCard = ({ plan }: { plan: any }) => {
  return (
    <div
      className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-200 hover:shadow-md ${
        plan.featured
          ? 'border-primary shadow-md bg-primary/5'
          : 'border-border bg-card'
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full">
          MOST POPULAR
        </span>
      )}
      <h3 className="mb-2 text-lg font-bold text-foreground">{plan.name || 'Plan'}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-bold text-foreground">{plan.price || '$0'}</span>
        <span className="text-sm text-muted-foreground">{plan.period || '/month'}</span>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{plan.description || ''}</p>
      <ul className="flex-1 space-y-3 mb-8">
        {(plan.features || []).map((feature: string, fi: number) => (
          <li key={fi} className="flex items-start gap-2 text-sm">
            <Check size={14} className="mt-0.5 text-primary flex-shrink-0" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        className="w-full"
        variant={plan.featured ? 'default' : 'outline'}
      >
        Get Started
      </Button>
    </div>
  );
};

export const PricingBlock = ({ block, isSelected, onClick }: PricingBlockProps) => {
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
          {c.title || 'Pricing'}
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
          {c.description || 'Choose the plan that fits your needs.'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {(c.plans || []).map((plan: any, i: number) => (
          <PricingCard key={plan.id || i} plan={plan} />
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

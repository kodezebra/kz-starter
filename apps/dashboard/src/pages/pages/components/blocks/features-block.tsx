import * as Icons from 'lucide-react';
import { Layout } from 'lucide-react';
import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';

interface FeaturesBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

const FeatureCard = ({ item, cardStyle, iconStyle, alignment }: { item: any; cardStyle: string; iconStyle: string; alignment: string }) => {
  const IconComponent = (Icons as any)[item.icon] || Layout;

  const getCardClasses = () => {
    const base = 'group relative flex flex-col p-6 rounded-xl transition-all duration-300';
    switch (cardStyle) {
      case 'flat':
        return `${base} bg-transparent`;
      case 'bordered':
        return `${base} border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500`;
      case 'glass':
        return `${base} bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20`;
      case 'elevated':
      default:
        return `${base} bg-card shadow-lg hover:shadow-xl hover:-translate-y-1`;
    }
  };

  const getIconClasses = () => {
    const base = 'flex items-center justify-center w-12 h-12 mb-4 rounded-xl transition-all duration-300';
    switch (iconStyle) {
      case 'solid':
        return `${base} bg-blue-600 text-white`;
      case 'gradient':
        return `${base} bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg`;
      case 'outline':
        return `${base} border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300`;
      case 'colored':
      default:
        return `${base} bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400`;
    }
  };

  const getAlignmentClasses = () => {
    switch (alignment) {
      case 'left': return 'items-start text-left';
      case 'right': return 'items-end text-right';
      case 'center':
      default: return 'items-center text-center';
    }
  };

  return (
    <div className={`${getCardClasses()} ${getAlignmentClasses()}`}>
      <div className={getIconClasses()}>
        <IconComponent size={20} strokeWidth={2} />
      </div>
      <h3 className="mb-2 text-xl font-bold text-card-foreground">
        {item.title || 'Feature Title'}
      </h3>
      <p className="flex-1 text-gray-600 dark:text-gray-400">
        {item.description || 'Feature description goes here.'}
      </p>
    </div>
  );
};

export const FeaturesBlock = ({ block, isSelected, onClick }: FeaturesBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const columns = c.columns || 3;
  const alignment = c.alignment || 'center';
  const cardStyle = c.cardStyle || 'elevated';
  const iconStyle = c.iconStyle || 'gradient';

  const getSpacingClasses = () => {
    switch (c.spacing) {
      case 'sm': return 'py-8 px-4';
      case 'md': return 'py-12 px-6';
      case 'xl': return 'py-24 px-10';
      case 'lg':
      default: return 'py-16 px-8';
    }
  };

  const getBackgroundClasses = () => {
    if (c.bgType === 'gradient') {
      const gradients: Record<string, string> = {
        'blue-purple': 'from-blue-600 to-purple-600',
        'emerald-cyan': 'from-emerald-500 to-cyan-500',
        'orange-red': 'from-orange-500 to-red-500',
        'pink-rose': 'from-pink-500 to-rose-500',
        'slate-dark': 'from-slate-900 to-slate-700',
        'indigo-purple': 'from-indigo-600 to-purple-700',
        'teal-green': 'from-teal-500 to-emerald-600',
        'amber-orange': 'from-amber-500 to-orange-600',
      };
      return `bg-gradient-to-br ${gradients[c.bgGradient] || gradients['blue-purple']}`;
    }
    
    const colors: Record<string, string> = {
      white: 'bg-white dark:bg-gray-900',
      slate: 'bg-slate-50 dark:bg-slate-900',
      gray: 'bg-gray-50 dark:bg-gray-800',
      blue: 'bg-blue-50 dark:bg-blue-900/20',
    };
    return colors[c.bgColor] || colors.white;
  };

  const contentStyle: React.CSSProperties = {
    padding: '0',
  };

  const items = c.items || [];

  const gridColumns: Record<number, string> = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };
  const selectedGridColumns = gridColumns[columns] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  const innerContent = (
    <div className={`${getSpacingClasses()} ${getBackgroundClasses()}`}>
      <div className="max-w-screen-xl mx-auto">
        {(c.title || c.description) && (
          <div className={`mb-12 ${alignment === 'right' ? 'text-right' : alignment === 'left' ? 'text-left' : 'text-center'}`}>
            {c.title && (
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                {c.title}
              </h2>
            )}
            {c.description && (
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                {c.description}
              </p>
            )}
          </div>
        )}

        <div className={`grid gap-8 ${selectedGridColumns}`}>
          {items.map((item: any) => (
            <FeatureCard 
              key={item.id || item.title} 
              item={item} 
              cardStyle={cardStyle}
              iconStyle={iconStyle}
              alignment={alignment}
            />
          ))}
        </div>
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

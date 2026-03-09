import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';

interface CtaBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

export const CtaBlock = ({ block, isSelected, onClick }: CtaBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const getSpacingClasses = () => {
    switch (c.spacing) {
      case 'md': return 'py-12 px-6';
      case 'xl': return 'py-24 px-10';
      case 'lg':
      default: return 'py-16 px-8';
    }
  };

  const getAlignmentClasses = () => {
    switch (c.alignment) {
      case 'left': return 'text-left';
      case 'right': return 'text-right';
      case 'center':
      default: return 'text-center';
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
      };
      return `bg-gradient-to-br ${gradients[c.bgGradient] || gradients['blue-purple']}`;
    }
    
    if (c.bgType === 'image' && c.bgImage) {
      const overlay = c.overlay ? `bg-black/${(c.overlayOpacity || 50) / 100}` : '';
      return `bg-cover bg-center bg-no-repeat ${overlay}`;
    }
    
    const colors: Record<string, string> = {
      white: 'bg-white dark:bg-gray-900',
      black: 'bg-black dark:bg-gray-950',
      slate: 'bg-slate-50 dark:bg-slate-900',
      blue: 'bg-blue-600 dark:bg-blue-700',
      indigo: 'bg-indigo-600 dark:bg-indigo-700',
      purple: 'bg-purple-600 dark:bg-purple-700',
    };
    return colors[c.bgColor] || colors.white;
  };

  const getTextColorClasses = () => {
    const darkBgColors = ['black', 'blue', 'indigo', 'purple', 'slate'];
    const isDarkBg = c.bgType === 'gradient' || darkBgColors.includes(c.bgColor || '');
    return isDarkBg ? 'text-white' : 'text-gray-900 dark:text-white';
  };

  const getButtonClasses = () => {
    const darkBgColors = ['black', 'blue', 'indigo', 'purple', 'slate'];
    const isDarkBg = c.bgType === 'gradient' || darkBgColors.includes(c.bgColor || '');
    
    if (isDarkBg) {
      return 'inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 bg-white rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl';
    }
    return 'inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl';
  };

  const contentStyle: React.CSSProperties = {
    padding: '0',
  };

  const innerContent = (
    <div className={`${getSpacingClasses()} ${getBackgroundClasses()}`}>
      <div className="max-w-screen-xl mx-auto">
        <div className={`${getAlignmentClasses()} ${getTextColorClasses()}`}>
          {c.title && (
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-tight">
              {c.title}
            </h2>
          )}
          {c.description && (
            <p className="mb-8 text-lg font-light opacity-90 max-w-2xl mx-auto">
              {c.description}
            </p>
          )}
          {c.buttonText && (
            <a href={c.buttonLink || '#'} className={getButtonClasses()}>
              {c.buttonText}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          )}
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

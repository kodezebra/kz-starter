import { BaseBlock } from './base-block';
import { BLOCK_TYPES } from '../config';
import { useAssetUrl } from '../hooks/use-asset-url';

interface HeroBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

export const HeroBlock = ({ block, isSelected, onClick }: HeroBlockProps) => {
  const config = BLOCK_TYPES[block.type];
  const c = block.content;

  const resolvedBgImage = useAssetUrl(c.bgImage);
  const resolvedImage = useAssetUrl(c.image);

  const isSplit = c.layout === 'split';
  const isLeft = c.layout === 'left';

  const getSpacingClasses = () => {
    switch (c.spacing) {
      case 'md': return 'py-12 px-4';
      case 'xl': return 'py-32 px-6';
      case 'lg':
      default: return 'py-20 px-4';
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
    
    if (c.bgType === 'image' && resolvedBgImage) {
      const overlay = c.overlay ? `bg-black/${(c.overlayOpacity || 60) / 100}` : '';
      return `bg-cover bg-center bg-no-repeat ${overlay}`;
    }
    
    const colors: Record<string, string> = {
      white: 'bg-white dark:bg-gray-900',
      black: 'bg-black dark:bg-gray-950',
      slate: 'bg-slate-50 dark:bg-slate-900',
      blue: 'bg-blue-600 dark:bg-blue-700',
      indigo: 'bg-indigo-600 dark:bg-indigo-700',
    };
    return colors[c.bgColor] || colors.blue;
  };

  const getTextColorClasses = () => {
    if (c.textColor === 'light') return 'text-white';
    if (c.textColor === 'dark') return 'text-gray-900 dark:text-white';
    
    const darkBgColors = ['black', 'blue', 'indigo', 'purple', 'slate'];
    const isDarkBg = c.bgType === 'gradient' || darkBgColors.includes(c.bgColor || '');
    return isDarkBg ? 'text-white' : 'text-gray-900 dark:text-white';
  };

  const getBadgeClasses = () => {
    const gradient = c.badgeColor || 'from-blue-500 to-cyan-500';
    const gradientMap: Record<string, string> = {
      'from-blue-500 to-cyan-500': 'bg-gradient-to-r from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500': 'bg-gradient-to-r from-purple-500 to-pink-500',
      'from-orange-500 to-red-500': 'bg-gradient-to-r from-orange-500 to-red-500',
      'from-emerald-500 to-teal-500': 'bg-gradient-to-r from-emerald-500 to-teal-500',
    };
    return `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${gradientMap[gradient] || gradientMap['from-blue-500 to-cyan-500']} text-white shadow-lg`;
  };

  const getButtonClasses = (variant: 'primary' | 'secondary') => {
    const darkBgColors = ['black', 'blue', 'indigo', 'purple', 'slate'];
    const isDarkBg = c.bgType === 'gradient' || darkBgColors.includes(c.bgColor || '');
    
    if (variant === 'primary') {
      if (isDarkBg) {
        return 'inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 bg-white rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5';
      }
      return 'inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5';
    }
    
    // Secondary button
    if (isDarkBg) {
      return 'inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300';
    }
    return 'inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300';
  };

  const contentStyle: React.CSSProperties = {
    padding: '0',
  };

  const innerContent = (
    <div className={`${getSpacingClasses()} ${getBackgroundClasses()}`}>
      <div className="max-w-screen-xl mx-auto">
        <div className={`lg:flex lg:items-center lg:gap-12 ${isSplit && isLeft ? 'lg:flex-row-reverse' : ''}`}>
          {/* Content Column */}
          <div className={`${isSplit ? 'lg:flex-1' : ''} ${isLeft ? 'text-left' : 'text-center'} ${getTextColorClasses()}`}>
            {c.badge && (
              <div className="flex justify-center mb-6">
                <span className={getBadgeClasses()}>
                  {c.badge}
                </span>
              </div>
            )}
            
            {c.title && (
              <h1 
                className="mb-6 text-4xl font-extrabold tracking-tight leading-tight md:text-5xl lg:text-6xl"
              >
                {c.title}
              </h1>
            )}
            
            {c.description && (
              <p className="mb-8 text-lg font-light opacity-90 max-w-2xl mx-auto md:text-xl">
                {c.description}
              </p>
            )}
            
            {(c.primaryButtonText || c.secondaryButtonText) && (
              <div className={`flex flex-col sm:flex-row gap-4 ${isLeft ? 'justify-start' : 'justify-center'}`}>
                {c.primaryButtonText && (
                  <a href={c.primaryButtonHref || '#'} className={getButtonClasses('primary')}>
                    {c.primaryButtonText}
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                )}
                {c.secondaryButtonText && (
                  <a href={c.secondaryButtonHref || '#'} className={getButtonClasses('secondary')}>
                    {c.secondaryButtonText}
                  </a>
                )}
              </div>
            )}
          </div>
          
          {/* Image Column */}
          {isSplit && resolvedImage && (
            <div className="hidden lg:flex lg:flex-1 mt-12 lg:mt-0">
              <div className="relative w-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl blur-2xl"></div>
                <img
                  src={resolvedImage}
                  alt={c.imageAlt || 'Hero'}
                  className="relative rounded-2xl shadow-2xl w-full object-cover"
                  style={{ maxHeight: '500px' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <BaseBlock isSelected={isSelected} onClick={onClick} config={config} contentStyle={contentStyle}>
      {innerContent}
    </BaseBlock>
  );
};

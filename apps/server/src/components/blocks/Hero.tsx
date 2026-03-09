interface HeroContent {
  badge?: string;
  badgeColor?: string;
  title?: string;
  description?: string;
  primaryCta?: { text: string; link: string };
  secondaryCta?: { text: string; link: string };
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  layout?: 'center' | 'left' | 'split';
  bgType?: 'color' | 'gradient' | 'image';
  bgColor?: string;
  bgGradient?: string;
  bgImage?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  textColor?: 'light' | 'dark';
  spacing?: 'md' | 'lg' | 'xl';
}

interface HeroProps {
  content: HeroContent;
}

const getLayoutClasses = (layout: string) => {
  switch (layout) {
    case 'split':
      return 'lg:grid lg:grid-cols-2 lg:gap-12 items-center';
    case 'left':
      return 'text-left';
    case 'center':
    default:
      return 'text-center';
  }
};

const getSpacingClasses = (spacing: string) => {
  switch (spacing) {
    case 'md': return 'py-12 px-4';
    case 'xl': return 'py-32 px-6';
    case 'lg':
    default: return 'py-20 px-4';
  }
};

const getBackgroundClasses = (bgType: string, bgColor: string, bgGradient: string, bgImage?: string, overlay?: boolean, overlayOpacity?: number) => {
  if (bgType === 'gradient') {
    const gradients: Record<string, string> = {
      'blue-purple': 'from-blue-600 to-purple-600',
      'emerald-cyan': 'from-emerald-500 to-cyan-500',
      'orange-red': 'from-orange-500 to-red-500',
      'pink-rose': 'from-pink-500 to-rose-500',
      'slate-dark': 'from-slate-900 to-slate-700',
      'indigo-purple': 'from-indigo-600 to-purple-700',
    };
    return `bg-gradient-to-br ${gradients[bgGradient] || gradients['blue-purple']}`;
  }

  if (bgType === 'image' && bgImage) {
    const overlayClass = overlay ? `bg-black/${(overlayOpacity || 50) / 100}` : '';
    return `bg-cover bg-center bg-no-repeat ${overlayClass}`;
  }

  // Solid color with better defaults
  const colorMap: Record<string, string> = {
    white: 'bg-white dark:bg-gray-900',
    black: 'bg-black dark:bg-gray-950',
    slate: 'bg-slate-50 dark:bg-slate-900',
    gray: 'bg-gray-50 dark:bg-gray-800',
    blue: 'bg-blue-600 dark:bg-blue-700',
    indigo: 'bg-indigo-600 dark:bg-indigo-700',
  };

  return colorMap[bgColor || 'white'] || 'bg-white dark:bg-gray-900';
};

const getTextColorClasses = (textColor: string, bgType: string, bgColor: string) => {
  if (textColor === 'light') {
    return 'text-white';
  }
  if (textColor === 'dark') {
    return 'text-gray-900 dark:text-white';
  }
  
  // Auto-detect based on background
  const darkBgColors = ['black', 'blue', 'indigo', 'purple', 'slate'];
  const isDarkBg = bgType === 'gradient' || darkBgColors.includes(bgColor || '');
  
  return isDarkBg ? 'text-white' : 'text-gray-900 dark:text-white';
};

const getBadgeClasses = (badgeColor?: string) => {
  const gradientMap: Record<string, string> = {
    'from-blue-500 to-cyan-500': 'bg-gradient-to-r from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500': 'bg-gradient-to-r from-purple-500 to-pink-500',
    'from-orange-500 to-red-500': 'bg-gradient-to-r from-orange-500 to-red-500',
    'from-emerald-500 to-teal-500': 'bg-gradient-to-r from-emerald-500 to-teal-500',
  };
  return `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${gradientMap[badgeColor || 'from-blue-500 to-cyan-500'] || gradientMap['from-blue-500 to-cyan-500']} text-white shadow-lg`;
};

const getPrimaryButtonClasses = (isDarkBg: boolean) => {
  if (isDarkBg) {
    return 'inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5';
  }
  return 'inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5';
};

const getSecondaryButtonClasses = (isDarkBg: boolean) => {
  if (isDarkBg) {
    return 'inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 focus:ring-4 focus:ring-white/30 transition-all duration-300';
  }
  return 'inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 transition-all duration-300';
};

export const Hero = (props: HeroProps) => {
  const {
    badge,
    badgeColor = 'from-blue-500 to-cyan-500',
    title = 'Build faster with our platform',
    description = 'The all-in-one solution for modern teams. Ship projects faster with our powerful tools and seamless collaboration.',
    primaryCta,
    secondaryCta,
    imageUrl,
    imageAlt = 'Hero illustration',
    imagePosition = 'right',
    layout = 'center',
    bgType = 'gradient',
    bgColor = 'blue',
    bgGradient = 'from-blue-600 to-purple-600',
    bgImage,
    overlay = true,
    overlayOpacity = 60,
    textColor = 'light',
    spacing = 'lg',
  } = props.content;

  const layoutClasses = getLayoutClasses(layout);
  const spacingClasses = getSpacingClasses(spacing);
  const backgroundClasses = getBackgroundClasses(bgType, bgColor, bgGradient, bgImage, overlay, overlayOpacity);
  const textColorClasses = getTextColorClasses(textColor, bgType, bgColor);
  
  const darkBgColors = ['black', 'blue', 'indigo', 'purple', 'slate'];
  const isDarkBg = bgType === 'gradient' || darkBgColors.includes(bgColor || '');
  const primaryButtonClasses = getPrimaryButtonClasses(isDarkBg);
  const secondaryButtonClasses = getSecondaryButtonClasses(isDarkBg);

  return (
    <section class={`${spacingClasses} ${backgroundClasses}`}>
      <div class="max-w-screen-xl mx-auto">
        <div class={`lg:flex lg:items-center lg:gap-12 ${layout === 'split' && imagePosition === 'left' ? 'lg:flex-row-reverse' : ''}`}>
          {/* Content Column */}
          <div class={`${layout === 'center' ? 'text-center' : 'text-left'} ${layout !== 'split' ? 'max-w-4xl mx-auto' : 'lg:flex-1'} ${textColorClasses}`}>
            {badge && (
              <div class="flex justify-center mb-6">
                <span class={getBadgeClasses(badgeColor)}>
                  {badge}
                </span>
              </div>
            )}
            
            {title && (
              <h1 class="mb-6 text-4xl font-extrabold tracking-tight leading-tight md:text-5xl lg:text-6xl">
                {title}
              </h1>
            )}
            
            {description && (
              <p class="mb-8 text-lg font-light opacity-90 max-w-2xl mx-auto md:text-xl">
                {description}
              </p>
            )}
            
            {(primaryCta || secondaryCta) && (
              <div class={`flex flex-col sm:flex-row gap-4 ${layout === 'center' ? 'justify-center' : 'justify-start'}`}>
                {primaryCta && (
                  <a href={primaryCta.link} class={primaryButtonClasses}>
                    {primaryCta.text}
                    <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                )}
                {secondaryCta && (
                  <a href={secondaryCta.link} class={secondaryButtonClasses}>
                    {secondaryCta.text}
                  </a>
                )}
              </div>
            )}
          </div>
          
          {/* Image Column */}
          {layout === 'split' && imageUrl && (
            <div class="hidden lg:flex lg:flex-1 mt-12 lg:mt-0">
              <div class="relative w-full">
                <div class="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl blur-2xl"></div>
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  class="relative rounded-2xl shadow-2xl w-full object-cover"
                  style={{ maxHeight: '500px' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

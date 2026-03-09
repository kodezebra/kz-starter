interface CTAContent {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  alignment?: 'left' | 'center' | 'right';
  bgType?: 'color' | 'gradient' | 'image';
  bgColor?: string;
  bgGradient?: string;
  bgImage?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  spacing?: 'md' | 'lg' | 'xl';
}

interface CTAProps {
  content: CTAContent;
}

const getAlignmentClasses = (alignment: string) => {
  switch (alignment) {
    case 'left': return 'text-left';
    case 'right': return 'text-right';
    case 'center':
    default: return 'text-center';
  }
};

const getSpacingClasses = (spacing: string) => {
  switch (spacing) {
    case 'md': return 'py-12 px-6';
    case 'xl': return 'py-24 px-10';
    case 'lg':
    default: return 'py-16 px-8';
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
    purple: 'bg-purple-600 dark:bg-purple-700',
  };

  return colorMap[bgColor || 'white'] || 'bg-white dark:bg-gray-900';
};

const getTextColorClasses = (bgType: string, bgColor: string, bgGradient: string) => {
  // Dark backgrounds need light text
  const darkBgColors = ['black', 'blue', 'indigo', 'purple', 'slate'];
  const isDarkBg = bgType === 'gradient' || darkBgColors.includes(bgColor || '');
  
  return isDarkBg ? 'text-white' : 'text-gray-900 dark:text-white';
};

const getButtonClasses = (bgType: string, bgColor: string) => {
  const darkBgColors = ['black', 'blue', 'indigo', 'purple', 'slate'];
  const isDarkBg = bgType === 'gradient' || darkBgColors.includes(bgColor || '');
  
  if (isDarkBg) {
    return 'inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5';
  }
  
  return 'inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5';
};

export const CTA = (props: CTAProps) => {
  const {
    title = 'Ready to get started?',
    description = 'Join thousands of satisfied customers today',
    buttonText = 'Get Started',
    buttonLink = '/signup',
    alignment = 'center',
    bgType = 'gradient',
    bgColor = 'blue',
    bgGradient = 'from-blue-600 to-purple-600',
    bgImage,
    overlay = true,
    overlayOpacity = 50,
    spacing = 'lg',
  } = props.content;

  const alignmentClasses = getAlignmentClasses(alignment);
  const spacingClasses = getSpacingClasses(spacing);
  const backgroundClasses = getBackgroundClasses(bgType, bgColor, bgGradient, bgImage, overlay, overlayOpacity);
  const textColorClasses = getTextColorClasses(bgType, bgColor, bgGradient);
  const buttonClasses = getButtonClasses(bgType, bgColor);

  return (
    <section class={`${spacingClasses} ${backgroundClasses} ${bgType === 'image' && bgImage ? '' : ''}`}>
      <div class="max-w-screen-xl mx-auto">
        <div class={`${alignmentClasses} ${textColorClasses}`}>
          {title && (
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight">
              {title}
            </h2>
          )}
          {description && (
            <p class="mb-8 text-lg font-light opacity-90 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          {buttonText && buttonLink && (
            <a href={buttonLink} class={buttonClasses}>
              {buttonText}
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

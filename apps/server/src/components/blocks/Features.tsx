interface FeaturesItem {
  title: string;
  description: string;
  icon?: string;
}

interface FeaturesContent {
  title?: string;
  description?: string;
  items?: FeaturesItem[];
  columns?: 2 | 3 | 4;
  alignment?: 'left' | 'center' | 'right';
  cardStyle?: 'flat' | 'elevated' | 'bordered' | 'glass';
  iconStyle?: 'solid' | 'gradient' | 'outline' | 'colored';
  bgType?: 'color' | 'gradient';
  bgColor?: string;
  bgGradient?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

interface FeaturesProps {
  content: FeaturesContent;
}

const getAlignmentClasses = (alignment: string) => {
  switch (alignment) {
    case 'left': return 'text-left items-start';
    case 'right': return 'text-right items-end';
    case 'center':
    default: return 'text-center items-center';
  }
};

const getCardClasses = (cardStyle: string, bgType: string, bgGradient: string) => {
  const baseClasses = 'p-6 rounded-xl transition-all duration-300';
  
  switch (cardStyle) {
    case 'flat':
      return `${baseClasses} bg-transparent`;
    case 'bordered':
      return `${baseClasses} border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400`;
    case 'glass':
      return `${baseClasses} bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/30`;
    case 'elevated':
    default:
      return `${baseClasses} bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`;
  }
};

const getIconContainerClasses = (iconStyle: string, bgGradient: string) => {
  const baseSize = 'w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300';
  
  switch (iconStyle) {
    case 'solid':
      return `${baseSize} bg-blue-600 text-white`;
    case 'gradient':
      return `${baseSize} bg-gradient-to-br ${bgGradient || 'from-blue-600 to-purple-600'} text-white shadow-lg`;
    case 'outline':
      return `${baseSize} border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300`;
    case 'colored':
    default:
      return `${baseSize} bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400`;
  }
};

const getSpacingClasses = (spacing: string) => {
  switch (spacing) {
    case 'sm': return 'py-8 px-4';
    case 'md': return 'py-12 px-6';
    case 'xl': return 'py-24 px-10';
    case 'lg':
    default: return 'py-16 px-8';
  }
};

const getBackgroundClasses = (bgType: string, bgColor: string, bgGradient: string) => {
  if (bgType === 'gradient') {
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
    return `bg-gradient-to-br ${gradients[bgGradient] || gradients['blue-purple']}`;
  }

  // For color backgrounds with better defaults
  const colorMap: Record<string, string> = {
    white: 'bg-white dark:bg-gray-900',
    black: 'bg-black dark:bg-gray-950',
    slate: 'bg-slate-50 dark:bg-slate-900',
    gray: 'bg-gray-50 dark:bg-gray-800',
    blue: 'bg-blue-50 dark:bg-blue-950/30',
    indigo: 'bg-indigo-50 dark:bg-indigo-950/30',
    purple: 'bg-purple-50 dark:bg-purple-950/30',
  };

  return colorMap[bgColor || 'white'] || 'bg-white dark:bg-gray-900';
};

// Icon component using Lucide via CDN (loaded in Layout)
const Icon = ({ name, className }: { name: string; className?: string }) => {
  // Map of icon names to their data-lucide attribute values
  const iconMap: Record<string, string> = {
    Zap: 'zap',
    Shield: 'shield',
    Star: 'star',
    Heart: 'heart',
    Check: 'check',
    Target: 'target',
    Globe: 'globe',
    Lock: 'lock',
    Rocket: 'rocket',
    Award: 'award',
    TrendingUp: 'trending-up',
    Users: 'users',
    Lightbulb: 'lightbulb',
    Settings: 'settings',
    DollarSign: 'dollar-sign',
    Code: 'code',
    Database: 'database',
    Cloud: 'cloud',
  };
  
  const lucideName = iconMap[name] || 'star';
  
  return (
    <i 
      data-lucide={lucideName} 
      className={className || 'w-6 h-6'}
    />
  );
};

export const Features = (props: FeaturesProps) => {
  const {
    title = 'Our Features',
    description = 'What we offer',
    items = [],
    columns = 3,
    alignment = 'center',
    cardStyle = 'elevated',
    iconStyle = 'gradient',
    bgType = 'color',
    bgColor = 'white',
    bgGradient = 'from-blue-600 to-purple-600',
    spacing = 'lg',
  } = props.content;

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'md:grid-cols-3';

  const alignmentClasses = getAlignmentClasses(alignment);
  const cardClasses = getCardClasses(cardStyle, bgType, bgGradient);
  const iconContainerClasses = getIconContainerClasses(iconStyle, bgGradient);
  const spacingClasses = getSpacingClasses(spacing);
  const backgroundClasses = getBackgroundClasses(bgType, bgColor, bgGradient);

  return (
    <section class={`${spacingClasses} ${backgroundClasses}`}>
      <div class="max-w-screen-xl mx-auto">
        {(title || description) && (
          <div class={`mb-12 ${alignmentClasses}`}>
            {title && (
              <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}
            {description && (
              <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        
        <div class={`grid ${gridCols} gap-8`}>
          {items.map((item, index) => (
            <div key={index} class={cardClasses}>
              {item.icon && (
                <div class={iconContainerClasses}>
                  <Icon name={item.icon} className="w-6 h-6 lg:w-7 lg:h-7" />
                </div>
              )}
              <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

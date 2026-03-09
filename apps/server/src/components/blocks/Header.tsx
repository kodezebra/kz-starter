interface HeaderContent {
  title?: string;
  logo?: string;
  links?: Array<{ label?: string; href?: string }>;
  buttonText?: string;
  buttonLink?: string;
  sticky?: boolean;
  bgType?: 'transparent' | 'solid' | 'glass';
  bgColor?: string;
}

interface HeaderProps {
  content: HeaderContent;
}

export const Header = (props: HeaderProps) => {
  const {
    title = 'Brand',
    logo,
    links = [],
    buttonText = 'Get Started',
    buttonLink = '/signup',
    sticky = true,
    bgType = 'glass',
    bgColor = 'white',
  } = props.content;

  const getBackgroundClasses = () => {
    switch (bgType) {
      case 'transparent':
        return 'bg-transparent';
      case 'solid':
        return 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-none';
      case 'glass':
      default:
        return 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md';
    }
  };

  const bgClasses = getBackgroundClasses();
  const borderClasses = bgType === 'transparent' ? '' : 'border-b border-gray-200 dark:border-gray-800';

  return (
    <header class={`w-full ${sticky ? 'sticky top-0 z-50' : 'relative'} ${bgClasses} ${borderClasses} transition-all duration-300`}>
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
          {/* Logo/Brand */}
          <a href="/" class="flex items-center gap-2 group">
            {logo ? (
              <img src={logo} alt="Logo" class="h-8 w-auto" />
            ) : (
              <span class="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {title}
              </span>
            )}
          </a>

          {/* Navigation - Desktop */}
          <nav class="hidden md:flex items-center gap-1">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href || '#'}
                class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div class="hidden md:flex items-center gap-4">
            {buttonText && (
              <a
                href={buttonLink || '/signup'}
                class="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                {buttonText}
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <button class="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

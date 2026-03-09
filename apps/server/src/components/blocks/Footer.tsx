interface FooterContent {
  brandName?: string;
  logo?: string;
  description?: string;
  columns?: Array<{
    title?: string;
    links?: Array<{ label?: string; href?: string }>;
  }>;
  socialLinks?: Array<{ label?: string; href?: string }>;
  bgType?: 'color' | 'gradient';
  bgColor?: string;
  bgGradient?: string;
}

interface FooterProps {
  content: FooterContent;
}

const getBackgroundClasses = (bgType: string, bgColor: string, bgGradient: string) => {
  if (bgType === 'gradient') {
    return `bg-gradient-to-br ${bgGradient || 'from-slate-900 to-slate-800'}`;
  }

  const colorMap: Record<string, string> = {
    white: 'bg-white dark:bg-gray-900',
    black: 'bg-black dark:bg-gray-950',
    slate: 'bg-slate-900 dark:bg-slate-950',
    gray: 'bg-gray-900 dark:bg-gray-950',
  };

  return colorMap[bgColor || 'slate'] || 'bg-slate-900 dark:bg-slate-950';
};

// Social icon component using Lucide via CDN
const SocialIcon = ({ name }: { name: string }) => {
  const iconMap: Record<string, string> = {
    Twitter: 'twitter',
    GitHub: 'github',
    Linkedin: 'linkedin',
    LinkedIn: 'linkedin',
    Facebook: 'facebook',
    Instagram: 'instagram',
    YouTube: 'youtube',
    Youtube: 'youtube',
    TikTok: 'tiktok',
  };
  
  const lucideName = iconMap[name] || 'twitter';
  
  return (
    <i data-lucide={lucideName} className="w-5 h-5" />
  );
};

export const Footer = (props: FooterProps) => {
  const {
    brandName = 'Brand',
    logo,
    description = 'Building the future of modern web applications.',
    columns = [],
    socialLinks = [],
    bgType = 'color',
    bgColor = 'slate',
    bgGradient = 'from-slate-900 to-slate-800',
  } = props.content;

  const backgroundClasses = getBackgroundClasses(bgType, bgColor, bgGradient);

  return (
    <footer class={`${backgroundClasses} text-white`}>
      <div class="max-w-screen-xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div class="lg:col-span-2 space-y-4">
            {logo ? (
              <img src={logo} alt="Logo" class="h-8 w-auto brightness-0 invert" />
            ) : (
              <span class="text-xl font-bold tracking-tight">{brandName}</span>
            )}
            <p class="text-sm text-gray-400 max-w-sm">{description}</p>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div class="flex space-x-4 pt-2">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href || '#'}
                    class="text-gray-400 hover:text-white transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <SocialIcon name={social.label || 'Twitter'} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns.map((column, i) => (
            <div key={i} class="space-y-4">
              <h4 class="font-semibold text-sm uppercase tracking-wider text-gray-300">
                {column.title}
              </h4>
              <ul class="space-y-3">
                {(column.links || []).map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href || '#'}
                      class="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div class="mt-12 pt-8 border-t border-gray-800">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-sm text-gray-400">
              © {new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            <div class="flex items-center space-x-6">
              <a href="/privacy" class="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" class="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

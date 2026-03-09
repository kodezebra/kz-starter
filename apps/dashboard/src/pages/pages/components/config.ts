import { Layout, Type, Image as ImageIcon, AlignVerticalSpaceAround, DollarSign, HelpCircle, Quote, Video, Grid3x3, Users, TrendingUp } from 'lucide-react';

export const BLOCK_CATEGORIES = {
  layout: 'Layout',
  content: 'Content',
  marketing: 'Marketing',
  conversion: 'Conversion',
  social: 'Social Proof',
} as const;

export const BLOCK_TYPES: any = {
  hero: {
    id: 'hero',
    label: 'Hero Section',
    description: 'Eye-catching header section with CTA',
    category: 'layout',
    icon: Layout,
    defaultContent: {
      title: 'Build faster with our platform',
      description: 'The all-in-one solution for modern teams. Ship projects faster with our powerful tools and seamless collaboration.',
      layout: 'center',
      bgType: 'color',
      bgColor: '#0f172a',
      bgGradient: 'from-blue-600 to-purple-600',
      bgImage: '',
      overlay: true,
      overlayOpacity: 70,
      color: '#ffffff',
      badge: 'New Feature',
      badgeColor: '#3b82f6',
      primaryButtonText: 'Get Started',
      primaryButtonHref: '/signup',
      secondaryButtonText: 'Watch Demo',
      secondaryButtonHref: '/demo',
      image: '',
      imageAlt: 'Hero illustration',
      showSocialProof: false,
      socialProofText: 'Trusted by 10,000+ teams',
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      {
        key: 'layout',
        label: 'Layout',
        type: 'select',
        options: [
          { value: 'center', label: 'Centered' },
          { value: 'left', label: 'Left Aligned' },
          { value: 'split', label: 'Split (Text + Image)' },
        ]
      },
      {
        key: 'bgType',
        label: 'Background Type',
        type: 'select',
        options: [
          { value: 'color', label: 'Solid Color' },
          { value: 'gradient', label: 'Gradient' },
          { value: 'image', label: 'Image' },
        ]
      },
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      {
        key: 'bgGradient',
        label: 'Gradient Preset',
        type: 'select',
        options: [
          { value: 'from-blue-600 to-purple-600', label: 'Blue → Purple' },
          { value: 'from-emerald-500 to-cyan-500', label: 'Emerald → Cyan' },
          { value: 'from-orange-500 to-red-500', label: 'Orange → Red' },
          { value: 'from-pink-500 to-rose-500', label: 'Pink → Rose' },
          { value: 'from-slate-900 to-slate-700', label: 'Dark Slate' },
        ]
      },
      { key: 'bgImage', label: 'Background Image URL', type: 'file' },
      { key: 'overlay', label: 'Show Overlay', type: 'checkbox' },
      { key: 'overlayOpacity', label: 'Overlay Opacity (%)', type: 'number' },
      { key: 'color', label: 'Text Color', type: 'color' },
      { key: 'badge', label: 'Badge Text (optional)', type: 'text' },
      { key: 'badgeColor', label: 'Badge Color', type: 'color' },
      { key: 'primaryButtonText', label: 'Primary Button Text', type: 'text' },
      { key: 'primaryButtonHref', label: 'Primary Button Link', type: 'text' },
      { key: 'secondaryButtonText', label: 'Secondary Button Text', type: 'text' },
      { key: 'secondaryButtonHref', label: 'Secondary Button Link', type: 'text' },
      { key: 'image', label: 'Hero Image (for split layout)', type: 'file' },
      { key: 'imageAlt', label: 'Image Alt Text', type: 'text' },
      { key: 'showSocialProof', label: 'Show Social Proof', type: 'checkbox' },
      { key: 'socialProofText', label: 'Social Proof Text', type: 'text' },
    ]
  },
  text: {
    id: 'text',
    label: 'Text Block',
    description: 'Simple paragraph or rich text content',
    category: 'content',
    icon: Type,
    defaultContent: { body: 'Enter your text content here...' },
    fields: [
      { key: 'body', label: 'Body Content', type: 'textarea' }
    ]
  },
  image: {
    id: 'image',
    label: 'Image',
    description: 'Single image with alt text',
    category: 'content',
    icon: ImageIcon,
    defaultContent: { url: 'https://picsum.photos/seed/react/800/400', alt: 'Description' },
    fields: [
      { key: 'url', label: 'Image Source', type: 'file' },
      { key: 'alt', label: 'Alt Text', type: 'text' },
    ]
  },
  spacer: {
    id: 'spacer',
    label: 'Spacer',
    description: 'Vertical spacing between sections',
    category: 'layout',
    icon: AlignVerticalSpaceAround,
    defaultContent: { height: 50 },
    fields: [
      { key: 'height', label: 'Height (px)', type: 'number' }
    ]
  },
  features: {
    id: 'features',
    label: 'Features',
    description: 'Showcase product features with icons',
    category: 'marketing',
    icon: Layout,
    defaultContent: {
      title: 'Our Features',
      description: 'What we offer',
      columns: 3,
      alignment: 'center',
      cardStyle: 'elevated',
      iconStyle: 'gradient',
      bgType: 'color',
      bgColor: 'white',
      spacing: 'lg',
      items: [
        { title: 'Feature 1', description: 'Detail about this feature.', icon: 'Zap' },
        { title: 'Feature 2', description: 'Detail about this feature.', icon: 'Shield' },
        { title: 'Feature 3', description: 'Detail about this feature.', icon: 'Star' },
      ]
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      {
        key: 'alignment',
        label: 'Content Alignment',
        type: 'select',
        options: [
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' },
        ]
      },
      {
        key: 'cardStyle',
        label: 'Card Style',
        type: 'select',
        options: [
          { value: 'flat', label: 'Flat' },
          { value: 'elevated', label: 'Elevated (Shadow)' },
          { value: 'bordered', label: 'Bordered' },
          { value: 'glass', label: 'Glass (Transparent)' },
        ]
      },
      {
        key: 'iconStyle',
        label: 'Icon Style',
        type: 'select',
        options: [
          { value: 'solid', label: 'Solid Color' },
          { value: 'gradient', label: 'Gradient' },
          { value: 'outline', label: 'Outline' },
          { value: 'colored', label: 'Colored Background' },
        ]
      },
      {
        key: 'columns',
        label: 'Columns',
        type: 'select',
        options: [
          { value: 2, label: '2 Columns' },
          { value: 3, label: '3 Columns' },
          { value: 4, label: '4 Columns' },
        ]
      },
      { key: 'bgType', label: 'Background Type', type: 'select', options: [
        { value: 'color', label: 'Solid Color' },
        { value: 'gradient', label: 'Gradient' },
      ]},
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'bgGradient', label: 'Gradient Preset', type: 'select', options: [
        { value: 'blue-purple', label: 'Blue → Purple' },
        { value: 'emerald-cyan', label: 'Emerald → Cyan' },
        { value: 'orange-red', label: 'Orange → Red' },
        { value: 'pink-rose', label: 'Pink → Rose' },
        { value: 'slate-dark', label: 'Dark Slate' },
        { value: 'indigo-purple', label: 'Indigo → Purple' },
        { value: 'teal-green', label: 'Teal → Green' },
        { value: 'amber-orange', label: 'Amber → Orange' },
      ]},
      { key: 'spacing', label: 'Section Spacing', type: 'select', options: [
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
        { value: 'xl', label: 'Extra Large' },
      ]},
      {
        key: 'items',
        label: 'Feature Items',
        type: 'list',
        itemFields: [
          { key: 'icon', label: 'Icon Name (Lucide)', type: 'icon' },
          { key: 'title', label: 'Item Title', type: 'text' },
          { key: 'description', label: 'Item Description', type: 'textarea' },
        ]
      }
    ]
  },
  cta: {
    id: 'cta',
    label: 'Call to Action',
    description: 'Prompt users to take action',
    category: 'conversion',
    icon: Layout,
    defaultContent: {
      title: 'Ready to start?',
      description: 'Get started with our platform today',
      buttonText: 'Get Started',
      buttonLink: '/signup',
      alignment: 'center',
      bgType: 'gradient',
      bgGradient: 'blue-purple',
      spacing: 'lg',
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'buttonText', label: 'Button Text', type: 'text' },
      { key: 'buttonLink', label: 'Button Link', type: 'text' },
      {
        key: 'alignment',
        label: 'Content Alignment',
        type: 'select',
        options: [
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' },
        ]
      },
      { key: 'bgType', label: 'Background Type', type: 'select', options: [
        { value: 'color', label: 'Solid Color' },
        { value: 'gradient', label: 'Gradient' },
        { value: 'image', label: 'Image' },
      ]},
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'bgGradient', label: 'Gradient Preset', type: 'select', options: [
        { value: 'blue-purple', label: 'Blue → Purple' },
        { value: 'emerald-cyan', label: 'Emerald → Cyan' },
        { value: 'orange-red', label: 'Orange → Red' },
        { value: 'pink-rose', label: 'Pink → Rose' },
        { value: 'slate-dark', label: 'Dark Slate' },
        { value: 'indigo-purple', label: 'Indigo → Purple' },
      ]},
      { key: 'bgImage', label: 'Background Image URL', type: 'file' },
      { key: 'overlay', label: 'Show Overlay', type: 'checkbox' },
      { key: 'spacing', label: 'Section Spacing', type: 'select', options: [
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
        { value: 'xl', label: 'Extra Large' },
      ]},
    ]
  },
  newsletter: {
    id: 'newsletter',
    label: 'Newsletter',
    description: 'Email subscription form',
    category: 'conversion',
    icon: Layout,
    defaultContent: { title: 'Subscribe', description: 'Get updates' },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ]
  },
  'social-proof': {
    id: 'social-proof',
    label: 'Social Proof',
    description: 'Display company logos or trust badges',
    category: 'social',
    icon: Layout,
    defaultContent: { title: 'Trusted by companies' },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
    ]
  },
  header: {
    id: 'header',
    label: 'Header / Navigation',
    description: 'Top navigation bar with logo and links',
    category: 'layout',
    icon: Layout,
    defaultContent: {
      title: 'Brand',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Features', href: '#features' },
        { label: 'About', href: '#about' },
      ],
      buttonText: 'Get Started',
      sticky: true
    },
    fields: [
      { key: 'title', label: 'Brand Name (if no logo)', type: 'text' },
      { key: 'logo', label: 'Logo Image', type: 'file' },
      {
        key: 'links',
        label: 'Navigation Links',
        type: 'list',
        itemFields: [
          { key: 'label', label: 'Link Label', type: 'text' },
          { key: 'href', label: 'Link URL', type: 'text' },
        ]
      },
      { key: 'buttonText', label: 'CTA Button Text', type: 'text' },
      { key: 'sticky', label: 'Sticky Header', type: 'checkbox' },
    ]
  },
  footer: {
    id: 'footer',
    label: 'Footer / Links',
    description: 'Footer with links and copyright',
    category: 'layout',
    icon: Layout,
    defaultContent: {
      brandName: 'Brand',
      description: 'The best CMS for modern web apps.',
      columns: [
        { title: 'Product', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }] },
        { title: 'Company', links: [{ label: 'About', href: '#about' }, { label: 'Blog', href: '#blog' }] },
        { title: 'Legal', links: [{ label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }] },
      ],
      socialLinks: [
        { label: 'Twitter', href: 'https://twitter.com' },
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
      ],
    },
    fields: [
      { key: 'brandName', label: 'Brand Name', type: 'text' },
      { key: 'logo', label: 'Logo Image', type: 'file' },
      { key: 'description', label: 'Description', type: 'textarea' },
      {
        key: 'columns',
        label: 'Link Columns',
        type: 'list',
        itemFields: [
          { key: 'title', label: 'Column Title', type: 'text' },
          {
            key: 'links',
            label: 'Links',
            type: 'list',
            itemFields: [
              { key: 'label', label: 'Link Label', type: 'text' },
              { key: 'href', label: 'Link URL', type: 'text' },
            ]
          },
        ]
      },
      {
        key: 'socialLinks',
        label: 'Social Links',
        type: 'list',
        itemFields: [
          { key: 'label', label: 'Platform Name', type: 'text' },
          { key: 'href', label: 'URL', type: 'text' },
        ]
      },
    ]
  },
  pricing: {
    id: 'pricing',
    label: 'Pricing Plans',
    description: 'Display pricing tiers with features',
    category: 'conversion',
    icon: DollarSign,
    defaultContent: {
      title: 'Simple Pricing',
      description: 'Choose the plan that fits your needs',
      plans: [
        { name: 'Starter', price: '$9', period: '/month', description: 'Perfect for getting started', features: ['5 Projects', '10GB Storage', 'Email Support'], featured: false },
        { name: 'Pro', price: '$29', period: '/month', description: 'Best for growing teams', features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics'], featured: true },
        { name: 'Enterprise', price: '$99', period: '/month', description: 'For large organizations', features: ['Everything in Pro', 'Unlimited Storage', '24/7 Support', 'Custom Integrations'], featured: false },
      ]
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      {
        key: 'plans',
        label: 'Pricing Plans',
        type: 'list',
        itemFields: [
          { key: 'name', label: 'Plan Name', type: 'text' },
          { key: 'price', label: 'Price', type: 'text' },
          { key: 'period', label: 'Period', type: 'text' },
          { key: 'description', label: 'Short Description', type: 'text' },
          { key: 'features', label: 'Features (one per line)', type: 'textarea' },
          { key: 'featured', label: 'Featured Plan', type: 'checkbox' },
        ]
      }
    ]
  },
  faq: {
    id: 'faq',
    label: 'FAQ',
    description: 'Frequently asked questions accordion',
    category: 'marketing',
    icon: HelpCircle,
    defaultContent: {
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions',
      items: [
        { question: 'How do I get started?', answer: 'Simply sign up for an account and follow the onboarding guide. You\'ll be up and running in minutes.' },
        { question: 'Is there a free trial?', answer: 'Yes! We offer a 14-day free trial on all plans. No credit card required.' },
        { question: 'Can I cancel anytime?', answer: 'Absolutely. You can cancel your subscription at any time with no questions asked.' },
      ]
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      {
        key: 'items',
        label: 'FAQ Items',
        type: 'list',
        itemFields: [
          { key: 'question', label: 'Question', type: 'text' },
          { key: 'answer', label: 'Answer', type: 'textarea' },
        ]
      }
    ]
  },
  testimonials: {
    id: 'testimonials',
    label: 'Testimonials',
    description: 'Customer reviews and quotes',
    category: 'social',
    icon: Quote,
    defaultContent: {
      title: 'What Our Customers Say',
      description: 'Trusted by thousands of businesses worldwide',
      items: [
        { quote: 'This product has transformed how we work. Absolutely essential for our team.', author: 'Sarah Johnson', role: 'CEO at TechCorp', avatar: '' },
        { quote: 'The best investment we\'ve made this year. Highly recommended!', author: 'Mike Chen', role: 'Founder at StartupXYZ', avatar: '' },
        { quote: 'Outstanding support and incredible features. Five stars!', author: 'Emily Davis', role: 'Marketing Director', avatar: '' },
      ]
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      {
        key: 'items',
        label: 'Testimonials',
        type: 'list',
        itemFields: [
          { key: 'quote', label: 'Quote', type: 'textarea' },
          { key: 'author', label: 'Author Name', type: 'text' },
          { key: 'role', label: 'Role/Company', type: 'text' },
          { key: 'avatar', label: 'Avatar URL', type: 'file' },
        ]
      }
    ]
  },
  video: {
    id: 'video',
    label: 'Video',
    description: 'Embed YouTube or Vimeo video',
    category: 'content',
    icon: Video,
    defaultContent: {
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      title: 'Product Demo',
      description: 'Watch our quick demo to see how it works',
      autoplay: false,
      showControls: true,
    },
    fields: [
      { key: 'url', label: 'Video URL (YouTube/Vimeo embed)', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'autoplay', label: 'Autoplay', type: 'checkbox' },
      { key: 'showControls', label: 'Show Controls', type: 'checkbox' },
    ]
  },
  gallery: {
    id: 'gallery',
    label: 'Image Gallery',
    description: 'Grid of images with captions',
    category: 'content',
    icon: Grid3x3,
    defaultContent: {
      title: 'Our Work',
      description: 'Browse through our latest projects',
      columns: 3,
      images: [
        { url: 'https://picsum.photos/seed/gallery1/600/400', alt: 'Project 1', caption: 'Project One' },
        { url: 'https://picsum.photos/seed/gallery2/600/400', alt: 'Project 2', caption: 'Project Two' },
        { url: 'https://picsum.photos/seed/gallery3/600/400', alt: 'Project 3', caption: 'Project Three' },
        { url: 'https://picsum.photos/seed/gallery4/600/400', alt: 'Project 4', caption: 'Project Four' },
        { url: 'https://picsum.photos/seed/gallery5/600/400', alt: 'Project 5', caption: 'Project Five' },
        { url: 'https://picsum.photos/seed/gallery6/600/400', alt: 'Project 6', caption: 'Project Six' },
      ]
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'columns', label: 'Columns', type: 'number' },
      {
        key: 'images',
        label: 'Images',
        type: 'list',
        itemFields: [
          { key: 'url', label: 'Image URL', type: 'file' },
          { key: 'alt', label: 'Alt Text', type: 'text' },
          { key: 'caption', label: 'Caption', type: 'text' },
        ]
      }
    ]
  },
  team: {
    id: 'team',
    label: 'Team Members',
    description: 'Introduce your team with photos',
    category: 'marketing',
    icon: Users,
    defaultContent: {
      title: 'Meet Our Team',
      description: 'The talented people behind our success',
      members: [
        { name: 'Alex Johnson', role: 'CEO & Founder', bio: '15 years of experience in the industry', image: 'https://picsum.photos/seed/team1/300/300', social: { twitter: '', linkedin: '' } },
        { name: 'Maria Garcia', role: 'CTO', bio: 'Former lead engineer at major tech companies', image: 'https://picsum.photos/seed/team2/300/300', social: { twitter: '', linkedin: '' } },
        { name: 'James Wilson', role: 'Head of Design', bio: 'Award-winning designer with a passion for UX', image: 'https://picsum.photos/seed/team3/300/300', social: { twitter: '', linkedin: '' } },
      ]
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      {
        key: 'members',
        label: 'Team Members',
        type: 'list',
        itemFields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          { key: 'bio', label: 'Short Bio', type: 'textarea' },
          { key: 'image', label: 'Photo', type: 'file' },
          { key: 'twitter', label: 'Twitter Handle', type: 'text' },
          { key: 'linkedin', label: 'LinkedIn URL', type: 'text' },
        ]
      }
    ]
  },
  stats: {
    id: 'stats',
    label: 'Stats / Numbers',
    description: 'Highlight key metrics and achievements',
    category: 'marketing',
    icon: TrendingUp,
    defaultContent: {
      title: 'Our Impact',
      description: 'Numbers that speak for themselves',
      items: [
        { value: '10K+', label: 'Active Users', suffix: '' },
        { value: '99.9', label: 'Uptime SLA', suffix: '%' },
        { value: '500+', label: 'Enterprise Clients', suffix: '' },
        { value: '24/7', label: 'Customer Support', suffix: '' },
      ]
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      {
        key: 'items',
        label: 'Stats Items',
        type: 'list',
        itemFields: [
          { key: 'value', label: 'Value', type: 'text' },
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'suffix', label: 'Suffix (%, +, etc)', type: 'text' },
        ]
      }
    ]
  }
};

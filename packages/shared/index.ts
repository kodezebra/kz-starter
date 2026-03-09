import { createAuthClient } from 'better-auth/client';

export const name = "kz-shared";

export const getAuthClient = (baseUrl: string) => {
  return createAuthClient({
    baseURL: baseUrl,
  });
};

export type BlockType = 'hero' | 'text' | 'image' | 'spacer' | 'features' | 'cta' | 'newsletter' | 'social-proof' | 'header' | 'footer' | 'pricing' | 'faq' | 'testimonials' | 'video' | 'gallery' | 'team' | 'stats';

export interface Block {
  id: string;
  type: BlockType;
  content: any;
  order: number;
}

export const resolveAssetUrl = (url: string | undefined, apiBaseUrl: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/v1/assets/')) return `${apiBaseUrl}${url}`;
  return url;
};

// Background utilities for premium blocks
export const BACKGROUND_GRADIENTS = {
  none: '',
  'blue-purple': 'from-blue-600 to-purple-600',
  'emerald-cyan': 'from-emerald-500 to-cyan-500',
  'orange-red': 'from-orange-500 to-red-500',
  'pink-rose': 'from-pink-500 to-rose-500',
  'slate-dark': 'from-slate-900 to-slate-700',
  'indigo-purple': 'from-indigo-600 to-purple-700',
  'teal-green': 'from-teal-500 to-emerald-600',
  'amber-orange': 'from-amber-500 to-orange-600',
  'cyan-blue': 'from-cyan-500 to-blue-600',
  'violet-pink': 'from-violet-600 to-pink-600',
  'gray-slate': 'from-gray-900 to-gray-800',
} as const;

export const BACKGROUND_SOLID_COLORS = {
  white: 'bg-white dark:bg-gray-900',
  black: 'bg-black',
  slate: 'bg-slate-50 dark:bg-slate-900',
  gray: 'bg-gray-50 dark:bg-gray-800',
  blue: 'bg-blue-50 dark:bg-blue-900/20',
  indigo: 'bg-indigo-50 dark:bg-indigo-900/20',
  purple: 'bg-purple-50 dark:bg-purple-900/20',
  pink: 'bg-pink-50 dark:bg-pink-900/20',
  red: 'bg-red-50 dark:bg-red-900/20',
  orange: 'bg-orange-50 dark:bg-orange-900/20',
  amber: 'bg-amber-50 dark:bg-amber-900/20',
  yellow: 'bg-yellow-50 dark:bg-yellow-900/20',
  lime: 'bg-lime-50 dark:bg-lime-900/20',
  green: 'bg-green-50 dark:bg-green-900/20',
  emerald: 'bg-emerald-50 dark:bg-emerald-900/20',
  teal: 'bg-teal-50 dark:bg-teal-900/20',
  cyan: 'bg-cyan-50 dark:bg-cyan-900/20',
  sky: 'bg-sky-50 dark:bg-sky-900/20',
} as const;

export const SPACING_OPTIONS = {
  none: 'p-0',
  sm: 'py-8 px-4',
  md: 'py-12 px-6',
  lg: 'py-16 px-8',
  xl: 'py-24 px-10',
  '2xl': 'py-32 px-12',
} as const;

export const MAX_WIDTH_OPTIONS = {
  full: 'max-w-none',
  contained: 'max-w-screen-xl mx-auto',
  wide: 'max-w-7xl mx-auto',
} as const;

export const TEXT_ALIGNMENT_OPTIONS = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export const getBackgroundClasses = (bgType: string, bgValue: string, bgImage?: string, overlay?: boolean, overlayOpacity?: number) => {
  if (bgType === 'gradient') {
    const gradientClass = BACKGROUND_GRADIENTS[bgValue as keyof typeof BACKGROUND_GRADIENTS] || BACKGROUND_GRADIENTS['blue-purple'];
    return `bg-gradient-to-br ${gradientClass}`;
  }
  
  if (bgType === 'image' && bgImage) {
    const overlayClass = overlay ? `bg-black/${(overlayOpacity || 50) / 100}` : '';
    return `bg-cover bg-center bg-no-repeat ${overlayClass}`;
  }
  
  if (bgType === 'color') {
    return BACKGROUND_SOLID_COLORS[bgValue as keyof typeof BACKGROUND_SOLID_COLORS] || BACKGROUND_SOLID_COLORS.white;
  }
  
  return BACKGROUND_SOLID_COLORS.white;
};

export const getGradientClass = (gradient: string) => {
  return BACKGROUND_GRADIENTS[gradient as keyof typeof BACKGROUND_GRADIENTS] || '';
};

export function createApiClient(baseUrl: string) {
  const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(`${baseUrl}/v1${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || response.statusText);
    }

    return response.json();
  };

  return {
    get: <T>(path: string) => request<T>(path, { method: 'GET' }),
    post: <T>(path: string, body: any) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
    put: <T>(path: string, body: any) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
    patch: <T>(path: string, body: any) => request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  };
}
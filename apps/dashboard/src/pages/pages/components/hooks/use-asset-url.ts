import { useMemo } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

/**
 * Resolves asset URLs that start with /v1/assets/ to full API URLs
 */
export function resolveAssetUrl(url: string | undefined | null): string {
  if (!url) return '';
  if (url.startsWith('/v1/assets/')) {
    return `${API_URL}${url}`;
  }
  return url;
}

/**
 * Hook for resolving asset URLs with memoization
 */
export function useAssetUrl(url: string | undefined | null): string {
  return useMemo(() => resolveAssetUrl(url), [url]);
}

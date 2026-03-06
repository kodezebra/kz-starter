export const name = "kz-shared";

export type BlockType = 'hero' | 'features' | 'cta' | 'newsletter' | 'social-proof' | 'text' | 'image';

// ... (previous interfaces stay the same)

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

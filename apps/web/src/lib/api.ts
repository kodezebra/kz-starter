import { createApiClient } from "@kz/shared";

// Astro uses import.meta.env.PUBLIC_* for client-side, but standard for server-side
const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8787';

export const api = createApiClient(API_BASE_URL);

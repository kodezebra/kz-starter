import { createApiClient } from "@kz/shared";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

export const api = createApiClient(API_BASE_URL);

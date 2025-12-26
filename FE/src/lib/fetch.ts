import { APP_CONFIG } from '@/constants/config';

/**
 * API Response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

/**
 * API Error response
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
}

/**
 * Fetch options with Next.js cache
 */
export interface FetchOptions extends RequestInit {
  // Next.js cache options
  revalidate?: number | false; // seconds
  tags?: string[];
  // Custom options
  requireAuth?: boolean;
  baseURL?: string;
}

/**
 * Access token from context (set by useAuth hook)
 * This allows client components to pass token to API calls
 */
let contextAccessToken: string | null = null;

export function setContextAccessToken(token: string | null) {
  contextAccessToken = token;
}

/**
 * Get access token from context (client) or cookies (server)
 */
function getAccessToken(): string | null {
  // Client-side: use context token
  if (typeof window !== 'undefined') {
    return contextAccessToken;
  }
  // Server-side: token should be in cookies (handled by middleware)
  return null;
}

/**
 * Create fetch headers
 */
function createHeaders(requireAuth = true): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (requireAuth) {
    const token = getAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * Handle fetch response
 */
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  if (!response.ok) {
    const errorData: ApiErrorResponse = isJson
      ? await response.json()
      : {
          success: false,
          message: response.statusText || 'Something went wrong',
          statusCode: response.status,
        };

    // Handle 401 Unauthorized - token expired
    if (response.status === 401) {
      // Clear context token
      contextAccessToken = null;

      if (typeof window !== 'undefined') {
        // Clear user data from storage (refresh token is in HTTP-only cookie)
        localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.USER);
        localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);

        // Redirect to login
        window.location.href = '/login';
      }
    }

    throw new Error(errorData.message || 'API Error');
  }

  return isJson ? response.json() : { success: true, data: null as T };
}

/**
 * Base API fetch function with Next.js cache support
 */
async function apiFetch<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const {
    requireAuth = true,
    baseURL = APP_CONFIG.API.BASE_URL,
    revalidate,
    tags,
    ...fetchOptions
  } = options;

  const url = `${baseURL}${endpoint}`;

  // Build fetch options
  const config: RequestInit = {
    ...fetchOptions,
    headers: {
      ...createHeaders(requireAuth),
      ...fetchOptions.headers,
    },
    credentials: 'include', // Include cookies for refresh token
  };

  // Add Next.js cache configuration
  if (revalidate !== undefined) {
    config.next = { revalidate, ...(config.next as any) };
  }

  if (tags && tags.length > 0) {
    config.next = { tags, ...(config.next as any) };
  }

  try {
    const response = await fetch(url, config);
    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error');
  }
}

/**
 * API Service with Next.js fetch
 */
export const api = {
  /**
   * GET request
   */
  async get<T = any>(endpoint: string, options?: FetchOptions): Promise<T> {
    const response = await apiFetch<T>(endpoint, {
      method: 'GET',
      ...options,
    });
    return response.data;
  },

  /**
   * POST request (no cache by default)
   */
  async post<T = any>(endpoint: string, body?: any, options?: FetchOptions): Promise<T> {
    const response = await apiFetch<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store', // Don't cache POST requests
      ...options,
    });
    return response.data;
  },

  /**
   * PUT request (no cache by default)
   */
  async put<T = any>(endpoint: string, body?: any, options?: FetchOptions): Promise<T> {
    const response = await apiFetch<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
      ...options,
    });
    return response.data;
  },

  /**
   * PATCH request (no cache by default)
   */
  async patch<T = any>(endpoint: string, body?: any, options?: FetchOptions): Promise<T> {
    const response = await apiFetch<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
      ...options,
    });
    return response.data;
  },

  /**
   * DELETE request
   */
  async delete<T = any>(endpoint: string, options?: FetchOptions): Promise<T> {
    const response = await apiFetch<T>(endpoint, {
      method: 'DELETE',
      cache: 'no-store',
      ...options,
    });
    return response.data;
  },

  /**
   * Upload file
   */
  async upload<T = any>(endpoint: string, file: File, fieldName = 'file'): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);

    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${APP_CONFIG.API.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
      cache: 'no-store',
      credentials: 'include',
    });

    const result = await handleResponse<T>(response);
    return result.data;
  },

  /**
   * Upload multiple files
   */
  async uploadMultiple<T = any>(endpoint: string, files: File[], fieldName = 'files'): Promise<T> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(fieldName, file);
    });

    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${APP_CONFIG.API.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
      cache: 'no-store',
      credentials: 'include',
    });

    const result = await handleResponse<T>(response);
    return result.data;
  },
};

export async function fetchWithCache<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  return api.get<T>(endpoint, options);
}

export async function revalidateTag(tag: string) {
  const { revalidateTag: nextRevalidateTag } = await import('next/cache');
  nextRevalidateTag(tag);
}

export async function revalidatePath(path: string) {
  const { revalidatePath: nextRevalidatePath } = await import('next/cache');
  nextRevalidatePath(path);
}

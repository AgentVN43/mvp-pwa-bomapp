const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class ApiError extends Error {
  status?: number;
  data?: unknown;
  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<T>(
  path: string,
  method: HttpMethod,
  body?: unknown,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...init,
  });

  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : await res.text();

  if (!res.ok) {
    throw new ApiError(
      (data as any)?.message || `Request failed: ${res.status}`,
      res.status,
      data,
    );
  }
  return data as T;
}

export const http = {
  get: <T>(path: string, init?: RequestInit) => request<T>(path, 'GET', undefined, init),
  post: <T>(path: string, body?: unknown, init?: RequestInit) => request<T>(path, 'POST', body, init),
  put: <T>(path: string, body?: unknown, init?: RequestInit) => request<T>(path, 'PUT', body, init),
  del: <T>(path: string, init?: RequestInit) => request<T>(path, 'DELETE', undefined, init),
};

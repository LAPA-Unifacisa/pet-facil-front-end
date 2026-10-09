const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? '').replace(/\/$/, '');

let token: string | null = null;

export const setApiToken = (value: string | null) => {
  token = value;
};

export const fileUrl = (path?: string | null): string | undefined =>
  path ? `${API_URL}${path}` : undefined;

export const wsUrl = (value: string): string =>
  `${API_URL.replace(/^http/, 'ws')}/ws?token=${encodeURIComponent(value)}`;

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const isForm = init.body instanceof FormData;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        'ngrok-skip-browser-warning': '1',
        ...(isForm ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
    });
  } catch {
    throw new Error('Sem conexão com o servidor. Verifique sua internet.');
  }

  if (res.status === 204) return undefined as T;

  const json: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    const message =
      json && typeof json === 'object' && 'error' in json && typeof json.error === 'string'
        ? json.error
        : `Erro ${res.status}`;
    throw new Error(message);
  }
  return json as T;
}

export const post = <T>(path: string, body?: unknown) =>
  api<T>(path, { method: 'POST', body: JSON.stringify(body ?? {}) });

export const patch = <T>(path: string, body?: unknown) =>
  api<T>(path, { method: 'PATCH', body: JSON.stringify(body ?? {}) });

export const del = <T>(path: string) => api<T>(path, { method: 'DELETE' });

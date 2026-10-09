import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/src/hooks/useAuth';
import { api } from '@/src/services/api';

interface UserDataState<T> {
  userId: string | null;
  data: T;
  error: string | null;
}

type FetchResult<T> = { ok: true; data: T } | { ok: false; error: string };

async function fetchResult<T>(path: string): Promise<FetchResult<T>> {
  try {
    return { ok: true, data: await api<T>(path) };
  } catch (err) {
    console.warn(`[api] falha ao carregar ${path}:`, err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Não foi possível carregar os dados.',
    };
  }
}

export function useUserData<T>(path: string, empty: T) {
  const { currentUser } = useAuth();
  const userId = currentUser?.id ?? null;
  const [state, setState] = useState<UserDataState<T>>({ userId: null, data: empty, error: null });

  const apply = useCallback(
    (id: string, result: FetchResult<T>) => {
      setState((prev) => ({
        userId: id,
        data: result.ok ? result.data : prev.userId === id ? prev.data : empty,
        error: result.ok ? null : result.error,
      }));
    },
    [empty],
  );

  const load = useCallback(
    async (id: string) => apply(id, await fetchResult<T>(path)),
    [path, apply],
  );

  useEffect(() => {
    if (!userId) return;
    let active = true;
    fetchResult<T>(path).then((result) => {
      if (active) apply(userId, result);
    });
    return () => {
      active = false;
    };
  }, [userId, path, apply]);

  const ready = userId !== null && state.userId === userId;

  const setData = useCallback((update: (prev: T) => T) => {
    setState((prev) => ({ ...prev, data: update(prev.data) }));
  }, []);

  const reload = useCallback(async () => {
    if (userId) await load(userId);
  }, [userId, load]);

  return {
    data: ready ? state.data : empty,
    loading: userId !== null && !ready,
    error: ready ? state.error : null,
    setData,
    reload,
  };
}

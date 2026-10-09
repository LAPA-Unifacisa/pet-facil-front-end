import { useCallback, useEffect, useRef, useState } from 'react';

import { patch, wsUrl } from '@/src/services/api';
import { showLocalNotification } from '@/src/services/localNotifications';

export type NotificationType = 'info' | 'promo' | 'pedido' | 'agendamento' | 'alerta';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  data: Record<string, unknown>;
  readAt: string | null;
  createdAt: string;
}

type ServerMessage =
  | { type: 'hello'; payload: { unread: AppNotification[] } }
  | { type: 'notification'; payload: AppNotification }
  | { type: 'chat:typing' }
  | { type: 'pong' };

const LOGOUT_CODE = 4001;
const MAX_RETRY_MS = 30_000;

interface SocketState {
  token: string | null;
  items: AppNotification[];
}

export function useNotificationSocket(token: string | null) {
  const [state, setState] = useState<SocketState>({ token: null, items: [] });
  const [online, setOnline] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const items = token && state.token === token ? state.items : [];

  const setItems = useCallback(
    (update: (list: AppNotification[]) => AppNotification[]) => {
      setState((prev) => (prev.token === token ? { token, items: update(prev.items) } : prev));
    },
    [token],
  );

  useEffect(() => {
    if (!token) return;

    let retry = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;

    const handle = (message: ServerMessage) => {
      if (message.type === 'hello') {
        setState({ token, items: message.payload.unread });
      }
      if (message.type === 'notification') {
        const notification = message.payload;
        setState((prev) => {
          const list = prev.token === token ? prev.items : [];
          return { token, items: [notification, ...list.filter((n) => n.id !== notification.id)] };
        });
        showLocalNotification(notification.title, notification.body, notification.data).catch(
          (error: unknown) => console.warn('[notificações] falha no banner:', error),
        );
      }
    };

    const connect = () => {
      const ws = new WebSocket(wsUrl(token));
      wsRef.current = ws;

      ws.onopen = () => {
        retry = 0;
        setOnline(true);
      };
      ws.onmessage = (event) => {
        try {
          handle(JSON.parse(String(event.data)) as ServerMessage);
        } catch (error) {
          console.warn('[notificações] mensagem inválida:', error);
        }
      };
      ws.onclose = (event) => {
        setOnline(false);
        if (stopped || event.code === LOGOUT_CODE) return;
        timer = setTimeout(connect, Math.min(MAX_RETRY_MS, 1000 * 2 ** retry++));
      };
    };

    connect();

    return () => {
      stopped = true;
      clearTimeout(timer);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [token]);

  const markRead = useCallback(
    (id: string) => {
      const ws = wsRef.current;
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'notification:read', id }));
      } else {
        patch(`/api/notifications/${id}/read`).catch((error: unknown) =>
          console.warn('[notificações] falha ao marcar como lida:', error),
        );
      }
      setItems((list) =>
        list.map((n) =>
          n.id === id && !n.readAt ? { ...n, readAt: new Date().toISOString() } : n,
        ),
      );
    },
    [setItems],
  );

  const markAllRead = useCallback(async () => {
    await patch('/api/notifications/read-all');
    const now = new Date().toISOString();
    setItems((list) => list.map((n) => (n.readAt ? n : { ...n, readAt: now })));
  }, [setItems]);

  const unread = items.filter((n) => !n.readAt).length;

  return { items, unread, online, markRead, markAllRead };
}

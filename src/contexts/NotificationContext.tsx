import { ReactNode, createContext } from 'react';

import { useAuth } from '@/src/hooks/useAuth';
import { useNotificationSocket } from '@/src/hooks/useNotificationSocket';

export type NotificationContextValue = ReturnType<typeof useNotificationSocket>;

export const NotificationContext = createContext<NotificationContextValue | null>(null);

interface NotificationProviderProps {
  children: ReactNode;
}

export default function NotificationProvider({ children }: NotificationProviderProps) {
  const { token } = useAuth();
  const value = useNotificationSocket(token);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

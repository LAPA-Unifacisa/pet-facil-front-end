import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';

type NotificationsModule = typeof import('expo-notifications');

const isExpoGoAndroid =
  Platform.OS === 'android' &&
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

let modulePromise: Promise<NotificationsModule | null> | null = null;

function loadNotifications(): Promise<NotificationsModule | null> {
  modulePromise ??= isExpoGoAndroid
    ? Promise.resolve(null)
    : import('expo-notifications').catch((error: unknown) => {
        console.warn('[notificações] módulo indisponível:', error);
        return null;
      });
  return modulePromise;
}

export async function setupLocalNotifications(): Promise<void> {
  const Notifications = await loadNotifications();
  if (!Notifications) return;

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  await Notifications.requestPermissionsAsync();
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Avisos do PetFacil',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
}

export async function showLocalNotification(
  title: string,
  body: string,
  data: Record<string, unknown>,
): Promise<void> {
  const Notifications = await loadNotifications();
  if (!Notifications) return;
  await Notifications.scheduleNotificationAsync({ content: { title, body, data }, trigger: null });
}

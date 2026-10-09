import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import Loading from '@/src/components/ui/Loading';
import AppointmentProvider from '@/src/contexts/AppointmentContext';
import AuthProvider from '@/src/contexts/AuthContext';
import CartProvider from '@/src/contexts/CartContext';
import NotificationProvider from '@/src/contexts/NotificationContext';
import PetProvider from '@/src/contexts/PetContext';
import ProductProvider from '@/src/contexts/ProductContext';
import PurchaseProvider from '@/src/contexts/PurchaseContext';
import { useAuth } from '@/src/hooks/useAuth';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function RootNavigation() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!currentUser}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={!!currentUser}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    Notifications.requestPermissionsAsync().catch((error: unknown) =>
      console.warn('[notificações] permissão não concedida:', error),
    );
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'Avisos do PetFacil',
        importance: Notifications.AndroidImportance.HIGH,
      }).catch((error: unknown) => console.warn('[notificações] falha ao criar o canal:', error));
    }
  }, []);

  return (
    <AuthProvider>
      <NotificationProvider>
        <ProductProvider>
          <CartProvider>
            <PurchaseProvider>
              <PetProvider>
                <AppointmentProvider>
                  <RootNavigation />
                  <StatusBar style="dark" />
                </AppointmentProvider>
              </PetProvider>
            </PurchaseProvider>
          </CartProvider>
        </ProductProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

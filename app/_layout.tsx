import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import Loading from '@/src/components/ui/Loading';
import AppointmentProvider from '@/src/contexts/AppointmentContext';
import AuthProvider from '@/src/contexts/AuthContext';
import CartProvider from '@/src/contexts/CartContext';
import NotificationProvider from '@/src/contexts/NotificationContext';
import PetProvider from '@/src/contexts/PetContext';
import ProductProvider from '@/src/contexts/ProductContext';
import PurchaseProvider from '@/src/contexts/PurchaseContext';
import { useAuth } from '@/src/hooks/useAuth';
import { setupLocalNotifications } from '@/src/services/localNotifications';

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
    setupLocalNotifications().catch((error: unknown) =>
      console.warn('[notificações] falha ao configurar:', error),
    );
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

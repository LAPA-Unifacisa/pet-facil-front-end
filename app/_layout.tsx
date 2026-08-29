import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import Loading from '@/src/components/ui/Loading';
import AppointmentProvider from '@/src/contexts/AppointmentContext';
import AuthProvider from '@/src/contexts/AuthContext';
import CartProvider from '@/src/contexts/CartContext';
import PetProvider from '@/src/contexts/PetContext';
import PurchaseProvider from '@/src/contexts/PurchaseContext';
import { useAuth } from '@/src/hooks/useAuth';

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
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

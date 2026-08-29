import { Stack, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import ChatFAB from '@/src/components/chat/ChatFAB';

const HIDDEN_FAB_ROUTES = ['/chat', '/carrinho'];

export default function MainLayout() {
  const pathname = usePathname();
  const showFab = !HIDDEN_FAB_ROUTES.includes(pathname);

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="carrinho" />
        <Stack.Screen name="pedido-confirmado" />
        <Stack.Screen name="chat" options={{ presentation: 'modal' }} />
      </Stack>
      {showFab && <ChatFAB />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

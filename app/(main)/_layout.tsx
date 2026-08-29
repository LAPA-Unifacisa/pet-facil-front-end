import { Stack, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import ChatFAB from '@/src/components/chat/ChatFAB';

export default function MainLayout() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="carrinho" />
        <Stack.Screen name="pedido-confirmado" />
        <Stack.Screen name="chat" options={{ presentation: 'modal' }} />
      </Stack>
      {pathname !== '/chat' && <ChatFAB />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

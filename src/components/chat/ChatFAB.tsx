import { router } from 'expo-router';
import { ChatCircleDotsIcon } from 'phosphor-react-native';
import { Pressable, StyleSheet } from 'react-native';

import { borderRadius, colors } from '@/src/theme';

export default function ChatFAB() {
  return (
    <Pressable
      onPress={() => router.push('/chat')}
      accessibilityLabel="Abrir assistente virtual"
      style={({ pressed }) => [styles.fab, pressed && styles.pressed]}
    >
      <ChatCircleDotsIcon size={26} color={colors.textOnPrimary} weight="fill" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 92,
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  pressed: {
    opacity: 0.9,
  },
});

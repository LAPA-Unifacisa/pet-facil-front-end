import { PaperPlaneTiltIcon } from 'phosphor-react-native';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { borderRadius, colors, spacing } from '@/src/theme';

interface ChatInputProps {
  value: string;
  onChangeText: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({ value, onChangeText, onSend, disabled = false }: ChatInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Escreva sua mensagem..."
        placeholderTextColor={colors.textTertiary}
        multiline
      />
      <Pressable
        onPress={onSend}
        disabled={disabled || value.trim().length === 0}
        style={[
          styles.sendButton,
          (disabled || value.trim().length === 0) && styles.sendButtonDisabled,
        ]}
        accessibilityLabel="Enviar mensagem"
      >
        <PaperPlaneTiltIcon size={18} color={colors.textOnPrimary} weight="fill" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    color: colors.textPrimary,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.disabled,
  },
});

import { StyleSheet, Text, View } from 'react-native';

import { ChatMessage } from '@/src/services/gemini';
import { borderRadius, colors, spacing, typography } from '@/src/theme';

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.row, isUser && styles.rowUser]}>
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleModel]}>
        <Text style={[styles.text, isUser ? styles.textUser : styles.textModel]}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: borderRadius.sm,
  },
  bubbleModel: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: borderRadius.sm,
  },
  text: {
    ...typography.body,
  },
  textUser: {
    color: colors.textOnPrimary,
  },
  textModel: {
    color: colors.textPrimary,
  },
});

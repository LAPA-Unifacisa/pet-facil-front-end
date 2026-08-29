import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { borderRadius, colors, spacing, typography } from '@/src/theme';

interface IconButtonProps {
  icon: ReactNode;
  onPress: () => void;
  badgeCount?: number;
  accessibilityLabel: string;
}

export default function IconButton({
  icon,
  onPress,
  badgeCount,
  accessibilityLabel,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      {icon}
      {!!badgeCount && badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeLabel}>{badgeCount > 99 ? '99+' : badgeCount}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  badgeLabel: {
    ...typography.small,
    fontSize: 9.5,
    lineHeight: 12,
    fontWeight: '700',
    color: colors.textOnPrimary,
  },
});

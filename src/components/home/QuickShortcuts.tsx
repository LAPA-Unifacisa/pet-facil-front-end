import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { borderRadius, colors, spacing, typography } from '@/src/theme';

export interface QuickShortcutItem {
  label: string;
  icon: ReactNode;
  onPress: () => void;
}

interface QuickShortcutsProps {
  items: QuickShortcutItem[];
}

export default function QuickShortcuts({ items }: QuickShortcutsProps) {
  return (
    <View style={styles.grid}>
      {items.map((item) => (
        <Pressable key={item.label} onPress={item.onPress} style={styles.item}>
          <View style={styles.icon}>{item.icon}</View>
          <Text style={styles.label}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  item: {
    flexBasis: '22%',
    flexGrow: 1,
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm + spacing.xs,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.md,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.small,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

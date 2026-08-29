import { Pressable, StyleSheet, Text } from 'react-native';

import { borderRadius, colors, spacing, typography } from '@/src/theme';

interface PillOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function PillOption({ label, selected, onPress }: PillOptionProps) {
  return (
    <Pressable onPress={onPress} style={[styles.pill, selected && styles.pillSelected]}>
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm + spacing.xs,
    paddingHorizontal: spacing.md,
  },
  pillSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  labelSelected: {
    color: colors.textPrimary,
  },
});

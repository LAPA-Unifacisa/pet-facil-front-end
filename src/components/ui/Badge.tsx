import { StyleSheet, Text, View } from 'react-native';

import { borderRadius, colors, spacing, typography } from '@/src/theme';

interface BadgeProps {
  label: string;
  tone?: 'primary' | 'promo' | 'neutral';
}

const TONE_STYLES = {
  primary: { backgroundColor: colors.textPrimary, color: colors.surface },
  promo: { backgroundColor: colors.promoBadge, color: colors.promoBadgeText },
  neutral: { backgroundColor: colors.secondary, color: colors.textPrimary },
} as const;

export default function Badge({ label, tone = 'neutral' }: BadgeProps) {
  const { backgroundColor, color } = TONE_STYLES[tone];

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: borderRadius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm + spacing.xs,
  },
  label: {
    ...typography.small,
    fontWeight: '700',
  },
});

import { StyleSheet, Text } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';

interface StepLabelProps {
  label: string;
}

export default function StepLabel({ label }: StepLabelProps) {
  return <Text style={styles.label}>{label}</Text>;
}

const styles = StyleSheet.create({
  label: {
    ...typography.small,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
  },
});

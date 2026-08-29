import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';
import { formatCurrency } from '@/src/utils/currency';

interface CartSummaryProps {
  total: number;
}

export default function CartSummary({ total }: CartSummaryProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>Total</Text>
      <Text style={styles.value}>{formatCurrency(total)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
  },
  value: {
    ...typography.price,
    color: colors.textPrimary,
  },
});

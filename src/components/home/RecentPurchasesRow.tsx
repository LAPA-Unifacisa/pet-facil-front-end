import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Purchase } from '@/src/contexts/PurchaseContext';
import { borderRadius, colors, spacing, typography } from '@/src/theme';
import { formatCurrency } from '@/src/utils/currency';
import { formatDate } from '@/src/utils/date';

interface RecentPurchasesRowProps {
  purchases: Purchase[];
}

export default function RecentPurchasesRow({ purchases }: RecentPurchasesRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {purchases.map((purchase) => (
        <View key={purchase.id} style={styles.card}>
          <Text style={styles.name} numberOfLines={2}>
            {purchase.nomeProduto}
          </Text>
          <Text style={styles.date}>{formatDate(purchase.dataCompra)}</Text>
          <Text style={styles.price}>{formatCurrency(purchase.preco)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  card: {
    width: 158,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.sm + spacing.xs,
    gap: spacing.xs,
  },
  name: {
    ...typography.small,
    fontWeight: '600',
    color: colors.textPrimary,
    minHeight: 30,
  },
  date: {
    ...typography.small,
    color: colors.textTertiary,
  },
  price: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primaryDark,
  },
});

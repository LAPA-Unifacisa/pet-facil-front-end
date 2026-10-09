import { PawPrintIcon } from 'phosphor-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Purchase } from '@/src/contexts/PurchaseContext';
import { useCart } from '@/src/hooks/useCart';
import { useProducts } from '@/src/hooks/useProducts';
import { borderRadius, colors, spacing, typography } from '@/src/theme';
import { formatCurrency } from '@/src/utils/currency';
import { formatDate } from '@/src/utils/date';

interface RecentPurchasesRowProps {
  purchases: Purchase[];
}

export default function RecentPurchasesRow({ purchases }: RecentPurchasesRowProps) {
  const { addItem } = useCart();
  const { products } = useProducts();

  const handleBuyAgain = (nomeProduto: string) => {
    const product = products.find((item) => item.nome === nomeProduto);
    if (product) {
      addItem(product);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {purchases.map((purchase) => (
        <View key={purchase.id} style={styles.card}>
          <View style={styles.icon}>
            <PawPrintIcon size={16} color={colors.primaryDark} weight="regular" />
          </View>
          <Text style={styles.name} numberOfLines={2}>
            {purchase.nomeProduto}
          </Text>
          <Text style={styles.date}>{formatDate(purchase.dataCompra)}</Text>
          <View style={styles.foot}>
            <Text style={styles.price}>{formatCurrency(purchase.preco)}</Text>
            <Pressable
              onPress={() => handleBuyAgain(purchase.nomeProduto)}
              style={styles.buyAgain}
            >
              <Text style={styles.buyAgainLabel}>Comprar de novo</Text>
            </Pressable>
          </View>
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
  icon: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
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
  foot: {
    gap: spacing.xs,
    alignItems: 'flex-start',
  },
  price: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  buyAgain: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  buyAgainLabel: {
    ...typography.small,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});

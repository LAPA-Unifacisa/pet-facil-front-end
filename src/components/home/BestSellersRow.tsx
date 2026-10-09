import { PawPrintIcon } from 'phosphor-react-native';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { Product, getEffectivePrice } from '@/src/utils/product';
import { borderRadius, colors, spacing, typography } from '@/src/theme';
import { formatCurrency } from '@/src/utils/currency';

interface BestSellersRowProps {
  products: Product[];
  onPressProduct: (product: Product) => void;
}

export default function BestSellersRow({ products, onPressProduct }: BestSellersRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {products.map((product) => (
        <Pressable key={product.id} onPress={() => onPressProduct(product)} style={styles.card}>
          <PawPrintIcon size={16} color={colors.primaryDark} weight="regular" />
          <Text style={styles.name} numberOfLines={2}>
            {product.nome}
          </Text>
          <Text style={styles.price}>{formatCurrency(getEffectivePrice(product))}</Text>
        </Pressable>
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
    width: 132,
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
  price: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primaryDark,
  },
});

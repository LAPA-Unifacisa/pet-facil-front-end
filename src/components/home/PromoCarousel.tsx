import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { Product, getEffectivePrice } from '@/src/data/products';
import { borderRadius, colors, spacing, typography } from '@/src/theme';
import { formatCurrency } from '@/src/utils/currency';

interface PromoCarouselProps {
  products: Product[];
  onPressProduct: (product: Product) => void;
}

export default function PromoCarousel({ products, onPressProduct }: PromoCarouselProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {products.map((product) => (
        <Pressable
          key={product.id}
          onPress={() => onPressProduct(product)}
          style={styles.card}
        >
          <Text style={styles.tag}>Promoção</Text>
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
    width: 220,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    justifyContent: 'flex-end',
    minHeight: 130,
  },
  tag: {
    ...typography.small,
    alignSelf: 'flex-start',
    backgroundColor: colors.textPrimary,
    color: colors.surface,
    fontWeight: '700',
    borderRadius: borderRadius.full,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.heading3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  price: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
});

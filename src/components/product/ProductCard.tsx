import { PawPrintIcon, PlusIcon } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Card from '@/src/components/ui/Card';
import { Product, getEffectivePrice, hasPromotion } from '@/src/utils/product';
import { borderRadius, colors, spacing, typography } from '@/src/theme';
import { formatCurrency } from '@/src/utils/currency';

import PromoBadge from './PromoBadge';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onPress, onAddToCart }: ProductCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <Card style={styles.card}>
        <View style={styles.iconRow}>
          <View style={styles.icon}>
            <PawPrintIcon size={18} color={colors.primaryDark} weight="regular" />
          </View>
          <PromoBadge product={product} />
        </View>

        <Text style={styles.name} numberOfLines={2}>
          {product.nome}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.descricao}
        </Text>

        <View style={styles.footer}>
          <View style={styles.priceColumn}>
            {hasPromotion(product) && (
              <Text style={styles.oldPrice}>{formatCurrency(product.precoAtual)}</Text>
            )}
            <Text style={styles.price}>{formatCurrency(getEffectivePrice(product))}</Text>
          </View>
          <Pressable
            onPress={onAddToCart}
            accessibilityLabel={`Adicionar ${product.nome} ao carrinho`}
            style={styles.addButton}
          >
            <PlusIcon size={16} color={colors.textOnPrimary} weight="bold" />
          </Pressable>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '48%',
  },
  card: {
    gap: spacing.xs,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    minHeight: 40,
  },
  description: {
    ...typography.small,
    color: colors.textSecondary,
    minHeight: 30,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  priceColumn: {
    minHeight: 44,
    justifyContent: 'flex-end',
  },
  oldPrice: {
    ...typography.priceOld,
    color: colors.textTertiary,
    textDecorationLine: 'line-through',
  },
  price: {
    ...typography.price,
    fontSize: 15,
    color: colors.textPrimary,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: borderRadius.full,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

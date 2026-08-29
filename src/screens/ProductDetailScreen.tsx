import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeftIcon, PawPrintIcon } from 'phosphor-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PromoBadge from '@/src/components/product/PromoBadge';
import Button from '@/src/components/ui/Button';
import IconButton from '@/src/components/ui/IconButton';
import { ProdutoDetailParams } from '@/src/@types/navigation';
import { getEffectivePrice, hasPromotion, products } from '@/src/data/products';
import { useCart } from '@/src/hooks/useCart';
import { borderRadius, colors, spacing, typography } from '@/src/theme';
import { formatCurrency } from '@/src/utils/currency';
import { formatDate } from '@/src/utils/date';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<ProdutoDetailParams>();
  const { addItem } = useCart();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Produto não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon={<ArrowLeftIcon size={18} color={colors.textPrimary} weight="regular" />}
          onPress={() => router.back()}
          accessibilityLabel="Voltar"
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.icon}>
          <PawPrintIcon size={40} color={colors.primaryDark} weight="regular" />
        </View>

        <PromoBadge product={product} />
        <Text style={styles.name}>{product.nome}</Text>
        <Text style={styles.description}>{product.descricao}</Text>

        <View style={styles.priceRow}>
          {hasPromotion(product) && (
            <Text style={styles.oldPrice}>{formatCurrency(product.precoAtual)}</Text>
          )}
          <Text style={styles.price}>{formatCurrency(getEffectivePrice(product))}</Text>
        </View>

        <Text style={styles.detail}>Validade: {formatDate(product.dataValidade)}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Adicionar ao carrinho" onPress={() => addItem(product)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  icon: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.heading2,
    color: colors.textPrimary,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
  },
  priceRow: {
    marginTop: spacing.sm,
  },
  oldPrice: {
    ...typography.priceOld,
    color: colors.textTertiary,
    textDecorationLine: 'line-through',
  },
  price: {
    ...typography.heading2,
    color: colors.textPrimary,
  },
  detail: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  title: {
    ...typography.heading3,
    color: colors.textPrimary,
    padding: spacing.lg,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});

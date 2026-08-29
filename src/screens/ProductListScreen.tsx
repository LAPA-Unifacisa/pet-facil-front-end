import { router } from 'expo-router';
import { ShoppingCartIcon } from 'phosphor-react-native';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProductList from '@/src/components/product/ProductList';
import IconButton from '@/src/components/ui/IconButton';
import { Product, products } from '@/src/data/products';
import { useCart } from '@/src/hooks/useCart';
import { borderRadius, colors, spacing, typography } from '@/src/theme';

const CATEGORY_LABELS: Record<string, string> = {
  todos: 'Todos',
  racao: 'Ração',
  brinquedo: 'Brinquedos',
  higiene: 'Higiene',
  acessorio: 'Acessórios',
  petisco: 'Petiscos',
  medicamento: 'Medicamentos',
};

export default function ProductListScreen() {
  const { addItem, itemCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = useMemo(
    () => ['todos', ...Array.from(new Set(products.map((product) => product.tipo)))],
    [],
  );

  const filteredProducts =
    selectedCategory === 'todos'
      ? products
      : products.filter((product) => product.tipo === selectedCategory);

  const handlePressProduct = (product: Product) => {
    router.push(`/produtos/${product.id}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ProductList
        products={filteredProducts}
        onPressProduct={handlePressProduct}
        onAddToCart={addItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>Selecionado a dedo</Text>
                <Text style={styles.title}>Produtos</Text>
              </View>
              <IconButton
                icon={<ShoppingCartIcon size={18} color={colors.textPrimary} weight="regular" />}
                onPress={() => router.push('/carrinho')}
                badgeCount={itemCount}
                accessibilityLabel="Abrir carrinho"
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chipRow}
              contentContainerStyle={styles.chipRowContent}
            >
              {categories.map((category) => {
                const active = category === selectedCategory;
                return (
                  <Text
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    {CATEGORY_LABELS[category] ?? category}
                  </Text>
                );
              })}
            </ScrollView>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  eyebrow: {
    ...typography.small,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.heading1,
    color: colors.textPrimary,
  },
  chipRow: {
    marginBottom: spacing.md,
  },
  chipRowContent: {
    gap: spacing.sm,
  },
  chip: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    overflow: 'hidden',
  },
  chipActive: {
    backgroundColor: colors.textPrimary,
    borderColor: colors.textPrimary,
    color: colors.surface,
  },
});

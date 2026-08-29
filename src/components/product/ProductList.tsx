import { MagnifyingGlassIcon } from 'phosphor-react-native';
import { ReactElement } from 'react';
import { FlatList, StyleSheet, ViewStyle } from 'react-native';

import EmptyState from '@/src/components/ui/EmptyState';
import { Product } from '@/src/data/products';
import { colors, spacing } from '@/src/theme';

import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onPressProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  ListHeaderComponent?: ReactElement | (() => ReactElement) | null;
  contentContainerStyle?: ViewStyle;
}

export default function ProductList({
  products,
  onPressProduct,
  onAddToCart,
  ListHeaderComponent,
  contentContainerStyle,
}: ProductListProps) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => onPressProduct(item)}
          onAddToCart={() => onAddToCart(item)}
        />
      )}
      ListEmptyComponent={
        <EmptyState
          icon={<MagnifyingGlassIcon size={40} color={colors.textTertiary} weight="regular" />}
          title="Nenhum produto encontrado"
          description="Tente outra categoria."
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  content: {
    paddingBottom: spacing.md,
  },
});

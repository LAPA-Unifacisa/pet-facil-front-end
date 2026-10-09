import { MagnifyingGlassIcon } from 'phosphor-react-native';
import { ReactElement } from 'react';
import { FlatList, StyleSheet, ViewStyle } from 'react-native';

import EmptyState from '@/src/components/ui/EmptyState';
import { colors, spacing } from '@/src/theme';
import { Product } from '@/src/utils/product';

import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onPressProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  emptyDescription?: string;
  ListHeaderComponent?: ReactElement | (() => ReactElement) | null;
  contentContainerStyle?: ViewStyle;
}

export default function ProductList({
  products,
  onPressProduct,
  onAddToCart,
  refreshing = false,
  onRefresh,
  emptyDescription = 'Tente outra categoria.',
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
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => onPressProduct(item)}
          onAddToCart={() => onAddToCart(item)}
        />
      )}
      ListEmptyComponent={
        refreshing ? null : (
          <EmptyState
            icon={<MagnifyingGlassIcon size={40} color={colors.textTertiary} weight="regular" />}
            title="Nenhum produto encontrado"
            description={emptyDescription}
          />
        )
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

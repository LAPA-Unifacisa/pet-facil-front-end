import { router } from 'expo-router';
import { ArrowLeftIcon, ShoppingCartIcon } from 'phosphor-react-native';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CartItem from '@/src/components/cart/CartItem';
import CartSummary from '@/src/components/cart/CartSummary';
import Button from '@/src/components/ui/Button';
import EmptyState from '@/src/components/ui/EmptyState';
import IconButton from '@/src/components/ui/IconButton';
import { useCart } from '@/src/hooks/useCart';
import { usePurchases } from '@/src/hooks/usePurchases';
import { colors, spacing, typography } from '@/src/theme';

export default function CartScreen() {
  const { items, removeItem, checkout, total } = useCart();
  const { refresh } = usePurchases();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await checkout();
      await refresh();
      router.replace('/pedido-confirmado');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível finalizar o pedido.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon={<ArrowLeftIcon size={18} color={colors.textPrimary} weight="regular" />}
          onPress={() => router.back()}
          accessibilityLabel="Voltar"
        />
        <Text style={styles.title}>Carrinho</Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        renderItem={({ item }) => (
          <CartItem item={item} onRemove={() => removeItem(item.product.id)} />
        )}
        ListEmptyComponent={
          <EmptyState
            icon={<ShoppingCartIcon size={40} color={colors.textTertiary} weight="regular" />}
            title="Seu carrinho está vazio"
            description="Adicione produtos no catálogo para vê-los aqui."
          />
        }
      />

      {items.length > 0 && (
        <View style={styles.footer}>
          <CartSummary total={total} />
          {!!error && <Text style={styles.error}>{error}</Text>}
          <Button label="Finalizar pedido" onPress={handleFinish} loading={submitting} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerSpacer: {
    width: 38,
  },
  title: {
    ...typography.heading3,
    color: colors.textPrimary,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  error: {
    ...typography.caption,
    color: colors.error,
    marginBottom: spacing.sm,
  },
});

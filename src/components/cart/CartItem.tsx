import { TrashIcon } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Card from '@/src/components/ui/Card';
import { CartItem as CartItemModel } from '@/src/contexts/CartContext';
import { getEffectivePrice } from '@/src/data/products';
import { colors, spacing, typography } from '@/src/theme';
import { formatCurrency } from '@/src/utils/currency';

interface CartItemProps {
  item: CartItemModel;
  onRemove: () => void;
}

export default function CartItem({ item, onRemove }: CartItemProps) {
  const unitPrice = getEffectivePrice(item.product);

  return (
    <Card style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.product.nome}
        </Text>
        <Text style={styles.detail}>
          {item.quantity}x {formatCurrency(unitPrice)}
        </Text>
      </View>
      <Text style={styles.total}>{formatCurrency(unitPrice * item.quantity)}</Text>
      <Pressable
        onPress={onRemove}
        accessibilityLabel={`Remover ${item.product.nome} do carrinho`}
        style={styles.removeButton}
      >
        <TrashIcon size={18} color={colors.error} weight="regular" />
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  detail: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  total: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  removeButton: {
    padding: spacing.xs,
  },
});

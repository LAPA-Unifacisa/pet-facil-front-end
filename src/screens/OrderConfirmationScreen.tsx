import { router } from 'expo-router';
import { CheckCircleIcon } from 'phosphor-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/src/components/ui/Button';
import { borderRadius, colors, spacing, typography } from '@/src/theme';

export default function OrderConfirmationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.icon}>
          <CheckCircleIcon size={48} color={colors.success} weight="fill" />
        </View>
        <Text style={styles.title}>Pedido confirmado!</Text>
        <Text style={styles.description}>
          Agora é só passar no caixa da loja para retirar e pagar seus produtos.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button label="Voltar aos produtos" onPress={() => router.replace('/produtos')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  icon: {
    width: 88,
    height: 88,
    borderRadius: borderRadius.full,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.heading1,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.lg,
  },
});

import { router } from 'expo-router';
import {
  BellIcon,
  CalendarBlankIcon,
  PawPrintIcon,
  StorefrontIcon,
  UserCircleIcon,
} from 'phosphor-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BestSellersRow from '@/src/components/home/BestSellersRow';
import PromoCarousel from '@/src/components/home/PromoCarousel';
import QuickShortcuts from '@/src/components/home/QuickShortcuts';
import RecentPurchasesRow from '@/src/components/home/RecentPurchasesRow';
import IconButton from '@/src/components/ui/IconButton';
import { useAuth } from '@/src/hooks/useAuth';
import { useNotifications } from '@/src/hooks/useNotifications';
import { useProducts } from '@/src/hooks/useProducts';
import { usePurchases } from '@/src/hooks/usePurchases';
import { colors, spacing, typography } from '@/src/theme';
import { Product } from '@/src/utils/product';

export default function HomeScreen() {
  const { currentUser } = useAuth();
  const { purchases } = usePurchases();
  const { products } = useProducts();
  const { unread } = useNotifications();

  const bestSellers = products.filter((product) => product.maisVendido);

  const handlePressProduct = (product: Product) => {
    router.push(`/produtos/${product.id}`);
  };

  const firstName = currentUser?.nomeCompleto.split(' ')[0] ?? '';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Bem-vindo de volta</Text>
            <Text style={styles.title}>Olá, {firstName}</Text>
          </View>
          <IconButton
            icon={<BellIcon size={18} color={colors.textPrimary} weight="regular" />}
            onPress={() => router.push('/notificacoes')}
            badgeCount={unread}
            accessibilityLabel="Abrir notificações"
          />
        </View>

        <PromoCarousel />

        <QuickShortcuts
          items={[
            {
              label: 'AUmigos',
              icon: <PawPrintIcon size={20} color={colors.primaryDark} weight="regular" />,
              onPress: () => router.push('/aumigos'),
            },
            {
              label: 'Produtos',
              icon: <StorefrontIcon size={20} color={colors.primaryDark} weight="regular" />,
              onPress: () => router.push('/produtos'),
            },
            {
              label: 'Agenda',
              icon: <CalendarBlankIcon size={20} color={colors.primaryDark} weight="regular" />,
              onPress: () => router.push('/agenda'),
            },
            {
              label: 'Configurações',
              icon: <UserCircleIcon size={20} color={colors.primaryDark} weight="regular" />,
              onPress: () => router.push('/configuracoes'),
            },
          ]}
        />

        {purchases.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Últimos comprados</Text>
            <RecentPurchasesRow purchases={purchases.slice(0, 6)} />
          </View>
        )}

        {bestSellers.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mais vendidos</Text>
            <BestSellersRow products={bestSellers} onPressProduct={handlePressProduct} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: spacing.md,
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
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.heading3,
    color: colors.textPrimary,
  },
});

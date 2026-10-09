import { router } from 'expo-router';
import {
  ArrowLeftIcon,
  BellIcon,
  CalendarCheckIcon,
  ChecksIcon,
  InfoIcon,
  PackageIcon,
  TagIcon,
  WarningIcon,
} from 'phosphor-react-native';
import { ReactNode } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '@/src/components/ui/EmptyState';
import IconButton from '@/src/components/ui/IconButton';
import { AppNotification, NotificationType } from '@/src/hooks/useNotificationSocket';
import { useNotifications } from '@/src/hooks/useNotifications';
import { borderRadius, colors, spacing, typography } from '@/src/theme';
import { formatDateTime } from '@/src/utils/date';

const ICON_PROPS = { size: 18, color: colors.primaryDark, weight: 'regular' } as const;

const TYPE_ICONS: Record<NotificationType, ReactNode> = {
  info: <InfoIcon {...ICON_PROPS} />,
  promo: <TagIcon {...ICON_PROPS} />,
  pedido: <PackageIcon {...ICON_PROPS} />,
  agendamento: <CalendarCheckIcon {...ICON_PROPS} />,
  alerta: <WarningIcon {...ICON_PROPS} />,
};

export default function NotificationsScreen() {
  const { items, unread, markRead, markAllRead } = useNotifications();

  const handleMarkAll = () => {
    markAllRead().catch((error: unknown) =>
      Alert.alert('Notificações', error instanceof Error ? error.message : 'Tente novamente.'),
    );
  };

  const renderItem = ({ item }: { item: AppNotification }) => (
    <Pressable
      onPress={() => markRead(item.id)}
      style={[styles.row, !item.readAt && styles.rowUnread]}
      accessibilityLabel={`${item.title}. ${item.body}`}
    >
      <View style={styles.icon}>{TYPE_ICONS[item.type] ?? TYPE_ICONS.info}</View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
        <Text style={styles.date}>{formatDateTime(item.createdAt)}</Text>
      </View>
      {!item.readAt && <View style={styles.dot} />}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon={<ArrowLeftIcon size={18} color={colors.textPrimary} weight="regular" />}
          onPress={() => router.back()}
          accessibilityLabel="Voltar"
        />
        <Text style={styles.headerTitle}>Notificações</Text>
        {unread > 0 ? (
          <IconButton
            icon={<ChecksIcon size={18} color={colors.textPrimary} weight="regular" />}
            onPress={handleMarkAll}
            accessibilityLabel="Marcar todas como lidas"
          />
        ) : (
          <View style={styles.headerSpacer} />
        )}
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyState
            icon={<BellIcon size={40} color={colors.textTertiary} weight="regular" />}
            title="Nenhuma notificação"
            description="Avisos de pedidos, agendamentos e promoções aparecem aqui."
          />
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
  headerTitle: {
    ...typography.heading3,
    color: colors.textPrimary,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm + spacing.xs,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  rowUnread: {
    backgroundColor: colors.secondaryLight,
    borderColor: colors.primaryLight,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.md,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  body: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  date: {
    ...typography.small,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    marginTop: spacing.xs,
  },
});

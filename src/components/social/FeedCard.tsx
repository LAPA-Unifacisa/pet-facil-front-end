import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { FeedPost } from '@/src/data/feedPosts';
import { borderRadius, colors, spacing, typography } from '@/src/theme';

const CATEGORY_LABELS: Record<string, string> = {
  passeio: 'Passeio',
  brincadeira: 'Brincadeira',
  conquista: 'Conquista',
};

interface FeedCardProps {
  post: FeedPost;
}

export default function FeedCard({ post }: FeedCardProps) {
  return (
    <View style={styles.card}>
      <Image source={post.foto} style={styles.photo} contentFit="cover" />
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.name}>
            {post.autor} · {post.petNome}
          </Text>
          <Text style={styles.chip}>{CATEGORY_LABELS[post.categoria] ?? post.categoria}</Text>
        </View>
        <Text style={styles.caption}>{post.legenda}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  photo: {
    width: '100%',
    height: 220,
    backgroundColor: colors.secondary,
  },
  info: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  name: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  chip: {
    ...typography.small,
    fontWeight: '600',
    color: colors.primaryDark,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.full,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    overflow: 'hidden',
  },
  caption: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

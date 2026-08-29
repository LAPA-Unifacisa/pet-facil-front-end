import { FlatList, StyleSheet, Text, View } from 'react-native';

import FeedCard from '@/src/components/social/FeedCard';
import { feedPosts } from '@/src/data/feedPosts';
import { colors, spacing, typography } from '@/src/theme';

export default function AUmigosScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={feedPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Aqui, todo mundo tem dono</Text>
            <Text style={styles.title}>
              <Text style={styles.titleHighlight}>AU</Text>migos
            </Text>
          </View>
        }
        renderItem={({ item }) => <FeedCard post={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
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
  titleHighlight: {
    color: colors.primary,
  },
});

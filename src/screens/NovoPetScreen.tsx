import { router } from 'expo-router';
import { ArrowLeftIcon } from 'phosphor-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PetForm from '@/src/components/pet/PetForm';
import IconButton from '@/src/components/ui/IconButton';
import { usePets } from '@/src/hooks/usePets';
import { PetForm as PetFormData } from '@/src/schemas/petSchema';
import { colors, spacing, typography } from '@/src/theme';

export default function NovoPetScreen() {
  const { addPet } = usePets();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: PetFormData) => {
    setSubmitting(true);
    setError(null);
    try {
      await addPet(data);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível cadastrar o pet.');
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
        <Text style={styles.title}>Novo pet</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <PetForm onSubmit={handleSubmit} submitting={submitting} />
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
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
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  error: {
    ...typography.caption,
    color: colors.error,
  },
});

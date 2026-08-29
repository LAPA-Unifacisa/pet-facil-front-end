import { PlusIcon } from 'phosphor-react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '@/src/components/ui/Button';
import Input from '@/src/components/ui/Input';
import { PetForm as PetFormData, petSchema } from '@/src/schemas/petSchema';
import { colors, spacing } from '@/src/theme';

interface PetFormProps {
  onSubmit: (data: PetFormData) => void;
  submitting?: boolean;
}

export default function PetForm({ onSubmit, submitting = false }: PetFormProps) {
  const [form, setForm] = useState({ nome: '', especie: '', raca: '', dataNascimento: '' });

  const result = petSchema.safeParse(form);
  const fieldErrors = result.success ? {} : result.error.flatten().fieldErrors;

  return (
    <View style={styles.container}>
      <Input
        label="Nome do pet"
        value={form.nome}
        onChangeText={(value) => setForm((prev) => ({ ...prev, nome: value }))}
        error={fieldErrors.nome?.[0]}
      />
      <Input
        label="Espécie"
        value={form.especie}
        onChangeText={(value) => setForm((prev) => ({ ...prev, especie: value }))}
        placeholder="Cachorro, gato..."
        error={fieldErrors.especie?.[0]}
      />
      <Input
        label="Raça"
        value={form.raca}
        onChangeText={(value) => setForm((prev) => ({ ...prev, raca: value }))}
        error={fieldErrors.raca?.[0]}
      />
      <Input
        label="Data de nascimento (opcional)"
        value={form.dataNascimento}
        onChangeText={(value) => setForm((prev) => ({ ...prev, dataNascimento: value }))}
        placeholder="AAAA-MM-DD"
      />

      <Button
        label="Adicionar pet"
        onPress={() =>
          result.success &&
          onSubmit({ ...result.data, dataNascimento: result.data.dataNascimento || undefined })
        }
        disabled={!result.success}
        loading={submitting}
        icon={<PlusIcon size={18} color={colors.textOnPrimary} weight="bold" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
});

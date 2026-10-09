import { PlusIcon } from 'phosphor-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PillOption from '@/src/components/agenda/PillOption';
import Button from '@/src/components/ui/Button';
import Input from '@/src/components/ui/Input';
import { ESPECIES, PetForm as PetFormData, petSchema } from '@/src/schemas/petSchema';
import { colors, spacing, typography } from '@/src/theme';

const ESPECIE_LABELS: Record<(typeof ESPECIES)[number], string> = {
  cachorro: 'Cachorro',
  gato: 'Gato',
  outro: 'Outro',
};

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
      <View style={styles.field}>
        <Text style={styles.label}>Espécie</Text>
        <View style={styles.pillRow}>
          {ESPECIES.map((especie) => (
            <PillOption
              key={especie}
              label={ESPECIE_LABELS[especie]}
              selected={form.especie === especie}
              onPress={() => setForm((prev) => ({ ...prev, especie }))}
            />
          ))}
        </View>
      </View>
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
        error={form.dataNascimento ? fieldErrors.dataNascimento?.[0] : undefined}
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
  field: {
    gap: spacing.sm,
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});

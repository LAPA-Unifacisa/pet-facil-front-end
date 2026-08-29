import { CheckCircleIcon } from 'phosphor-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import PillOption from '@/src/components/agenda/PillOption';
import StepLabel from '@/src/components/agenda/StepLabel';
import TimeSlotGrid from '@/src/components/agenda/TimeSlotGrid';
import Button from '@/src/components/ui/Button';
import EmptyState from '@/src/components/ui/EmptyState';
import { useAppointments } from '@/src/hooks/useAppointments';
import { usePets } from '@/src/hooks/usePets';
import { agendamentoSchema } from '@/src/schemas/agendamentoSchema';
import { borderRadius, colors, spacing, typography } from '@/src/theme';
import { formatDate } from '@/src/utils/date';

const SERVICOS = ['Banho', 'Tosa', 'Banho e tosa', 'Consulta veterinária', 'Vacinação'];
const HORARIOS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

const proximosDias = Array.from({ length: 7 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() + index);
  return date.toISOString().slice(0, 10);
});

export default function AgendaScreen() {
  const { pets } = usePets();
  const { appointments, addAppointment } = useAppointments();

  const [petId, setPetId] = useState('');
  const [servico, setServico] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const result = agendamentoSchema.safeParse({ petId, servico, data, horario });

  const handleConfirm = async () => {
    if (!result.success) return;

    setSubmitting(true);
    await addAppointment(result.data);
    setSubmitting(false);
    setConfirmed(true);
    setPetId('');
    setServico('');
    setData('');
    setHorario('');
  };

  const findPetName = (id: string) => pets.find((pet) => pet.id === id)?.nome ?? 'Pet removido';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Sem correria, sem fila</Text>
        <Text style={styles.title}>Agendar horário</Text>
      </View>

      {pets.length === 0 ? (
        <EmptyState
          icon={<CheckCircleIcon size={40} color={colors.textTertiary} weight="regular" />}
          title="Cadastre um pet primeiro"
          description="Vá em Configurações para adicionar seu pet antes de agendar."
        />
      ) : (
        <>
          <View>
            <StepLabel label="Escolha o pet" />
            <View style={styles.pillRow}>
              {pets.map((pet) => (
                <PillOption
                  key={pet.id}
                  label={pet.nome}
                  selected={pet.id === petId}
                  onPress={() => {
                    setPetId(pet.id);
                    setConfirmed(false);
                  }}
                />
              ))}
            </View>
          </View>

          <View>
            <StepLabel label="Escolha o serviço" />
            <View style={styles.pillRow}>
              {SERVICOS.map((item) => (
                <PillOption
                  key={item}
                  label={item}
                  selected={item === servico}
                  onPress={() => {
                    setServico(item);
                    setConfirmed(false);
                  }}
                />
              ))}
            </View>
          </View>

          <View>
            <StepLabel label="Escolha a data" />
            <View style={styles.pillRow}>
              {proximosDias.map((dia) => (
                <PillOption
                  key={dia}
                  label={formatDate(dia)}
                  selected={dia === data}
                  onPress={() => {
                    setData(dia);
                    setConfirmed(false);
                  }}
                />
              ))}
            </View>
          </View>

          <View>
            <StepLabel label="Escolha o horário" />
            <TimeSlotGrid
              options={HORARIOS}
              value={horario}
              onChange={(value) => {
                setHorario(value);
                setConfirmed(false);
              }}
            />
          </View>

          <Button
            label="Confirmar agendamento"
            onPress={handleConfirm}
            disabled={!result.success}
            loading={submitting}
          />

          {confirmed && <Text style={styles.confirmedText}>Agendamento confirmado!</Text>}
        </>
      )}

      {appointments.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seus agendamentos</Text>
          {appointments.map((item) => (
            <View key={item.id} style={styles.appointmentCard}>
              <Text style={styles.appointmentTitle}>
                {item.servico} · {findPetName(item.petId)}
              </Text>
              <Text style={styles.appointmentDetail}>
                {formatDate(item.data)} às {item.horario}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
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
    marginTop: spacing.sm,
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
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  confirmedText: {
    ...typography.bodyBold,
    color: colors.success,
    textAlign: 'center',
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.heading3,
    color: colors.textPrimary,
  },
  appointmentCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: 4,
  },
  appointmentTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  appointmentDetail: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

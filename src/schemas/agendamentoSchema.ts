import { z } from 'zod';

import { isPastDate } from '@/src/utils/date';

export const agendamentoSchema = z.object({
  petId: z.string().min(1, 'Selecione um pet'),
  servico: z.string().min(1, 'Selecione um serviço'),
  data: z.string().min(1, 'Selecione uma data').refine((value) => !isPastDate(value), {
    message: 'A data não pode ser no passado',
  }),
  horario: z.string().min(1, 'Selecione um horário'),
});

export type AgendamentoForm = z.infer<typeof agendamentoSchema>;

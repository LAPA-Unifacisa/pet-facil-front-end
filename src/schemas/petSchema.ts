import { z } from 'zod';

export const ESPECIES = ['cachorro', 'gato', 'outro'] as const;

export const petSchema = z.object({
  nome: z.string().min(1, 'Nome do pet é obrigatório'),
  especie: z.enum(ESPECIES, 'Selecione a espécie'),
  raca: z.string().min(1, 'Raça é obrigatória'),
  dataNascimento: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, 'Use o formato AAAA-MM-DD')
    .optional(),
});

export type PetForm = z.infer<typeof petSchema>;

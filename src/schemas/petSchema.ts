import { z } from 'zod';

export const petSchema = z.object({
  nome: z.string().min(1, 'Nome do pet é obrigatório'),
  especie: z.string().min(1, 'Espécie é obrigatória'),
  raca: z.string().min(1, 'Raça é obrigatória'),
  dataNascimento: z.string().optional(),
});

export type PetForm = z.infer<typeof petSchema>;

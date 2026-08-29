import { z } from 'zod';

import { isValidCPF } from '@/src/utils/cpf';

export const registerSchema = z
  .object({
    nomeCompleto: z.string().min(2, 'Nome completo é obrigatório'),
    login: z.email('E-mail inválido'),
    cpf: z.string().refine(isValidCPF, 'CPF inválido'),
    senha: z.string().min(1, 'Senha obrigatória'),
    confirmarSenha: z.string().min(1, 'Confirme a senha'),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  });

export type RegisterForm = z.infer<typeof registerSchema>;

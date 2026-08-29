import { ReactNode, createContext, useEffect, useState } from 'react';

import { hashPassword } from '@/src/services/crypto';
import { STORAGE_KEYS, getItem, removeItem, setItem } from '@/src/services/storage';

export interface User {
  cpf: string;
  nomeCompleto: string;
  login: string;
  senha: string;
}

interface RegisterInput {
  nomeCompleto: string;
  login: string;
  cpf: string;
  senha: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
}

export interface AuthContextValue {
  currentUser: User | null;
  isLoading: boolean;
  register: (input: RegisterInput) => Promise<AuthResult>;
  login: (login: string, senha: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const storedUser = await getItem<User>(STORAGE_KEYS.CURRENT_USER);
      setCurrentUser(storedUser);
      setIsLoading(false);
    })();
  }, []);

  const register = async ({
    nomeCompleto,
    login,
    cpf,
    senha,
  }: RegisterInput): Promise<AuthResult> => {
    const users = (await getItem<User[]>(STORAGE_KEYS.USERS)) ?? [];

    if (users.some((user) => user.login === login || user.cpf === cpf)) {
      return { success: false, error: 'Já existe uma conta com este e-mail ou CPF.' };
    }

    const newUser: User = { cpf, nomeCompleto, login, senha: await hashPassword(senha) };
    const updatedUsers = [...users, newUser];

    await setItem(STORAGE_KEYS.USERS, updatedUsers);
    await setItem(STORAGE_KEYS.CURRENT_USER, newUser);
    setCurrentUser(newUser);

    return { success: true };
  };

  const login = async (loginInput: string, senha: string): Promise<AuthResult> => {
    const users = (await getItem<User[]>(STORAGE_KEYS.USERS)) ?? [];
    const user = users.find((item) => item.login === loginInput);
    const hashedSenha = await hashPassword(senha);

    if (!user || user.senha !== hashedSenha) {
      return { success: false, error: 'E-mail ou senha inválidos.' };
    }

    await setItem(STORAGE_KEYS.CURRENT_USER, user);
    setCurrentUser(user);

    return { success: true };
  };

  const logout = async () => {
    await removeItem(STORAGE_KEYS.CURRENT_USER);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

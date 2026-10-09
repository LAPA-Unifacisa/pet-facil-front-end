import * as SecureStore from 'expo-secure-store';
import { ReactNode, createContext, useEffect, useState } from 'react';

import { api, post, setApiToken } from '@/src/services/api';

const TOKEN_KEY = 'petfacil-token';

export interface User {
  id: string;
  nomeCompleto: string;
  login: string;
  cpf: string;
  avatar: string | null;
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

interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthContextValue {
  currentUser: User | null;
  token: string | null;
  isLoading: boolean;
  register: (input: RegisterInput) => Promise<AuthResult>;
  login: (login: string, senha: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  setAvatar: (uri: string, mimeType?: string | null) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const errorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveSession = async (value: string | null) => {
    setApiToken(value);
    setToken(value);
    if (value) await SecureStore.setItemAsync(TOKEN_KEY, value);
    else await SecureStore.deleteItemAsync(TOKEN_KEY);
  };

  useEffect(() => {
    (async () => {
      const saved = await SecureStore.getItemAsync(TOKEN_KEY);
      if (saved) {
        setApiToken(saved);
        try {
          setCurrentUser(await api<User>('/api/users/me'));
          setToken(saved);
        } catch (error) {
          console.warn('[auth] sessão salva inválida:', error);
          await saveSession(null);
        }
      }
      setIsLoading(false);
    })();
  }, []);

  const startSession = async (response: AuthResponse) => {
    await saveSession(response.token);
    setCurrentUser(response.user);
  };

  const register = async (input: RegisterInput): Promise<AuthResult> => {
    try {
      await startSession(await post<AuthResponse>('/api/auth/register', input));
      return { success: true };
    } catch (error) {
      return { success: false, error: errorMessage(error, 'Não foi possível concluir o cadastro.') };
    }
  };

  const login = async (loginInput: string, senha: string): Promise<AuthResult> => {
    try {
      await startSession(await post<AuthResponse>('/api/auth/login', { login: loginInput, senha }));
      return { success: true };
    } catch (error) {
      return { success: false, error: errorMessage(error, 'Não foi possível entrar.') };
    }
  };

  const logout = async () => {
    await post('/api/auth/logout').catch((error: unknown) =>
      console.warn('[auth] falha ao avisar o logout:', error),
    );
    await saveSession(null);
    setCurrentUser(null);
  };

  const setAvatar = async (uri: string, mimeType?: string | null) => {
    const type = mimeType ?? 'image/jpeg';
    const extension = type.split('/')[1] ?? 'jpg';
    const form = new FormData();
    form.append('avatar', { uri, name: `avatar.${extension}`, type } as unknown as Blob);
    setCurrentUser(await api<User>('/api/users/me/avatar', { method: 'POST', body: form }));
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, token, isLoading, register, login, logout, setAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
}

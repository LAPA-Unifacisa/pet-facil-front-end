import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/src/hooks/useAuth';
import { api, post } from '@/src/services/api';

export interface Agendamento {
  id: string;
  petId: string;
  servico: string;
  data: string;
  horario: string;
}

type AgendamentoInput = Omit<Agendamento, 'id'>;

export interface AppointmentContextValue {
  appointments: Agendamento[];
  addAppointment: (input: AgendamentoInput) => Promise<void>;
  refresh: () => Promise<void>;
}

export const AppointmentContext = createContext<AppointmentContextValue | null>(null);

interface AppointmentProviderProps {
  children: ReactNode;
}

const byDateTime = (a: Agendamento, b: Agendamento) =>
  `${a.data} ${a.horario}`.localeCompare(`${b.data} ${b.horario}`);

export default function AppointmentProvider({ children }: AppointmentProviderProps) {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState<Agendamento[]>([]);

  const refresh = useCallback(async () => {
    try {
      setAppointments(await api<Agendamento[]>('/api/appointments'));
    } catch (error) {
      console.warn('[agenda] falha ao carregar os agendamentos:', error);
    }
  }, []);

  useEffect(() => {
    if (currentUser) refresh();
    else setAppointments([]);
  }, [currentUser, refresh]);

  const addAppointment = async (input: AgendamentoInput) => {
    const created = await post<Agendamento>('/api/appointments', input);
    setAppointments((prev) => [...prev, created].sort(byDateTime));
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, refresh }}>
      {children}
    </AppointmentContext.Provider>
  );
}

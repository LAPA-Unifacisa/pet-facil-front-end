import { ReactNode, createContext } from 'react';

import { useUserData } from '@/src/hooks/useUserData';
import { post } from '@/src/services/api';

export interface Agendamento {
  id: string;
  petId: string;
  servico: string;
  data: string;
  horario: string;
}

type AgendamentoInput = Omit<Agendamento, 'id'>;

const NO_APPOINTMENTS: Agendamento[] = [];

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
  const {
    data: appointments,
    setData: setAppointments,
    reload,
  } = useUserData('/api/appointments', NO_APPOINTMENTS);

  const addAppointment = async (input: AgendamentoInput) => {
    const created = await post<Agendamento>('/api/appointments', input);
    setAppointments((prev) => [...prev, created].sort(byDateTime));
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, refresh: reload }}>
      {children}
    </AppointmentContext.Provider>
  );
}

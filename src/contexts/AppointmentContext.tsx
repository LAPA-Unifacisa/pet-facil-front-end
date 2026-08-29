import { ReactNode, createContext, useEffect, useState } from 'react';

import { useAuth } from '@/src/hooks/useAuth';
import { STORAGE_KEYS, getItem, setItem } from '@/src/services/storage';
import { generateId } from '@/src/utils/id';

export interface Agendamento {
  id: string;
  tutorCpf: string;
  petId: string;
  servico: string;
  data: string;
  horario: string;
}

type AgendamentoInput = Omit<Agendamento, 'id' | 'tutorCpf'>;

export interface AppointmentContextValue {
  appointments: Agendamento[];
  addAppointment: (input: AgendamentoInput) => Promise<void>;
}

export const AppointmentContext = createContext<AppointmentContextValue | null>(null);

interface AppointmentProviderProps {
  children: ReactNode;
}

export default function AppointmentProvider({ children }: AppointmentProviderProps) {
  const { currentUser } = useAuth();
  const [allAppointments, setAllAppointments] = useState<Agendamento[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await getItem<Agendamento[]>(STORAGE_KEYS.APPOINTMENTS);
      setAllAppointments(stored ?? []);
    })();
  }, []);

  const appointments = currentUser
    ? allAppointments.filter((item) => item.tutorCpf === currentUser.cpf)
    : [];

  const addAppointment = async (input: AgendamentoInput) => {
    if (!currentUser) return;

    const newAppointment: Agendamento = {
      id: generateId(),
      tutorCpf: currentUser.cpf,
      ...input,
    };
    const updated = [...allAppointments, newAppointment];

    await setItem(STORAGE_KEYS.APPOINTMENTS, updated);
    setAllAppointments(updated);
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
}

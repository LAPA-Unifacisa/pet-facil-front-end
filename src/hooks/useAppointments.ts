import { useContext } from 'react';

import { AppointmentContext } from '@/src/contexts/AppointmentContext';

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments deve ser usado dentro de um AppointmentProvider');
  }
  return context;
}

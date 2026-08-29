import { useContext } from 'react';

import { PetContext } from '@/src/contexts/PetContext';

export function usePets() {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePets deve ser usado dentro de um PetProvider');
  }
  return context;
}

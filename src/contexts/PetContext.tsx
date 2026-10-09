import { ReactNode, createContext, useEffect, useState } from 'react';

import { useAuth } from '@/src/hooks/useAuth';
import { api, del, post } from '@/src/services/api';

export interface Pet {
  id: string;
  nome: string;
  especie: string;
  raca: string;
  dataNascimento?: string;
}

type PetInput = Omit<Pet, 'id'>;

export interface PetContextValue {
  pets: Pet[];
  addPet: (input: PetInput) => Promise<void>;
  removePet: (petId: string) => Promise<void>;
}

export const PetContext = createContext<PetContextValue | null>(null);

interface PetProviderProps {
  children: ReactNode;
}

export default function PetProvider({ children }: PetProviderProps) {
  const { currentUser } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    if (!currentUser) {
      setPets([]);
      return;
    }
    api<Pet[]>('/api/pets')
      .then(setPets)
      .catch((error: unknown) => console.warn('[pets] falha ao carregar os pets:', error));
  }, [currentUser]);

  const addPet = async (input: PetInput) => {
    const pet = await post<Pet>('/api/pets', input);
    setPets((prev) => [...prev, pet]);
  };

  const removePet = async (petId: string) => {
    await del<void>(`/api/pets/${petId}`);
    setPets((prev) => prev.filter((pet) => pet.id !== petId));
  };

  return <PetContext.Provider value={{ pets, addPet, removePet }}>{children}</PetContext.Provider>;
}

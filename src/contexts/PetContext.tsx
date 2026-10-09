import { ReactNode, createContext } from 'react';

import { useUserData } from '@/src/hooks/useUserData';
import { del, post } from '@/src/services/api';

export interface Pet {
  id: string;
  nome: string;
  especie: string;
  raca: string;
  dataNascimento?: string;
}

type PetInput = Omit<Pet, 'id'>;

const NO_PETS: Pet[] = [];

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
  const { data: pets, setData: setPets } = useUserData('/api/pets', NO_PETS);

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

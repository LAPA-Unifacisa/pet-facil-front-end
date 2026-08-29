import { ReactNode, createContext, useEffect, useState } from 'react';

import { useAuth } from '@/src/hooks/useAuth';
import { STORAGE_KEYS, getItem, setItem } from '@/src/services/storage';
import { generateId } from '@/src/utils/id';

export interface Pet {
  id: string;
  tutorCpf: string;
  nome: string;
  especie: string;
  raca: string;
  dataNascimento?: string;
}

type PetInput = Omit<Pet, 'id' | 'tutorCpf'>;

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
  const [allPets, setAllPets] = useState<Pet[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await getItem<Pet[]>(STORAGE_KEYS.PETS);
      setAllPets(stored ?? []);
    })();
  }, []);

  const pets = currentUser
    ? allPets.filter((pet) => pet.tutorCpf === currentUser.cpf)
    : [];

  const addPet = async (input: PetInput) => {
    if (!currentUser) return;

    const newPet: Pet = { id: generateId(), tutorCpf: currentUser.cpf, ...input };
    const updated = [...allPets, newPet];

    await setItem(STORAGE_KEYS.PETS, updated);
    setAllPets(updated);
  };

  const removePet = async (petId: string) => {
    const updated = allPets.filter((pet) => pet.id !== petId);
    await setItem(STORAGE_KEYS.PETS, updated);
    setAllPets(updated);
  };

  return (
    <PetContext.Provider value={{ pets, addPet, removePet }}>{children}</PetContext.Provider>
  );
}

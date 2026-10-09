import { ReactNode, createContext } from 'react';

import { useUserData } from '@/src/hooks/useUserData';

export interface Purchase {
  id: string;
  nomeProduto: string;
  preco: number;
  dataCompra: string;
}

const NO_PURCHASES: Purchase[] = [];

export interface PurchaseContextValue {
  purchases: Purchase[];
  refresh: () => Promise<void>;
}

export const PurchaseContext = createContext<PurchaseContextValue | null>(null);

interface PurchaseProviderProps {
  children: ReactNode;
}

export default function PurchaseProvider({ children }: PurchaseProviderProps) {
  const { data: purchases, reload } = useUserData('/api/purchases', NO_PURCHASES);

  return (
    <PurchaseContext.Provider value={{ purchases, refresh: reload }}>
      {children}
    </PurchaseContext.Provider>
  );
}

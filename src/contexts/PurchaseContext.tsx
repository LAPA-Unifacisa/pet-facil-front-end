import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/src/hooks/useAuth';
import { api } from '@/src/services/api';

export interface Purchase {
  id: string;
  nomeProduto: string;
  preco: number;
  dataCompra: string;
}

export interface PurchaseContextValue {
  purchases: Purchase[];
  refresh: () => Promise<void>;
}

export const PurchaseContext = createContext<PurchaseContextValue | null>(null);

interface PurchaseProviderProps {
  children: ReactNode;
}

export default function PurchaseProvider({ children }: PurchaseProviderProps) {
  const { currentUser } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const refresh = useCallback(async () => {
    try {
      setPurchases(await api<Purchase[]>('/api/purchases'));
    } catch (error) {
      console.warn('[purchases] falha ao carregar as compras:', error);
    }
  }, []);

  useEffect(() => {
    if (currentUser) refresh();
    else setPurchases([]);
  }, [currentUser, refresh]);

  return (
    <PurchaseContext.Provider value={{ purchases, refresh }}>{children}</PurchaseContext.Provider>
  );
}

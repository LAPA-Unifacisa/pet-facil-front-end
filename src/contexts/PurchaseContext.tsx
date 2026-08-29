import { ReactNode, createContext, useEffect, useState } from 'react';

import { CartItem } from '@/src/contexts/CartContext';
import { getEffectivePrice } from '@/src/data/products';
import { STORAGE_KEYS, getItem, setItem } from '@/src/services/storage';
import { generateId } from '@/src/utils/id';

export interface Purchase {
  id: string;
  nomeProduto: string;
  preco: number;
  dataCompra: string;
}

export interface PurchaseContextValue {
  purchases: Purchase[];
  registerPurchases: (items: CartItem[]) => Promise<void>;
}

export const PurchaseContext = createContext<PurchaseContextValue | null>(null);

interface PurchaseProviderProps {
  children: ReactNode;
}

export default function PurchaseProvider({ children }: PurchaseProviderProps) {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await getItem<Purchase[]>(STORAGE_KEYS.PURCHASES);
      setPurchases(stored ?? []);
    })();
  }, []);

  const registerPurchases = async (items: CartItem[]) => {
    const now = new Date().toISOString();
    const newPurchases: Purchase[] = items.map((item) => ({
      id: generateId(),
      nomeProduto: item.product.nome,
      preco: getEffectivePrice(item.product) * item.quantity,
      dataCompra: now,
    }));

    const updated = [...newPurchases, ...purchases];
    await setItem(STORAGE_KEYS.PURCHASES, updated);
    setPurchases(updated);
  };

  return (
    <PurchaseContext.Provider value={{ purchases, registerPurchases }}>
      {children}
    </PurchaseContext.Provider>
  );
}

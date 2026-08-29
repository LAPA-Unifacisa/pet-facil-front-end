import { useContext } from 'react';

import { PurchaseContext } from '@/src/contexts/PurchaseContext';

export function usePurchases() {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error('usePurchases deve ser usado dentro de um PurchaseProvider');
  }
  return context;
}

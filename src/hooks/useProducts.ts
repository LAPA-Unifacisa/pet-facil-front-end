import { useContext } from 'react';

import { ProductContext } from '@/src/contexts/ProductContext';

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts deve ser usado dentro de um ProductProvider');
  }
  return context;
}

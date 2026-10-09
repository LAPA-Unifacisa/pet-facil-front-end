import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/src/hooks/useAuth';
import { api } from '@/src/services/api';
import { Product } from '@/src/utils/product';

interface ProductPage {
  items: Product[];
  total: number;
}

export interface ProductContextValue {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProductById: (id: string) => Product | undefined;
  refresh: () => Promise<void>;
}

export const ProductContext = createContext<ProductContextValue | null>(null);

interface ProductProviderProps {
  children: ReactNode;
}

export default function ProductProvider({ children }: ProductProviderProps) {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const page = await api<ProductPage>('/api/products?limit=50');
      setProducts(page.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser) refresh();
    else setProducts([]);
  }, [currentUser, refresh]);

  const getProductById = (id: string) => products.find((product) => product.id === id);

  return (
    <ProductContext.Provider value={{ products, loading, error, getProductById, refresh }}>
      {children}
    </ProductContext.Provider>
  );
}

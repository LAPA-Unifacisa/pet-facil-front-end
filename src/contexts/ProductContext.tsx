import { ReactNode, createContext, useState } from 'react';

import { useUserData } from '@/src/hooks/useUserData';
import { Product } from '@/src/utils/product';

interface ProductPage {
  items: Product[];
  total: number;
}

const EMPTY_PAGE: ProductPage = { items: [], total: 0 };

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
  const { data, loading, error, reload } = useUserData('/api/products?limit=50', EMPTY_PAGE);
  const [refreshing, setRefreshing] = useState(false);
  const products = data.items;

  const refresh = async () => {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  };

  const getProductById = (id: string) => products.find((product) => product.id === id);

  return (
    <ProductContext.Provider
      value={{ products, loading: loading || refreshing, error, getProductById, refresh }}
    >
      {children}
    </ProductContext.Provider>
  );
}

import { ReactNode, createContext } from 'react';
import { Alert } from 'react-native';

import { useUserData } from '@/src/hooks/useUserData';
import { del, patch, post } from '@/src/services/api';
import { Product } from '@/src/utils/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartResponse {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<void>;
  total: number;
  itemCount: number;
}

export const CartContext = createContext<CartContextValue | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

const EMPTY_CART: CartResponse = { items: [], total: 0, itemCount: 0 };

export default function CartProvider({ children }: CartProviderProps) {
  const { data: cart, setData: setCart } = useUserData('/api/cart', EMPTY_CART);

  const run = async (request: Promise<CartResponse>) => {
    try {
      const updated = await request;
      setCart(() => updated);
    } catch (error) {
      Alert.alert('Carrinho', error instanceof Error ? error.message : 'Tente novamente.');
    }
  };

  const addItem = (product: Product) =>
    run(post<CartResponse>('/api/cart/items', { productId: product.id, quantity: 1 }));

  const updateQuantity = (productId: string, quantity: number) =>
    run(patch<CartResponse>(`/api/cart/items/${productId}`, { quantity }));

  const removeItem = (productId: string) => run(del<CartResponse>(`/api/cart/items/${productId}`));

  const clearCart = () => run(del<CartResponse>('/api/cart'));

  const checkout = async () => {
    await post('/api/orders');
    setCart(() => EMPTY_CART);
  };

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        checkout,
        total: cart.total,
        itemCount: cart.itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

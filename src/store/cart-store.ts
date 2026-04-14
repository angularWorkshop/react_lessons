import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// ── Types ──────────────────────────────────────────────────

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

// ── Store ──────────────────────────────────────────────────

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],

        addItem: (item) => {
          set(
            (state) => {
              const existing = state.items.find((i) => i.id === item.id);
              if (existing) {
                return {
                  items: state.items.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
                  ),
                };
              }
              return { items: [...state.items, { ...item, quantity: 1 }] };
            },
            false,
            'addItem',
          );
        },

        removeItem: (id) => {
          set(
            (state) => ({ items: state.items.filter((i) => i.id !== id) }),
            false,
            'removeItem',
          );
        },

        updateQuantity: (id, quantity) => {
          if (quantity <= 0) {
            set(
              (state) => ({ items: state.items.filter((i) => i.id !== id) }),
              false,
              'updateQuantity/remove',
            );
          } else {
            set(
              (state) => ({
                items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
              }),
              false,
              'updateQuantity',
            );
          }
        },

        clearCart: () => {
          set({ items: [] }, false, 'clearCart');
        },

        totalItems: () => {
          return get().items.reduce((sum, i) => sum + i.quantity, 0);
        },

        totalPrice: () => {
          return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        },
      }),
      { name: 'cart-storage' },
    ),
  ),
);

import { create } from 'zustand';

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
// TODO: wrap with devtools and persist middleware
// The store should:
// 1. Use `devtools` middleware so actions appear in Redux DevTools
// 2. Use `persist` middleware to save cart to localStorage (key: "cart-storage")
// 3. Implement all actions: addItem, removeItem, updateQuantity, clearCart
// 4. Implement computed helpers: totalItems, totalPrice

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],

  addItem: (_item) => {
    // TODO: if item already exists, increment its quantity by 1
    // otherwise add it with quantity 1
  },

  removeItem: (_id) => {
    // TODO: remove item by id from the items array
  },

  updateQuantity: (_id, _quantity) => {
    // TODO: set quantity for item with given id
    // if quantity <= 0, remove the item instead
  },

  clearCart: () => {
    // TODO: reset items to empty array
  },

  totalItems: () => {
    // TODO: return sum of all item quantities
    return 0;
  },

  totalPrice: () => {
    // TODO: return sum of (price * quantity) for each item
    return 0;
  },
}));

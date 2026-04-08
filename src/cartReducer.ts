export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CatalogProduct {
  id: string;
  name: string;
  price: number;
}

export const INITIAL_CART: CartItem[] = [
  { id: 'keyboard', name: 'Mechanical Keyboard', price: 120, quantity: 1 },
  { id: 'mouse', name: 'Wireless Mouse', price: 60, quantity: 2 },
];

export const CATALOG: CatalogProduct[] = [
  { id: 'mug', name: 'React Mug', price: 18 },
  { id: 'stickers', name: 'Sticker Pack', price: 12 },
];

export type CartAction =
  | { type: 'ADD_ITEM'; product: CatalogProduct }
  | { type: 'REMOVE_ITEM'; itemId: string }
  | { type: 'UPDATE_QUANTITY'; itemId: string; quantity: number }
  | { type: 'CLEAR' };

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.product;

      const existingItem = state.find((item) => item.id === product.id);

      if (existingItem) {
        return state.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...state, { ...product, quantity: 1 }];
    }
    case 'REMOVE_ITEM': {
      return state.filter((item) => item.id !== action.itemId);
    }
    case 'UPDATE_QUANTITY': {
      const nextQuantity = action.quantity;

      if (nextQuantity < 1) {
        return state.filter((item) => item.id !== action.itemId);
      }

      return state.map((item) =>
        item.id === action.itemId ? { ...item, quantity: nextQuantity } : item,
      );
    }
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

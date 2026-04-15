export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
}

export const CATEGORIES = ['all', 'electronics', 'clothing', 'books'] as const;
export type Category = (typeof CATEGORIES)[number];

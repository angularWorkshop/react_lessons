import { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <p className="product-list__empty">No products found</p>;
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-card">
          <h3 className="product-card__title">{product.title}</h3>
          <span className="product-card__category">{product.category}</span>
          <span className="product-card__price">${product.price.toFixed(2)}</span>
        </li>
      ))}
    </ul>
  );
}

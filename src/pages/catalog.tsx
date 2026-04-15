import { FilterBar } from '../components/filter-bar';
import { ProductList } from '../components/product-list';
import { products } from '../data/products';

export function Catalog() {
  // TODO: Use useSearchParams() from 'react-router-dom' to read URL search params.
  // Read the 'category' param (default to 'all') and the 'q' param (default to '').
  // Filter the products array:
  //   - If category is not 'all', only include products matching that category.
  //   - If q is not empty, only include products whose title contains the query (case-insensitive).

  const filtered = products;

  return (
    <main className="catalog">
      <FilterBar />
      <ProductList products={filtered} />
    </main>
  );
}

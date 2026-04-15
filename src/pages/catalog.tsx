import { useSearchParams } from 'react-router-dom';
import { FilterBar } from '../components/filter-bar';
import { ProductList } from '../components/product-list';
import { products } from '../data/products';
import { Category } from '../types/product';

export function Catalog() {
  const [searchParams] = useSearchParams();

  const category = (searchParams.get('category') as Category) ?? 'all';
  const query = searchParams.get('q') ?? '';

  const filtered = products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <main className="catalog">
      <FilterBar />
      <ProductList products={filtered} />
    </main>
  );
}

import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, Category } from '../types/product';

export function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = (searchParams.get('category') as Category) ?? 'all';
  const query = searchParams.get('q') ?? '';

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSearchParams((prev) => {
      if (value === 'all') {
        prev.delete('category');
      } else {
        prev.set('category', value);
      }
      return prev;
    });
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchParams((prev) => {
      if (value === '') {
        prev.delete('q');
      } else {
        prev.set('q', value);
      }
      return prev;
    });
  }

  return (
    <div className="filter-bar">
      <label className="filter-bar__label">
        Category:
        <select
          className="filter-bar__select"
          value={category}
          onChange={handleCategoryChange}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-bar__label">
        Search:
        <input
          className="filter-bar__input"
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleSearchChange}
        />
      </label>
    </div>
  );
}

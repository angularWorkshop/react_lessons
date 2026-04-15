import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, Category } from '../types/product';

export function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = (searchParams.get('category') as Category) ?? 'all';
  const query = searchParams.get('q') ?? '';

  function handleCategoryChange(_e: React.ChangeEvent<HTMLSelectElement>) {
    // TODO: Read the selected value from the event.
    // Use setSearchParams to update the 'category' param.
    // If the value is 'all', delete the 'category' param instead.
    void setSearchParams;
  }

  function handleSearchChange(_e: React.ChangeEvent<HTMLInputElement>) {
    // TODO: Read the input value from the event.
    // Use setSearchParams to update the 'q' param.
    // If the value is empty, delete the 'q' param instead.
    void setSearchParams;
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

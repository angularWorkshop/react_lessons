import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Catalog } from '../../src/pages/catalog';

function renderCatalog(initialEntries: string[] = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/" element={<Catalog />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Product Catalog', () => {
  it('renders all products by default', () => {
    renderCatalog();

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Cotton T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('JavaScript: The Good Parts')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(8);
  });

  it('filters by category via URL param', () => {
    renderCatalog(['/?category=electronics']);

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Smartphone Stand')).toBeInTheDocument();
    expect(screen.getByText('USB-C Hub')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.queryByText('Cotton T-Shirt')).not.toBeInTheDocument();
  });

  it('filters by search query via URL param', () => {
    renderCatalog(['/?q=shirt']);

    expect(screen.getByText('Cotton T-Shirt')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.queryByText('Wireless Headphones')).not.toBeInTheDocument();
  });

  it('combines category and search filters', () => {
    renderCatalog(['/?category=electronics&q=wireless']);

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.queryByText('USB-C Hub')).not.toBeInTheDocument();
  });

  it('updates URL when category is changed', async () => {
    const user = userEvent.setup();
    renderCatalog();

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'books');

    expect(screen.getByText('JavaScript: The Good Parts')).toBeInTheDocument();
    expect(screen.getByText('Learning TypeScript')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.queryByText('Wireless Headphones')).not.toBeInTheDocument();
  });

  it('updates URL when search input changes', async () => {
    const user = userEvent.setup();
    renderCatalog();

    const input = screen.getByPlaceholderText('Search products...');
    await user.type(input, 'denim');

    expect(screen.getByText('Denim Jacket')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.queryByText('Cotton T-Shirt')).not.toBeInTheDocument();
  });

  it('shows "No products found" when no matches', () => {
    renderCatalog(['/?q=nonexistent']);

    expect(screen.getByText('No products found')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});

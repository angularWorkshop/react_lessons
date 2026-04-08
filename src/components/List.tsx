import type { ReactElement, ReactNode } from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor?: (item: T) => string;
}

export function List<T>({
  items,
  renderItem,
  keyExtractor,
}: ListProps<T>): ReactElement {
  return (
    <ul className="generic-list">
      {items.map((item) => (
        <li
          key={keyExtractor ? keyExtractor(item) : String(item)}
          className="generic-list__item"
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

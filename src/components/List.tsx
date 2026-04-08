import type { ReactElement } from 'react';

interface ListItem {
  id: string;
  label: string;
}

interface ListProps {
  items: ListItem[];
  renderItem: (item: ListItem) => ReactElement;
}

export function List({ items, renderItem }: ListProps): ReactElement {
  return (
    <ul className="generic-list">
      {items.map((item) => (
        <li key={item.id} className="generic-list__item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

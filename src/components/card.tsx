import type { ReactElement } from 'react';

// TODO: import the CSS Module (Card.module.css) as `styles`

interface CardProps {
  title: string;
  children: string;
  elevated?: boolean;
}

export function Card({ title, children, elevated = false }: CardProps): ReactElement {
  // TODO: use CSS Modules for className
  // - if elevated is true, use styles.elevated (which composes from styles.card)
  // - if elevated is false, use styles.card

  return (
    <div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

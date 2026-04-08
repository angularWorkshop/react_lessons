import type { ReactElement, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps): ReactElement {
  return <section className="user-card" aria-label="User card preview">{children}</section>;
}

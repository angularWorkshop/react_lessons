import type { ReactElement } from 'react';

interface CardProps {
  title: string;
  footer?: string;
  children: ReactElement;
}

export function Card({ title, footer, children }: CardProps): ReactElement {
  return (
    <section className="stack-card">
      <h2>{title}</h2>
      <div>{children}</div>
      {footer ? <footer className="stack-card__footer">{footer}</footer> : null}
    </section>
  );
}

import type { ReactElement } from 'react';

interface ButtonProps {
  label: string;
  variant: 'primary' | 'secondary';
}

export function Button({ label, variant }: ButtonProps): ReactElement {
  return (
    <button className={`button button--${variant}`} type="button">
      {label}
    </button>
  );
}

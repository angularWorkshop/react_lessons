import type { ReactElement } from 'react';

interface ButtonProps {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export function Button({ label, variant, size, disabled }: ButtonProps): ReactElement {
  return (
    <button
      className={`button button--${variant} button--${size}`}
      type="button"
      disabled={disabled}
    >
      {label}
    </button>
  );
}

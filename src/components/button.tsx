import type { ReactElement } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'danger';
}

export function Button({ label, onClick, disabled = false, variant = 'primary' }: ButtonProps): ReactElement {
  return (
    <button
      type="button"
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

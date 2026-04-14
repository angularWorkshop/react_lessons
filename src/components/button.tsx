import type { ReactElement } from 'react';

// TODO: import the CSS Module (Button.module.css) as `styles`
// TODO: import clsx

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  label,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
}: ButtonProps): ReactElement {
  // TODO: build className using CSS Modules + the clsx library
  // - styles[variant] picks the right variant class
  // - styles.fullWidth is added conditionally when fullWidth is true
  // - combine them with the clsx helper

  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}

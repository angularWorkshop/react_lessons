import type { ReactElement } from 'react';

interface ButtonProps {
  as?: 'button' | 'a' | 'div';
  label: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ as = 'button', label, href, type = 'button' }: ButtonProps): ReactElement {
  if (as === 'a') {
    return (
      <a className="poly-button poly-button--link" href={href}>
        {label}
      </a>
    );
  }

  if (as === 'div') {
    return <div className="poly-button poly-button--ghost">{label}</div>;
  }

  return (
    <button className="poly-button poly-button--primary" type={type}>
      {label}
    </button>
  );
}

import type { ComponentPropsWithoutRef, ReactElement } from 'react';

type ButtonAsAnchorProps = {
  as: 'a';
  label: string;
  href: string;
  type?: never;
} & Omit<ComponentPropsWithoutRef<'a'>, 'children' | 'href'>;

type ButtonAsNativeProps = {
  as?: 'button';
  label: string;
  href?: never;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children'>;

type ButtonAsDivProps = {
  as: 'div';
  label: string;
  href?: never;
  type?: never;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

type ButtonProps = ButtonAsAnchorProps | ButtonAsNativeProps | ButtonAsDivProps;

export function Button(props: ButtonProps): ReactElement {
  const { as = 'button', label } = props;

  if (as === 'a') {
    return (
      <a className="poly-button poly-button--link" href={props.href}>
        {label}
      </a>
    );
  }

  if (as === 'div') {
    return <div className="poly-button poly-button--ghost">{label}</div>;
  }

  return (
    <button
      className="poly-button poly-button--primary"
      type={props.type ?? 'button'}
    >
      {label}
    </button>
  );
}

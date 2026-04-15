import type { HTMLAttributes, ReactElement } from 'react';

import { cn } from '../lib/utils';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  highlighted?: boolean;
};

export function Card({
  title,
  className,
  highlighted = false,
  children,
  ...props
}: CardProps): ReactElement {
  return (
    <article
      className={cn(
        'rounded-[28px] border p-6 shadow-xl',
        highlighted
          ? 'border-cyan-300/30 bg-cyan-400/10'
          : 'border-white/10 bg-white/5',
        className,
      )}
      {...props}
    >
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{children}</p>
    </article>
  );
}

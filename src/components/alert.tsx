import type { HTMLAttributes, ReactElement } from 'react';

import { cn } from '../lib/utils';

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  tone?: 'success' | 'danger';
};

export function Alert({
  title,
  tone = 'success',
  className,
  children,
  ...props
}: AlertProps): ReactElement {
  return (
    <div
      className={cn(
        'rounded-3xl border px-5 py-4',
        tone === 'danger'
          ? 'border-rose-400/30 bg-rose-500/10'
          : 'border-emerald-400/30 bg-emerald-500/10',
        className,
      )}
      {...props}
    >
      <h3 className="text-base font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-200">{children}</p>
    </div>
  );
}

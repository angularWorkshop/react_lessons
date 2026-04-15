import type { HTMLAttributes, ReactElement } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const alertVariants = cva('rounded-3xl border px-5 py-4', {
  variants: {
    tone: {
      success: 'border-emerald-400/30 bg-emerald-500/10',
      danger: 'border-rose-400/30 bg-rose-500/10',
    },
  },
  defaultVariants: {
    tone: 'success',
  },
});

type AlertProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
  title: string;
};

export function Alert({
  title,
  tone = 'success',
  className,
  children,
  ...props
}: AlertProps): ReactElement {
  return (
    <div className={cn(alertVariants({ tone }), className)} {...props}>
      <h3 className="text-base font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-200">{children}</p>
    </div>
  );
}

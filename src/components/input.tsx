import type { InputHTMLAttributes, ReactElement } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const inputVariants = cva(
  'rounded-2xl border px-4 py-3 outline-none transition-colors',
  {
    variants: {
      tone: {
        default:
          'border-slate-300 bg-white text-slate-900 focus:border-cyan-500 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:focus:border-cyan-300',
        invalid:
          'border-rose-400 bg-white text-slate-900 focus:border-rose-500 dark:border-rose-400/50 dark:bg-slate-900/80 dark:text-white dark:focus:border-rose-300',
      },
    },
    defaultVariants: {
      tone: 'default',
    },
  },
);

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
  label: string;
  invalid?: boolean;
};

export function Input({
  label,
  className,
  invalid = false,
  tone,
  ...props
}: InputProps): ReactElement {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
      <span>{label}</span>
      <input
        className={cn(inputVariants({ tone: invalid ? 'invalid' : tone }), className)}
        {...props}
      />
    </label>
  );
}

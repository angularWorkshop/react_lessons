import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 16.2 runtime', () => {
  it('renders the compound form workspace', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Compound form workspace' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('links the field error through generated ids and blocks submit when invalid', () => {
    render(<App />);

    const input = screen.getByLabelText('Email');
    const error = screen.getByText('Enter a valid email');
    const submit = screen.getByRole('button', { name: 'Create account' });

    expect(input).toHaveAttribute('aria-describedby', error.getAttribute('id'));
    expect(submit).toBeDisabled();
  });

  it('enables submit after the email becomes valid', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'max@example.com' },
    });

    expect(screen.getByRole('button', { name: 'Create account' })).not.toBeDisabled();
  });
});

describe('Topic 16.2 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('creates context for compound form parts', () => {
    expect(appSource).toMatch(/createContext<FormContextValue \| undefined>\(undefined\)/);
    expect(appSource).toMatch(/function useFormContext\(\): FormContextValue/);
  });

  it('exposes typed subcomponents on Form', () => {
    expect(appSource).toMatch(/interface FormComponent/);
    expect(appSource).toMatch(/Form\.Field = FormField/);
    expect(appSource).toMatch(/Form\.Error = FormError/);
    expect(appSource).toMatch(/Form\.Submit = FormSubmit/);
  });
});

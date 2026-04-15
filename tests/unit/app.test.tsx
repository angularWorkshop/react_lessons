import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 32.2 — Tailwind UI Kit with CVA', () => {
  it('renders all UI kit sections on one showcase page', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Tailwind UI Kit with CVA' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Buttons' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Badges' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Inputs' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Alerts' })).toBeInTheDocument();
  });

  it('shows all component families and showcase examples', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByLabelText('Workspace name')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Highlight card' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Danger alert' })).toBeInTheDocument();
  });
});

describe('Topic 32.2 — source checks', () => {
  const buttonSource = readFileSync(resolve(process.cwd(), 'src/components/button.tsx'), 'utf8');
  const badgeSource = readFileSync(resolve(process.cwd(), 'src/components/badge.tsx'), 'utf8');
  const inputSource = readFileSync(resolve(process.cwd(), 'src/components/input.tsx'), 'utf8');
  const cardSource = readFileSync(resolve(process.cwd(), 'src/components/card.tsx'), 'utf8');
  const alertSource = readFileSync(resolve(process.cwd(), 'src/components/alert.tsx'), 'utf8');
  const utilsSource = readFileSync(resolve(process.cwd(), 'src/lib/utils.ts'), 'utf8');

  it('Button uses cva', () => {
    expect(buttonSource).toMatch(/cva\(/);
    expect(buttonSource).toMatch(/VariantProps/);
  });

  it('Badge uses cva', () => {
    expect(badgeSource).toMatch(/cva\(/);
    expect(badgeSource).toMatch(/VariantProps/);
  });

  it('Input uses cva', () => {
    expect(inputSource).toMatch(/cva\(/);
    expect(inputSource).toMatch(/VariantProps/);
  });

  it('Card uses cva', () => {
    expect(cardSource).toMatch(/cva\(/);
    expect(cardSource).toMatch(/VariantProps/);
  });

  it('Alert uses cva', () => {
    expect(alertSource).toMatch(/cva\(/);
    expect(alertSource).toMatch(/VariantProps/);
  });

  it('cn() combines clsx and twMerge', () => {
    expect(utilsSource).toMatch(/clsx/);
    expect(utilsSource).toMatch(/tailwind-merge/);
    expect(utilsSource).toMatch(/twMerge/);
  });
});

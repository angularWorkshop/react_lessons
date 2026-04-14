import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 30.1 — CSS Modules UI Kit', () => {
  it('renders all three component types', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'CSS Modules UI Kit' })).toBeInTheDocument();

    // Buttons
    expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Secondary' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Danger' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();

    // Full width button
    expect(screen.getByRole('button', { name: 'Full width button' })).toBeInTheDocument();

    // Badges
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();

    // Cards
    expect(screen.getByRole('heading', { name: 'Regular card' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Elevated card' })).toBeInTheDocument();
  });

  it('Button applies CSS Module classes via clsx', () => {
    render(<App />);

    const primary = screen.getByRole('button', { name: 'Primary' });
    expect(primary.className).toMatch(/primary/);

    const secondary = screen.getByRole('button', { name: 'Secondary' });
    expect(secondary.className).toMatch(/secondary/);

    const danger = screen.getByRole('button', { name: 'Danger' });
    expect(danger.className).toMatch(/danger/);

    const fullWidth = screen.getByRole('button', { name: 'Full width button' });
    expect(fullWidth.className).toMatch(/fullWidth/);
  });

  it('Card applies CSS Module classes based on elevated prop', () => {
    render(<App />);

    const regularCard = screen.getByText('This card has default styling with a subtle shadow.').parentElement!;
    expect(regularCard.className).toMatch(/card/);

    const elevatedCard = screen.getByText('This card uses the elevated variant with a deeper shadow.').parentElement!;
    expect(elevatedCard.className).toMatch(/elevated/);
  });

  it('Badge applies CSS Module classes by color', () => {
    render(<App />);

    expect(screen.getByText('Info').className).toMatch(/info/);
    expect(screen.getByText('Success').className).toMatch(/success/);
    expect(screen.getByText('Warning').className).toMatch(/warning/);
  });
});

describe('Topic 30.1 — source checks', () => {
  const buttonSrc = readFileSync(resolve(process.cwd(), 'src/components/button.tsx'), 'utf8');
  const cardSrc = readFileSync(resolve(process.cwd(), 'src/components/card.tsx'), 'utf8');
  const badgeSrc = readFileSync(resolve(process.cwd(), 'src/components/badge.tsx'), 'utf8');

  it('Button imports CSS Module and clsx', () => {
    expect(buttonSrc).toMatch(/import\s+styles\s+from\s+['"]\.\/Button\.module\.css['"]/);
    expect(buttonSrc).toMatch(/import\s+.*clsx.*from\s+['"]clsx['"]/);
  });

  it('Card imports CSS Module', () => {
    expect(cardSrc).toMatch(/import\s+styles\s+from\s+['"]\.\/Card\.module\.css['"]/);
  });

  it('Badge imports CSS Module', () => {
    expect(badgeSrc).toMatch(/import\s+styles\s+from\s+['"]\.\/Badge\.module\.css['"]/);
  });

  it('no component uses global className strings', () => {
    // Should use styles.xxx, not hardcoded class strings
    expect(buttonSrc).not.toMatch(/className=["'](?!app-)/);
    expect(cardSrc).not.toMatch(/className=["'](?!app-)/);
    expect(badgeSrc).not.toMatch(/className=["'](?!app-)/);
  });

  it('Button uses clsx to combine classes', () => {
    expect(buttonSrc).toMatch(/clsx\(/);
  });
});

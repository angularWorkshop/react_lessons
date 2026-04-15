import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { App } from '../../src/App';
import { ThemeProvider } from '../../src/context/theme';

function renderApp() {
  return render(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
  );
}

describe('Topic 33.2 — Skeleton & Animations', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the page heading and reload button', () => {
    renderApp();

    expect(screen.getByRole('heading', { name: /skeleton/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
  });

  it('shows skeleton placeholders while loading', () => {
    renderApp();

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });

  it('skeletons use animate-pulse class', () => {
    renderApp();

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons[0].className).toContain('animate-pulse');
  });

  it('skeletons include motion-reduce:animate-none for a11y', () => {
    renderApp();

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons[0].className).toContain('motion-reduce:animate-none');
  });

  it('shows user cards after loading completes', async () => {
    renderApp();

    expect(screen.queryAllByTestId('user-card')).toHaveLength(0);

    await act(async () => {
      vi.advanceTimersByTime(2100);
    });

    const cards = screen.getAllByTestId('user-card');
    expect(cards).toHaveLength(3);
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
  });

  it('user cards get animate-fade-slide-in after loading', async () => {
    renderApp();

    await act(async () => {
      vi.advanceTimersByTime(2100);
    });

    const cards = screen.getAllByTestId('user-card');
    expect(cards[0].className).toContain('animate-fade-slide-in');
  });

  it('user cards respect motion-reduce:animate-none', async () => {
    renderApp();

    await act(async () => {
      vi.advanceTimersByTime(2100);
    });

    const cards = screen.getAllByTestId('user-card');
    expect(cards[0].className).toContain('motion-reduce:animate-none');
  });

  it('reload button resets to skeleton state', async () => {
    renderApp();

    await act(async () => {
      vi.advanceTimersByTime(2100);
    });

    expect(screen.getAllByTestId('user-card')).toHaveLength(3);

    await userEvent.click(screen.getByRole('button', { name: 'Reload' }));

    expect(screen.queryAllByTestId('user-card')).toHaveLength(0);
    expect(screen.getAllByTestId('skeleton').length).toBeGreaterThanOrEqual(3);
  });
});

describe('Topic 33.2 — source checks', () => {
  const skeletonSource = readFileSync(resolve(process.cwd(), 'src/components/skeleton.tsx'), 'utf8');
  const userCardSource = readFileSync(resolve(process.cwd(), 'src/components/user-card.tsx'), 'utf8');
  const stylesSource = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');

  it('Skeleton uses cva for shape variants', () => {
    expect(skeletonSource).toMatch(/cva\(/);
    expect(skeletonSource).toMatch(/VariantProps/);
  });

  it('styles.css defines custom fade-slide-in keyframes', () => {
    expect(stylesSource).toMatch(/@keyframes\s+fade-slide-in/);
    expect(stylesSource).toMatch(/--animate-fade-slide-in/);
  });

  it('UserCard applies animate-fade-slide-in conditionally', () => {
    expect(userCardSource).toMatch(/animate-fade-slide-in/);
  });

  it('UserCard respects prefers-reduced-motion', () => {
    expect(userCardSource).toMatch(/motion-reduce/);
  });
});

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 16.1 runtime', () => {
  it('renders the compound tabs workspace', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Compound tabs workspace' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Overview' })).toBeInTheDocument();
  });

  it('switches panels when another tab is selected', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Syllabus' }));

    expect(screen.getByRole('heading', { name: 'Syllabus' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Overview' })).not.toBeInTheDocument();
  });
});

describe('Topic 16.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('creates context inside the compound component implementation', () => {
    expect(appSource).toMatch(/createContext<TabsContextValue \| undefined>\(undefined\)/);
    expect(appSource).toMatch(/function useTabsContext\(\): TabsContextValue/);
  });

  it('exposes typed subcomponents on Tabs', () => {
    expect(appSource).toMatch(/interface TabsComponent/);
    expect(appSource).toMatch(/Tabs\.Tab = TabsTab/);
    expect(appSource).toMatch(/Tabs\.Panel = TabsPanel/);
  });
});

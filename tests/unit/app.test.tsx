import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 23.1 runtime', () => {
  it('renders the dashboard workspace and filters users', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'FSD refactor workspace' })).toBeInTheDocument();
    expect(screen.getByText('Active users: 3')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search by name, role, or status'), {
      target: { value: 'leo' },
    });

    expect(screen.getByText('Leo Ford')).toBeInTheDocument();
    expect(screen.queryByText('Anna Stone')).not.toBeInTheDocument();
  });
});

describe('Topic 23.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');
  const dashboardPageSource = readFileSync(resolve(process.cwd(), 'src/pages/dashboard-page/ui/dashboard-page.tsx'), 'utf8');
  const usersPanelSource = readFileSync(resolve(process.cwd(), 'src/widgets/users-panel/ui/users-panel.tsx'), 'utf8');
  const eslintSource = readFileSync(resolve(process.cwd(), 'eslint.config.js'), 'utf8');

  it('organizes the refactor through slice-level public APIs', () => {
    expect(appSource).toMatch(/from '\.\/pages\/dashboard-page'/);
    expect(dashboardPageSource).toMatch(/from '\.\.\/\.\.\/\.\.\/widgets\/overview-panel'/);
    expect(dashboardPageSource).toMatch(/from '\.\.\/\.\.\/\.\.\/widgets\/users-panel'/);
    expect(usersPanelSource).toMatch(/from '\.\.\/\.\.\/\.\.\/features\/user-search'/);
    expect(usersPanelSource).toMatch(/from '\.\.\/\.\.\/\.\.\/entities\/user'/);
  });

  it('adds barrel files for the main slices', () => {
    expect(existsSync(resolve(process.cwd(), 'src/pages/dashboard-page/index.ts'))).toBe(true);
    expect(existsSync(resolve(process.cwd(), 'src/widgets/overview-panel/index.ts'))).toBe(true);
    expect(existsSync(resolve(process.cwd(), 'src/widgets/users-panel/index.ts'))).toBe(true);
    expect(existsSync(resolve(process.cwd(), 'src/features/user-search/index.ts'))).toBe(true);
    expect(existsSync(resolve(process.cwd(), 'src/entities/user/index.ts'))).toBe(true);
  });

  it('configures ESLint to block internal segment imports', () => {
    expect(eslintSource).toMatch(/no-restricted-imports/);
    expect(eslintSource).toMatch(/patterns/);
  });
});

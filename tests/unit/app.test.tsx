import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 1.1 runtime', () => {
  it('renders the cleaned starter heading', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'React Bootcamp starter' }),
    ).toBeInTheDocument();
  });
});

describe('Topic 1.1 configuration', () => {
  it('enables strict null-safety helpers in tsconfig.app.json', () => {
    const tsconfig = JSON.parse(
      readFileSync(resolve(process.cwd(), 'tsconfig.app.json'), 'utf8'),
    ) as {
      compilerOptions?: {
        strict?: boolean;
        noUncheckedIndexedAccess?: boolean;
        baseUrl?: string;
        paths?: Record<string, string[]>;
      };
    };

    expect(tsconfig.compilerOptions?.strict).toBe(true);
    expect(tsconfig.compilerOptions?.noUncheckedIndexedAccess).toBe(true);
    expect(tsconfig.compilerOptions?.baseUrl).toBe('.');
    expect(tsconfig.compilerOptions?.paths).toEqual({
      '@/*': ['src/*'],
    });
  });

  it('extracts AppShell into its own component and imports it through the alias', () => {
    const appFile = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');
    const appShellPath = resolve(process.cwd(), 'src/components/AppShell.tsx');

    expect(existsSync(appShellPath)).toBe(true);
    expect(appFile).toContain("from '@/components/AppShell'");
  });
});

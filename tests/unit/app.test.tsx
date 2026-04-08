import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 1.2 runtime', () => {
  it('renders the code quality starter heading', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'React code quality' })).toBeInTheDocument();
  });
});

describe('Topic 1.2 tooling', () => {
  it('registers lint, format, prepare, and lint-staged scripts', () => {
    const packageJson = JSON.parse(
      readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'),
    ) as {
      scripts?: Record<string, string>;
      ['lint-staged']?: Record<string, string[]>;
    };

    expect(packageJson.scripts?.lint).toBe('eslint .');
    expect(packageJson.scripts?.['format:check']).toBe('prettier . --check');
    expect(packageJson.scripts?.prepare).toBe('husky');
    expect(packageJson['lint-staged']).toEqual({
      '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
      '*.{json,md,css}': ['prettier --write'],
    });
  });

  it('creates a Husky pre-commit hook that runs lint-staged', () => {
    const hookPath = resolve(process.cwd(), '.husky/pre-commit');

    expect(existsSync(hookPath)).toBe(true);
    expect(readFileSync(hookPath, 'utf8')).toContain('npx lint-staged');
  });
});

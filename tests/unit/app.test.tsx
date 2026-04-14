import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../../src/components/button';
import { SignupForm } from '../../src/components/signup-form';

// ─── Button tests ──────────────────────────────────────────

describe('Button', () => {
  it('renders with the provided label', () => {
    render(<Button label="Save" onClick={() => undefined} />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button label="Go" onClick={handleClick} />);

    await userEvent.click(screen.getByRole('button', { name: 'Go' }));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    render(<Button label="Nope" onClick={handleClick} disabled />);

    await userEvent.click(screen.getByRole('button', { name: 'Nope' }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('is marked as disabled in the DOM', () => {
    render(<Button label="Off" onClick={() => undefined} disabled />);
    expect(screen.getByRole('button', { name: 'Off' })).toBeDisabled();
  });
});

// ─── SignupForm tests ──────────────────────────────────────

describe('SignupForm', () => {
  it('renders the form with name and email fields', () => {
    render(<SignupForm onSubmit={() => undefined} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<SignupForm onSubmit={() => undefined} />);

    await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));

    const alerts = screen.getAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });

  it('shows a name error when name is too short', async () => {
    render(<SignupForm onSubmit={() => undefined} />);

    await userEvent.type(screen.getByLabelText('Name'), 'A');
    await userEvent.type(screen.getByLabelText('Email'), 'test@mail.com');
    await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));

    expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
  });

  it('shows an email error when email has no @', async () => {
    render(<SignupForm onSubmit={() => undefined} />);

    await userEvent.type(screen.getByLabelText('Name'), 'Alice');
    await userEvent.type(screen.getByLabelText('Email'), 'invalid');
    await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));

    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
  });

  it('calls onSubmit with correct data on valid submission', async () => {
    const handleSubmit = vi.fn();
    render(<SignupForm onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByLabelText('Name'), 'Alice');
    await userEvent.type(screen.getByLabelText('Email'), 'alice@test.com');
    await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));

    expect(handleSubmit).toHaveBeenCalledWith({ name: 'Alice', email: 'alice@test.com' });
  });

  it('shows a success message after valid submission', async () => {
    render(<SignupForm onSubmit={() => undefined} />);

    await userEvent.type(screen.getByLabelText('Name'), 'Alice');
    await userEvent.type(screen.getByLabelText('Email'), 'alice@test.com');
    await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));

    expect(screen.getByRole('status')).toHaveTextContent('Thanks for signing up, Alice!');
  });
});

// ─── Source checks ─────────────────────────────────────────

describe('Topic 25.1 — test quality checks', () => {
  const testSource = readFileSync(resolve(process.cwd(), 'tests/unit/app.test.tsx'), 'utf8');

  it('uses userEvent for interactions', () => {
    expect(testSource).toMatch(/userEvent\.(click|type|clear)/);
  });

  it('does not rely on test IDs for queries', () => {
    // Should not use getBy + TestId as a query strategy
    const lines = testSource.split('\n');
    const codeLines = lines.filter((l) => !l.trimStart().startsWith('//') && !l.includes('test IDs'));
    const codeOnly = codeLines.join('\n');
    expect(codeOnly).not.toMatch(/getByTestId\(/);
  });

  it('uses vi.fn() for callback mocking', () => {
    expect(testSource).toMatch(/vi\.fn\(\)/);
  });
});

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../../src/components/button';
import { SignupForm } from '../../src/components/signup-form';

// ─── Button tests ──────────────────────────────────────────

describe('Button', () => {
  it('renders with the provided label', () => {
    // TODO: render a Button and check that the label text is visible
    expect('implement').toBe('this test');
  });

  it('calls onClick when clicked', async () => {
    // TODO: render a Button with a vi.fn() handler
    // click it with userEvent and verify the handler was called once
    expect('implement').toBe('this test');
  });

  it('does not call onClick when disabled', async () => {
    // TODO: render a disabled Button with a vi.fn() handler
    // click it with userEvent and verify the handler was NOT called
    expect('implement').toBe('this test');
  });

  it('is marked as disabled in the DOM', () => {
    // TODO: render a disabled Button and check that the button element is disabled
    expect('implement').toBe('this test');
  });
});

// ─── SignupForm tests ──────────────────────────────────────

describe('SignupForm', () => {
  it('renders the form with name and email fields', () => {
    // TODO: render the form and verify both labeled inputs exist
    // use getByLabelText
    expect('implement').toBe('this test');
  });

  it('shows validation errors for empty fields', async () => {
    // TODO: render the form, click submit without filling in fields
    // verify that both error messages appear (role="alert")
    expect('implement').toBe('this test');
  });

  it('shows a name error when name is too short', async () => {
    // TODO: type a single character into name, valid email, submit
    // verify the name error message appears
    expect('implement').toBe('this test');
  });

  it('shows an email error when email has no @', async () => {
    // TODO: type a valid name, invalid email (no @), submit
    // verify the email error message appears
    expect('implement').toBe('this test');
  });

  it('calls onSubmit with correct data on valid submission', async () => {
    // TODO: fill in valid name and email, submit
    // verify onSubmit was called with { name, email }
    expect('implement').toBe('this test');
  });

  it('shows a success message after valid submission', async () => {
    // TODO: fill in valid data, submit
    // verify the success message with the user name is shown (role="status")
    expect('implement').toBe('this test');
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

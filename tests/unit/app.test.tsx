import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 11.2 runtime', () => {
  it('renders the RHF shell', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'React Hook Form + Zod' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save with RHF' })).toBeInTheDocument();
  });

  it('shows schema validation messages for invalid submit', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'A' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save with RHF' }));

    expect(await screen.findByText('Please enter your full name.')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid work email.')).toBeInTheDocument();
    expect(screen.getByText('Password must contain at least 8 characters.')).toBeInTheDocument();
    expect(screen.getByText('Choose the role that matches the account.')).toBeInTheDocument();
  });

  it('renders a typed payload summary after a valid submit', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada Lovelace' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@react.dev' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pass1234' } });
    fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'mentor' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save with RHF' }));

    expect(
      await screen.findByRole('heading', { name: 'Form payload is typed from the schema' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('ada@react.dev')).toBeInTheDocument();
    expect(screen.getByText('mentor')).toBeInTheDocument();
  });
});

describe('Topic 11.2 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('derives form types from a Zod schema and wires zodResolver into useForm', () => {
    expect(appSource).toMatch(/const registrationSchema = z\.object\(/);
    expect(appSource).toMatch(/type RegistrationValues = z\.infer<typeof registrationSchema>;/);
    expect(appSource).toMatch(/resolver: zodResolver\(registrationSchema\)/);
    expect(appSource).toMatch(/useForm<RegistrationValues>\(/);
  });
});

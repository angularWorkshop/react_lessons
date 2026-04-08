import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 11.1 runtime', () => {
  it('renders the controlled registration shell', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Controlled registration form' })).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Role')).toBeInTheDocument();
  });

  it('shows validation feedback on blur and submit', () => {
    render(<App />);

    fireEvent.blur(screen.getByLabelText('Email'));
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));
    expect(screen.getByText('Choose a role before submitting the form.')).toBeInTheDocument();
  });

  it('shows a success summary after a valid submit', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada Lovelace' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@react.dev' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pass1234' } });
    fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'mentor' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(screen.getByRole('heading', { name: 'Ready to onboard' })).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('ada@react.dev')).toBeInTheDocument();
    expect(screen.getByText('mentor')).toBeInTheDocument();
  });
});

describe('Topic 11.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('uses explicit React event types for change, blur, and submit handlers', () => {
    expect(appSource).toMatch(/handleInputChange = \(event: ChangeEvent<HTMLInputElement>\)/);
    expect(appSource).toMatch(/handleRoleChange = \(event: ChangeEvent<HTMLSelectElement>\)/);
    expect(appSource).toMatch(/handleInputBlur = \(event: FocusEvent<HTMLInputElement>\)/);
    expect(appSource).toMatch(/handleRoleBlur = \(_event: FocusEvent<HTMLSelectElement>\)/);
    expect(appSource).toMatch(/handleSubmit = \(event: FormEvent<HTMLFormElement>\)/);
  });

  it('keeps the form fields controlled through local state', () => {
    expect(appSource).toMatch(/const \[values, setValues\] = useState<RegistrationValues>\(INITIAL_VALUES\)/);
    expect(appSource).toMatch(/value={values\.name}/);
    expect(appSource).toMatch(/value={values\.email}/);
    expect(appSource).toMatch(/value={values\.password}/);
    expect(appSource).toMatch(/value={values\.role}/);
  });
});

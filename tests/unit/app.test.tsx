import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen, within } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 6.2 runtime', () => {
  it('renders the typed form shell', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Typed form state' })).toBeInTheDocument();
    expect(screen.getByLabelText('Full name')).toHaveValue('Mila Fox');
    expect(screen.getByRole('combobox', { name: 'Track' })).toHaveValue('Frontend');
  });

  it('updates the live summary when text fields change', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Alex Turner' },
    });
    fireEvent.change(screen.getByLabelText('City'), {
      target: { value: 'Warsaw' },
    });

    expect(screen.getByText('Alex Turner')).toBeInTheDocument();
    expect(screen.getByText('Warsaw')).toBeInTheDocument();
  });

  it('updates the track with the select control', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Track'), {
      target: { value: 'Design' },
    });

    expect(screen.getByRole('combobox', { name: 'Track' })).toHaveValue('Design');
    expect(within(screen.getByLabelText('Live summary')).getByText('Design')).toBeInTheDocument();
  });
});

describe('Topic 6.2 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('types the form state explicitly', () => {
    expect(appSource).toMatch(
      /const \[form, setForm\] = useState<FormState>\(INITIAL_FORM\);/,
    );
  });

  it('uses one shared change handler for input and select fields', () => {
    expect(appSource).toMatch(
      /handleChange = \(event: ChangeEvent<HTMLInputElement \| HTMLSelectElement>\)/,
    );
  });

  it('updates fields through computed property names', () => {
    expect(appSource).toMatch(/\[name\]: value/);
  });
});

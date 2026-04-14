import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { App } from '../../src/App';

function fillInviteForm(values: { name: string; email: string }): void {
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { value: values.name },
  });
  fireEvent.change(screen.getByLabelText('Work email'), {
    target: { value: values.email },
  });
}

describe('Topic 27.1 runtime', () => {
  it('renders the Actions workspace shell and the seeded queue', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Actions waitlist workspace' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Current invite requests' })).toBeInTheDocument();
    expect(screen.getByText('marta@northstar.dev')).toBeInTheDocument();
  });

  it('adds a confirmed invite after the async action resolves', async () => {
    render(<App />);
    fillInviteForm({
      name: 'Taylor Brooks',
      email: 'taylor@signalforge.dev',
    });

    fireEvent.click(screen.getByRole('button', { name: 'Request invite' }));

    await waitFor(() => {
      expect(screen.getByText('Invite request sent for taylor@signalforge.dev.')).toBeInTheDocument();
    });

    expect(screen.getByText('taylor@signalforge.dev')).toBeInTheDocument();
  });

  it('disables the submit button and swaps the label during the pending request', async () => {
    render(<App />);
    fillInviteForm({
      name: 'Nia Harper',
      email: 'nia@daybreak.dev',
    });

    fireEvent.click(screen.getByRole('button', { name: 'Request invite' }));

    const pendingButton = await screen.findByRole('button', { name: 'Sending request…' });
    expect(pendingButton).toBeDisabled();
  });

  it('shows an optimistic row immediately and rolls it back when the action fails', async () => {
    render(<App />);
    fillInviteForm({
      name: 'Alex Mercer',
      email: 'alex@blocked.dev',
    });

    fireEvent.click(screen.getByRole('button', { name: 'Request invite' }));

    expect(screen.getByText('alex@blocked.dev')).toBeInTheDocument();
    expect(screen.getByText('Sending')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Invites for blocked.dev are paused for this batch.');
    });

    expect(screen.queryByText('alex@blocked.dev')).not.toBeInTheDocument();
  });
});

describe('Topic 27.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('uses useActionState and form actions instead of onSubmit state juggling', () => {
    expect(appSource).toMatch(/useActionState/);
    expect(appSource).toMatch(/<form[^>]+action=\{formAction\}/s);
  });

  it('uses useFormStatus and useOptimistic for pending and optimistic UI', () => {
    expect(appSource).toMatch(/useFormStatus/);
    expect(appSource).toMatch(/useOptimistic/);
  });
});

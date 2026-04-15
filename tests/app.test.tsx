import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Feedback } from '../src/pages/feedback';
import { feedbackAction } from '../src/actions/feedback-action';

function renderFeedbackPage() {
  const router = createMemoryRouter(
    [{ path: '/feedback', element: <Feedback />, action: feedbackAction }],
    { initialEntries: ['/feedback'] },
  );
  return render(<RouterProvider router={router} />);
}

describe('Feedback Form', () => {
  it('renders the feedback form with all fields', () => {
    renderFeedbackPage();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send feedback/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty form submission', async () => {
    const user = userEvent.setup();
    renderFeedbackPage();

    const button = screen.getByRole('button', { name: /send feedback/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
    });
    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
  });

  it('shows validation error for short name', async () => {
    const user = userEvent.setup();
    renderFeedbackPage();

    await user.type(screen.getByLabelText(/name/i), 'A');
    await user.click(screen.getByRole('button', { name: /send feedback/i }));

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    renderFeedbackPage();

    await user.type(screen.getByLabelText(/name/i), 'John');
    await user.type(screen.getByLabelText(/email/i), 'notanemail');
    await user.click(screen.getByRole('button', { name: /send feedback/i }));

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });
  });

  it('shows validation error for short message', async () => {
    const user = userEvent.setup();
    renderFeedbackPage();

    await user.type(screen.getByLabelText(/name/i), 'John');
    await user.type(screen.getByLabelText(/email/i), 'john@test.com');
    await user.type(screen.getByLabelText(/message/i), 'hi');
    await user.click(screen.getByRole('button', { name: /send feedback/i }));

    await waitFor(() => {
      expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
    });
  });

  it('shows success message after valid submission', async () => {
    const user = userEvent.setup();
    renderFeedbackPage();

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@test.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a great feedback message');
    await user.click(screen.getByRole('button', { name: /send feedback/i }));

    await waitFor(() => {
      expect(screen.getByText('Thank you for your feedback!')).toBeInTheDocument();
    });
  });

  it('submit button shows Sending... during submission', async () => {
    const user = userEvent.setup();
    renderFeedbackPage();

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@test.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a great feedback message');
    await user.click(screen.getByRole('button', { name: /send feedback/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument();
    });
  });
});

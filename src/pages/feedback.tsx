// TODO: Import Form, useNavigation, useActionData from 'react-router-dom'
import type { ActionResult } from '../types/feedback';

export function Feedback() {
  // TODO: Use useNavigation() to get navigation state
  const isSubmitting = false;
  // TODO: Use useActionData() to get action result
  const actionData = undefined as ActionResult | undefined;

  // TODO: If actionData?.success, show success message:
  // <p className="feedback-form__success">Thank you for your feedback!</p>

  return (
    <div className="feedback-form">
      <h1 className="feedback-form__title">Leave Feedback</h1>

      {/* TODO: Replace <form> with React Router's <Form method="post"> */}
      <form onSubmit={e => e.preventDefault()} className="feedback-form__form">
        <div className="feedback-form__field">
          <label className="feedback-form__label" htmlFor="name">Name</label>
          <input
            className="feedback-form__input"
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
          />
          {/* TODO: Show error from actionData?.errors?.name in <span className="feedback-form__error"> */}
        </div>

        <div className="feedback-form__field">
          <label className="feedback-form__label" htmlFor="email">Email</label>
          <input
            className="feedback-form__input"
            id="email"
            name="email"
            type="text"
            placeholder="your@email.com"
          />
          {/* TODO: Show error from actionData?.errors?.email in <span className="feedback-form__error"> */}
        </div>

        <div className="feedback-form__field">
          <label className="feedback-form__label" htmlFor="message">Message</label>
          <textarea
            className="feedback-form__textarea"
            id="message"
            name="message"
            placeholder="Your message (at least 10 characters)"
            rows={5}
          />
          {/* TODO: Show error from actionData?.errors?.message in <span className="feedback-form__error"> */}
        </div>

        <button
          className="feedback-form__button"
          type="submit"
          disabled={isSubmitting}
        >
          {/* TODO: Show 'Sending...' when isSubmitting, 'Send Feedback' otherwise */}
          Send Feedback
        </button>
      </form>
    </div>
  );
}

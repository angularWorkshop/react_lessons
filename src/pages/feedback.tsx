import { Form, useNavigation, useActionData } from 'react-router-dom';
import type { ActionResult } from '../types/feedback';

export function Feedback() {
  const navigation = useNavigation();
  const actionData = useActionData() as ActionResult | undefined;
  const isSubmitting = navigation.state === 'submitting';

  if (actionData?.success) {
    return (
      <div className="feedback-form">
        <p className="feedback-form__success">Thank you for your feedback!</p>
      </div>
    );
  }

  return (
    <div className="feedback-form">
      <h1 className="feedback-form__title">Leave Feedback</h1>

      <Form method="post" className="feedback-form__form">
        <div className="feedback-form__field">
          <label className="feedback-form__label" htmlFor="name">Name</label>
          <input
            className="feedback-form__input"
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
          />
          {actionData?.errors?.name && (
            <span className="feedback-form__error">{actionData.errors.name}</span>
          )}
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
          {actionData?.errors?.email && (
            <span className="feedback-form__error">{actionData.errors.email}</span>
          )}
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
          {actionData?.errors?.message && (
            <span className="feedback-form__error">{actionData.errors.message}</span>
          )}
        </div>

        <button
          className="feedback-form__button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Feedback'}
        </button>
      </Form>
    </div>
  );
}

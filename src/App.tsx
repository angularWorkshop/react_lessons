import { useState, type FormEvent, type ReactElement, type ReactNode } from 'react';

interface FormRootProps {
  children: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

interface FormFieldProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
}

interface FormErrorProps {
  error?: string | null;
}

interface FormSubmitProps {
  children: ReactNode;
}

interface FormComponent {
  (props: FormRootProps): ReactElement;
  Field: (props: FormFieldProps) => ReactElement;
  Error: (props: FormErrorProps) => ReactElement | null;
  Submit: (props: FormSubmitProps) => ReactElement;
}

function FormRoot({ children, onSubmit }: FormRootProps): ReactElement {
  return (
    <form className="compound-form" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

function FormField({ label, value = '', onChange }: FormFieldProps): ReactElement {
  return (
    <div className="field-block">
      <label className="field-label" htmlFor="signup-email">
        {label}
      </label>
      <input
        id="signup-email"
        aria-label={label}
        className="field-input"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder="name@example.com"
      />
    </div>
  );
}

function FormError({ error }: FormErrorProps): ReactElement | null {
  if (!error) {
    return null;
  }

  return <p className="field-error">{error}</p>;
}

function FormSubmit({ children }: FormSubmitProps): ReactElement {
  return (
    <button type="submit" className="submit-button">
      {children}
    </button>
  );
}

const Form = FormRoot as FormComponent;
Form.Field = FormField;
Form.Error = FormError;
Form.Submit = FormSubmit;

export function App(): ReactElement {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const error = email.includes('@') ? null : 'Enter a valid email';

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="app-shell">
      <section className="form-demo">
        <p className="eyebrow">Topic 16.2</p>
        <h1>Compound form workspace</h1>
        <p className="description">
          Connect fields, errors, and submit state through a typed compound form API.
        </p>

        <FormRoot onSubmit={handleSubmit}>
          <Form.Field label="Email" value={email} onChange={setEmail} />
          <Form.Error error={error} />
          <Form.Submit>Create account</Form.Submit>
        </FormRoot>

        <p className="submission-state">Submitted: {submitted ? 'yes' : 'no'}</p>
      </section>
    </main>
  );
}

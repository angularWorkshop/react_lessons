import {
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
  type FormEvent,
  type ReactElement,
  type ReactNode,
} from 'react';

interface FormRootProps {
  children: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

interface FormFieldProps {
  label: string;
}

interface FormErrorProps {}

interface FormSubmitProps {
  children: ReactNode;
}

interface FormComponent {
  (props: FormRootProps): ReactElement;
  Field: (props: FormFieldProps) => ReactElement;
  Error: (_props: FormErrorProps) => ReactElement | null;
  Submit: (props: FormSubmitProps) => ReactElement;
}

interface FormContextValue {
  inputId: string;
  errorId: string;
  email: string;
  setEmail: (value: string) => void;
  error: string | null;
  isValid: boolean;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

function useFormContext(): FormContextValue {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('Form components must be used within Form');
  }

  return context;
}

function FormRoot({ children, onSubmit }: FormRootProps): ReactElement {
  const [email, setEmail] = useState('');
  const baseId = useId();
  const error = email.includes('@') ? null : 'Enter a valid email';
  const isValid = error === null;
  const contextValue = useMemo<FormContextValue>(
    () => ({
      inputId: `${baseId}-email`,
      errorId: `${baseId}-error`,
      email,
      setEmail,
      error,
      isValid,
    }),
    [baseId, email, error, isValid],
  );

  return (
    <FormContext.Provider value={contextValue}>
      <form className="compound-form" onSubmit={onSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

function FormField({ label }: FormFieldProps): ReactElement {
  const { inputId, errorId, email, setEmail, error } = useFormContext();

  return (
    <div className="field-block">
      <label className="field-label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        aria-label={label}
        aria-describedby={error ? errorId : undefined}
        className="field-input"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="name@example.com"
      />
    </div>
  );
}

function FormError(_props: FormErrorProps): ReactElement | null {
  const { error, errorId } = useFormContext();

  if (!error) {
    return null;
  }

  return (
    <p id={errorId} className="field-error">
      {error}
    </p>
  );
}

function FormSubmit({ children }: FormSubmitProps): ReactElement {
  const { isValid } = useFormContext();

  return (
    <button type="submit" className="submit-button" disabled={!isValid}>
      {children}
    </button>
  );
}

const Form = FormRoot as FormComponent;
Form.Field = FormField;
Form.Error = FormError;
Form.Submit = FormSubmit;

export function App(): ReactElement {
  const [submitted, setSubmitted] = useState(false);

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
          <Form.Field label="Email" />
          <Form.Error />
          <Form.Submit>Create account</Form.Submit>
        </FormRoot>

        <p className="submission-state">Submitted: {submitted ? 'yes' : 'no'}</p>
      </section>
    </main>
  );
}

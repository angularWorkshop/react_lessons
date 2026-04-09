import { Component, type ErrorInfo, type PropsWithChildren, type ReactElement, type ReactNode } from 'react';

interface ErrorBoundaryProps extends PropsWithChildren {
  title: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`Boundary error in ${this.props.title}`, error, errorInfo.componentStack);
  }

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <section className="panel panel--error">
          <p className="eyebrow">Section fallback</p>
          <h3>{this.props.title} failed</h3>
          <p>Reload the section to continue working.</p>
          <button type="button">Try again</button>
        </section>
      );
    }

    return this.props.children;
  }
}

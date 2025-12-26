import { Component, type ErrorInfo, type ReactNode } from "react";
import ErrorBoundaryFallback from "../atoms/ErrorBoundaryFallback/ErrorBoundaryFallback";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("UI Error:", error, info.componentStack);
  }

  private resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryFallback onRetry={this.resetError} />;
    }

    return this.props.children;
  }
}

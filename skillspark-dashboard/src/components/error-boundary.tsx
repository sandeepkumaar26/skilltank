"use client";

import * as React from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  level?: 'page' | 'component' | 'root';
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
  level: 'page' | 'component' | 'root';
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Report error to logging service
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
          level={this.props.level || 'component'}
        />
      );
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError, level }: ErrorFallbackProps) {
  const isRootLevel = level === 'root';
  const isPageLevel = level === 'page';

  if (isRootLevel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-xl">Application Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Something went wrong and the application crashed. We apologize for the inconvenience.
            </p>
            <div className="space-y-2">
              <Button onClick={resetError} className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/dashboard'}
                className="w-full"
              >
                <Home className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <details className="text-left mt-4">
                <summary className="text-sm font-medium cursor-pointer mb-2">
                  Error Details (Development)
                </summary>
                <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                  {error.message}
                  {error.stack && `\n\n${error.stack}`}
                </pre>
              </details>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isPageLevel) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-3">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle>Page Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">
              This page encountered an error and couldn't be displayed properly.
            </p>
            <div className="flex gap-2">
              <Button onClick={resetError} size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Retry
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Component level error
  return (
    <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium text-red-800 dark:text-red-200">
            Component Error
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300 mt-1">
            This component failed to render properly.
          </p>
          <Button 
            onClick={resetError} 
            size="sm" 
            variant="outline" 
            className="mt-2"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
}

// Hook for handling async errors
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    console.error('Async error captured:', error);
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
}

// Higher-order component for wrapping components with error boundaries
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}
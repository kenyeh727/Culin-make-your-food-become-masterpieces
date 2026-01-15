import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200 max-w-lg w-full">
                        <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
                            <i className="fas fa-exclamation-triangle"></i>
                            Something went wrong
                        </h2>
                        <p className="text-stone-600 mb-6">
                            The application encountered an unexpected error.
                        </p>
                        {this.state.error && (
                            <div className="bg-stone-900 text-red-100 p-4 rounded-lg overflow-x-auto text-sm font-mono mb-6">
                                {this.state.error.toString()}
                            </div>
                        )}
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

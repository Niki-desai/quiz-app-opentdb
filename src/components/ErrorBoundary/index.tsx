import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

// Custom fallback component to show when an error occurs
export const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
    const errorMessage = error ? error?.message : 'An unknown error occurred';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h1>
                <p className="text-gray-600 mb-4">
                    We encountered an unexpected error. Please try refreshing the page or click the button below to retry.
                </p>
                <pre className="text-red-600 bg-gray-100 p-4 rounded-lg mb-4 overflow-auto max-h-32">
                    {errorMessage}
                </pre>
                <button
                    onClick={resetErrorBoundary}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-200"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

// Functional ErrorBoundary component
const FunctionalErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}  // Custom fallback UI
            onReset={() => {
                // No reset logic needed
            }}
        >
            {children}
        </ErrorBoundary>
    );
};

export default FunctionalErrorBoundary;

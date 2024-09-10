import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/UserContext';
import FunctionalErrorBoundary, { ErrorFallback } from './components/ErrorBoundary';

export const fallbackUI = (
  <div className="error-fallback">
    <h1>Something went wrong.</h1>
    <p>We apologize for the inconvenience. Please try again later.</p>
  </div>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <UserProvider>
    <FunctionalErrorBoundary>
      <App />
    </FunctionalErrorBoundary>
    </UserProvider >
);


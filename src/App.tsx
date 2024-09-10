import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Layout from './Layout';
import Quiz from './components/quiz';
import Result from './components/result';
import { useUserContext } from './context/UserContext';
import { useEffect } from 'react';
import { ErrorFallback } from './components/ErrorBoundary';
import { ErrorBoundary } from 'react-error-boundary';

// Type for the component prop in ProtectedQuizRoute
type ProtectedRouteProps = {
  component: React.ComponentType;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/quiz"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <ProtectedQuizRoute component={Quiz} />
              </ErrorBoundary>
            }
          />
          <Route path="result" element={<ProtectedQuizRoute component={Result} />} />
        </Route>
      </Routes>
    </Router>
  );
}

const ProtectedQuizRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const navigate = useNavigate();
  const { state } = useUserContext();

  useEffect(() => {
    if (!state.user.name || !state.user.difficulty) {
      // If user details are missing, redirect to Home
      navigate('/', { replace: true });
    }
  }, [state, navigate]);
  // Only render the component if the user data exists
  return <Component />;
};


export default App;

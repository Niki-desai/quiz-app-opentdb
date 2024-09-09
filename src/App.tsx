import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Layout from './Layout';
import Quiz from './components/quiz';
import Result from './components/result';
import { useUserContext } from './context/UserContext';
import { useEffect } from 'react';

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
          {/* <Route index element={<Home />} /> */}
          {/* <Route path="quiz" element={<Quiz />} /> */}
          <Route path="/quiz" element={<ProtectedQuizRoute component={Quiz} />} />
          <Route path="result" element={<ProtectedQuizRoute component={Result} />} />
        </Route>
      </Routes>
    </Router>
  );
}


// const ProtectedHomeRoute = () => {
//   const navigate = useNavigate();
//   // const location = useLocation();
//   // const { state, dispatch } = useUserContext(); // Access the user context

//   // useEffect(() => {

//   //   if (state.lastRoute !== location.pathname) {
//   //     dispatch({ type: 'SET_LAST_ROUTE', payload: location.pathname });
//   //   }else{
//   //     // dispatch({ type: 'SET_USER', payload: { name: '', difficulty: '' } })
//   //   }
//   //   // if (state.user.name && state.user.difficulty) {
//   //   //   navigate('/quiz', { replace: true });
//   //   // }
//   // }, [state, location, navigate, dispatch]);

//   return <Home />;
// };


const ProtectedQuizRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useUserContext();
  const location = useLocation();

  useEffect(() => {
    // dispatch({ type: 'SET_LAST_ROUTE', payload: location.pathname });

    if (!state.user.name || !state.user.difficulty) {
      // If user details are missing, redirect to Home
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  // Only render the component if the user data exists
  return <Component />;
};


export default App;

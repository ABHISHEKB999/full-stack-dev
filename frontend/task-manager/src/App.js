import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ThemeProvider from './providers/ThemeProvider';
import { SignIn, SignUp, TaskManager } from './views';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Component {...rest} /> : <Navigate to="/signin" />;
};

const App = () => (
  <AuthProvider>
    <ThemeProvider>
      <Router>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<PrivateRoute element={TaskManager} />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  </AuthProvider>
);

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default App;

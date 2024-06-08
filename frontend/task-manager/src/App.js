import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SignIn from './views/SignIn';
import SignOut from './views/SignOut';
import SignUp from './views/SignUp';
import TaskManager from './views/TaskManager';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Component {...rest} /> : <Navigate to="/signin" />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/" element={<PrivateRoute element={TaskManager} />} />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;

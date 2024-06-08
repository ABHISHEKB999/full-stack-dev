import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State variable to hold the error message
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      setError(null); // Clear any previous errors
      await signInWithEmailAndPassword(auth, email, password);
      // Signed in successfully
      navigate('/'); 
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Invalid email or password'); // Set error message for invalid credentials
      } else {
        setError('Error signing in. Please try again later.'); // Set generic error message
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <button onClick={handleSignIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign In
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message if any */}
        {/* Add Link to SignUp page */}
        <p className="text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

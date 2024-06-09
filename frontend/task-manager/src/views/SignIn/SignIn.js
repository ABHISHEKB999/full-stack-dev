import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setError('Invalid email or password');
      } else {
        setError('Error signing in. Please try again later.'); // Set generic error message
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-800 dark:text-white bg-white text-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md dark:text-white text-gray-900">
        <h1 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">
          Sign In
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded w-full dark:bg-gray-900 dark:text-white bg-white text-gray-900"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border rounded w-full dark:bg-gray-900 dark:text-white bg-white text-gray-900"
        />
        <button
          onClick={handleSignIn}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700"
          type="button"
        >
          Sign In
        </button>
        {error && <p className="text-red-500 mt-2 text-red-500">{error}</p>}
        <p className="text-center mt-4 dark:text-white text-gray-500">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

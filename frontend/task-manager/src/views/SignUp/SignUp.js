import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '../../firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // If avatar is selected, upload it to Firebase Storage
      if (avatar) {
        const avatarRef = ref(
          storage,
          `avatars/${userCredential.user.uid}/avatar.jpg`
        );
        await uploadBytes(avatarRef, avatar);
      }

      navigate('/');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else {
        setError(err.message); // Set other error messages
      }
    }
  };

  // Function to handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-800 dark:text-white bg-white text-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md dark:text-white text-gray-900">
        <h1 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">
          Sign Up
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
        {/* Label for avatar image selection */}
        <label
          htmlFor="avatar"
          className="block dark:text-white text-sm font-medium text-gray-700 mb-1"
        >
          Select Avatar Image (Optional)
        </label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleAvatarChange}
          className="mb-4"
        />
        <button
          onClick={handleSignUp}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded dark:bg-green-700"
          type="button"
        >
          Sign Up
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}{' '}
        <p className="mt-2">
          <Link to="/signin" className="text-blue-500 hover:underline">
            Already have an account? Sign in here!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

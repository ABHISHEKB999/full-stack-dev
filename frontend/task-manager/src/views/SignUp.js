import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, storage } from '../firebase'; // Import storage from firebase
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { ref, uploadBytes } from 'firebase/storage'; // Import ref and uploadBytes from firebase/storage

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null); // State to store selected avatar file
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      setError(null); // Clear any previous errors
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // If avatar is selected, upload it to Firebase Storage
      if (avatar) {
        const avatarRef = ref(storage, `avatars/${userCredential.user.uid}/avatar.jpg`);
        await uploadBytes(avatarRef, avatar);
      }

      // Signed up successfully
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else {
        setError(error.message); // Set other error messages
      }
    }
  };

  // Function to handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
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
          className="mb-2 p-2 border rounded w-full"
        />
        {/* Label for avatar image selection */}
        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">Select Avatar Image (Optional)</label>
        {/* Input for avatar image selection */}
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleAvatarChange}
          className="mb-4"
        />
        <button onClick={handleSignUp} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message if any */}
        {/* Add Link to SignIn page */}
        <p className="mt-2">
          <Link to="/signin" className="text-blue-500 hover:underline">Already have an account? Sign in here!</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

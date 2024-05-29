import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ displayName: '', photoURL: '' });
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(firestore, 'users', currentUser.uid);
        getDoc(userDocRef)
          .then(docSnapshot => {
            if (docSnapshot.exists()) {
              setProfile(docSnapshot.data());
            }
          })
          .catch(error => {
            console.error('Error fetching user profile:', error);
          });
      }
    });

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
      unsubscribe();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = async () => {
    if (user) {
      try {
        await user.updateProfile(profile);
        const userDocRef = doc(firestore, 'users', user.uid);
        await setDoc(userDocRef, profile);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  if (!isOnline) {
    return <div className="text-red-500">You are offline. Please check your internet connection.</div>;
  }

  return user ? (
    <div className="bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">Display Name</label>
        <input type="text" id="displayName" name="displayName" value={profile.displayName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photoURL">Photo URL</label>
        <input type="text" id="photoURL" name="photoURL" value={profile.photoURL} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Save
      </button>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default UserProfile;

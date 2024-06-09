import React from 'react';
import { auth } from '../../../../firebase';

const SignOut = () => (
  <button
    onClick={() => auth.signOut()}
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    type="button"
  >
    Sign Out
  </button>
);

export default SignOut;

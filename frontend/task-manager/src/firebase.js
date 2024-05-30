// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr5gODAKWBj3KkimvAIsvA6ZayIoy2nLM",
  authDomain: "task-management-app-a9b09.firebaseapp.com",
  projectId: "task-management-app-a9b09",
  storageBucket: "task-management-app-a9b09.appspot.com",
  messagingSenderId: "69131401083",
  appId: "1:69131401083:web:475e6396b8fd971f342fde",
  measurementId: "G-YPK30MSXX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };

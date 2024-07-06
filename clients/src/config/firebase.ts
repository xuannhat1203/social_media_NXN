// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: "facebook-8d61a.firebaseapp.com",
  projectId: "facebook-8d61a",
  storageBucket: "facebook-8d61a.appspot.com",
  messagingSenderId: "753899135202",
  appId: "1:753899135202:web:c3e34e698ef8661e177ebb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_FIREBASE_KEY,
  authDomain: "editor-789ee.firebaseapp.com",
  databaseURL: "https://editor-789ee.firebaseio.com",
  projectId: "editor-789ee",
  storageBucket: "editor-789ee.appspot.com",
  messagingSenderId: "704434244673",
  appId: "1:704434244673:web:d216efb00dc4c62deb8ac0",
  measurementId: "G-7RMBHJECYY"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
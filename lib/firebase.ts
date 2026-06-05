import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-xCzyIVunmXqWzVRZnDTKOImk6QazUxA",
  authDomain: "mydeeptalk-app-279cd.firebaseapp.com",
  projectId: "mydeeptalk-app-279cd",
  storageBucket: "mydeeptalk-app-279cd.firebasestorage.app",
  messagingSenderId: "68132297924",
  appId: "1:68132297924:web:6072b84aff1265a8a0fd91",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Later replace this with env variables
const firebaseConfig = {
  apiKey: "AIzaSyDY5okMaX3iNhE3P0oxAGR2UQ_mlv1N0HA",
  authDomain: "reddit-clone-9c7ac.firebaseapp.com",
  projectId: "reddit-clone-9c7ac",
  storageBucket: "reddit-clone-9c7ac.appspot.com",
  messagingSenderId: "733422500744",
  appId: "1:733422500744:web:f0f8ef7259a6737fd0583d",
  measurementId: "G-LZFJN88HH8",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

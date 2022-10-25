
import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCLK4sB7Kvr5GTxF64Jz0MOLlOvEsyzqME",
    authDomain: "tech-incubator-case-proj.firebaseapp.com",
    databaseURL: "https://tech-incubator-case-proj-default-rtdb.firebaseio.com",
    projectId: "tech-incubator-case-proj",
    storageBucket: "tech-incubator-case-proj.appspot.com",
    messagingSenderId: "560557832721",
    appId: "1:560557832721:web:8482299a15d72e92970fb0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();


export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  export function logout() {
    return signOut(auth);
  }
  
  // Custom Hook
  export function useAuth() {
    const [currentUser, setCurrentUser] = useState();
  
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
      return unsub;
    }, [])
  
    return currentUser;
  }
  
  // Storage
  export async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid + '.png');
  
    setLoading(true);
    
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
  
    updateProfile(currentUser, {photoURL});
    
    setLoading(false);
    alert("Uploaded file!");
  }
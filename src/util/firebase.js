import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
      apiKey: "AIzaSyCLK4sB7Kvr5GTxF64Jz0MOLlOvEsyzqME",
      authDomain: "tech-incubator-case-proj.firebaseapp.com",
      databaseURL: "https://tech-incubator-case-proj-default-rtdb.firebaseio.com",
      projectId: "tech-incubator-case-proj",
      storageBucket: "tech-incubator-case-proj.appspot.com",
      messagingSenderId: "560557832721",
      appId: "1:560557832721:web:8482299a15d72e92970fb0"
    };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

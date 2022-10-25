import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";
import "./login.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { auth } from '../util/firebase';
import Hero from "./routes";
import Login1 from "./login-page2";

function Login() {
  
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount]  = useState(true);

  


 onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });



  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  

  return (
      <div className="loginContainer"> 
        { user ? 
        (  <Hero  logout={logout}/> ) :  (   
            <Login1 
              email ={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              login={login}
              register={register}
              hasAccount={hasAccount}

              />     
        )}

          </div>
          );
        };
export default Login;
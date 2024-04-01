import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, sendEmailVerification, sendPasswordResetEmail  } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { getStorage, ref,  getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyAyVyWyRQA8kJB3rBdYPwxulTpqNm2DGD0",
  authDomain: "hypersort-72e24.firebaseapp.com",
  projectId: "hypersort-72e24",
  storageBucket: "hypersort-72e24.appspot.com",
  messagingSenderId: "450340666583",
  appId: "1:450340666583:web:283132cc94f0a118450492"
  };


const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const fireStore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


export const useFirebase = () => useContext(FirebaseContext);


export const FirebaseProvider = (props) => {
    const navigate = useNavigate();

    const SignupUserWithEmailandPassword  = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const user = userCredential.user;
            console.log("User created:", user);
            localStorage.setItem('userL', JSON.stringify(user));
            // setLogin(true);
            navigate("../home");
            // storeUserInFirestore(user);
            toast.success("User created successfully!");

            // Now that the user is created, wait for the user to be fully initialized
   
        } catch (error) {
            console.error("Error creating user:", error);
            // Handle error
        }
    };

    const handleResetPassword = (email) => {
        sendPasswordResetEmail(firebaseAuth, email) // Use sendPasswordResetEmail function
            .then(() => {
                toast.success('Password reset email sent. Check your inbox!');
            })
            .catch((error) => {
                toast.error(`Error sending password reset email: ${error.message}`);
            });
    };



  


    const SigninUserWithEmailandPassword = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed in:", user);
                // toast("User signed in successfully!");
                toast.success("User signed in successfully!", user);
                localStorage.setItem('userL', JSON.stringify(user));
                // setLogin(true);
                navigate("../home")
                // storeUserInFirestore(user);
            })
            .catch((error) => {
                console.log("Error signing in:", error);
                toast.error("Error signing in:", error);
            });
    };



    const singinWithGoogle = () => {
        signInWithPopup(firebaseAuth, googleProvider)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed in with Google:", user);
                navigate("../home")
                // storeUserInFirestore(user);
                toast.success("User signed in with Google successfully!", user);

                // Store user information in local storage
                localStorage.setItem('userL', JSON.stringify(user));
                // setLogin(true);

                // You may want to navigate to another page or perform additional actions here
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
                toast.error("Error signing in with Google: " + error.message);
            });
    };


    // console.log(user)



    
    return (
        <FirebaseContext.Provider value={{
            SignupUserWithEmailandPassword,
            handleResetPassword,
            SigninUserWithEmailandPassword,
            singinWithGoogle,
      



        }}>
            {props.children}
           
            <ToastContainer
                position="top-center"
            />

        </FirebaseContext.Provider>
    );

}

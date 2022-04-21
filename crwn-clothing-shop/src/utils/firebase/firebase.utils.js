// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAviep6ZeJSWizUS3FiFA3DGNF-f6ihFe8",
  authDomain: "crwn-clothing-db-78c43.firebaseapp.com",
  projectId: "crwn-clothing-db-78c43",
  storageBucket: "crwn-clothing-db-78c43.appspot.com",
  messagingSenderId: "739145397322",
  appId: "1:739145397322:web:fa41b456b2df0c0d4fa2b3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt : 'select_account',

});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = { displayName : 'mike' }) => {

    if(!userAuth) {
        return;
    }

    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

    try {
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
        });
    }
    catch(error) {
        console.log('error creating the user', error.message);
    }
}

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) {
        return;
    }
    return await createUserWithEmailAndPassword(auth, email, password);
}
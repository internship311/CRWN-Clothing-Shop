import { useEffect } from 'react';

import { getRedirectResult } from 'firebase/auth';

import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth } from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {

    const fetchDataFromFirebaseRedirect = async() => {
        const response = await getRedirectResult(auth);
        //console.log(response);
        if(response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }

    useEffect(() => {
        fetchDataFromFirebaseRedirect();
    }, [])

    const logGoogleUser = async () => {
        const { user } =  await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        //console.log(user);
    }

    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign In with Google Redirect</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;
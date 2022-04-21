import { useEffect } from 'react';

import { getRedirectResult } from 'firebase/auth';

import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth } from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';

const Authentication = () => {

    /* const fetchDataFromFirebaseRedirect = async() => {
        const response = await getRedirectResult(auth);
        //console.log(response);
        if(response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    } */

    /* useEffect(() => {
        fetchDataFromFirebaseRedirect();
    }, []) */

    return(
        <div className='authentication-container'>
            <SignInForm />
            {/* <button onClick={signInWithGoogleRedirect}>Sign In with Google Redirect</button> */}
            <SignUpForm />
        </div>
    )
}

export default Authentication;
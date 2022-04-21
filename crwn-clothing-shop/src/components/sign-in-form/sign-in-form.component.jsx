import { useState, useContext } from "react";

import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth, createAuthUserWithEmailAndPassword, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email : '',
    password : ''
}

const SignInForm = () => {
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    //console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } =  await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        //console.log(user);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        try{
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            //console.log(user);
            
            setCurrentUser(user);

            resetFormFields();
        }
        catch(error){
            switch(error.code) {
                case "auth/wrong-password" : 
                alert('incorrect password for email');
                break;

                case "auth/user-not-found" : 
                alert('no user associated with this email');
                break;
                
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name] : value});
    }

    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit= {handleSubmit}>
                <FormInput label= "Email" type="email" onChange={handleChange} name= "email" value={email} required/>
                <FormInput label= "Password" type="password" onChange={handleChange} name= "password" value={password} required/>
                <div className="buttons-container">
                    <Button>SIGN IN</Button>
                    <Button type= "button" buttonType="google" onClick= {signInWithGoogle}>GOOGLE SIGN IN</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
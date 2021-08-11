import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {


    const [{ }, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        }).catch((error) => alert(error.message));
    }


    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-img">
                    BONJOUR
                </div>
                <div className="login-text">
                    It's a Whats App clone
                </div>

                <Button onClick={signIn}>Sign in with Google</Button>
            </div>


        </div>
    )
}

export default Login;

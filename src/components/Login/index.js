import React, { Fragment, useState } from "react";
import { MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from "mdbreact";
import { createUser, signInUser } from '../../firebase/firebase.auth';
import { googleSignIn } from '../../firebase/firebase.sso';
import LoginF from "./LoginF";
import Register from "./Register";

const Login = ({ close, setUser, setIsLoading }) => {
    const [isLogin, setIsLogin] = useState(true);

    const successCallback = (user) => {
        setUser(user);
        setIsLoading(false);
        close();
    };

    const loginFn = (email, password) => {
        setIsLoading(true);
        signInUser(email, password, successCallback);
    };

    const GoogleLogIn = () =>{
        googleSignIn(successCallback);
    }

    const registerFn = (email, password, userDetails) => {
        setIsLoading(true);
        createUser(email, password, userDetails, successCallback);
    }

    return (
        <Fragment>
            <MDBModalHeader>{isLogin ? 'Login' : 'Register'}</MDBModalHeader>
            <MDBModalBody>
                {isLogin ?
                    <Fragment>
                        <LoginF gLogin = {GoogleLogIn} login={loginFn} />
                        <div className="text-center">
                            <MDBBtn color="elegant" className="btn-link" onClick={() => { setIsLogin(false) }}>Don't have an account? Sign up!</MDBBtn>
                        </div>
                    </Fragment>

                    :
                    <Fragment>
                        <Register register={registerFn} />
                        <div className="text-center">
                            <MDBBtn color="elegant" className="btn-link" onClick={() => { setIsLogin(true) }}>Already have an account? Sign in!</MDBBtn>
                        </div>
                    </Fragment>
                }

            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="elegant" outline onClick={close}>Close</MDBBtn>
            </MDBModalFooter>
        </Fragment>
    );
}

export default Login;
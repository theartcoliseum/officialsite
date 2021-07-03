import React, { Fragment, useState } from "react";
import { MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBInput } from "mdbreact";
import createUser from '../../firebase/firebase.common';

const Login = ({ signin, close, loginCallback }) => {
    const [isLogin, setIsLogin] = useState(true);

    const registerUser = () => {
        createUser("abc@gmail.com", "123451", successFn, errorFn);
    }

    const successFn = (user) => {
        console.log(user);
    }

    const errorFn = (error) => {
        console.log(error);
    }

    return (
        <Fragment>
            <MDBModalHeader>{isLogin ? 'Login' : 'Register'}</MDBModalHeader>
            <MDBModalBody>
                {isLogin ?
                    <form>
                        <div className="grey-text">
                            <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                                success="right" />
                            <MDBInput label="Type your password" icon="lock" group type="password" validate />
                        </div>
                        <div className="text-center">
                            <MDBBtn color="elegant" onClick={() => { signin(); close(); }}>Login</MDBBtn>
                            <MDBBtn color="elegant" type="reset">Reset</MDBBtn>
                        </div>
                        <div className="text-center">
                            <MDBBtn color="elegant" className="btn-link" onClick={() => { setIsLogin(false) }}>Don't have an account? Sign up!</MDBBtn>
                        </div>
                    </form>
                    :
                    <form>
                        <div className="grey-text">
                            <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
                                success="right" />
                            <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                                success="right" />
                            <MDBInput label="Your password" icon="lock" group type="password" validate />
                            <MDBInput label="Confirm your password" icon="exclamation-triangle" group type="password" validate
                                error="wrong" success="right" />
                        </div>
                        <div className="text-center">
                            <MDBBtn color="elegant" onClick={registerUser}>Register</MDBBtn>
                            <MDBBtn color="elegant" type="reset">Reset</MDBBtn>
                        </div>
                        <div className="text-center">
                            <MDBBtn color="elegant" className="btn-link" onClick={() => { setIsLogin(true) }}>Already have an account? Sign in!</MDBBtn>
                        </div>
                    </form>}

            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="elegant" outline onClick={close}>Close</MDBBtn>
            </MDBModalFooter>
        </Fragment>
    );
}

export default Login;
import React, { Fragment, useState, useContext } from "react";
import { MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from "mdbreact";
import { createUser, signInUser } from '../../firebase/firebase.auth';
import { googleSignIn , facebookSignIn, twitterSignIn , appleSignIn } from '../../firebase/firebase.sso';
import LoginF from "./LoginF";
import Register from "./Register";
import { EventContext } from '../../context/EventContext';

const Login = ({ close, setUser, setIsLoading }) => {
    const { events, setEvents } = useContext(EventContext);
    const [isLogin, setIsLogin] = useState(true);

    const successCallback = ({user, events}) => {
        setUser(user);
        updateEventsContext(events);
    };

    const updateEventsContext = (eventsGot) => {
        const eventsObj = {};
        eventsGot.forEach((i) => {
            eventsObj[i.label] = i.eventObj;
            if(i.extra) {
                eventsObj.parameters = i.extra;
            }
        });
        setEvents({...events, ...eventsObj});
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

    const FacebookLogIn = () =>{
        facebookSignIn(successCallback);
    }

    const AppleLogIn = () =>{
        appleSignIn();
    }

    const TwitterLogIn = () =>{
        twitterSignIn(successCallback);
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
                        <LoginF gLogin = {GoogleLogIn}
                         login={loginFn}
                         fLogin={FacebookLogIn}
                         aLogin={AppleLogIn}
                         tLogin={TwitterLogIn}
                        />
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
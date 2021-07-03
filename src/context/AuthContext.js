import React, { createContext, useState, useEffect } from "react";
import { signInUser } from '../firebase/firebase.auth';

const AuthContext = createContext();

function AuthContextCreator({ children }) {
    const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

function useProvideAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
    }, [user]);

    const signin = () => {
        signInUser("abcd@gmail.com", "123456",successFn)
    };

    const successFn = (user) =>{
        console.log(user);
        if(user.email) {
            setUser({ username: user.email, isLoggedIn: true});
        }
        
    }

    const signout = () => {
        setUser(null);
    };

    return {
        user,
        signin,
        signout
    };
}


export {
    AuthContext,
    AuthContextCreator
};
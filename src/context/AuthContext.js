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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    }, [user]);

    const signout = () => {
        setUser(null);
    };

    return {
        user,
        setUser,
        signout,
        isLoading,
        setIsLoading
    };
}


export {
    AuthContext,
    AuthContextCreator
};
import React, { createContext, useState, useEffect } from "react";

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
        setUser({ username: 'Suvechhya', isLoggedIn: true});
    };

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
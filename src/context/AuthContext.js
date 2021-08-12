import React, { createContext, useState } from "react";

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

    return {
        user,
        setUser,
        isLoading,
        setIsLoading
    };
}


export {
    AuthContext,
    AuthContextCreator
};
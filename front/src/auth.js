import React from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    return (
        <AuthContext.Provider
        value={{
            currentUser
        }}
        >
        {children}
        </AuthContext.Provider>
    );
};
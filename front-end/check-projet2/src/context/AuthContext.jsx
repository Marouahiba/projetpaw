import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        // Check for the token in cookies
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token); // If token exists, set to true
    }, []);
    const login = () => {
        setIsAuthenticated(true);

    }
    const logout = () => {
        localStorage.removeItem("token"); // Remove the token from cookies
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, logout, login }}>
            {children}
        </AuthContext.Provider>
    )
}

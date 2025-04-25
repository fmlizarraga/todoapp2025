import { useState } from 'react';
import { login as loginAPI, register as registerAPI, refreshToken } from "../api/auth";
import { UserResponseDTO } from '../types/api';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [user, setUser] = useState<UserResponseDTO | null>(null);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const { user, token } = await loginAPI({email, password});
            localStorage.setItem("token", token);
            setUser(user);
            setIsAuthenticated(true);
            setError(null);
        } catch (err) {
            setError("Error logging in");
            console.error(error);
        }
    };

    const register = async (username: string, email: string, password: string) => {
        try {
            const { user, token } = await registerAPI({username, email, password});
            localStorage.setItem("token", token);
            setUser(user);
            setIsAuthenticated(true);
            setError(null);
        } catch (err) {
            setError("Error registering");
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setIsRegistering(false);
        setUser(null);
        setError(null);
    };

    const toggleForm = () => setIsRegistering(prev => !prev);

    const checkAuth = async () => {
        try {
            const { user, token } = await refreshToken();
            localStorage.setItem("token", token);
            setUser(user);
            setIsAuthenticated(true);
            setError(null);
        } catch (err) {
            setError("Your session has expired");
            logout();
            console.error(error);
        }
    };

    return {
        isAuthenticated,
        isRegistering,
        user,
        error,
        setError,
        login,
        register,
        logout,
        toggleForm,
        checkAuth
    };
};

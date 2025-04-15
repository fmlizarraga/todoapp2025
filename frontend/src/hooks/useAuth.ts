import { useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const login = (email: string, password: string) => {
    console.log('Login with', email, password);
    setIsAuthenticated(true);
  };

  const register = (name: string, email: string, password: string) => {
    console.log('Register with', name, email, password);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsRegistering(false);
  };

  const toggleForm = () => setIsRegistering(prev => !prev);

  return {
    isAuthenticated,
    isRegistering,
    login,
    register,
    logout,
    toggleForm,
  };
};

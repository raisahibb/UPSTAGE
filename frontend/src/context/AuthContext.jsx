// Ye file Authentication Context provide karti hai.
// Iske through hum application ke kisi bhi hisse me user ki state access kar sakte hain.
// Ab ye real backend APIs se communicate karti hai.

import React, { createContext, useContext, useState, useEffect } from 'react';
import { signupUser, loginUser, fetchCurrentUser, saveToken, removeToken, getToken } from '../services/apiService';

// Context create kar rahe hain
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // App load hone par agar token localStorage mein hai toh user fetch karo
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          // Backend se current user ki info lo
          const data = await fetchCurrentUser();
          setUser(data.user);
          setIsAuthenticated(true);
        } catch (err) {
          // Token expired ya invalid hai — saaf kar do
          removeToken();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Real login function — backend se token aur user info milti hai
  const login = async (email, password) => {
    const data = await loginUser(email, password);
    saveToken(data.token);
    setUser(data.user);
    setIsAuthenticated(true);
    return data.user;
  };

  // Real signup function — backend account banata hai aur token return karta hai
  const signup = async (name, email, password) => {
    const data = await signupUser(name, email, password);
    saveToken(data.token);
    setUser(data.user);
    setIsAuthenticated(true);
    return data.user;
  };

  // Logout function — token hata do aur state reset karo
  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook context use karne ke liye
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

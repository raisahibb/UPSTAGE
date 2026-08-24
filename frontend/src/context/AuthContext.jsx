// Ye file Authentication Context provide karti hai.
// Iske through hum application ke kisi bhi hisse me user ki state access kar sakte hain.
// Abhi ke liye ye fake authentication handle kar rahi hai using localStorage.

import React, { createContext, useContext, useState, useEffect } from 'react';

// Context create kar rahe hain
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // App load hone par localStorage se user fetch karna
  useEffect(() => {
    const storedUser = localStorage.getItem('upstage_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Fake login function
  const login = async (email, password) => {
    // API Call simulation using promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Basic validation
        if (email && password) {
          let role = 'candidate';
          if (email.includes('admin') || email.toLowerCase() === 'sidhuc888@gmail.com') {
            role = 'admin';
          }
          
          const mockUser = {
            id: Date.now().toString(),
            name: email.split('@')[0], // Extracting name from email for mock
            email: email,
            role: role
          };
          
          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem('upstage_user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 800); // 800ms delay to simulate network request
    });
  };

  // Fake signup function
  const signup = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          let role = 'candidate';
          if (email.includes('admin') || email.toLowerCase() === 'sidhuc888@gmail.com') {
            role = 'admin';
          }
          const mockUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            role: role
          };
          
          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem('upstage_user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error("Invalid signup details"));
        }
      }, 800);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('upstage_user');
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

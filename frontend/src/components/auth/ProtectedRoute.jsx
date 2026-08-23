// Ye component un routes ko protect karta hai jinke liye login zaroori hai.
// Agar user logged in nahi hai, toh use login page par bhej diya jayega.

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Jab tak local storage se user state restore ho rahi hai, kuch dikhaane ki zaroorat nahi.
  if (isLoading) {
    return <div className="flex h-screen w-screen items-center justify-center">Loading...</div>;
  }

  // Agar user authenticated nahi hai toh login page par bhej do
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Agar specific role required hai (jaise admin) aur user ka role match nahi karta
  if (requiredRole && user?.role !== requiredRole) {
    // Unauthorized access ko handle kar ke wapas unke dashboard bhej do
    return <Navigate to="/dashboard" replace />;
  }

  // Sab theek hai toh child route render kar do
  return <Outlet />;
};

export default ProtectedRoute;

// Ye file UPSTAGE ki saari routing handle karti hai.
// Yaha par hum sabhi pages ko unke respective routes (URLs) se map kar rahe hain.

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages Import
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import DashboardPage from '../pages/candidate/DashboardPage';
import InterviewSetupPage from '../pages/candidate/InterviewSetupPage';
import InterviewPage from '../pages/candidate/InterviewPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import DesignPreviewPage from '../pages/public/DesignPreviewPage';

import ProtectedRoute from '../components/auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/design-system" element={<DesignPreviewPage />} />

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/interview/setup" element={<InterviewSetupPage />} />
        <Route path="/interview" element={<InterviewPage />} />
      </Route>

      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

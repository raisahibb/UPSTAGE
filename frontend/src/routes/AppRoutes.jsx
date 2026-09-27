// Ye file UPSTAGE ki saari routing handle karti hai.
// Yaha par hum sabhi pages ko unke respective routes (URLs) se map kar rahe hain.

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages Import
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import DashboardPage from '../pages/candidate/DashboardPage';
import HistoryPage from '../pages/candidate/HistoryPage';
import ProgressPage from '../pages/candidate/ProgressPage';
import InterviewSetupPage from '../pages/candidate/InterviewSetupPage';
import InterviewPage from '../pages/candidate/InterviewPage';
import InterviewDetailsPage from '../pages/candidate/InterviewDetailsPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import UsersPage from '../pages/admin/UsersPage';
import QuestionsPage from '../pages/admin/QuestionsPage';
import QuestionBankPage from '../pages/admin/QuestionBankPage';
// Removed DesignPreviewPage

import ProtectedRoute from '../components/auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      {/* Unused DesignPreviewPage Route Removed */}

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/interview/setup" element={<InterviewSetupPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/interviews/:interviewId" element={<InterviewDetailsPage />} />
      </Route>

      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/questions" element={<QuestionsPage />} />
        <Route path="/admin/question-bank" element={<QuestionBankPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

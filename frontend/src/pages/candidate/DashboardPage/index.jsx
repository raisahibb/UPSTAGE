// Ye file Candidate ka main dashboard hai.
// Yaha par user apni summary, recent interviews, aur progress dekh sakta hai.

import React from 'react';
import CandidateLayout from '../../../layouts/CandidateLayout';
import DashboardHeader from './components/DashboardHeader';
import StatsGrid from './components/StatsGrid';
import PerformanceChart from './components/PerformanceChart';
import AIInsight from './components/AIInsight';
import RecentInterviewsList from './components/RecentInterviewsList';

const DashboardPage = () => {
  return (
    <CandidateLayout>
      <DashboardHeader />
      <StatsGrid />
      
      {/* Main Dashboard Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Chart & Progress */}
        <div className="lg:col-span-2 space-y-6">
          <PerformanceChart />
          <AIInsight />
        </div>

        {/* Right Col: Recent Interviews List */}
        <RecentInterviewsList />
      </div>
    </CandidateLayout>
  );
};

export default DashboardPage;

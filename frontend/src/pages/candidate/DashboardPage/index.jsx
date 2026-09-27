import React, { useState, useEffect } from 'react';
import CandidateLayout from '../../../layouts/CandidateLayout';
import DashboardHeader from './components/DashboardHeader';
import StatsGrid from './components/StatsGrid';
import PerformanceChart from './components/PerformanceChart';
import RecentInterviewsList from './components/RecentInterviewsList';
import { getInterviews, fetchCurrentUser } from '../../../services/apiService';
import { Loader2 } from 'lucide-react';

const DashboardPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [userRes, interviewsRes] = await Promise.all([
        fetchCurrentUser(),
        getInterviews()
      ]);
      setUser(userRes.user);
      setInterviews(interviewsRes.interviews || []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError('Unable to load interview data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <CandidateLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 size={40} className="animate-spin text-[var(--color-primary)]" />
          <p className="text-gray-500 font-medium">Loading your interview data...</p>
        </div>
      </CandidateLayout>
    );
  }

  if (error) {
    return (
      <CandidateLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <p className="text-red-500 font-medium">{error}</p>
          <button onClick={loadData} className="text-[var(--color-primary)] hover:underline font-semibold px-4 py-2 bg-indigo-50 rounded-lg">
            Retry
          </button>
        </div>
      </CandidateLayout>
    );
  }

  return (
    <CandidateLayout>
      <DashboardHeader userName={user?.name || 'there'} />
      <StatsGrid interviews={interviews} />
      
      {/* Main Dashboard Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Chart & Progress */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <PerformanceChart interviews={interviews} />
        </div>

        {/* Right Col: Recent Interviews List */}
        <RecentInterviewsList interviews={interviews} />
      </div>
    </CandidateLayout>
  );
};

export default DashboardPage;

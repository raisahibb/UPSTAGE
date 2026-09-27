import React from 'react';
import Card from '../../../../components/common/Card';
import { CheckCircle, TrendingUp, Star } from 'lucide-react';

const StatsGrid = ({ interviews }) => {
  // Calculate completed interviews for the current month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const completedThisMonth = interviews.filter(inv => {
    if (inv.status !== 'completed') return false;
    const date = new Date(inv.completedAt || inv.createdAt);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  }).length;

  const evaluatedInterviews = interviews.filter(inv => inv.status === 'completed' && inv.evaluationStatus === 'evaluated' && inv.report && inv.report.overallScore > 0);

  let averageScore = 0;
  let bestScore = 0;

  if (evaluatedInterviews.length > 0) {
    const totalScore = evaluatedInterviews.reduce((acc, inv) => acc + (inv.report.overallScore || 0), 0);
    averageScore = (totalScore / evaluatedInterviews.length).toFixed(1);
    
    bestScore = Math.max(...evaluatedInterviews.map(inv => inv.report.overallScore || 0)).toFixed(1);
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
      <Card className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
          <span className="statTitle">Interviews Completed</span>
          <div className="primary-gradient-bg p-2 rounded-lg">
            <CheckCircle size={20} className="text-white" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mt-4">
          <span className="statNumber">{completedThisMonth}</span>
          <span className="text-sm text-[var(--color-secondary-text)]">this month</span>
        </div>
      </Card>

      <Card className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
          <span className="statTitle">Average Score</span>
          <div className="primary-gradient-bg p-2 rounded-lg">
            <TrendingUp size={20} className="text-white" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mt-4">
          {evaluatedInterviews.length > 0 ? (
            <>
              <span className="statNumber">{averageScore}</span>
              <span className="text-sm text-[var(--color-secondary-text)]">/ 10</span>
            </>
          ) : (
            <span className="text-sm font-semibold text-gray-400 italic">Not evaluated yet</span>
          )}
        </div>
      </Card>

      <Card className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">Best Score</span>
          <div className="primary-gradient-bg p-2 rounded-lg">
            <Star size={20} className="text-white" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mt-4">
          {evaluatedInterviews.length > 0 ? (
            <>
              <span className="statNumber">{bestScore}</span>
              <span className="text-sm text-[var(--color-secondary-text)]">/ 10</span>
            </>
          ) : (
            <span className="text-sm font-semibold text-gray-400 italic">Not evaluated yet</span>
          )}
        </div>
      </Card>

    </section>
  );
};

export default StatsGrid;

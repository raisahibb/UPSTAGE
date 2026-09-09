import React from 'react';
import Card from '../../../../components/common/Card';
import { CheckCircle, TrendingUp, Star } from 'lucide-react';

const StatsGrid = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
      <Card className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
          <span className="statTitle">Interviews Completed</span>
          <div className="primary-gradient-bg p-2 rounded-lg">
            <CheckCircle size={20} className="text-white" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="statNumber">12</span>
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
        <div className="flex items-baseline gap-2">
          <span className="statNumber">84<span className="text-xl">%</span></span>
          <span className="text-sm text-green-800 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +5%
          </span>
        </div>
      </Card>

      <Card className="flex flex-col justify-between h-full hover:border-[var(--color-primary-light)] transition-colors cursor-pointer group">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">Best Score</span>
          <div className="primary-gradient-bg p-2 rounded-lg">
            <Star size={20} className="text-white" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-[var(--color-primary)]">96<span className="text-xl">%</span></span>
          <span className="text-sm text-[var(--color-secondary-text)]">System Design</span>
        </div>
      </Card>

    </section>
  );
};

export default StatsGrid;

import React from 'react';
import Card from '../../../../components/common/Card';

const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <div className="flex justify-between items-start mb-4">
          <h3 className="statTitle">Total Users</h3>
          <div className="p-1 bg-green-50 text-green-700 rounded-full flex items-center gap-1 text-xs font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +12%
          </div>
        </div>
        <div className="statNumber">14,231</div>
        <p className="text-xs text-[var(--color-secondary-text)] mt-1">Active this month</p>
      </Card>

      <Card>
        <div className="flex justify-between items-start mb-4">
          <h3 className="statTitle">Total Interviews</h3>
          <div className="p-1 bg-green-50 text-green-700 rounded-full flex items-center gap-1 text-xs font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +5%
          </div>
        </div>
        <div className="statNumber">8,405</div>
        <p className="text-xs text-[var(--color-secondary-text)] mt-1">Completed across all domains</p>
      </Card>

      <Card>
        <div className="flex justify-between items-start mb-4">
          <h3 className="statTitle">Avg Overall Score</h3>
          <div className="p-1 bg-red-50 text-red-700 rounded-full flex items-center gap-1 text-xs font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
            </svg>
            -1.2%
          </div>
        </div>
        <div className="statNumber">76.4</div>
        <p className="text-xs text-[var(--color-secondary-text)] mt-1">Out of 100 benchmark</p>
      </Card>
    </div>
  );
};

export default QuickStats;

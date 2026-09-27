import React from 'react';
import Card from '../../../../components/common/Card';

const QuickStats = ({ data }) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <div className="flex justify-between items-start mb-4">
          <h3 className="statTitle">Total Users</h3>
        </div>
        <div className="statNumber">{data.users.total}</div>
        <p className="text-xs text-[var(--color-secondary-text)] mt-1">{data.users.newInPeriod} joined last 30 days</p>
      </Card>

      <Card>
        <div className="flex justify-between items-start mb-4">
          <h3 className="statTitle">Total Interviews</h3>
        </div>
        <div className="statNumber">{data.interviews.total}</div>
        <p className="text-xs text-[var(--color-secondary-text)] mt-1">{data.interviews.completed} completed ({data.completionRate}% completion)</p>
      </Card>

      <Card>
        <div className="flex justify-between items-start mb-4">
          <h3 className="statTitle">Avg Overall Score</h3>
        </div>
        <div className="statNumber">
          {data.interviews.evaluated > 0 ? data.scores.average : <span className="text-xl font-normal text-gray-400 italic">Not evaluated yet</span>}
        </div>
        <p className="text-xs text-[var(--color-secondary-text)] mt-1">Based on {data.interviews.evaluated} evaluated interviews</p>
      </Card>
    </div>
  );
};

export default QuickStats;

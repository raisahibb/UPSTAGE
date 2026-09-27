import React from 'react';
import Card from '../../../../components/common/Card';

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown Date';
  const date = new Date(dateString);
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', dateOptions);
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'completed': return 'bg-green-50 text-green-700 border-green-200';
    case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'scheduled': return 'bg-amber-50 text-amber-700 border-amber-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export default function InterviewSummary({ interview }) {
  if (!interview) return null;
  return (
    <Card className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-[var(--color-border)] pb-4">
        <div>
          <h2 className="dashBadaTitle mb-1">{interview.domain}</h2>
          <p className="text-[var(--color-secondary-text)] font-medium">Interview Summary</p>
        </div>
        <span className={`mt-3 md:mt-0 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${getStatusBadge(interview.status)}`}>
          {interview.status}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-[var(--color-secondary-text)] font-medium mb-1">Date</p>
          <p className="font-semibold text-[var(--color-primary-text)]">{formatDate(interview.startedAt || interview.createdAt)}</p>
        </div>
        <div>
          <p className="text-sm text-[var(--color-secondary-text)] font-medium mb-1">Difficulty</p>
          <p className="font-semibold text-[var(--color-primary-text)]">{interview.difficulty}</p>
        </div>
        <div>
          <p className="text-sm text-[var(--color-secondary-text)] font-medium mb-1">Duration</p>
          <p className="font-semibold text-[var(--color-primary-text)]">{interview.duration} min</p>
        </div>
        <div>
          <p className="text-sm text-[var(--color-secondary-text)] font-medium mb-1">Evaluation</p>
          <p className="font-semibold text-[var(--color-primary-text)] capitalize">{interview.evaluationStatus?.replace('_', ' ') || 'Pending'}</p>
        </div>
      </div>
    </Card>
  );
}

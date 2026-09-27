import React from 'react';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown Date';
  const date = new Date(dateString);
  const now = new Date();
  
  const isToday = date.getDate() === now.getDate() && 
                  date.getMonth() === now.getMonth() && 
                  date.getFullYear() === now.getFullYear();
                  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.getDate() === yesterday.getDate() && 
                      date.getMonth() === yesterday.getMonth() && 
                      date.getFullYear() === yesterday.getFullYear();

  const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
  const timeString = date.toLocaleTimeString('en-US', timeOptions);

  if (isToday) return `Today, ${timeString}`;
  if (isYesterday) return `Yesterday, ${timeString}`;
  
  const dateOptions = { month: 'short', day: 'numeric' };
  return `${date.toLocaleDateString('en-US', dateOptions)}, ${timeString}`;
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'in-progress':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'scheduled':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const formatStatus = (status) => {
  if (!status) return 'Unknown';
  if (status === 'in-progress') return 'In Progress';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const RecentInterviewsList = ({ interviews }) => {
  const navigate = useNavigate();

  // Sort by startedAt or createdAt descending
  const sortedInterviews = [...interviews].sort((a, b) => {
    const dateA = new Date(a.startedAt || a.createdAt);
    const dateB = new Date(b.startedAt || b.createdAt);
    return dateB - dateA;
  });

  return (
    <div className="lg:col-span-1 tableDabba flex flex-col min-h-[400px]">
      <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-background)] rounded-t-xl shrink-0">
        <h2 className="tableTitle">Recent Interviews</h2>
        {sortedInterviews.length > 0 && (
          <button 
            onClick={() => navigate('/history')}
            className="text-[var(--color-primary)] hover:bg-[var(--color-surface)] p-2 rounded transition-colors text-sm font-semibold"
          >
            View All
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {sortedInterviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
            <p className="text-gray-500 mb-4 font-medium">No interviews yet.</p>
            <button 
              onClick={() => navigate('/interview/setup')}
              className="text-sm font-semibold text-white bg-[var(--color-primary)] px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Start New Interview
            </button>
          </div>
        ) : (
          sortedInterviews.map((interview) => (
            <div 
              key={interview._id} 
              onClick={() => navigate(`/interviews/${interview._id}`)}
              className="group border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-primary-light)] hover:bg-[var(--color-background)] transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2 gap-2">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[var(--color-primary-text)] group-hover:text-[var(--color-primary)] transition-colors truncate">
                    {interview.domain || 'Interview'}
                  </h3>
                  <span className="text-xs text-[var(--color-secondary-text)] font-medium">
                    {formatDate(interview.startedAt || interview.createdAt)}
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full border uppercase tracking-wider shrink-0 ${getStatusBadge(interview.status)}`}>
                  {formatStatus(interview.status)}
                </span>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap items-center">
                <span className="bg-[var(--color-background)] text-[var(--color-secondary-text)] text-xs font-semibold px-2 py-1 rounded">
                  {interview.difficulty || 'Medium'}
                </span>
                <span className="bg-[var(--color-background)] text-[var(--color-secondary-text)] text-xs font-semibold px-2 py-1 rounded">
                  {interview.duration ? `${interview.duration} min` : 'N/A'}
                </span>
                {interview.status === 'completed' && interview.evaluationStatus === 'evaluated' && interview.report?.overallScore > 0 ? (
                  <span className="ml-auto text-[10px] font-bold text-[var(--color-primary)] bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                    {interview.report.overallScore.toFixed(1)}/10
                  </span>
                ) : interview.status === 'completed' && (interview.evaluationStatus === 'pending' || interview.evaluationStatus === 'evaluating') ? (
                  <span className="ml-auto text-[10px] font-bold text-amber-500 italic px-2 py-1">
                    Pending
                  </span>
                ) : interview.status === 'completed' ? (
                  <span className="ml-auto text-[10px] font-bold text-gray-400 italic px-2 py-1">
                    Not evaluated
                  </span>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentInterviewsList;

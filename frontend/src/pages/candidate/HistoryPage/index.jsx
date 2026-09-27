import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CandidateLayout from '../../../layouts/CandidateLayout';
import { getInterviews } from '../../../services/apiService';
import { Loader2 } from 'lucide-react';
import Card from '../../../components/common/Card';

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown Date';
  const date = new Date(dateString);
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
  return `${date.toLocaleDateString('en-US', dateOptions)}, ${date.toLocaleTimeString('en-US', timeOptions)}`;
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

const HistoryPage = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getInterviews();
      setInterviews(res.interviews || []);
    } catch (err) {
      console.error("History fetch error:", err);
      setError('Unable to load interview history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredInterviews = interviews.filter((interview) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return interview.status === 'completed';
    if (filter === 'In Progress') return interview.status === 'in-progress';
    return true;
  });

  const sortedInterviews = [...filteredInterviews].sort((a, b) => {
    const dateA = new Date(a.startedAt || a.createdAt);
    const dateB = new Date(b.startedAt || b.createdAt);
    return dateB - dateA;
  });

  return (
    <CandidateLayout>
      <div className="mb-8">
        <h1 className="dashBadaTitle mb-2">Interview History</h1>
        <p className="dashChhotaText">Review your past interviews and track your progress.</p>
      </div>

      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex bg-[var(--color-background)] rounded-lg p-1 border border-[var(--color-border)]">
            {['All', 'Completed', 'In Progress'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                  filter === f
                    ? 'bg-white text-[var(--color-primary)] shadow-sm'
                    : 'text-[var(--color-secondary-text)] hover:text-[var(--color-primary-text)]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 size={32} className="animate-spin text-[var(--color-primary)]" />
            <p className="text-gray-500 font-medium">Loading history...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <p className="text-red-500 font-medium">{error}</p>
            <button onClick={loadData} className="text-[var(--color-primary)] hover:underline font-semibold px-4 py-2 bg-indigo-50 rounded-lg">
              Retry
            </button>
          </div>
        ) : sortedInterviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-[var(--color-secondary-text)] font-medium">No interviews found for this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedInterviews.map((interview) => (
              <div 
                key={interview._id} 
                onClick={() => navigate(`/interviews/${interview._id}`)}
                className="cursor-pointer border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-primary-light)] hover:shadow-sm transition-all bg-[var(--color-background)]"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-[var(--color-primary-text)] line-clamp-1 flex-1 pr-2">
                    {interview.domain || 'Interview'}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full border uppercase tracking-wider shrink-0 ${getStatusBadge(interview.status)}`}>
                    {formatStatus(interview.status)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-[var(--color-secondary-text)]">
                    <span className="font-medium">Date:</span> {formatDate(interview.startedAt || interview.createdAt)}
                  </p>
                  <p className="text-sm text-[var(--color-secondary-text)]">
                    <span className="font-medium">Difficulty:</span> {interview.difficulty || 'Medium'}
                  </p>
                  <p className="text-sm text-[var(--color-secondary-text)]">
                    <span className="font-medium">Duration:</span> {interview.duration ? `${interview.duration} min` : 'N/A'}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-[var(--color-border)] flex justify-between items-center">
                  <span className="text-sm font-semibold text-[var(--color-primary-text)]">Score</span>
                  {interview.status === 'completed' && interview.evaluationStatus === 'evaluated' && interview.report?.overallScore > 0 ? (
                    <span className="text-sm font-bold text-[var(--color-primary)] bg-indigo-50 px-2 py-1 rounded">
                      {interview.report.overallScore.toFixed(1)}/10
                    </span>
                  ) : interview.evaluationStatus === 'pending' || interview.evaluationStatus === 'evaluating' ? (
                    <span className="text-sm font-semibold text-amber-500 italic">Pending</span>
                  ) : (
                    <span className="text-sm font-semibold text-gray-400 italic">Not evaluated</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </CandidateLayout>
  );
};

export default HistoryPage;

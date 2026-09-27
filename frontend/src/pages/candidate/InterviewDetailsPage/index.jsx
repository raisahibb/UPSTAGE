import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CandidateLayout from '../../../layouts/CandidateLayout';
import { getFullInterviewDetails } from '../../../services/apiService';
import { Loader2, ArrowLeft } from 'lucide-react';
import InterviewSummary from './components/InterviewSummary';
import PerformanceReport from './components/PerformanceReport';
import QuestionReview from './components/QuestionReview';

export default function InterviewDetailsPage() {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getFullInterviewDetails(interviewId);
      setData(response.data);
    } catch (err) {
      console.error(err);
      if (err.message.includes('403') || err.message.includes('Unauthorized')) {
        setError('You do not have access to this interview.');
      } else if (err.message.includes('404') || err.message.includes('not found')) {
        setError('Interview not found.');
      } else {
        setError('Unable to load interview details. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [interviewId]);

  if (loading) {
    return (
      <CandidateLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 size={40} className="animate-spin text-[var(--color-primary)]" />
          <p className="text-gray-500 font-medium">Loading interview details...</p>
        </div>
      </CandidateLayout>
    );
  }

  if (error) {
    return (
      <CandidateLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <p className="text-red-500 font-medium">{error}</p>
          <div className="flex gap-4 mt-2">
            <button onClick={() => navigate('/history')} className="text-gray-600 hover:underline font-semibold px-4 py-2 border rounded-lg">
              Back to History
            </button>
            <button onClick={loadData} className="text-[var(--color-primary)] hover:underline font-semibold px-4 py-2 bg-indigo-50 rounded-lg">
              Retry
            </button>
          </div>
        </div>
      </CandidateLayout>
    );
  }

  if (!data) return null;

  return (
    <CandidateLayout>
      <div className="mb-6">
        <button 
          onClick={() => navigate('/history')}
          className="flex items-center gap-2 text-sm font-semibold text-[var(--color-secondary-text)] hover:text-[var(--color-primary)] transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to History
        </button>
        <h1 className="text-2xl font-bold text-[var(--color-primary-text)]">Interview Review</h1>
      </div>

      <InterviewSummary interview={data.interview} />

      {/* Question Source badge — informational only */}
      {data.interview?.questionSource && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">Questions from:</span>
          {data.interview.questionSource === 'ai' && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
              🤖 AI Generated
            </span>
          )}
          {data.interview.questionSource === 'fallback' && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              📚 UPSTAGE Question Bank
            </span>
          )}
          {data.interview.questionSource === 'mixed' && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
              🔀 Mixed Sources
            </span>
          )}
        </div>
      )}

      <PerformanceReport report={data.report} evaluationStatus={data.interview.evaluationStatus} />
      <QuestionReview questions={data.questions} />
    </CandidateLayout>
  );
}

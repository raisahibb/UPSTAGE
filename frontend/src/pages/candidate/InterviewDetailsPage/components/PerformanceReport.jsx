import React from 'react';
import Card from '../../../../components/common/Card';
import ScoreBreakdown from './ScoreBreakdown';
import StrengthsWeaknesses from './StrengthsWeaknesses';
import ImprovementSuggestions from './ImprovementSuggestions';

export default function PerformanceReport({ report, evaluationStatus }) {
  if (evaluationStatus === 'evaluating') {
    return (
      <Card className="mb-8 border-indigo-100 bg-indigo-50/20">
        <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <h3 className="text-lg font-semibold text-indigo-900">Evaluating your performance...</h3>
          <p className="text-sm text-indigo-700">Please check back in a few moments.</p>
        </div>
      </Card>
    );
  }

  if (!report || evaluationStatus === 'not_evaluated' || evaluationStatus === 'pending') {
    return (
      <Card className="mb-8 bg-gray-50/50">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Evaluation not available yet</h3>
          <p className="text-sm text-gray-500">This interview has not been evaluated yet.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <div className="flex justify-between items-center mb-6 border-b border-[var(--color-border)] pb-4">
        <h2 className="dashBadaTitle text-xl">Performance Report</h2>
        {report.status === 'partial' && (
          <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-800 rounded uppercase tracking-wider">Partial Evaluation</span>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side: Overall Score */}
        <div className="lg:w-1/3 flex flex-col items-center justify-center bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
          <p className="text-indigo-900 font-semibold mb-2 text-center">Overall Score</p>
          <div className="text-5xl font-black text-indigo-600 mb-2">
            {report.overallScore ? report.overallScore.toFixed(1) : '0'}<span className="text-2xl text-indigo-400">/10</span>
          </div>
          <p className="text-xs text-indigo-700/80 font-medium text-center">
            Based on {report.evaluatedQuestions}/{report.totalQuestions} evaluated responses
          </p>
        </div>
        
        {/* Right side: Breakdown */}
        <div className="lg:w-2/3">
          <h3 className="text-sm font-semibold text-[var(--color-primary-text)] mb-3">Score Breakdown</h3>
          <ScoreBreakdown report={report} />
        </div>
      </div>

      <StrengthsWeaknesses strengths={report.strengths} weaknesses={report.weaknesses} />
      <ImprovementSuggestions suggestions={report.improvementSuggestions} />
    </Card>
  );
}

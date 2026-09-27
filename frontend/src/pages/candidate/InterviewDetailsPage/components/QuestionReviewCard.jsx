import React from 'react';

export default function QuestionReviewCard({ q, index }) {
  const isEvaluated = q.evaluation && q.evaluation.status === 'evaluated';
  const isFailed = q.evaluation && q.evaluation.status === 'failed';
  const isSkipped = q.evaluation && q.evaluation.status === 'skipped';
  const isPending = q.evaluation && q.evaluation.status === 'pending';
  
  return (
    <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-background)] overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50/50 border-b border-[var(--color-border)] p-5 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <span className="text-xs font-bold text-[var(--color-primary)] mb-1 block uppercase tracking-wider">Question {index + 1}</span>
          <h3 className="font-semibold text-[var(--color-primary-text)] text-sm sm:text-base leading-relaxed">{q.questionText}</h3>
        </div>
        {isEvaluated && (
          <div className="bg-indigo-100 text-indigo-800 font-bold px-3 py-1.5 rounded text-sm shrink-0 flex items-center shadow-sm">
            {q.evaluation.overallScore ? q.evaluation.overallScore.toFixed(1) : '0'}/10
          </div>
        )}
      </div>

      {/* Answer Area */}
      <div className="p-5 border-b border-[var(--color-border)]">
        <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Your Answer</h4>
        {q.answerText ? (
          <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed bg-white border border-gray-100 rounded-lg p-4 shadow-sm">{q.answerText}</p>
        ) : (
          <p className="text-sm text-gray-400 italic bg-gray-50 border border-gray-100 rounded-lg p-4">No answer submitted.</p>
        )}
      </div>

      {/* Evaluation Area */}
      <div className="p-5 bg-gray-50/30">
        <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Evaluation</h4>
        
        {!q.answerText ? (
          <p className="text-sm text-gray-500 italic">Skipped</p>
        ) : isPending ? (
          <p className="text-sm text-amber-600 font-medium">Evaluation pending</p>
        ) : isFailed ? (
          <p className="text-sm text-red-500 font-medium">Evaluation unavailable</p>
        ) : isSkipped ? (
          <p className="text-sm text-gray-500 italic">Skipped</p>
        ) : isEvaluated ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex flex-col"><span className="text-xs text-gray-500 mb-1">Relevance</span> <span className="font-bold text-gray-800">{q.evaluation.relevance}/10</span></div>
              <div className="flex flex-col"><span className="text-xs text-gray-500 mb-1">Depth</span> <span className="font-bold text-gray-800">{q.evaluation.depth}/10</span></div>
              <div className="flex flex-col"><span className="text-xs text-gray-500 mb-1">Clarity</span> <span className="font-bold text-gray-800">{q.evaluation.clarity}/10</span></div>
              <div className="flex flex-col"><span className="text-xs text-gray-500 mb-1">Technical</span> <span className="font-bold text-gray-800">{q.evaluation.technicalAccuracy}/10</span></div>
            </div>
            
            {q.evaluation.feedback && (
              <div>
                <span className="text-xs font-semibold text-[var(--color-primary)] block mb-2 uppercase tracking-wider">AI Feedback</span>
                <p className="text-sm text-gray-700 bg-white border border-gray-100 rounded-lg p-4 shadow-sm leading-relaxed">{q.evaluation.feedback}</p>
              </div>
            )}
            
            {(q.evaluation.strengths?.length > 0 || q.evaluation.weaknesses?.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {q.evaluation.strengths?.length > 0 && (
                  <div className="bg-green-50/50 border border-green-100 rounded-lg p-4">
                    <span className="text-xs font-semibold text-green-700 block mb-2 uppercase tracking-wider">Strengths</span>
                    <ul className="text-sm text-green-800 list-disc pl-4 space-y-1">
                      {q.evaluation.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
                {q.evaluation.weaknesses?.length > 0 && (
                  <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-4">
                    <span className="text-xs font-semibold text-amber-700 block mb-2 uppercase tracking-wider">Weaknesses</span>
                    <ul className="text-sm text-amber-800 list-disc pl-4 space-y-1">
                      {q.evaluation.weaknesses.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No evaluation data.</p>
        )}
      </div>
    </div>
  );
}

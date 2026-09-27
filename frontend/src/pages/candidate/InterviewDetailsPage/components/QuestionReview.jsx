import React from 'react';
import Card from '../../../../components/common/Card';
import QuestionReviewCard from './QuestionReviewCard';

export default function QuestionReview({ questions }) {
  if (!questions || questions.length === 0) return null;
  return (
    <Card>
      <h2 className="dashBadaTitle text-xl mb-6 border-b border-[var(--color-border)] pb-4">Question Review</h2>
      <div className="space-y-6">
        {questions.map((q, index) => (
          <QuestionReviewCard key={q.questionId} q={q} index={index} />
        ))}
      </div>
    </Card>
  );
}

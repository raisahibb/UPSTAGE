import React from 'react';
import { Lightbulb } from 'lucide-react';

const AIInsight = () => {
  return (
    <div className="bg-[#f5f3ff] border border-[var(--color-primary-light)] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb size={20} className="text-[var(--color-primary)]" />
        <h3 className="text-sm font-semibold text-[var(--color-primary)]">AI Insight</h3>
      </div>
      <p className="text-base text-[var(--color-primary-text)]">
        Your communication clarity has improved significantly over the last 3 sessions. Focus on elaborating edge cases in technical questions to boost your overall score.
      </p>
    </div>
  );
};

export default AIInsight;

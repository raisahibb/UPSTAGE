import React from 'react';

export default function ScoreBreakdown({ report }) {
  if (!report) return null;
  const metrics = [
    { label: 'Relevance', score: report.averageRelevance },
    { label: 'Depth', score: report.averageDepth },
    { label: 'Clarity', score: report.averageClarity },
    { label: 'Technical', score: report.averageTechnicalAccuracy }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((m, i) => (
        <div key={i} className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 flex flex-col justify-between">
          <p className="text-sm text-[var(--color-secondary-text)] mb-1 font-medium">{m.label}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="font-bold text-lg text-[var(--color-primary-text)]">{m.score ? m.score.toFixed(1) : '0'}/10</span>
          </div>
        </div>
      ))}
    </div>
  );
}

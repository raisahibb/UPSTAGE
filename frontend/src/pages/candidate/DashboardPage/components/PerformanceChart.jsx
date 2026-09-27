import React from 'react';
import Card from '../../../../components/common/Card';

const PerformanceChart = ({ interviews }) => {
  const evaluatedInterviews = (interviews || [])
    .filter(inv => inv.status === 'completed' && inv.evaluationStatus === 'evaluated' && inv.report)
    .sort((a, b) => new Date(a.completedAt || a.createdAt) - new Date(b.completedAt || b.createdAt));

  return (
    <Card className="h-full flex flex-col min-h-[300px]">
      <h2 className="tableTitle mb-6">Performance Trend</h2>
      <div className="flex-1 w-full bg-[var(--color-background)] rounded border border-dashed border-[var(--color-border)] flex flex-col items-center justify-center p-6 text-center">
        {evaluatedInterviews.length < 2 ? (
          <>
            <p className="text-[var(--color-primary-text)] font-semibold mb-2">Complete more interviews</p>
            <p className="text-[var(--color-secondary-text)] text-sm max-w-sm">
              Complete at least 2 evaluated interviews to see your performance trend here.
            </p>
          </>
        ) : (
          <div className="w-full h-full flex items-end justify-around gap-2 px-4 pb-4 pt-10 relative">
            {/* Simple CSS Bar Chart for trend */}
            {evaluatedInterviews.slice(-10).map((inv, idx) => {
              const score = inv.report.overallScore || 0;
              const heightPct = Math.max((score / 10) * 100, 5);
              const date = new Date(inv.completedAt || inv.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
              return (
                <div key={inv._id} className="flex flex-col items-center flex-1 group">
                  <div className="text-xs font-bold text-[var(--color-primary)] mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {score.toFixed(1)}
                  </div>
                  <div className="w-full max-w-[40px] bg-indigo-100 rounded-t-sm relative group-hover:bg-indigo-200 transition-colors" style={{ height: '200px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-[var(--color-primary)] rounded-t-sm transition-all"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-[var(--color-secondary-text)] mt-2 truncate w-full text-center">
                    {date}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PerformanceChart;

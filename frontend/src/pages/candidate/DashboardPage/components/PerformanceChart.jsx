import React from 'react';
import Card from '../../../../components/common/Card';

const PerformanceChart = () => {
  return (
    <Card>
      <h2 className="tableTitle mb-6">Performance Trend</h2>
      <div className="h-[250px] w-full bg-[var(--color-background)] rounded border border-[var(--color-border)] flex items-center justify-center">
        <span className="text-[var(--color-secondary-text)] text-sm italic">Chart visualization will appear here</span>
      </div>
    </Card>
  );
};

export default PerformanceChart;

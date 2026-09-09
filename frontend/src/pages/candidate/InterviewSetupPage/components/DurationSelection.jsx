import React from 'react';
import Card from '../../../../components/common/Card';
import { Clock } from 'lucide-react';

const DurationSelection = ({ durations, selectedDuration, setSelectedDuration, setError }) => {
  return (
    <Card className="formBox">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={20} className="text-[var(--color-primary)]" />
        <h2 className="font-heading text-lg font-bold text-[var(--color-primary)]">Interview Duration</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {durations.map(dur => (
          <button
            key={dur}
            onClick={() => { setSelectedDuration(dur); setError(""); }}
            className={`text-sm font-medium border rounded-lg px-5 py-2.5 transition-all ${
              selectedDuration === dur 
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-md'
                : 'border-[var(--color-border)] text-[var(--color-secondary-text)] hover:border-[var(--color-primary-light)]'
            }`}
          >
            {dur}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default DurationSelection;

import React from 'react';
import Card from '../../../../components/common/Card';
import { Settings } from 'lucide-react';

const DifficultySelection = ({ difficulties, selectedDifficulty, setSelectedDifficulty, setError }) => {
  return (
    <Card className="formBox">
      <div className="flex items-center gap-2 mb-4">
        <Settings size={20} className="text-[var(--color-primary)]" />
        <h2 className="font-heading text-lg font-bold text-[var(--color-primary)]">Difficulty Level</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {difficulties.map(diff => (
          <button
            key={diff}
            onClick={() => { setSelectedDifficulty(diff); setError(""); }}
            className={`text-sm font-medium border rounded-full px-6 py-2 transition-all ${
              selectedDifficulty === diff 
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-md'
                : 'border-[var(--color-border)] text-[var(--color-secondary-text)] hover:bg-[var(--color-background)]'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default DifficultySelection;

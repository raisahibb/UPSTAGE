import React from 'react';
import Card from '../../../../components/common/Card';
import { Target } from 'lucide-react';

const DomainSelection = ({ domains, selectedDomain, setSelectedDomain, setError }) => {
  return (
    <Card className="formBox">
      <div className="flex items-center gap-2 mb-4">
        <Target size={20} className="text-[var(--color-primary)]" />
        <h2 className="font-heading text-lg font-bold text-[var(--color-primary)]">Select Domain</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {domains.map(domain => (
          <button
            key={domain}
            onClick={() => { setSelectedDomain(domain); setError(""); }}
            className={`text-sm font-medium border rounded-lg p-3 text-left transition-all ${
              selectedDomain === domain 
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-md'
                : 'border-[var(--color-border)] text-[var(--color-secondary-text)] hover:border-[var(--color-primary-light)]'
            }`}
          >
            {domain}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default DomainSelection;

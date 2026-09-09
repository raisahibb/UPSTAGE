import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SetupHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-6">
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-[var(--color-secondary-text)] hover:text-[var(--color-primary)] transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium text-sm">Back to Dashboard</span>
      </button>
    </div>
  );
};

export default SetupHeader;

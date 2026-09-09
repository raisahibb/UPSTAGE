import React from 'react';
import Card from '../../../../components/common/Card';
import Button from '../../../../components/common/Button';
import { PlayCircle } from 'lucide-react';

const SetupSummary = ({ selectedDomain, selectedDifficulty, selectedDuration, resumeName, handleStartInterview }) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <Card className="summaryBox border-2 border-[var(--color-primary-light)] shadow-sm">
          <h2 className="font-heading text-xl font-bold text-[var(--color-primary)] mb-6 border-b border-[var(--color-border)] pb-4">
            Interview Summary
          </h2>
          
          <div className="space-y-5 mb-8">
            <div>
              <span className="block text-xs font-semibold text-[var(--color-secondary-text)] uppercase tracking-wider mb-1">Domain</span>
              <span className="text-sm font-medium text-[var(--color-primary-text)]">
                {selectedDomain || <span className="text-gray-400 italic">Not selected</span>}
              </span>
            </div>
            
            <div>
              <span className="block text-xs font-semibold text-[var(--color-secondary-text)] uppercase tracking-wider mb-1">Difficulty</span>
              <span className="text-sm font-medium text-[var(--color-primary-text)]">
                {selectedDifficulty || <span className="text-gray-400 italic">Not selected</span>}
              </span>
            </div>
            
            <div>
              <span className="block text-xs font-semibold text-[var(--color-secondary-text)] uppercase tracking-wider mb-1">Duration</span>
              <span className="text-sm font-medium text-[var(--color-primary-text)]">
                {selectedDuration || <span className="text-gray-400 italic">Not selected</span>}
              </span>
            </div>

            <div>
              <span className="block text-xs font-semibold text-[var(--color-secondary-text)] uppercase tracking-wider mb-1">Resume Context</span>
              <span className="text-sm font-medium text-[var(--color-primary-text)]">
                {resumeName ? "Uploaded" : <span className="text-gray-400 italic">None</span>}
              </span>
            </div>
          </div>

          <div className="btnBox pt-4 border-t border-[var(--color-border)]">
            <Button 
              variant="primary" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleStartInterview}
              disabled={!selectedDomain || !selectedDifficulty || !selectedDuration}
            >
              <PlayCircle size={20} />
              Start Interview
            </Button>
            {(!selectedDomain || !selectedDifficulty || !selectedDuration) && (
              <p className="text-xs text-center text-[var(--color-secondary-text)] mt-3">
                Please complete all required selections to start.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SetupSummary;

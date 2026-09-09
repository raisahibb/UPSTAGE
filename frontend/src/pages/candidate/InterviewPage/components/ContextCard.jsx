import React from 'react';
import Card from '../../../../components/common/Card';

const ContextCard = ({ config }) => {
  return (
    <Card className="p-4 bg-white border border-[var(--color-border)] shadow-sm flex-none">
      <div className="flex justify-between items-center text-sm">
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-wider text-[var(--color-secondary-text)] font-semibold mb-0.5">Difficulty</span>
          <span className="font-semibold text-[var(--color-primary-text)]">{config.difficulty || 'Medium'}</span>
        </div>
        <div className="w-px h-8 bg-[var(--color-border)]"></div>
        <div className="flex flex-col text-right">
          <span className="text-[11px] uppercase tracking-wider text-[var(--color-secondary-text)] font-semibold mb-0.5">Resume</span>
          <span className="font-semibold text-[var(--color-primary-text)] truncate max-w-[120px]">
            {config.resumeName || 'None'}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ContextCard;

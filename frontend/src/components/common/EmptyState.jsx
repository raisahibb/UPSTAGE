// Ye file EmptyState component banati hai.
// Jab list empty ho (e.g. no interviews, no reports), tab ye dikhayenge taaki blank screen na dikhe.

import React from 'react';

const EmptyState = ({ title, message, action, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] ${className}`}>
      {/* Icon ya minimal graphic dikhane ki jagah (Stitch design mein generally text based hai) */}
      <div className="mb-4 text-[var(--color-muted-text)]">
        <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-[var(--color-primary-text)] mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-[var(--color-secondary-text)] mb-6 max-w-sm">
        {message}
      </p>
      
      {/* Agar koi "Create" ya "Go Back" action hai toh render karenge */}
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;

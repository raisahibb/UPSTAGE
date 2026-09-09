import React from 'react';

const AdminHeader = () => {
  return (
    <header className="mb-8 flex justify-between items-end">
      <div>
        <h2 className="dashBadaTitle">Dashboard</h2>
        <p className="dashChhotaText text-sm">Overview of platform metrics and recent activity.</p>
      </div>
      <button className="flex items-center gap-1 px-4 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-secondary-text)] hover:bg-[var(--color-surface)] transition-colors text-sm font-semibold">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Last 30 Days
      </button>
    </header>
  );
};

export default AdminHeader;

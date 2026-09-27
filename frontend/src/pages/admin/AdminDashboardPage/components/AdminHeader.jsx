import React from 'react';

const AdminHeader = ({ period, setPeriod }) => {
  return (
    <header className="mb-8 flex justify-between items-end">
      <div>
        <h2 className="dashBadaTitle">Dashboard</h2>
        <p className="dashChhotaText text-sm">Overview of platform metrics and recent activity.</p>
      </div>
      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        className="px-4 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-secondary-text)] hover:bg-[var(--color-surface)] transition-colors text-sm font-semibold outline-none"
      >
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="90">Last 90 Days</option>
        <option value="all">All Time</option>
      </select>
    </header>
  );
};

export default AdminHeader;

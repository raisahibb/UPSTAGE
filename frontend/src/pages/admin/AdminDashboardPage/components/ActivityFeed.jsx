import React from 'react';

const formatTimeAgo = (dateStr) => {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} mins ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  const days = Math.floor(hrs / 24);
  return `${days} days ago`;
};

const ActivityFeed = ({ activities }) => {
  return (
    <div className="tableDabba h-[400px] flex flex-col">
      <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-background)] shrink-0">
        <h3 className="tableTitle">Activity Log</h3>
      </div>
      <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-4">
        {(!activities || activities.length === 0) ? (
          <div className="text-center text-gray-500 font-medium py-8">
            No recent activity
          </div>
        ) : activities.map((log) => (
          <div key={log.id} className="flex gap-4">
            <div className="mt-1 flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></div>
              <div className="w-[1px] h-full bg-[var(--color-border)] my-1"></div>
            </div>
            <div className="pb-4">
              <p className="text-sm text-[var(--color-primary-text)]">
                <span className="font-semibold">{log.user}</span> {log.action}
              </p>
              <p className="text-xs text-[var(--color-secondary-text)] mt-1">{formatTimeAgo(log.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;

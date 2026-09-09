import React from 'react';

const activityLog = [
  { id: 1, text: "System generated weekly report.", time: "10 mins ago", type: "system" },
  { id: 2, text: "Alex Smith completed an interview.", time: "1 hour ago", type: "user" },
  { id: 3, text: "Alert: High latency in video processing queue.", time: "3 hours ago", type: "alert" }
];

const ActivityFeed = () => {
  return (
    <div className="tableDabba h-[400px]">
      <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-background)]">
        <h3 className="tableTitle">Activity Log</h3>
      </div>
      <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-4">
        {activityLog.map((log) => (
          <div key={log.id} className="flex gap-4">
            <div className="mt-1 flex flex-col items-center">
              <div className={`w-2 h-2 rounded-full ${
                log.type === 'system' ? 'bg-[var(--color-primary)]' :
                log.type === 'alert' ? 'bg-red-500' : 'bg-gray-500'
              }`}></div>
              <div className="w-[1px] h-full bg-[var(--color-border)] my-1"></div>
            </div>
            <div className="pb-4">
              <p className="text-sm text-[var(--color-primary-text)]" dangerouslySetInnerHTML={{__html: log.text.replace(/([^ ]+)/, '<span class="font-semibold">$1</span>')}}></p>
              <p className="text-xs text-[var(--color-secondary-text)] mt-1">{log.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;

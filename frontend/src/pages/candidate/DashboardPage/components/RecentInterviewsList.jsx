import React from 'react';

const recentInterviews = [
  { id: 1, domain: "Frontend Architecture", date: "Today, 10:00 AM", score: 92, difficulty: "Hard", topic: "React" },
  { id: 2, domain: "Behavioral: Leadership", date: "Oct 24, 2:30 PM", score: 88, difficulty: "Medium", topic: "Management" },
  { id: 3, domain: "Data Structures", date: "Oct 20, 11:15 AM", score: 76, difficulty: "Medium", topic: "Algorithms" }
];

const RecentInterviewsList = () => {
  return (
    <div className="lg:col-span-1 tableDabba h-[500px]">
      <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-background)] rounded-t-xl">
        <h2 className="tableTitle">Recent Interviews</h2>
        <button className="text-[var(--color-primary)] hover:bg-[var(--color-surface)] p-2 rounded transition-colors text-sm font-semibold">View All</button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {recentInterviews.map((interview) => (
          <div key={interview.id} className="group border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-primary-light)] hover:bg-[var(--color-background)] transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-primary-text)] group-hover:text-[var(--color-primary)] transition-colors">{interview.domain}</h3>
                <span className="text-sm text-[var(--color-secondary-text)]">{interview.date}</span>
              </div>
              <span className={`text-sm font-semibold px-2 py-1 rounded-full border ${
                interview.score >= 90 ? 'bg-green-50 text-green-700 border-green-200' : 
                interview.score >= 80 ? 'bg-gray-100 text-gray-800 border-gray-200' : 
                'bg-yellow-50 text-yellow-700 border-yellow-200'
              }`}>
                {interview.score}%
              </span>
            </div>
            <div className="flex gap-2 mt-3">
              <span className="bg-[var(--color-background)] text-[var(--color-secondary-text)] text-xs font-semibold px-2 py-1 rounded">
                {interview.difficulty}
              </span>
              <span className="bg-[var(--color-background)] text-[var(--color-secondary-text)] text-xs font-semibold px-2 py-1 rounded">
                {interview.topic}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentInterviewsList;

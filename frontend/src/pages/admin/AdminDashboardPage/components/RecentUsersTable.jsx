import React from 'react';

const recentUsers = [
  { id: 1, name: "Jane Doe", email: "jane.doe@example.com", role: "Candidate", status: "Active" },
  { id: 2, name: "Alex Smith", email: "a.smith@techcorp.com", role: "Recruiter", status: "Active" },
  { id: 3, name: "Michael Johnson", email: "mjohnson@dev.io", role: "Candidate", status: "Inactive" },
  { id: 4, name: "Sarah Williams", email: "sarah.w@startup.net", role: "Candidate", status: "Suspended" },
  { id: 5, name: "Raisahib", email: "sidhuc888@gmail.com", role: "admin", status: "Active" }
];

const RecentUsersTable = () => {
  return (
    <div className="lg:col-span-2 tableDabba h-[400px]">
      <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-background)]">
        <h3 className="tableTitle">Recent Users</h3>
        <button className="text-[var(--color-primary)] text-sm font-semibold hover:underline">View All</button>
      </div>
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[var(--color-background)] text-xs font-semibold text-[var(--color-secondary-text)] sticky top-0">
            <tr>
              <th className="p-4 border-b border-[var(--color-border)]">Name</th>
              <th className="p-4 border-b border-[var(--color-border)]">Email</th>
              <th className="p-4 border-b border-[var(--color-border)]">Role</th>
              <th className="p-4 border-b border-[var(--color-border)]">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--color-primary-text)]">
            {recentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[var(--color-background)] transition-colors border-b border-[var(--color-border)]">
                <td className="p-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-bold text-xs bg-opacity-20">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {user.name}
                </td>
                <td className="p-4 text-[var(--color-secondary-text)]">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-green-50 text-green-700' :
                    user.status === 'Suspended' ? 'bg-red-50 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsersTable;

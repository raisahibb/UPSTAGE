// Ye file Admin ka main dashboard handle karti hai.
// Yaha se admin users, interviews, aur system activity dekh sakta hai.
// Abhi ye sirf UI testing ke liye static data hai.
// Real admin data backend se baad mein load hoga.

import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

// Temporary static data
const recentUsers = [
  { id: 1, name: "Jane Doe", email: "jane.doe@example.com", role: "Candidate", status: "Active" },
  { id: 2, name: "Alex Smith", email: "a.smith@techcorp.com", role: "Recruiter", status: "Active" },
  { id: 3, name: "Michael Johnson", email: "mjohnson@dev.io", role: "Candidate", status: "Inactive" },
  { id: 4, name: "Sarah Williams", email: "sarah.w@startup.net", role: "Candidate", status: "Suspended" }
];

const activityLog = [
  { id: 1, text: "System generated weekly report.", time: "10 mins ago", type: "system" },
  { id: 2, text: "Alex Smith completed an interview.", time: "1 hour ago", type: "user" },
  { id: 3, text: "Alert: High latency in video processing queue.", time: "3 hours ago", type: "alert" }
];

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      {/* Header Section */}
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

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="statTitle">Total Users</h3>
            <div className="p-1 bg-green-50 text-green-700 rounded-full flex items-center gap-1 text-xs font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +12%
            </div>
          </div>
          <div className="statNumber">14,231</div>
          <p className="text-xs text-[var(--color-secondary-text)] mt-1">Active this month</p>
        </Card>

        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="statTitle">Total Interviews</h3>
            <div className="p-1 bg-green-50 text-green-700 rounded-full flex items-center gap-1 text-xs font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +5%
            </div>
          </div>
          <div className="statNumber">8,405</div>
          <p className="text-xs text-[var(--color-secondary-text)] mt-1">Completed across all domains</p>
        </Card>

        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="statTitle">Avg Overall Score</h3>
            <div className="p-1 bg-red-50 text-red-700 rounded-full flex items-center gap-1 text-xs font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
              </svg>
              -1.2%
            </div>
          </div>
          <div className="statNumber">76.4</div>
          <p className="text-xs text-[var(--color-secondary-text)] mt-1">Out of 100 benchmark</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* User Management Table */}
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

        {/* Activity Feed */}
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
                  {/* Small line connector */}
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
      </div>

    </AdminLayout>
  );
};

export default AdminDashboardPage;

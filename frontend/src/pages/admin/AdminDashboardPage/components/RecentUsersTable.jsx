import React from 'react';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const RecentUsersTable = ({ users }) => {
  const navigate = useNavigate();

  return (
    <div className="lg:col-span-2 tableDabba h-[400px] flex flex-col">
      <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-background)] shrink-0">
        <h3 className="tableTitle">Recent Users</h3>
        <button onClick={() => navigate('/admin/users')} className="text-[var(--color-primary)] text-sm font-semibold hover:underline">View All</button>
      </div>
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[var(--color-background)] text-xs font-semibold text-[var(--color-secondary-text)] sticky top-0">
            <tr>
              <th className="p-4 border-b border-[var(--color-border)]">Name</th>
              <th className="p-4 border-b border-[var(--color-border)]">Email</th>
              <th className="p-4 border-b border-[var(--color-border)]">Role</th>
              <th className="p-4 border-b border-[var(--color-border)]">Joined</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--color-primary-text)]">
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-8 text-gray-500 font-medium">No users yet</td>
              </tr>
            ) : users.map((user) => (
              <tr key={user._id} className="hover:bg-[var(--color-background)] transition-colors border-b border-[var(--color-border)]">
                <td className="p-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-bold text-xs bg-opacity-20 uppercase">
                    {user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2) : '?'}
                  </div>
                  {user.name}
                </td>
                <td className="p-4 text-[var(--color-secondary-text)]">{user.email}</td>
                <td className="p-4 capitalize">{user.role}</td>
                <td className="p-4 text-[var(--color-secondary-text)]">
                  {formatDate(user.createdAt)}
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

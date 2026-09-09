import React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';

import AdminHeader from './components/AdminHeader';
import QuickStats from './components/QuickStats';
import RecentUsersTable from './components/RecentUsersTable';
import ActivityFeed from './components/ActivityFeed';

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      <AdminHeader />
      <QuickStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <RecentUsersTable />
        <ActivityFeed />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;

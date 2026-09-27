import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import AdminHeader from './components/AdminHeader';
import QuickStats from './components/QuickStats';
import RecentUsersTable from './components/RecentUsersTable';
import ActivityFeed from './components/ActivityFeed';
import { getAdminDashboard } from '../../../services/apiService';
import { Loader2 } from 'lucide-react';

const AdminDashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('30');

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminDashboard({ period });
      setData(res.data);
    } catch (err) {
      console.error("Admin dashboard fetch error:", err);
      setError('Unable to load admin dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [period]);

  if (loading && !data) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 size={40} className="animate-spin text-[var(--color-primary)]" />
          <p className="text-gray-500 font-medium">Loading admin dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error && !data) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <p className="text-red-500 font-medium">{error}</p>
          <button onClick={loadData} className="text-[var(--color-primary)] hover:underline font-semibold px-4 py-2 bg-indigo-50 rounded-lg">
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminHeader period={period} setPeriod={setPeriod} />
      <QuickStats data={data} period={period} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <RecentUsersTable users={data?.recentUsers || []} />
        <ActivityFeed activities={data?.recentActivity || []} />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;

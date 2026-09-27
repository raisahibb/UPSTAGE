import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { getAdminUsers, getUserDetailsAdmin, updateUserStatus, updateUserRole, removeUser } from '../../../services/apiService';
import { Loader2, Search, MoreVertical, Eye, Shield, UserX, Trash2, X, AlertTriangle } from 'lucide-react';
import Card from '../../../components/common/Card';
import { useAuth } from '../../../context/AuthContext';

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const UsersPage = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [feedback, setFeedback] = useState(null);

  const [activeMenuId, setActiveMenuId] = useState(null);
  
  // Modals state
  const [viewUser, setViewUser] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ open: false, type: '', user: null, loading: false });

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminUsers({ search, role: roleFilter, page, limit: 10 });
      setUsers(res.data.users);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error(err);
      setError('Unable to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadUsers();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, roleFilter, page]);

  const handleActionClick = (e, userId) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === userId ? null : userId);
  };

  const closeMenu = () => setActiveMenuId(null);

  const showFeedback = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Actions
  const handleView = async (user) => {
    closeMenu();
    setViewLoading(true);
    setViewUser({ _id: user._id, name: user.name, email: user.email, role: user.role, status: user.status, createdAt: user.createdAt });
    try {
      const res = await getUserDetailsAdmin(user._id);
      setViewUser(res.data);
    } catch (err) {
      showFeedback('Unable to load user details.', 'error');
    } finally {
      setViewLoading(false);
    }
  };

  const handleConfirmAction = async () => {
    const { type, user } = confirmModal;
    setConfirmModal({ ...confirmModal, loading: true });
    
    try {
      if (type === 'role') {
        const newRole = user.role === 'admin' ? 'candidate' : 'admin';
        await updateUserRole(user._id, newRole);
        showFeedback('User role updated successfully.');
      } else if (type === 'status') {
        const newStatus = user.status === 'inactive' ? 'active' : 'inactive';
        await updateUserStatus(user._id, newStatus);
        showFeedback(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully.`);
      } else if (type === 'remove') {
        const res = await removeUser(user._id);
        showFeedback(res.message);
      }
      loadUsers();
    } catch (err) {
      showFeedback(err.message || 'Action failed.', 'error');
    } finally {
      setConfirmModal({ open: false, type: '', user: null, loading: false });
    }
  };

  const openConfirm = (type, user) => {
    closeMenu();
    setConfirmModal({ open: true, type, user, loading: false });
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-end relative z-10" onClick={closeMenu}>
        <div>
          <h1 className="dashBadaTitle mb-1">Users Management</h1>
          <p className="dashChhotaText">Manage and view all registered users and permissions.</p>
        </div>
      </div>

      {feedback && (
        <div className={`mb-4 p-4 rounded-lg font-medium text-sm ${feedback.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {feedback.msg}
        </div>
      )}

      <Card className="mb-6 p-4 flex flex-col md:flex-row gap-4 relative z-10" onClick={closeMenu}>
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div className="w-full md:w-48">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
          >
            <option value="all">All Roles</option>
            <option value="candidate">Candidate</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </Card>

      <div className="tableDabba flex-1 mb-6 relative" onClick={closeMenu}>
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[var(--color-background)] text-xs font-semibold text-[var(--color-secondary-text)]">
              <tr>
                <th className="p-4 border-b border-[var(--color-border)]">User</th>
                <th className="p-4 border-b border-[var(--color-border)]">Email</th>
                <th className="p-4 border-b border-[var(--color-border)]">Status & Role</th>
                <th className="p-4 border-b border-[var(--color-border)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[var(--color-primary-text)]">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-8">
                    <Loader2 size={24} className="animate-spin text-indigo-500 mx-auto" />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-red-500 font-medium">{error}</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-gray-500 font-medium">No users found.</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-[var(--color-background)] transition-colors border-b border-[var(--color-border)]">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase">
                        {u.name ? u.name.substring(0, 2) : '?'}
                      </div>
                      <div>
                        <div className="font-semibold">{u.name} {currentUser?.id === u._id && '(You)'}</div>
                        <div className="text-xs text-[var(--color-secondary-text)]">Joined {formatDate(u.createdAt)}</div>
                      </div>
                    </td>
                    <td className="p-4 text-[var(--color-secondary-text)]">{u.email}</td>
                    <td className="p-4">
                      <div className="flex gap-2 items-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                          {u.role}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${u.status === 'inactive' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {u.status || 'active'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right relative">
                      <button onClick={(e) => handleActionClick(e, u._id)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <MoreVertical size={18} className="text-gray-500" />
                      </button>
                      
                      {activeMenuId === u._id && (
                        <div className="absolute right-8 top-10 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden text-left" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => handleView(u)} className="w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
                            <Eye size={16} /> View Details
                          </button>
                          
                          {currentUser?.id !== u._id && (
                            <>
                              <button onClick={() => openConfirm('role', u)} className="w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
                                <Shield size={16} /> Change Role to {u.role === 'admin' ? 'Candidate' : 'Admin'}
                              </button>
                              
                              <button onClick={() => openConfirm('status', u)} className="w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
                                <UserX size={16} /> {u.status === 'inactive' ? 'Activate User' : 'Deactivate User'}
                              </button>
                              
                              <div className="border-t border-gray-100 my-1"></div>
                              <button onClick={() => openConfirm('remove', u)} className="w-full px-4 py-2 text-sm flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors">
                                <Trash2 size={16} /> Remove User
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="p-4 border-t border-[var(--color-border)] flex justify-between items-center bg-gray-50">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 text-sm font-semibold border rounded-lg bg-white disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 text-sm font-semibold border rounded-lg bg-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* VIEW MODAL */}
      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative">
            <button onClick={() => setViewUser(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
              <X size={20} />
            </button>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-2xl uppercase">
                  {viewUser.name ? viewUser.name.substring(0, 2) : '?'}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{viewUser.name}</h2>
                  <p className="text-gray-500 text-sm">{viewUser.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-500 text-sm">Role</span>
                  <span className="font-semibold capitalize">{viewUser.role}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-500 text-sm">Status</span>
                  <span className="font-semibold capitalize">{viewUser.status || 'active'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-500 text-sm">Joined</span>
                  <span className="font-semibold">{formatDate(viewUser.createdAt)}</span>
                </div>
                
                {viewLoading ? (
                  <div className="py-4 flex justify-center"><Loader2 className="animate-spin text-indigo-500" /></div>
                ) : (
                  <>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-500 text-sm">Total Interviews</span>
                      <span className="font-semibold">{viewUser.stats?.totalInterviews || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-500 text-sm">Completed Interviews</span>
                      <span className="font-semibold">{viewUser.stats?.completedInterviews || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-500 text-sm">Average Score</span>
                      <span className="font-semibold">{viewUser.stats?.averageScore ? `${viewUser.stats.averageScore}/10` : 'N/A'}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button onClick={() => setViewUser(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM MODAL */}
      {confirmModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={24} />
              </div>
              <h2 className="text-lg font-bold mb-2">
                {confirmModal.type === 'role' && 'Change user role?'}
                {confirmModal.type === 'status' && (confirmModal.user.status === 'inactive' ? 'Activate user?' : 'Deactivate user?')}
                {confirmModal.type === 'remove' && 'Remove this user?'}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {confirmModal.type === 'role' && `Are you sure you want to change ${confirmModal.user.name} to ${confirmModal.user.role === 'admin' ? 'Candidate' : 'Admin'}?`}
                {confirmModal.type === 'status' && confirmModal.user.status === 'inactive' && 'This user will be able to log in and use the platform again.'}
                {confirmModal.type === 'status' && confirmModal.user.status !== 'inactive' && 'The user will no longer be able to access their account until reactivated.'}
                {confirmModal.type === 'remove' && 'This is a destructive operation. If the user has history, they will be deactivated instead to preserve interview data.'}
              </p>
              
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => setConfirmModal({ open: false, type: '', user: null, loading: false })}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex-1"
                  disabled={confirmModal.loading}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmAction}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex-1 flex justify-center items-center"
                  disabled={confirmModal.loading}
                >
                  {confirmModal.loading ? <Loader2 size={18} className="animate-spin" /> : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UsersPage;

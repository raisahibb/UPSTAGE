import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { getAdminQuestions, updateQuestionStatus, removeQuestion } from '../../../services/apiService';
import { Loader2, Search, MoreVertical, Eye, Archive, Trash2, X, AlertTriangle, RefreshCw } from 'lucide-react';
import Card from '../../../components/common/Card';

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('all');
  const [type, setType] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [feedback, setFeedback] = useState(null);

  const [activeMenuId, setActiveMenuId] = useState(null);
  
  // Modals state
  const [viewQuestion, setViewQuestion] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ open: false, type: '', question: null, loading: false });

  const loadQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminQuestions({ search, difficulty, type, page, limit: 10 });
      setQuestions(res.data.questions);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error(err);
      setError('Unable to load questions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadQuestions();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, difficulty, type, page]);

  const handleActionClick = (e, questionId) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === questionId ? null : questionId);
  };

  const closeMenu = () => setActiveMenuId(null);

  const showFeedback = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Actions
  const handleView = (q) => {
    closeMenu();
    setViewQuestion(q);
  };

  const handleConfirmAction = async () => {
    const { type, question } = confirmModal;
    setConfirmModal({ ...confirmModal, loading: true });
    
    try {
      if (type === 'status') {
        const newStatus = !question.isActive;
        await updateQuestionStatus(question._id, newStatus);
        showFeedback(`Question ${newStatus ? 'restored' : 'archived'} successfully.`);
      } else if (type === 'remove') {
        const res = await removeQuestion(question._id);
        showFeedback(res.message);
      }
      loadQuestions();
    } catch (err) {
      showFeedback(err.message || 'Action failed.', 'error');
    } finally {
      setConfirmModal({ open: false, type: '', question: null, loading: false });
    }
  };

  const openConfirm = (type, question) => {
    closeMenu();
    setConfirmModal({ open: true, type, question, loading: false });
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-end relative z-10" onClick={closeMenu}>
        <div>
          <h1 className="dashBadaTitle mb-1">Generated Interview Questions</h1>
          <p className="dashChhotaText">View and manage questions generated during candidate interviews.</p>
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
            placeholder="Search questions..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div className="w-full md:w-48">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
            value={difficulty}
            onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="w-full md:w-48">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
            value={type}
            onChange={(e) => { setType(e.target.value); setPage(1); }}
          >
            <option value="all">All Types</option>
            <option value="technical">Technical</option>
            <option value="behavioral">Behavioral</option>
            <option value="general">General</option>
          </select>
        </div>
      </Card>

      <div className="tableDabba flex-1 mb-6 relative" onClick={closeMenu}>
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[var(--color-background)] text-xs font-semibold text-[var(--color-secondary-text)]">
              <tr>
                <th className="p-4 border-b border-[var(--color-border)] w-1/2">Question</th>
                <th className="p-4 border-b border-[var(--color-border)]">Details</th>
                <th className="p-4 border-b border-[var(--color-border)]">Status</th>
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
              ) : questions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-gray-500 font-medium">No generated questions found.</td>
                </tr>
              ) : (
                questions.map((q) => (
                  <tr key={q._id} className="hover:bg-[var(--color-background)] transition-colors border-b border-[var(--color-border)]">
                    <td className="p-4 font-medium truncate max-w-xs" title={q.questionText}>{q.questionText}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs capitalize">{q.difficulty}</span>
                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-1 rounded text-xs capitalize">{q.questionType}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${q.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {q.isActive !== false ? 'Active' : 'Archived'}
                      </span>
                    </td>
                    <td className="p-4 text-right relative">
                      <button onClick={(e) => handleActionClick(e, q._id)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <MoreVertical size={18} className="text-gray-500" />
                      </button>
                      
                      {activeMenuId === q._id && (
                        <div className="absolute right-8 top-10 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden text-left" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => handleView(q)} className="w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
                            <Eye size={16} /> View Details
                          </button>
                          
                          <button onClick={() => openConfirm('status', q)} className="w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
                            {q.isActive !== false ? <><Archive size={16} /> Archive Question</> : <><RefreshCw size={16} /> Restore Question</>}
                          </button>
                          
                          <div className="border-t border-gray-100 my-1"></div>
                          <button onClick={() => openConfirm('remove', q)} className="w-full px-4 py-2 text-sm flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors">
                            <Trash2 size={16} /> Delete Question
                          </button>
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
      {viewQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden relative">
            <button onClick={() => setViewQuestion(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
              <X size={20} />
            </button>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Question Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                <p className="text-gray-800 text-lg font-medium whitespace-pre-wrap">{viewQuestion.questionText}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-500 text-sm">Domain</span>
                  <span className="font-semibold">{viewQuestion.interview?.domain || 'Unknown'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-500 text-sm">Question Type</span>
                  <span className="font-semibold capitalize">{viewQuestion.questionType}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-500 text-sm">Difficulty</span>
                  <span className="font-semibold capitalize">{viewQuestion.difficulty}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-500 text-sm">Status</span>
                  <span className="font-semibold">{viewQuestion.isActive !== false ? 'Active' : 'Archived'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-500 text-sm">Created Date</span>
                  <span className="font-semibold">{formatDate(viewQuestion.createdAt)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-500 text-sm">Interview Ref ID</span>
                  <span className="font-mono text-xs">{viewQuestion.interview?._id || viewQuestion.interview || 'N/A'}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button onClick={() => setViewQuestion(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100 transition">
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
                {confirmModal.type === 'status' && (confirmModal.question.isActive !== false ? 'Archive this question?' : 'Restore this question?')}
                {confirmModal.type === 'remove' && 'Delete this question?'}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {confirmModal.type === 'status' && confirmModal.question.isActive !== false && 'This question will be archived and preserved for interview history but removed from active rotation.'}
                {confirmModal.type === 'status' && confirmModal.question.isActive === false && 'This question will become active again.'}
                {confirmModal.type === 'remove' && 'If this question is referenced by an existing interview, it will be safely archived instead of deleted to preserve history.'}
              </p>
              
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => setConfirmModal({ open: false, type: '', question: null, loading: false })}
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

export default QuestionsPage;

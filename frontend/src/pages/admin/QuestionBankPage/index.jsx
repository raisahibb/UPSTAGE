import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { getQuestionBank, updateQuestionBankStatus, updateQuestionBankText } from '../../../services/apiService';
import { Loader2, Search, MoreVertical, Eye, X, AlertTriangle, Check, Edit2 } from 'lucide-react';
import Card from '../../../components/common/Card';

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const DOMAINS = ['all', 'Frontend Engineering', 'Backend Development', 'Full Stack Development', 'Data Structures', 'System Design', 'Behavioral'];

const QuestionBankPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const [activeMenuId, setActiveMenuId] = useState(null);
  const [viewQuestion, setViewQuestion] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, question: null, text: '', loading: false });
  const [confirmModal, setConfirmModal] = useState({ open: false, question: null, loading: false });

  const loadQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { search, domain, difficulty, page, limit: 20 };
      if (statusFilter !== 'all') params.status = statusFilter;
      const res = await getQuestionBank(params);
      setQuestions(res.data.questions);
      setTotalPages(res.data.pages);
      setTotal(res.data.total);
    } catch (err) {
      setError('Unable to load question bank.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(loadQuestions, 400);
    return () => clearTimeout(t);
  }, [search, domain, difficulty, statusFilter, page]);

  const showFeedback = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const closeMenu = () => setActiveMenuId(null);

  const handleToggleStatus = async () => {
    const { question } = confirmModal;
    setConfirmModal({ ...confirmModal, loading: true });
    try {
      await updateQuestionBankStatus(question._id, !question.isActive);
      showFeedback(`Question ${question.isActive ? 'deactivated' : 'activated'} successfully.`);
      loadQuestions();
    } catch (err) {
      showFeedback(err.message || 'Action failed.', 'error');
    } finally {
      setConfirmModal({ open: false, question: null, loading: false });
    }
  };

  const handleEdit = async () => {
    setEditModal({ ...editModal, loading: true });
    try {
      await updateQuestionBankText(editModal.question._id, editModal.text);
      showFeedback('Question updated successfully.');
      loadQuestions();
    } catch (err) {
      showFeedback(err.message || 'Update failed.', 'error');
    } finally {
      setEditModal({ open: false, question: null, text: '', loading: false });
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-start" onClick={closeMenu}>
        <div>
          <h1 className="dashBadaTitle mb-1">Fallback Question Bank</h1>
          <p className="dashChhotaText">
            {total} curated questions — used automatically when AI generation is unavailable.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            Gemini Calls = 0
          </span>
        </div>
      </div>

      {feedback && (
        <div className={`mb-4 p-4 rounded-lg font-medium text-sm ${feedback.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {feedback.msg}
        </div>
      )}

      <Card className="mb-6 p-4 flex flex-col md:flex-row gap-3" onClick={closeMenu}>
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
            placeholder="Search question text..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select
          className="w-full md:w-52 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          value={domain}
          onChange={(e) => { setDomain(e.target.value); setPage(1); }}
        >
          {DOMAINS.map(d => <option key={d} value={d}>{d === 'all' ? 'All Domains' : d}</option>)}
        </select>
        <select
          className="w-full md:w-36 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          value={difficulty}
          onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
        >
          <option value="all">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select
          className="w-full md:w-36 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </Card>

      <div className="tableDabba flex-1 mb-6 relative" onClick={closeMenu}>
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[var(--color-background)] text-xs font-semibold text-[var(--color-secondary-text)]">
              <tr>
                <th className="p-4 border-b border-[var(--color-border)] w-1/2">Question</th>
                <th className="p-4 border-b border-[var(--color-border)]">Domain</th>
                <th className="p-4 border-b border-[var(--color-border)]">Details</th>
                <th className="p-4 border-b border-[var(--color-border)]">Status</th>
                <th className="p-4 border-b border-[var(--color-border)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[var(--color-primary-text)]">
              {loading ? (
                <tr><td colSpan="5" className="text-center p-8"><Loader2 size={24} className="animate-spin text-indigo-500 mx-auto" /></td></tr>
              ) : error ? (
                <tr><td colSpan="5" className="text-center p-8 text-red-500 font-medium">{error}</td></tr>
              ) : questions.length === 0 ? (
                <tr><td colSpan="5" className="text-center p-8 text-gray-500 font-medium">No questions found.</td></tr>
              ) : questions.map((q) => (
                <tr key={q._id} className="hover:bg-[var(--color-background)] transition-colors border-b border-[var(--color-border)]">
                  <td className="p-4 font-medium max-w-xs truncate" title={q.questionText}>{q.questionText}</td>
                  <td className="p-4 text-xs text-[var(--color-secondary-text)]">{q.domain}</td>
                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">{q.difficulty}</span>
                      <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-1 rounded text-xs capitalize">{q.questionType}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${q.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {q.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right relative">
                    <button onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === q._id ? null : q._id); }} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                      <MoreVertical size={18} className="text-gray-500" />
                    </button>
                    {activeMenuId === q._id && (
                      <div className="absolute right-8 top-10 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden text-left" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => { closeMenu(); setViewQuestion(q); }} className="w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50">
                          <Eye size={15} /> View Full Text
                        </button>
                        <button onClick={() => { closeMenu(); setEditModal({ open: true, question: q, text: q.questionText, loading: false }); }} className="w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50">
                          <Edit2 size={15} /> Edit Text
                        </button>
                        <button onClick={() => { closeMenu(); setConfirmModal({ open: true, question: q, loading: false }); }} className={`w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 ${q.isActive ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}>
                          {q.isActive ? '⊘ Deactivate' : '✓ Activate'}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="p-4 border-t border-[var(--color-border)] flex justify-between items-center bg-gray-50">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 text-sm font-semibold border rounded-lg bg-white disabled:opacity-50">Previous</button>
            <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 text-sm font-semibold border rounded-lg bg-white disabled:opacity-50">Next</button>
          </div>
        )}
      </div>

      {/* VIEW MODAL */}
      {viewQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl relative">
            <button onClick={() => setViewQuestion(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><X size={20} /></button>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Question Bank Item</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                <p className="text-gray-800 font-medium whitespace-pre-wrap">{viewQuestion.questionText}</p>
              </div>
              <div className="space-y-3">
                {[['Domain', viewQuestion.domain], ['Difficulty', viewQuestion.difficulty], ['Type', viewQuestion.questionType], ['Status', viewQuestion.isActive ? 'Active' : 'Inactive'], ['Created', formatDate(viewQuestion.createdAt)]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2 border-b">
                    <span className="text-gray-500 text-sm">{k}</span>
                    <span className="font-semibold capitalize">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button onClick={() => setViewQuestion(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl relative">
            <button onClick={() => setEditModal({ open: false, question: null, text: '', loading: false })} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><X size={20} /></button>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Edit Question</h2>
              <textarea
                value={editModal.text}
                onChange={(e) => setEditModal({ ...editModal, text: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                rows={5}
                disabled={editModal.loading}
              />
            </div>
            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
              <button onClick={() => setEditModal({ open: false, question: null, text: '', loading: false })} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100" disabled={editModal.loading}>Cancel</button>
              <button onClick={handleEdit} disabled={editModal.loading || !editModal.text.trim()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 flex items-center gap-2">
                {editModal.loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM STATUS MODAL */}
      {confirmModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={24} />
              </div>
              <h2 className="text-lg font-bold mb-2">
                {confirmModal.question?.isActive ? 'Deactivate question?' : 'Activate question?'}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {confirmModal.question?.isActive
                  ? 'Inactive questions will not be selected as fallback. Existing interview history is unaffected.'
                  : 'This question will become eligible for fallback selection again.'}
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmModal({ open: false, question: null, loading: false })} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-50" disabled={confirmModal.loading}>Cancel</button>
                <button onClick={handleToggleStatus} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 flex justify-center items-center" disabled={confirmModal.loading}>
                  {confirmModal.loading ? <Loader2 size={16} className="animate-spin" /> : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default QuestionBankPage;

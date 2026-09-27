// Ye file backend API calls ke liye hai.
// Jab bhi frontend ko backend se baat karni ho, yahi file use hoti hai.
// Base URL ek jagah se control hota hai, change karna aasaan hai.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// LocalStorage mein JWT token store/retrieve karne ke helpers
const getToken = () => localStorage.getItem('upstage_token');
const saveToken = (token) => localStorage.setItem('upstage_token', token);
const removeToken = () => localStorage.removeItem('upstage_token');

// -------------------------------------------------------------------
// Main request helper — sab requests yahan se jaati hain
// -------------------------------------------------------------------
const request = async (endpoint, method = 'GET', body = null) => {
  const headers = { 'Content-Type': 'application/json' };

  // Agar token available hai, toh Authorization header add karo
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await response.json();

  // Backend ne error bheja hai toh usse throw karo
  if (!data.success) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// -------------------------------------------------------------------
// Auth API functions
// -------------------------------------------------------------------

// Naye user ka account banana
const signupUser = (name, email, password) =>
  request('/auth/signup', 'POST', { name, email, password });

// Login karna
const loginUser = (email, password) =>
  request('/auth/login', 'POST', { email, password });

// Currently logged-in user ki info lena
const fetchCurrentUser = () => request('/auth/me');

// -------------------------------------------------------------------
// Interview API functions
// -------------------------------------------------------------------

const getInterviews = () =>
  request('/interviews', 'GET');

const createInterview = (domain, difficulty, duration, resumeQuestionsEnabled = false) =>
  request('/interviews', 'POST', { domain, difficulty, duration, resumeQuestionsEnabled });

const uploadResume = async (interviewId, file) => {
  const token = getToken();
  const formData = new FormData();
  formData.append('resume', file);

  const response = await fetch(`${BASE_URL}/interviews/${interviewId}/resume`, {
    method: 'POST',
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: formData
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to upload resume');
  }
  return data;
};

const updateInterviewStatus = (interviewId, status) =>
  request(`/interviews/${interviewId}/status`, 'PATCH', { status });

const getInterviewDetails = (interviewId) =>
  request(`/interviews/${interviewId}`, 'GET');

const getFullInterviewDetails = (interviewId) =>
  request(`/interviews/${interviewId}/details`, 'GET');

const getInterviewProgress = () =>
  request('/interviews/progress', 'GET');

const reportInterviewViolation = (interviewId) =>
  request(`/interviews/${interviewId}/violation`, 'POST');

// -------------------------------------------------------------------
// AI Question & Response API functions
// -------------------------------------------------------------------

const generateInterviewQuestions = (interviewId) =>
  request('/ai/generate-questions', 'POST', { interviewId });

const getInterviewQuestions = (interviewId) =>
  request(`/interviews/${interviewId}/questions`, 'GET');

const submitInterviewResponse = (interviewId, questionId, answerText, answerType = 'text') =>
  request(`/interviews/${interviewId}/responses`, 'POST', { questionId, answerText, answerType });

const evaluateInterviewResponse = (responseId) =>
  request('/ai/evaluate-response', 'POST', { responseId });

const evaluateInterview = (interviewId) =>
  request('/ai/evaluate-interview', 'POST', { interviewId });

const generatePerformanceReport = (interviewId) =>
  request('/ai/generate-report', 'POST', { interviewId });

// -------------------------------------------------------------------
// Admin API functions
// -------------------------------------------------------------------

const getAdminDashboard = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/admin/dashboard?${query}`, 'GET');
};
const getAdminUsers = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/admin/users?${query}`, 'GET');
};
const getAdminQuestions = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/admin/questions?${query}`, 'GET');
};
const getUserDetailsAdmin = (id) => request(`/admin/users/${id}`, 'GET');
const updateUserStatus = (id, status) => request(`/admin/users/${id}/status`, 'PATCH', { status });
const updateUserRole = (id, role) => request(`/admin/users/${id}/role`, 'PATCH', { role });
const removeUser = (id) => request(`/admin/users/${id}`, 'DELETE');

const updateQuestionStatus = (id, isActive) => request(`/admin/questions/${id}/status`, 'PATCH', { isActive });
const removeQuestion = (id) => request(`/admin/questions/${id}`, 'DELETE');

// Question Bank (Fallback) APIs
const getQuestionBank = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/admin/question-bank?${query}`, 'GET');
};
const updateQuestionBankStatus = (id, isActive) => request(`/admin/question-bank/${id}/status`, 'PATCH', { isActive });
const updateQuestionBankText = (id, questionText) => request(`/admin/question-bank/${id}`, 'PATCH', { questionText });

export {
  getToken,
  saveToken,
  removeToken,
  signupUser,
  loginUser,
  fetchCurrentUser,
  getInterviews,
  createInterview,
  uploadResume,
  updateInterviewStatus,
  getInterviewDetails,
  reportInterviewViolation,
  generateInterviewQuestions,
  getInterviewQuestions,
  submitInterviewResponse,
  evaluateInterviewResponse,
  evaluateInterview,
  generatePerformanceReport,
  getFullInterviewDetails,
  getInterviewProgress,
  getAdminDashboard,
  getAdminUsers,
  getAdminQuestions,
  getUserDetailsAdmin,
  updateUserStatus,
  updateUserRole,
  removeUser,
  updateQuestionStatus,
  removeQuestion,
  getQuestionBank,
  updateQuestionBankStatus,
  updateQuestionBankText,
};


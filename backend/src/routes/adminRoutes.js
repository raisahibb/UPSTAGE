const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getAdminDashboard,
  getAdminUsers,
  getAdminQuestions,
  getUserDetails,
  updateUserStatus,
  updateUserRole,
  deleteUser,
  updateQuestionStatus,
  deleteQuestion,
  getQuestionBank,
  getQuestionBankItem,
  updateQuestionBankStatus,
  updateQuestionBankText,
} = require('../controllers/adminController');

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get('/dashboard', getAdminDashboard);
router.get('/users', getAdminUsers);
router.get('/users/:id', getUserDetails);
router.patch('/users/:id/status', updateUserStatus);
router.patch('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

router.get('/questions', getAdminQuestions);
router.patch('/questions/:id/status', updateQuestionStatus);
router.delete('/questions/:id', deleteQuestion);

// Fallback Question Bank management
router.get('/question-bank', getQuestionBank);
router.get('/question-bank/:id', getQuestionBankItem);
router.patch('/question-bank/:id/status', updateQuestionBankStatus);
router.patch('/question-bank/:id', updateQuestionBankText);

module.exports = router;


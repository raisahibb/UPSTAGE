const express = require('express');
const { testGemini, testGroq, generateInterviewQuestions, evaluateResponse, evaluateInterview, generatePerformanceReport } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const { aiQuestionLimiter, aiResponseLimiter, aiInterviewLimiter } = require('../middleware/aiRateLimiter');

const router = express.Router();

// GET /api/ai/test
// Ye endpoint Gemini connection test karne ke liye hai (Authentication required nahi hai abhi)
router.get('/test', testGemini);

// GET /api/ai/groq-test
router.get('/groq-test', testGroq);

// POST /api/ai/generate-questions
// Ye endpoint AI se questions generate karwane ke liye hai (Authentication required)
router.post('/generate-questions', protect, aiQuestionLimiter, generateInterviewQuestions);

// POST /api/ai/evaluate-response
// Evaluates a single candidate response
router.post('/evaluate-response', protect, aiResponseLimiter, evaluateResponse);

// POST /api/ai/evaluate-interview
// Evaluates all responses for a completed interview sequentially
router.post('/evaluate-interview', protect, aiInterviewLimiter, evaluateInterview);

// POST /api/ai/generate-report
// Generates a performance report based on evaluated responses
router.post('/generate-report', protect, generatePerformanceReport);

module.exports = router;

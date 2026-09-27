const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createQuestion, getInterviewQuestions } = require('../controllers/questionController');

// mergeParams: true zaroori hai taaki parent route se :interviewId mil sake
const router = express.Router({ mergeParams: true });

router.use(protect);

router.post('/', createQuestion);
router.get('/', getInterviewQuestions);

module.exports = router;

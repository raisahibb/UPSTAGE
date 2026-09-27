const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { submitResponse, getInterviewResponses } = require('../controllers/responseController');

// mergeParams: true zaroori hai taaki :interviewId mil sake
const router = express.Router({ mergeParams: true });

router.use(protect);

router.post('/', submitResponse);
router.get('/', getInterviewResponses);

module.exports = router;

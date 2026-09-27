const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createInterview,
  getMyInterviews,
  getInterviewById,
  updateInterviewStatus,
  reportViolation,
  getInterviewDetails,
  getInterviewProgress,
} = require('../controllers/interviewController');

// Router config — mergeParams uri params pass karne ke liye (agar nested routes banayein toh)
const router = express.Router({ mergeParams: true });

// Protect saare routes pe lagega kyunki interviews private hain
router.use(protect);

router.post('/', createInterview);
router.get('/', getMyInterviews);
router.get('/progress', getInterviewProgress);
router.get('/:id/details', getInterviewDetails);
router.get('/:id', getInterviewById);
router.patch('/:id/status', updateInterviewStatus);
router.post('/:id/violation', reportViolation);

module.exports = router;

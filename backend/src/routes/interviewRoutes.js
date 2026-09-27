const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const {
  createInterview,
  getMyInterviews,
  getInterviewById,
  updateInterviewStatus,
  reportViolation,
  getInterviewDetails,
  getInterviewProgress,
  uploadResume
} = require('../controllers/interviewController');

// Set up multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Router config — mergeParams uri params pass karne ke liye (agar nested routes banayein toh)
const router = express.Router({ mergeParams: true });

// Protect saare routes pe lagega kyunki interviews private hain
router.use(protect);

router.post('/', createInterview);
router.post('/:id/resume', upload.single('resume'), uploadResume);
router.get('/', getMyInterviews);
router.get('/progress', getInterviewProgress);
router.get('/:id/details', getInterviewDetails);
router.get('/:id', getInterviewById);
router.patch('/:id/status', updateInterviewStatus);
router.post('/:id/violation', reportViolation);

module.exports = router;

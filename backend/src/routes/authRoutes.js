// Ye file auth routes define karti hai.
// Signup, Login, aur Me — teen endpoints hain.

const express = require('express');
const { signup, login, getCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/auth/signup — naya candidate account banana
router.post('/signup', signup);

// POST /api/auth/login — credentials verify karna aur token return karna
router.post('/login', login);

// GET /api/auth/me — current logged-in user ka data (protected)
router.get('/me', protect, getCurrentUser);

module.exports = router;

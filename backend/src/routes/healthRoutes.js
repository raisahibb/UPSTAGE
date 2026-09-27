const express = require('express');
const { checkHealth } = require('../controllers/healthController');

// Express router create kar rahe hain jisme hum health related routes add karenge
const router = express.Router();

// GET request /api/health pe aayegi to checkHealth function call hoga
router.get('/', checkHealth);

module.exports = router;

const rateLimit = require('express-rate-limit');

// Helper to determine the key: Use JWT user id if available, else IP
const keyGenerator = (req) => {
  if (req.user && req.user.id) {
    return req.user.id;
  }
  return req.ip;
};

// Standard response for rate limiting
const handler = (req, res, next, options) => {
  res.status(options.statusCode).json({
    success: false,
    message: options.message,
    retryAfter: Math.ceil(options.windowMs / 1000)
  });
};

// Window in minutes, default 15
const windowMinutes = parseInt(process.env.AI_RATE_WINDOW_MINUTES, 10) || 15;
const windowMs = windowMinutes * 60 * 1000;

// Rate limiter for /api/ai/generate-questions
const aiQuestionLimiter = rateLimit({
  windowMs,
  max: parseInt(process.env.AI_QUESTION_RATE_LIMIT, 10) || 3, // Default 3 requests
  keyGenerator,
  handler,
  validate: { xForwardedForHeader: false, default: false },
  message: 'Too many AI questions generated. Please wait before trying again.',
});

// Rate limiter for /api/ai/evaluate-response
const aiResponseLimiter = rateLimit({
  windowMs,
  max: parseInt(process.env.AI_RESPONSE_RATE_LIMIT, 10) || 20, // Default 20 requests to accommodate 12-question interviews
  keyGenerator,
  handler,
  validate: { xForwardedForHeader: false, default: false },
  message: 'Too many AI response evaluations. Please wait before trying again.',
});

// Rate limiter for /api/ai/evaluate-interview
const aiInterviewLimiter = rateLimit({
  windowMs,
  max: parseInt(process.env.AI_INTERVIEW_RATE_LIMIT, 10) || 3, // Default 3 requests
  keyGenerator,
  handler,
  validate: { xForwardedForHeader: false, default: false },
  message: 'Too many full interview evaluations. Please wait before trying again.',
});

module.exports = {
  aiQuestionLimiter,
  aiResponseLimiter,
  aiInterviewLimiter
};

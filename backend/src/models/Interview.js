// Ye file Interview ka schema aur model define karti hai.

const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  domain: {
    type: String,
    required: [true, 'Domain is required'],
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: [true, 'Difficulty is required'],
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Duration is required'],
  },
  resume: {
    type: String, // String link to resume file/text
    default: null,
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  startedAt: {
    type: Date,
  },
  expiresAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  securityViolations: {
    type: Number,
    default: 0,
  },
  terminationReason: {
    type: String,
  },
  evaluationStatus: {
    type: String,
    enum: ['not_evaluated', 'evaluating', 'evaluated', 'partially_evaluated', 'evaluation_failed'],
    default: 'not_evaluated'
  },
  // Tracks whether this interview used AI-generated, fallback, or mixed questions
  questionSource: {
    type: String,
    enum: ['ai', 'fallback', 'mixed'],
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  report: {
    status: {
      type: String,
      enum: ['complete', 'partial'],
    },
    totalQuestions: Number,
    evaluatedQuestions: Number,
    skippedQuestions: Number,
    failedQuestions: Number,
    averageRelevance: Number,
    averageDepth: Number,
    averageClarity: Number,
    averageTechnicalAccuracy: Number,
    overallScore: Number,
    strengths: [String],
    weaknesses: [String],
    improvementSuggestions: [String],
    generatedAt: Date,
  },
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;

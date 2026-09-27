// QuestionBank — Curated fallback questions for when Gemini is unavailable.
// Ye AI-generated nahi hain. Ye manually curated backup questions hain.

const mongoose = require('mongoose');

const questionBankSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,
    },
    domain: {
      type: String,
      required: [true, 'Domain is required'],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: [true, 'Difficulty is required'],
    },
    questionType: {
      type: String,
      enum: ['technical', 'behavioral', 'general'],
      required: [true, 'Question type is required'],
    },
    // Inactive questions are excluded from future fallback selection.
    // Already-used questions in InterviewQuestion remain unaffected.
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Compound indexes for fast fallback selection queries
questionBankSchema.index({ domain: 1, difficulty: 1, isActive: 1 });
questionBankSchema.index({ domain: 1, isActive: 1 });

// Prevent exact duplicates in the bank (same text + domain + difficulty)
questionBankSchema.index(
  { questionText: 1, domain: 1, difficulty: 1 },
  { unique: true }
);

const QuestionBank = mongoose.model('QuestionBank', questionBankSchema);

module.exports = QuestionBank;

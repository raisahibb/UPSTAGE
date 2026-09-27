// Ye file Interview Question ka schema define karti hai.

const mongoose = require('mongoose');

const interviewQuestionSchema = new mongoose.Schema({
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true,
  },
  questionText: {
    type: String,
    required: [true, 'Question text is required'],
  },
  questionNumber: {
    type: Number,
    required: [true, 'Question number is required'],
  },
  questionType: {
    type: String,
    enum: ['technical', 'behavioral', 'general'],
    required: [true, 'Question type is required'],
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: [true, 'Difficulty is required'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // source = "ai" means Gemini generated this question.
  // source = "fallback" means it came from the curated QuestionBank.
  source: {
    type: String,
    enum: ['ai', 'fallback'],
    default: 'ai',
  },
  // If source = "fallback", this references the QuestionBank document used.
  questionBankId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionBank',
    default: null,
  },
  aiProvider: {
    type: String,
    enum: ['gemini', 'groq', null],
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InterviewQuestion = mongoose.model('InterviewQuestion', interviewQuestionSchema);

module.exports = InterviewQuestion;

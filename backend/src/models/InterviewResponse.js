// Ye file Interview Response ka schema define karti hai.
// Ye candidates ke answers ko store karega.

const mongoose = require('mongoose');

const interviewResponseSchema = new mongoose.Schema({
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InterviewQuestion',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answerText: {
    type: String,
    // Answer text tab required hai agar type 'text' ho
    required: function() { return this.answerType === 'text'; },
  },
  answerType: {
    type: String,
    enum: ['text', 'audio'],
    required: [true, 'Answer type is required'],
  },
  answeredAt: {
    type: Date,
    default: Date.now,
  },
  evaluation: {
    status: {
      type: String,
      enum: ['pending', 'evaluated', 'failed', 'skipped'],
      default: 'pending',
    },
    relevance: {
      type: Number,
      min: 0,
      max: 10,
    },
    depth: {
      type: Number,
      min: 0,
      max: 10,
    },
    clarity: {
      type: Number,
      min: 0,
      max: 10,
    },
    technicalAccuracy: {
      type: Number,
      min: 0,
      max: 10,
    },
    overallScore: {
      type: Number,
      min: 0,
      max: 10,
    },
    strengths: {
      type: [String],
      default: undefined,
    },
    weaknesses: {
      type: [String],
      default: undefined,
    },
    feedback: {
      type: String,
    },
    evaluatedAt: {
      type: Date,
    },
  },
});

const InterviewResponse = mongoose.model('InterviewResponse', interviewResponseSchema);

module.exports = InterviewResponse;

// Ye file interview questions create aur fetch karne ke liye hai

const Interview = require('../models/Interview');
const InterviewQuestion = require('../models/InterviewQuestion');

// POST /api/interviews/:interviewId/questions
const createQuestion = async (req, res) => {
  try {
    const interviewId = req.params.interviewId;
    const userId = req.user.id;
    const { questionText, questionNumber, questionType, difficulty } = req.body;

    // Validation
    if (!questionText || !questionNumber || !questionType || !difficulty) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required (questionText, questionNumber, questionType, difficulty)',
      });
    }

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    // Security: Only interview owner can add questions
    if (interview.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to add questions to this interview' });
    }

    const question = await InterviewQuestion.create({
      interview: interviewId,
      questionText,
      questionNumber,
      questionType,
      difficulty,
    });

    res.status(201).json({
      success: true,
      message: 'Question created successfully',
      question,
    });
  } catch (error) {
    console.error('createQuestion error:', error);
    res.status(500).json({ success: false, message: 'Failed to create question' });
  }
};

// GET /api/interviews/:interviewId/questions
const getInterviewQuestions = async (req, res) => {
  try {
    const interviewId = req.params.interviewId;
    const userId = req.user.id;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    // Security: Only owner can view questions
    if (interview.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to view questions for this interview' });
    }

    const questions = await InterviewQuestion.find({ interview: interviewId }).sort({ questionNumber: 1 });

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error('getInterviewQuestions error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch questions' });
  }
};

module.exports = {
  createQuestion,
  getInterviewQuestions,
};

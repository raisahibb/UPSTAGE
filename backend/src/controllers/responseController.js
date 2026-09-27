// Ye file candidates ke answers handle karti hai

const Interview = require('../models/Interview');
const InterviewQuestion = require('../models/InterviewQuestion');
const InterviewResponse = require('../models/InterviewResponse');

// POST /api/interviews/:interviewId/responses
const submitResponse = async (req, res) => {
  try {
    const interviewId = req.params.interviewId;
    const userId = req.user.id;
    const { questionId, answerText, answerType } = req.body;

    // Validation
    if (!questionId || !answerType) {
      return res.status(400).json({ success: false, message: 'Question ID and answer type are required' });
    }
    
    if (answerType === 'text' && !answerText) {
      return res.status(400).json({ success: false, message: 'Answer text is required for text responses' });
    }

    // Find Interview
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    // Security: User must own the interview
    if (interview.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to submit responses for this interview' });
    }

    // Find Question and verify it belongs to this interview
    const question = await InterviewQuestion.findById(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    if (question.interview.toString() !== interviewId) {
      return res.status(400).json({ success: false, message: 'Question does not belong to this interview' });
    }

    // Prevent duplicate responses for the same question
    const existingResponse = await InterviewResponse.findOne({ interview: interviewId, question: questionId });
    if (existingResponse) {
      // Idempotent: return existing response rather than creating a duplicate
      return res.status(200).json({
        success: true,
        message: 'Response already submitted',
        response: existingResponse,
      });
    }

    const response = await InterviewResponse.create({
      interview: interviewId,
      question: questionId,
      user: userId,
      answerText: answerText || null,
      answerType,
    });

    res.status(201).json({
      success: true,
      message: 'Response submitted successfully',
      response,
    });
  } catch (error) {
    console.error('submitResponse error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit response' });
  }
};

// GET /api/interviews/:interviewId/responses
const getInterviewResponses = async (req, res) => {
  try {
    const interviewId = req.params.interviewId;
    const userId = req.user.id;

    // Verify interview
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    // Security check
    if (interview.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to view responses for this interview' });
    }

    const responses = await InterviewResponse.find({ interview: interviewId })
      .populate('question', 'questionText questionNumber'); // Populate to get question context

    res.status(200).json({
      success: true,
      responses,
    });
  } catch (error) {
    console.error('getInterviewResponses error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch responses' });
  }
};

module.exports = {
  submitResponse,
  getInterviewResponses,
};

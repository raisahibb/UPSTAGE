// Ye file interviews ki creation aur status handle karti hai

const Interview = require('../models/Interview');
const InterviewQuestion = require('../models/InterviewQuestion');
const InterviewResponse = require('../models/InterviewResponse');

// POST /api/interviews
const createInterview = async (req, res) => {
  try {
    const { domain, difficulty, duration, resumeQuestionsEnabled } = req.body;

    // Validation
    if (!domain || !difficulty || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Domain, difficulty, and duration are required',
      });
    }

    const validDifficulties = ['Easy', 'Medium', 'Hard'];
    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid difficulty',
      });
    }

    // req.user.id authMiddleware se aayega
    const userId = req.user.id;

    const interview = await Interview.create({
      user: userId,
      domain,
      difficulty,
      duration,
      resumeQuestionsEnabled: resumeQuestionsEnabled || false,
    });

    res.status(201).json({
      success: true,
      message: 'Interview created successfully',
      interview,
    });
  } catch (error) {
    console.error('createInterview error:', error);
    res.status(500).json({ success: false, message: 'Failed to create interview' });
  }
};

// POST /api/interviews/:id/resume
const { parseResume } = require('../services/resumeService');

const uploadResume = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const userId = req.user.id;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    if (interview.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No resume file uploaded' });
    }

    const { buffer, originalname, mimetype } = req.file;

    const extractedText = await parseResume(buffer, mimetype);

    interview.resumeAttached = true;
    interview.resumeFileName = originalname;
    interview.resumeText = extractedText;
    await interview.save();

    res.status(200).json({
      success: true,
      message: 'Resume processed successfully'
    });
  } catch (error) {
    console.error('uploadResume error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to process resume' });
  }
};

// GET /api/interviews
const getMyInterviews = async (req, res) => {
  try {
    const userId = req.user.id;

    // Sort by newest first
    const interviews = await Interview.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.error('getMyInterviews error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch interviews' });
  }
};

// GET /api/interviews/:id
const getInterviewById = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const userId = req.user.id;

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    // Ownership check — koi doosra user kisi aur ka interview nahi dekh sakta
    if (interview.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this interview' });
    }

    res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error('getInterviewById error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch interview' });
  }
};

// PATCH /api/interviews/:id/status
const updateInterviewStatus = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const userId = req.user.id;
    const { status } = req.body;

    const validStatuses = ['scheduled', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    // Ownership check
    if (interview.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this interview' });
    }

    interview.status = status;
    
    // Status update ke saath timestamps set karna
    if (status === 'in-progress' && !interview.startedAt) {
      interview.startedAt = Date.now();
      interview.expiresAt = new Date(Date.now() + interview.duration * 60 * 1000);
    } else if (status === 'completed' && !interview.completedAt) {
      interview.completedAt = Date.now();
    }

    await interview.save();

    res.status(200).json({
      success: true,
      message: 'Interview status updated successfully',
      interview,
    });
  } catch (error) {
    console.error('updateInterviewStatus error:', error);
    res.status(500).json({ success: false, message: 'Failed to update interview status' });
  }
};

// POST /api/interviews/:id/violation
const reportViolation = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const userId = req.user.id;

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    if (interview.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (interview.status !== 'in-progress') {
      return res.status(400).json({ success: false, message: 'Interview is not in progress' });
    }

    interview.securityViolations = (interview.securityViolations || 0) + 1;
    
    if (interview.securityViolations >= 3) {
      interview.status = 'completed';
      interview.completedAt = Date.now();
      interview.terminationReason = 'Security violations threshold exceeded';
    }

    await interview.save();

    res.status(200).json({
      success: true,
      violations: interview.securityViolations,
      status: interview.status,
      terminated: interview.status === 'completed'
    });
  } catch (error) {
    console.error('reportViolation error:', error);
    res.status(500).json({ success: false, message: 'Failed to report violation' });
  }
};

// GET /api/interviews/:id/details
// Retrieves interview, report, questions, and responses without AI calls
const getInterviewDetails = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const userId = req.user.id;

    const interview = await Interview.findById(interviewId).lean();

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    if (interview.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this interview' });
    }

    const questions = await InterviewQuestion.find({ interview: interviewId })
      .sort({ questionNumber: 1 })
      .lean();
      
    const responses = await InterviewResponse.find({ interview: interviewId })
      .lean();

    // Map responses to their corresponding questions
    const mappedQuestions = questions.map((q) => {
      const response = responses.find((r) => r.question.toString() === q._id.toString());
      return {
        questionId: q._id,
        questionText: q.questionText,
        questionType: q.questionType,
        difficulty: q.difficulty,
        questionNumber: q.questionNumber,
        answerText: response ? response.answerText : null,
        submittedAt: response ? response.answeredAt : null,
        evaluation: response && response.evaluation ? response.evaluation : null
      };
    });

    res.status(200).json({
      success: true,
      data: {
        interview: {
          id: interview._id,
          domain: interview.domain,
          difficulty: interview.difficulty,
          duration: interview.duration,
          status: interview.status,
          createdAt: interview.createdAt,
          startedAt: interview.startedAt,
          completedAt: interview.completedAt,
          evaluationStatus: interview.evaluationStatus
        },
        report: interview.report || null,
        questions: mappedQuestions
      }
    });

  } catch (error) {
    console.error('getInterviewDetails error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch interview details' });
  }
};

// GET /api/interviews/progress
const getInterviewProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const interviews = await Interview.find({ user: userId, status: 'completed' })
      .sort({ completedAt: 1, createdAt: 1 }) // Chronological
      .lean();

    const evaluatedInterviews = interviews.filter(inv => inv.evaluationStatus === 'evaluated' && inv.report);

    let averageScore = 0;
    let catAvg = { relevance: 0, depth: 0, clarity: 0, technicalAccuracy: 0 };
    const domainMap = {};
    const trend = [];
    const strengthsSet = new Set();
    const weaknessesSet = new Set();

    if (evaluatedInterviews.length > 0) {
      let totalScore = 0;
      let totalRel = 0;
      let totalDep = 0;
      let totalCla = 0;
      let totalTech = 0;

      evaluatedInterviews.forEach(inv => {
        const r = inv.report;
        totalScore += (r.overallScore || 0);
        totalRel += (r.averageRelevance || 0);
        totalDep += (r.averageDepth || 0);
        totalCla += (r.averageClarity || 0);
        totalTech += (r.averageTechnicalAccuracy || 0);

        const domain = inv.domain || 'General';
        if (!domainMap[domain]) {
          domainMap[domain] = { count: 0, total: 0 };
        }
        domainMap[domain].count += 1;
        domainMap[domain].total += (r.overallScore || 0);

        trend.push({
          date: inv.completedAt || inv.createdAt,
          score: r.overallScore || 0
        });

        if (r.strengths) r.strengths.forEach(s => strengthsSet.add(s));
        if (r.weaknesses) r.weaknesses.forEach(w => weaknessesSet.add(w));
      });

      const count = evaluatedInterviews.length;
      averageScore = (totalScore / count).toFixed(1);
      catAvg = {
        relevance: (totalRel / count).toFixed(1),
        depth: (totalDep / count).toFixed(1),
        clarity: (totalCla / count).toFixed(1),
        technicalAccuracy: (totalTech / count).toFixed(1)
      };
    }

    const domainPerformance = Object.keys(domainMap).map(d => ({
      domain: d,
      count: domainMap[d].count,
      average: (domainMap[d].total / domainMap[d].count).toFixed(1)
    }));

    res.status(200).json({
      success: true,
      data: {
        completedInterviews: interviews.length,
        evaluatedInterviews: evaluatedInterviews.length,
        averageScore,
        categoryAverages: catAvg,
        domainPerformance,
        trend,
        strengths: Array.from(strengthsSet).slice(0, 5), // top 5
        weaknesses: Array.from(weaknessesSet).slice(0, 5)
      }
    });

  } catch (error) {
    console.error('getInterviewProgress error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch progress data' });
  }
};

module.exports = {
  createInterview,
  getMyInterviews,
  getInterviewById,
  updateInterviewStatus,
  reportViolation,
  getInterviewDetails,
  getInterviewProgress,
  uploadResume,
};

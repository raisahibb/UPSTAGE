const User = require('../models/User');
const Interview = require('../models/Interview');
const InterviewQuestion = require('../models/InterviewQuestion');
const QuestionBank = require('../models/QuestionBank');

// GET /api/admin/dashboard
const getAdminDashboard = async (req, res) => {
  try {
    const { period = '30' } = req.query;
    
    let dateFilter = null;
    if (period !== 'all') {
      const p = parseInt(period);
      dateFilter = new Date();
      dateFilter.setDate(dateFilter.getDate() - p);
    }

    // Users stats
    const totalUsers = await User.countDocuments({ status: { $ne: 'inactive' } });
    const newUsers30 = dateFilter ? await User.countDocuments({ createdAt: { $gte: dateFilter }, status: { $ne: 'inactive' } }) : totalUsers;

    // Interviews stats
    const totalInterviews = await Interview.countDocuments();
    const completedInterviews = await Interview.countDocuments({ status: 'completed' });
    const evaluatedInterviewsCount = await Interview.countDocuments({ status: 'completed', evaluationStatus: 'evaluated' });

    // Fetch all evaluated interviews for score analytics
    const evaluatedInterviews = await Interview.find({ status: 'completed', evaluationStatus: 'evaluated' }).lean();

    let avgScore = 0;
    let avgRel = 0;
    let avgDep = 0;
    let avgCla = 0;
    let avgTech = 0;
    const domainMap = {};
    const diffMap = {};

    if (evaluatedInterviews.length > 0) {
      evaluatedInterviews.forEach(inv => {
        if (inv.report) {
          avgScore += (inv.report.overallScore || 0);
          avgRel += (inv.report.averageRelevance || 0);
          avgDep += (inv.report.averageDepth || 0);
          avgCla += (inv.report.averageClarity || 0);
          avgTech += (inv.report.averageTechnicalAccuracy || 0);
        }

        const dom = inv.domain || 'General';
        domainMap[dom] = (domainMap[dom] || 0) + 1;

        const diff = inv.difficulty || 'Medium';
        diffMap[diff] = (diffMap[diff] || 0) + 1;
      });

      const c = evaluatedInterviews.length;
      avgScore = (avgScore / c).toFixed(1);
      avgRel = (avgRel / c).toFixed(1);
      avgDep = (avgDep / c).toFixed(1);
      avgCla = (avgCla / c).toFixed(1);
      avgTech = (avgTech / c).toFixed(1);
    }

    const domainBreakdown = Object.keys(domainMap).map(k => ({ name: k, value: domainMap[k] }));
    const difficultyBreakdown = Object.keys(diffMap).map(k => ({ name: k, value: diffMap[k] }));

    const completionRate = totalInterviews > 0 ? ((completedInterviews / totalInterviews) * 100).toFixed(1) : 0;

    // Recent Users
    const recentUsers = await User.find({ status: { $ne: 'inactive' } }).sort({ createdAt: -1 }).limit(5).select('-password').lean();

    // Recent Activity Feed
    // We will construct this by taking the most recent interviews
    const recentInterviews = await Interview.find().sort({ createdAt: -1 }).limit(10).populate('user', 'name').lean();
    
    const recentActivity = recentInterviews.map(inv => {
      let action = 'created an interview';
      let date = inv.createdAt;
      
      if (inv.status === 'completed') {
        action = 'completed an interview';
        date = inv.completedAt || inv.createdAt;
      }
      if (inv.evaluationStatus === 'evaluated') {
        action = 'received an AI evaluation';
      }

      return {
        id: inv._id,
        user: inv.user ? inv.user.name : 'Unknown Candidate',
        action,
        date
      };
    }).sort((a, b) => b.date - a.date).slice(0, 5);

    res.status(200).json({
      success: true,
      data: {
        users: { total: totalUsers, newInPeriod: newUsers30 },
        interviews: { total: totalInterviews, completed: completedInterviews, evaluated: evaluatedInterviewsCount },
        scores: { average: avgScore, relevance: avgRel, depth: avgDep, clarity: avgCla, technicalAccuracy: avgTech },
        completionRate,
        recentUsers,
        recentActivity,
        domainBreakdown,
        difficultyBreakdown
      }
    });
  } catch (error) {
    console.error('Admin Dashboard Error:', error);
    res.status(500).json({ success: false, message: 'Failed to load admin dashboard' });
  }
};

// GET /api/admin/users
const getAdminUsers = async (req, res) => {
  try {
    const { search, role, page = 1, limit = 10 } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role && role !== 'all') {
      query.role = role;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await User.countDocuments(query);
    const users = await User.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).select('-password').lean();

    res.status(200).json({
      success: true,
      data: {
        users,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Admin Users Error:', error);
    res.status(500).json({ success: false, message: 'Failed to load users' });
  }
};

// GET /api/admin/questions
const getAdminQuestions = async (req, res) => {
  try {
    const { search, difficulty, type, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (search) {
      query.questionText = { $regex: search, $options: 'i' };
    }
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }
    if (type && type !== 'all') {
      query.questionType = type;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await InterviewQuestion.countDocuments(query);
    const questions = await InterviewQuestion.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).populate('interview', 'domain').lean();

    res.status(200).json({
      success: true,
      data: {
        questions,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Admin Questions Error:', error);
    res.status(500).json({ success: false, message: 'Failed to load questions' });
  }
};

// GET /api/admin/users/:id
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').lean();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const totalInterviews = await Interview.countDocuments({ user: user._id });
    const completedInterviews = await Interview.countDocuments({ user: user._id, status: 'completed' });
    const evaluatedInterviews = await Interview.countDocuments({ user: user._id, status: 'completed', evaluationStatus: 'evaluated' });

    let averageScore = null;
    if (evaluatedInterviews > 0) {
      const evals = await Interview.find({ user: user._id, status: 'completed', evaluationStatus: 'evaluated' }).lean();
      let total = 0;
      evals.forEach(e => {
        if (e.report) total += (e.report.overallScore || 0);
      });
      averageScore = (total / evaluatedInterviews).toFixed(1);
    }

    res.status(200).json({
      success: true,
      data: {
        ...user,
        stats: {
          totalInterviews,
          completedInterviews,
          evaluatedInterviews,
          averageScore
        }
      }
    });
  } catch (error) {
    console.error('getUserDetails Error:', error);
    res.status(500).json({ success: false, message: 'Failed to load user details' });
  }
};

// PATCH /api/admin/users/:id/status
const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    if (req.params.id === req.user.id) {
      return res.status(400).json({ success: false, message: 'Administrators cannot modify their own account through this action.' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.status = status;
    await user.save();

    res.status(200).json({ success: true, message: `User ${status === 'active' ? 'activated' : 'deactivated'} successfully` });
  } catch (error) {
    console.error('updateUserStatus Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update user status' });
  }
};

// PATCH /api/admin/users/:id/role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['candidate', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    if (req.params.id === req.user.id) {
      return res.status(400).json({ success: false, message: 'Administrators cannot modify their own account through this action.' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.role === 'admin' && role === 'candidate') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({ success: false, message: 'Cannot demote the last remaining administrator' });
      }
    }

    user.role = role;
    await user.save();

    res.status(200).json({ success: true, message: 'User role updated successfully' });
  } catch (error) {
    console.error('updateUserRole Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update user role' });
  }
};

// DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ success: false, message: 'Administrators cannot modify their own account through this action.' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({ success: false, message: 'Cannot remove the last remaining administrator' });
      }
    }

    const hasInterviews = await Interview.exists({ user: user._id });
    if (hasInterviews) {
      // Soft deactivate
      user.status = 'inactive';
      await user.save();
      return res.status(200).json({ success: true, message: 'User has interview history and was deactivated instead of deleted.' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('deleteUser Error:', error);
    res.status(500).json({ success: false, message: 'Failed to remove user' });
  }
};

// PATCH /api/admin/questions/:id/status
const updateQuestionStatus = async (req, res) => {
  try {
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ success: false, message: 'isActive must be a boolean' });
    }

    const question = await InterviewQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    question.isActive = isActive;
    await question.save();

    res.status(200).json({ success: true, message: `Question ${isActive ? 'restored' : 'archived'} successfully` });
  } catch (error) {
    console.error('updateQuestionStatus Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update question status' });
  }
};

// DELETE /api/admin/questions/:id
const deleteQuestion = async (req, res) => {
  try {
    const question = await InterviewQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    const InterviewResponse = require('../models/InterviewResponse');
    const isUsed = await InterviewResponse.exists({ question: question._id });

    if (isUsed) {
      question.isActive = false;
      await question.save();
      return res.status(200).json({ success: true, message: 'Question is referenced by an existing interview and was archived to preserve interview history.' });
    }

    await InterviewQuestion.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Question deleted successfully' });
  } catch (error) {
    console.error('deleteQuestion Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete question' });
  }
};

// GET /api/admin/question-bank
const getQuestionBank = async (req, res) => {
  try {
    const { search, domain, difficulty, type, status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (search) query.questionText = { $regex: search, $options: 'i' };
    if (domain && domain !== 'all') query.domain = domain;
    if (difficulty && difficulty !== 'all') query.difficulty = difficulty;
    if (type && type !== 'all') query.questionType = type;
    if (status === 'active') query.isActive = true;
    if (status === 'inactive') query.isActive = false;

    const safeLimit = Math.min(parseInt(limit) || 20, 50);
    const skip = (parseInt(page) - 1) * safeLimit;
    const total = await QuestionBank.countDocuments(query);
    const questions = await QuestionBank.find(query)
      .sort({ domain: 1, difficulty: 1, createdAt: -1 })
      .skip(skip)
      .limit(safeLimit)
      .lean();

    res.status(200).json({
      success: true,
      data: { questions, total, page: parseInt(page), pages: Math.ceil(total / safeLimit) }
    });
  } catch (error) {
    console.error('getQuestionBank Error:', error);
    res.status(500).json({ success: false, message: 'Failed to load question bank' });
  }
};

// GET /api/admin/question-bank/:id
const getQuestionBankItem = async (req, res) => {
  try {
    const q = await QuestionBank.findById(req.params.id).lean();
    if (!q) return res.status(404).json({ success: false, message: 'Question not found in bank' });
    res.status(200).json({ success: true, data: q });
  } catch (error) {
    console.error('getQuestionBankItem Error:', error);
    res.status(500).json({ success: false, message: 'Failed to load question' });
  }
};

// PATCH /api/admin/question-bank/:id/status
const updateQuestionBankStatus = async (req, res) => {
  try {
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ success: false, message: 'isActive must be a boolean' });
    }
    const q = await QuestionBank.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );
    if (!q) return res.status(404).json({ success: false, message: 'Question not found in bank' });
    res.status(200).json({ success: true, message: `Question bank item ${isActive ? 'activated' : 'deactivated'} successfully`, data: q });
  } catch (error) {
    console.error('updateQuestionBankStatus Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update question bank status' });
  }
};

// PATCH /api/admin/question-bank/:id — edit question text
const updateQuestionBankText = async (req, res) => {
  try {
    const { questionText } = req.body;
    if (!questionText || typeof questionText !== 'string' || questionText.trim() === '') {
      return res.status(400).json({ success: false, message: 'questionText is required' });
    }
    const q = await QuestionBank.findByIdAndUpdate(
      req.params.id,
      { questionText: questionText.trim() },
      { new: true, runValidators: true }
    );
    if (!q) return res.status(404).json({ success: false, message: 'Question not found in bank' });
    res.status(200).json({ success: true, message: 'Question updated successfully', data: q });
  } catch (error) {
    console.error('updateQuestionBankText Error:', error);
    // Handle duplicate key
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'A question with this text already exists in the bank' });
    }
    res.status(500).json({ success: false, message: 'Failed to update question' });
  }
};

module.exports = {
  getAdminDashboard,
  getAdminUsers,
  getAdminQuestions,
  getUserDetails,
  updateUserStatus,
  updateUserRole,
  deleteUser,
  updateQuestionStatus,
  deleteQuestion,
  getQuestionBank,
  getQuestionBankItem,
  updateQuestionBankStatus,
  updateQuestionBankText,
};

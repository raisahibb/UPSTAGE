/**
 * fallbackQuestionService.js
 *
 * Curated QuestionBank se fallback questions select karta hai.
 * Gemini failure ke baad yahi service use hoti hai.
 * Is service mein ZERO Gemini calls hain.
 */

const QuestionBank = require('../models/QuestionBank');
const InterviewQuestion = require('../models/InterviewQuestion');

/**
 * Check karta hai ki error Gemini ki transient failure se aaya hai ya nahi.
 * Agar haan, toh fallback trigger hoga.
 * Application-level bugs (invalid ID, unauthorized) ke liye fallback NAHI hoga.
 */
const isGeminitransientError = (error) => {
  if (!error) return false;

  const msg = (error.message || '').toLowerCase();
  const status = error.status || error.statusCode || error.code;

  // Quota / rate limit from Gemini provider
  if (status === 429) return true;
  if (msg.includes('quota')) return true;
  if (msg.includes('rate limit')) return true;

  // Network / timeout
  if (msg.includes('timeout')) return true;
  if (msg.includes('econnreset')) return true;
  if (msg.includes('econnrefused')) return true;
  if (msg.includes('network')) return true;

  // Provider 5xx errors
  if (status >= 500 && status < 600) return true;
  if (msg.includes('service unavailable')) return true;
  if (msg.includes('server error')) return true;
  if (msg.includes('internal error')) return true;

  // Model unavailable
  if (msg.includes('model not found')) return true;
  if (msg.includes('invalid model')) return true;
  if (msg.includes('not found') && msg.includes('model')) return true;

  // Generic generation failure (Gemini SDK wraps many errors generically)
  if (msg.includes('failed to generate') || msg.includes('generation failed')) return true;

  return false;
};

/**
 * Curated QuestionBank se fallback questions select karta hai.
 *
 * @param {Object} params
 * @param {string} params.domain - Interview domain (e.g. "Frontend Engineering")
 * @param {string} params.difficulty - Difficulty ("Easy", "Medium", "Hard")
 * @param {string} params.interviewId - Interview ID (duplicate check ke liye)
 * @param {number} params.requiredCount - Kitne questions chahiye
 *
 * @returns {{ questions: Array, error: string|null }}
 */
const selectFallbackQuestions = async ({ domain, difficulty, interviewId, requiredCount }) => {
  try {
    // Already-used questionBankIds for this interview (duplicate prevention)
    const existingQuestions = await InterviewQuestion.find({
      interview: interviewId,
      questionBankId: { $ne: null },
    }).select('questionBankId').lean();

    const usedBankIds = existingQuestions.map((q) => q.questionBankId?.toString()).filter(Boolean);

    // Step 1: Exact domain + exact difficulty
    let pool = await QuestionBank.find({
      domain,
      difficulty,
      isActive: true,
      _id: { $nin: usedBankIds },
    }).lean();

    // Step 2: Same domain, compatible difficulty fallback
    if (pool.length < requiredCount) {
      const compatibleDifficulties = getCompatibleDifficulties(difficulty);
      const extra = await QuestionBank.find({
        domain,
        difficulty: { $in: compatibleDifficulties },
        isActive: true,
        _id: { $nin: [...usedBankIds, ...pool.map((q) => q._id.toString())] },
      }).lean();
      pool = [...pool, ...extra];
    }

    // Step 3: Broader fallback — any active question from bank (avoid domain mismatch as much as possible)
    if (pool.length < requiredCount) {
      const broader = await QuestionBank.find({
        isActive: true,
        _id: { $nin: [...usedBankIds, ...pool.map((q) => q._id.toString())] },
      }).lean();
      pool = [...pool, ...broader];
    }

    if (pool.length < requiredCount) {
      return {
        questions: null,
        error: `Not enough fallback questions available for this interview configuration. Required: ${requiredCount}, available: ${pool.length}.`,
      };
    }

    // Shuffle deterministically enough for variety, take exactly requiredCount
    const shuffled = shuffleArray(pool).slice(0, requiredCount);
    return { questions: shuffled, error: null };
  } catch (err) {
    console.error('Fallback selection error:', err.message);
    return { questions: null, error: 'Fallback question selection failed due to a database error.' };
  }
};

/** Fisher-Yates shuffle */
const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Same domain, compatible difficulty levels */
const getCompatibleDifficulties = (difficulty) => {
  if (difficulty === 'Medium') return ['Easy', 'Hard'];
  if (difficulty === 'Easy') return ['Medium'];
  if (difficulty === 'Hard') return ['Medium'];
  return [];
};

module.exports = { selectFallbackQuestions, isGeminitransientError };

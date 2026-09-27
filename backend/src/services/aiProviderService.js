const { geminiModel } = require('../config/gemini');
const { groqClient, GROQ_MODEL } = require('../config/groq');

// Extracts JSON array of exactly `questionCount` elements from response string
const parseAndValidateQuestions = (responseText, questionCount) => {
  let cleanedText = responseText.trim();
  if (cleanedText.startsWith('```json')) {
    cleanedText = cleanedText.replace(/^```json\n/, '').replace(/\n```$/, '').trim();
  } else if (cleanedText.startsWith('```')) {
    cleanedText = cleanedText.replace(/^```\n/, '').replace(/\n```$/, '').trim();
  }
  
  const parsedJSON = JSON.parse(cleanedText);
  if (!parsedJSON.questions || !Array.isArray(parsedJSON.questions) || parsedJSON.questions.length !== questionCount) {
    throw new Error(`AI response invalid: expected ${questionCount} questions`);
  }
  return parsedJSON.questions;
};

// Extracts evaluation JSON object from response string
const parseAndValidateEvaluation = (responseText) => {
  let cleanedText = responseText.trim();
  if (cleanedText.startsWith('```json')) {
    cleanedText = cleanedText.replace(/^```json\n/, '').replace(/\n```$/, '').trim();
  } else if (cleanedText.startsWith('```')) {
    cleanedText = cleanedText.replace(/^```\n/, '').replace(/\n```$/, '').trim();
  }
  
  const parsedJSON = JSON.parse(cleanedText);
  
  const { relevance, depth, clarity, technicalAccuracy, strengths, weaknesses, feedback } = parsedJSON;
  
  const isValidScore = (score) => typeof score === 'number' && score >= 0 && score <= 10;
  if (!isValidScore(relevance) || !isValidScore(depth) || !isValidScore(clarity) || !isValidScore(technicalAccuracy)) {
    throw new Error('AI returned invalid score ranges');
  }
  if (!Array.isArray(strengths) || !Array.isArray(weaknesses) || typeof feedback !== 'string') {
    throw new Error('AI returned malformed evaluation fields');
  }
  return { relevance, depth, clarity, technicalAccuracy, strengths, weaknesses, feedback };
};

const callGemini = async (prompt) => {
  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
};

const callGroq = async (prompt) => {
  if (!groqClient) {
    throw new Error('Groq client not configured');
  }
  
  const chatCompletion = await groqClient.chat.completions.create({
    messages: [
      { role: 'user', content: prompt }
    ],
    model: GROQ_MODEL,
    temperature: 0.7,
  });
  
  return chatCompletion.choices[0]?.message?.content || '';
};

const { isGeminitransientError } = require('./fallbackQuestionService');

// Returns { source: "gemini"|"groq", data: <parsed JSON array> } or throws
const generateQuestionsFallback = async (prompt, questionCount) => {
  let geminiError = null;
  
  try {
    const text = await callGemini(prompt);
    const questions = parseAndValidateQuestions(text, questionCount);
    return { provider: 'gemini', data: questions };
  } catch (err) {
    geminiError = err;
    if (!isGeminitransientError(err)) {
      throw err; // Re-throw application/parsing bugs, do NOT fallback
    }
    console.warn(`[AI Service] Gemini Generation Transient Failure: ${err.message}. Falling back to Groq...`);
  }
  
  // If Gemini failed (timeout, 429, error), fallback to Groq
  try {
    const text = await callGroq(prompt);
    const questions = parseAndValidateQuestions(text, questionCount);
    return { provider: 'groq', data: questions };
  } catch (err) {
    console.error(`[AI Service] Groq Generation Failed: ${err.message}. Fallback to QuestionBank next.`);
    throw new Error(`Primary and Secondary AI Providers Failed. Gemini Error: ${geminiError.message} | Groq Error: ${err.message}`);
  }
};

const evaluateResponseFallback = async (prompt) => {
  let geminiError = null;

  try {
    const text = await callGemini(prompt);
    const evalData = parseAndValidateEvaluation(text);
    return { provider: 'gemini', data: evalData };
  } catch (err) {
    geminiError = err;
    if (!isGeminitransientError(err)) {
      throw err;
    }
    console.warn(`[AI Service] Gemini Evaluation Transient Failure: ${err.message}. Falling back to Groq...`);
  }
  
  // Fallback to Groq
  try {
    const text = await callGroq(prompt);
    const evalData = parseAndValidateEvaluation(text);
    return { provider: 'groq', data: evalData };
  } catch (err) {
    console.error(`[AI Service] Groq Evaluation Failed: ${err.message}. Setting status to failed.`);
    throw new Error(`Evaluation Failed. Gemini Error: ${geminiError.message} | Groq Error: ${err.message}`);
  }
};

const testGroq = async () => {
  const prompt = "Reply with exactly: UPSTAGE Groq connection successful";
  return await callGroq(prompt);
};

module.exports = {
  generateQuestionsFallback,
  evaluateResponseFallback,
  testGroq
};

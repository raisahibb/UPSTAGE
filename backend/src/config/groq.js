const Groq = require('groq-sdk');
require('dotenv').config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

let groqClient = null;

if (GROQ_API_KEY) {
  try {
    groqClient = new Groq({ apiKey: GROQ_API_KEY });
    console.log('GROQ_API_KEY loaded: true');
  } catch (error) {
    console.error('Failed to initialize Groq client:', error.message);
  }
} else {
  console.warn('GROQ_API_KEY is not defined in environment variables.');
}

module.exports = {
  groqClient,
  GROQ_MODEL
};

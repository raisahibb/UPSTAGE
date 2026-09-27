const { GoogleGenerativeAI } = require('@google/generative-ai');

// Gemini client yahan setup hota hai.
// API key .env se read hoti hai, code mein hardcode nahi karte.
const apiKey = process.env.GEMINI_API_KEY;

console.log(`GEMINI_API_KEY loaded: ${!!apiKey}`);

if (!apiKey) {
  console.error("Error: GEMINI_API_KEY is missing in environment variables. Please check your .env file.");
  // process.exit(1); // Not exiting so the rest of the app can run, or can exit if we want.
}

const genAI = new GoogleGenerativeAI(apiKey || 'dummy_key_to_prevent_crash');

// Use this model for simple text tasks
const geminiModel = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

module.exports = {
  genAI,
  geminiModel
};

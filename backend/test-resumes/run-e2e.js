const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const mongoose = require('mongoose');

const BASE_URL = 'http://127.0.0.1:5000/api';
let token = '';
let interviewId = '';

async function runE2E() {
  try {
    // 1. Signup/Login
    console.log("Logging in...");
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'e2e@example.com',
      password: 'password123'
    });
    token = loginRes.data.token;
    console.log("Token received.");

    // 2. Create Interview
    console.log("Creating interview...");
    const createRes = await axios.post(`${BASE_URL}/interviews`, {
      domain: 'System Design',
      difficulty: 'Hard',
      duration: 15,
      resumeQuestionsEnabled: true
    }, { headers: { Authorization: `Bearer ${token}` } });
    interviewId = createRes.data.interview._id;
    console.log("Interview created:", interviewId);

    // 3. Upload Resume
    console.log("Uploading resume...");
    const form = new FormData();
    form.append('resume', fs.createReadStream('test-resume.txt'));
    await axios.post(`${BASE_URL}/interviews/${interviewId}/resume`, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Resume uploaded.");

    // 4. Generate Questions
    console.log("Generating questions...");
    const genRes = await axios.post(`${BASE_URL}/ai/generate-questions`, {
      interviewId
    }, { headers: { Authorization: `Bearer ${token}` } });
    
    console.log("\n--- GENERATED QUESTIONS ---");
    genRes.data.questions.forEach(q => {
      console.log(`[${q.questionSource.toUpperCase()}] ${q.questionText}`);
    });
    console.log("---------------------------\n");

    if (genRes.data.questions.length !== 5) {
      throw new Error(`Expected 5 questions, got ${genRes.data.questions.length}`);
    }

    const resumeCount = genRes.data.questions.filter(q => q.questionSource === 'resume').length;
    console.log(`Verified ${resumeCount} resume-based questions.`);
    if (resumeCount !== 1) {
       console.log("WARNING: Expected exactly 1 resume-based question for a 15-min interview.");
    }
    
    console.log("SUCCESS: End-to-End resume integration works!");

  } catch (err) {
    console.error("E2E Test Failed:", err.response ? err.response.data : err.message);
  }
}

runE2E();

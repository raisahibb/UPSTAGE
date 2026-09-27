import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CandidateLayout from '../../../layouts/CandidateLayout';
import { createInterview, uploadResume, generateInterviewQuestions } from '../../../services/apiService';

import SetupHeader from './components/SetupHeader';
import DomainSelection from './components/DomainSelection';
import DifficultySelection from './components/DifficultySelection';
import DurationSelection from './components/DurationSelection';
import ResumeUpload from './components/ResumeUpload';
import SetupSummary from './components/SetupSummary';

const DOMAINS = [
  "Frontend Engineering",
  "Backend Development",
  "Full Stack Development",
  "Data Structures",
  "System Design",
  "Behavioral"
];

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const DURATIONS = ["15 minutes", "30 minutes", "45 minutes"];

const InterviewSetupPage = () => {
  const navigate = useNavigate();

  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeQuestionsEnabled, setResumeQuestionsEnabled] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Resume file must be under 5MB");
        return;
      }
      setResumeName(file.name);
      setResumeFile(file);
      setResumeQuestionsEnabled(true);
      setError("");
    }
  };

  const handleStartInterview = async () => {
    if (!selectedDomain) return setError("Please select an interview domain.");
    if (!selectedDifficulty) return setError("Please select a difficulty level.");
    if (!selectedDuration) return setError("Please select an interview duration.");

    setError("");
    setLoading(true);

    try {
      setLoadingText("Preparing your interview...");
      const durationValue = parseInt(selectedDuration.split(' ')[0]) || 15;
      const interviewRes = await createInterview(selectedDomain, selectedDifficulty, durationValue, resumeQuestionsEnabled);
      const interviewId = interviewRes.interview._id;

      if (resumeFile) {
        setLoadingText("Uploading resume...");
        await uploadResume(interviewId, resumeFile);
      }

      setLoadingText("Generating AI questions...");
      const questionsRes = await generateInterviewQuestions(interviewId);

      setLoading(false);
      navigate('/interview', {
        state: {
          interviewId,
          domain: selectedDomain,
          difficulty: selectedDifficulty,
          duration: selectedDuration,
          resumeName: resumeName,
          // Pass the source so the interview room can show a subtle notification
          questionSource: questionsRes.source || 'ai',
          fallbackMessage: questionsRes.source === 'fallback' ? questionsRes.message : null,
        }
      });
    } catch (err) {
      setLoading(false);
      // 503 = both Gemini and fallback failed — recoverable, don't destroy the interview
      if (err.message && err.message.toLowerCase().includes('unable to prepare')) {
        setError("Unable to prepare interview questions right now. Please try again in a moment.");
      } else {
        setError(err.message || "Failed to start interview. Please try again.");
      }
    }
  };

  return (
    <CandidateLayout>
      <SetupHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="mb-8">
            <h1 className="dashBadaTitle mb-2">Set up your mock interview</h1>
            <p className="dashChhotaText">Customize the interview parameters to match your goals.</p>
          </div>

          {error && (
            <div className="p-4 rounded-md bg-red-50 text-red-600 text-sm border border-red-200 font-medium">
              {error}
            </div>
          )}

          <DomainSelection 
            domains={DOMAINS} 
            selectedDomain={selectedDomain} 
            setSelectedDomain={setSelectedDomain} 
            setError={setError} 
          />
          <DifficultySelection 
            difficulties={DIFFICULTIES} 
            selectedDifficulty={selectedDifficulty} 
            setSelectedDifficulty={setSelectedDifficulty} 
            setError={setError} 
          />
          <DurationSelection 
            durations={DURATIONS} 
            selectedDuration={selectedDuration} 
            setSelectedDuration={setSelectedDuration} 
            setError={setError} 
          />
          <ResumeUpload 
            resumeName={resumeName} 
            handleResumeUpload={handleResumeUpload} 
            resumeQuestionsEnabled={resumeQuestionsEnabled}
            setResumeQuestionsEnabled={setResumeQuestionsEnabled}
          />
        </div>

        <SetupSummary 
          selectedDomain={selectedDomain}
          selectedDifficulty={selectedDifficulty}
          selectedDuration={selectedDuration}
          resumeName={resumeName}
          handleStartInterview={handleStartInterview}
          loading={loading}
          loadingText={loadingText}
        />
      </div>
    </CandidateLayout>
  );
};

export default InterviewSetupPage;

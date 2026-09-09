import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CandidateLayout from '../../../layouts/CandidateLayout';

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
  const [error, setError] = useState("");

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
      setError("");
    }
  };

  const handleStartInterview = () => {
    if (!selectedDomain) {
      setError("Please select an interview domain.");
      return;
    }
    if (!selectedDifficulty) {
      setError("Please select a difficulty level.");
      return;
    }
    if (!selectedDuration) {
      setError("Please select an interview duration.");
      return;
    }

    setError("");
    navigate('/interview', {
      state: {
        domain: selectedDomain,
        difficulty: selectedDifficulty,
        duration: selectedDuration,
        resumeName: resumeName
      }
    });
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
          />
        </div>

        <SetupSummary 
          selectedDomain={selectedDomain}
          selectedDifficulty={selectedDifficulty}
          selectedDuration={selectedDuration}
          resumeName={resumeName}
          handleStartInterview={handleStartInterview}
        />
      </div>
    </CandidateLayout>
  );
};

export default InterviewSetupPage;

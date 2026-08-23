// Ye page interview configure karne ke liye hai (Domain, Difficulty, Duration, etc.).
// Abhi backend connected nahi hai, toh form state locally manage ki jaa rahi hai.
// Yaha se start karne par placeholder interview room me navigate karega.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CandidateLayout from '../../layouts/CandidateLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { ArrowLeft, Upload, FileText, Settings, Clock, Target, PlayCircle } from 'lucide-react';

// Ye options abhi frontend mein fixed hain.
// Baad mein backend se bhi load kar sakte hain agar requirement ho.
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

  // Local state for configuration
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [error, setError] = useState("");

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
      setError(""); // clear error if any
    }
  };

  const handleStartInterview = () => {
    // Agar saari required values select hain tabhi interview start hoga.
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

    // Configuration theek hai, placeholder room mein navigate karo
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
      
      {/* Top Navigation */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-[var(--color-secondary-text)] hover:text-[var(--color-primary)] transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium text-sm">Back to Dashboard</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Configuration Options */}
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

          {/* Domain Selection */}
          <Card className="formBox">
            <div className="flex items-center gap-2 mb-4">
              <Target size={20} className="text-[var(--color-primary)]" />
              <h2 className="font-heading text-lg font-bold text-[var(--color-primary)]">Select Domain</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {DOMAINS.map(domain => (
                <button
                  key={domain}
                  onClick={() => { setSelectedDomain(domain); setError(""); }}
                  className={`text-sm font-medium border rounded-lg p-3 text-left transition-all ${
                    selectedDomain === domain 
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-md'
                      : 'border-[var(--color-border)] text-[var(--color-secondary-text)] hover:border-[var(--color-primary-light)]'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </Card>

          {/* Difficulty Selection */}
          <Card className="formBox">
            <div className="flex items-center gap-2 mb-4">
              <Settings size={20} className="text-[var(--color-primary)]" />
              <h2 className="font-heading text-lg font-bold text-[var(--color-primary)]">Difficulty Level</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {DIFFICULTIES.map(diff => (
                <button
                  key={diff}
                  onClick={() => { setSelectedDifficulty(diff); setError(""); }}
                  className={`text-sm font-medium border rounded-full px-6 py-2 transition-all ${
                    selectedDifficulty === diff 
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-md'
                      : 'border-[var(--color-border)] text-[var(--color-secondary-text)] hover:bg-[var(--color-background)]'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </Card>

          {/* Duration Selection */}
          <Card className="formBox">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={20} className="text-[var(--color-primary)]" />
              <h2 className="font-heading text-lg font-bold text-[var(--color-primary)]">Interview Duration</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {DURATIONS.map(dur => (
                <button
                  key={dur}
                  onClick={() => { setSelectedDuration(dur); setError(""); }}
                  className={`text-sm font-medium border rounded-lg px-5 py-2.5 transition-all ${
                    selectedDuration === dur 
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-md'
                      : 'border-[var(--color-border)] text-[var(--color-secondary-text)] hover:border-[var(--color-primary-light)]'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </Card>

          {/* Resume Upload */}
          <Card className="formBox">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-[var(--color-primary)]" />
                <h2 className="font-heading text-lg font-bold text-[var(--color-primary)]">Upload Resume (Optional)</h2>
              </div>
            </div>
            <p className="text-sm text-[var(--color-secondary-text)] mb-4">
              Uploading a resume helps the AI personalize questions based on your experience.
            </p>
            
            <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-6 flex flex-col items-center justify-center bg-[var(--color-background)] relative hover:border-[var(--color-primary-light)] transition-colors">
              <input 
                type="file" 
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="primary-gradient-bg p-3 rounded-full mb-3">
                <Upload size={24} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-[var(--color-primary-text)]">
                {resumeName ? resumeName : "Click to browse or drag and drop"}
              </span>
              {!resumeName && (
                <span className="text-xs text-[var(--color-secondary-text)] mt-1">PDF, DOCX up to 5MB</span>
              )}
            </div>
          </Card>

        </div>

        {/* Right Side: Summary Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="summaryBox border-2 border-[var(--color-primary-light)] shadow-sm">
              <h2 className="font-heading text-xl font-bold text-[var(--color-primary)] mb-6 border-b border-[var(--color-border)] pb-4">
                Interview Summary
              </h2>
              
              <div className="space-y-5 mb-8">
                <div>
                  <span className="block text-xs font-semibold text-[var(--color-secondary-text)] uppercase tracking-wider mb-1">Domain</span>
                  <span className="text-sm font-medium text-[var(--color-primary-text)]">
                    {selectedDomain || <span className="text-gray-400 italic">Not selected</span>}
                  </span>
                </div>
                
                <div>
                  <span className="block text-xs font-semibold text-[var(--color-secondary-text)] uppercase tracking-wider mb-1">Difficulty</span>
                  <span className="text-sm font-medium text-[var(--color-primary-text)]">
                    {selectedDifficulty || <span className="text-gray-400 italic">Not selected</span>}
                  </span>
                </div>
                
                <div>
                  <span className="block text-xs font-semibold text-[var(--color-secondary-text)] uppercase tracking-wider mb-1">Duration</span>
                  <span className="text-sm font-medium text-[var(--color-primary-text)]">
                    {selectedDuration || <span className="text-gray-400 italic">Not selected</span>}
                  </span>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-[var(--color-secondary-text)] uppercase tracking-wider mb-1">Resume Context</span>
                  <span className="text-sm font-medium text-[var(--color-primary-text)]">
                    {resumeName ? "Uploaded" : <span className="text-gray-400 italic">None</span>}
                  </span>
                </div>
              </div>

              <div className="btnBox pt-4 border-t border-[var(--color-border)]">
                <Button 
                  variant="primary" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleStartInterview}
                  disabled={!selectedDomain || !selectedDifficulty || !selectedDuration}
                >
                  <PlayCircle size={20} />
                  Start Interview
                </Button>
                {(!selectedDomain || !selectedDifficulty || !selectedDuration) && (
                  <p className="text-xs text-center text-[var(--color-secondary-text)] mt-3">
                    Please complete all required selections to start.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>

      </div>
    </CandidateLayout>
  );
};

export default InterviewSetupPage;

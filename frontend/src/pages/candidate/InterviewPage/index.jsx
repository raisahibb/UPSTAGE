import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import InterviewHeader from './components/InterviewHeader';
import AIInterviewer from './components/AIInterviewer';
import ContextCard from './components/ContextCard';
import QuestionAnswer from './components/QuestionAnswer';
import InterviewControls from './components/InterviewControls';
import InterviewCompleted from './components/InterviewCompleted';

import bgImg from '../../../img/bg_img.png';

const SAMPLE_QUESTIONS = [
  "Tell me about yourself and your background.",
  "Explain the difference between process and thread.",
  "What is a REST API and how does it work?",
  "Describe a challenging project you worked on and how you handled it."
];

const InterviewPage = () => {
  const location = useLocation();
  const config = location.state || {};

  // State setup
  const [interviewState, setInterviewState] = useState('ready'); // ready, thinking, answering, submitted, completed
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  
  // Controls state
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  // Timer state
  const getDurationSeconds = () => {
    if (!config.duration) return 15 * 60;
    const mins = parseInt(config.duration.split(' ')[0]) || 15;
    return mins * 60;
  };
  const [timeLeft, setTimeLeft] = useState(getDurationSeconds());

  useEffect(() => {
    if (interviewState === 'completed') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setInterviewState('completed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [interviewState]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleEndInterview = () => {
    if (window.confirm("Are you sure you want to end the interview early?")) {
      setInterviewState('completed');
    }
  };

  const handleSubmit = () => {
    if (!answerText.trim()) return;
    setInterviewState('submitted');
  };

  const handleNextQuestion = () => {
    setAnswerText('');
    if (currentQuestionIndex < SAMPLE_QUESTIONS.length - 1) {
      setInterviewState('thinking');
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setInterviewState('ready');
      }, 1500);
    } else {
      setInterviewState('completed');
    }
  };

  if (interviewState === 'completed') {
    return <InterviewCompleted config={config} />;
  }

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat bg-fixed relative"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.75), rgba(248, 250, 252, 0.85)), url(${bgImg})`
      }}
    >
      <InterviewHeader config={config} timeLeft={timeLeft} formatTime={formatTime} />

      <main className="flex-1 w-full max-w-[1360px] mx-auto px-6 py-5 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[40%] flex flex-col gap-5">
          <AIInterviewer interviewState={interviewState} />
          <ContextCard config={config} />
        </div>

        <QuestionAnswer 
          interviewState={interviewState}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={SAMPLE_QUESTIONS.length}
          currentQuestion={SAMPLE_QUESTIONS[currentQuestionIndex]}
          answerText={answerText}
          setAnswerText={setAnswerText}
          setInterviewState={setInterviewState}
          handleSubmit={handleSubmit}
          handleNextQuestion={handleNextQuestion}
        />
      </main>

      <InterviewControls 
        isMicOn={isMicOn}
        setIsMicOn={setIsMicOn}
        isVideoOn={isVideoOn}
        setIsVideoOn={setIsVideoOn}
        handleEndInterview={handleEndInterview}
      />
    </div>
  );
};

export default InterviewPage;

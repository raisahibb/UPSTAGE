import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { 
  Clock, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff,
  Send,
  ChevronRight,
  Bot
} from 'lucide-react';

import upstageLogo from '../../img/02_upstage_horizontal_logo.png';
import bgImg from '../../img/bg_img.png';

// Abhi sample questions use kar rahe hain, baad mein AI se questions aayenge.
const SAMPLE_QUESTIONS = [
  "Tell me about yourself and your background.",
  "Explain the difference between process and thread.",
  "What is a REST API and how does it work?",
  "Describe a challenging project you worked on and how you handled it."
];

const InterviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state || {};

  // State setup
  const [interviewState, setInterviewState] = useState('ready'); // ready, thinking, answering, submitted, completed
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  
  // Controls state
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  // Timer state - Default 15 mins if not set
  const getDurationSeconds = () => {
    if (!config.duration) return 15 * 60;
    const mins = parseInt(config.duration.split(' ')[0]) || 15;
    return mins * 60;
  };
  const [timeLeft, setTimeLeft] = useState(getDurationSeconds());

  // Ye timer selected interview duration se start hota hai.
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

  // Answer submit hone par next question dikhayenge.
  const handleSubmit = () => {
    if (!answerText.trim()) return;
    setInterviewState('submitted');
  };

  const handleNextQuestion = () => {
    setAnswerText('');
    if (currentQuestionIndex < SAMPLE_QUESTIONS.length - 1) {
      setInterviewState('thinking');
      // Simulate AI thinking delay
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setInterviewState('ready');
      }, 1500);
    } else {
      // Final question ke baad interview complete screen show hogi.
      setInterviewState('completed');
    }
  };

  const currentQuestion = SAMPLE_QUESTIONS[currentQuestionIndex];

  // Render Completed State
  if (interviewState === 'completed') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.75), rgba(248, 250, 252, 0.85)), url(${bgImg})`
        }}
      >
        <Card className="max-w-xl w-full text-center p-10 shadow-lg border border-[var(--color-border)]">
          <div className="flex justify-center mb-6">
            <img src={upstageLogo} alt="UPSTAGE" className="h-10 w-auto object-contain" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-[var(--color-primary)] mb-2">
            Interview Completed
          </h1>
          <p className="text-[var(--color-secondary-text)] mb-8">
            Your interview session has been successfully completed. Thank you for your time.
          </p>
          
          <div className="bg-white border border-[var(--color-border)] rounded-lg p-6 mb-8 text-left">
            <h3 className="font-heading text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] pb-2">
              Session Summary
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-[var(--color-secondary-text)]">Domain:</span>
                <span className="font-semibold text-[var(--color-primary-text)]">{config.domain || 'Not specified'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[var(--color-secondary-text)]">Difficulty:</span>
                <span className="font-semibold text-[var(--color-primary-text)]">{config.difficulty || 'Not specified'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[var(--color-secondary-text)]">Duration:</span>
                <span className="font-semibold text-[var(--color-primary-text)]">{config.duration || 'Not specified'}</span>
              </li>
            </ul>
          </div>
          
          <Button onClick={() => navigate('/dashboard')} variant="primary" className="w-full">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  // Active Interview State
  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat bg-fixed relative"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.75), rgba(248, 250, 252, 0.85)), url(${bgImg})`
      }}
    >
      {/* Top Header */}
      <header className="bg-white border-b border-[var(--color-border)] px-4 py-2.5 sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={upstageLogo} alt="UPSTAGE" className="h-6 w-auto object-contain hidden sm:block" />
            <div className="h-5 w-px bg-[var(--color-border)] hidden sm:block"></div>
            <div>
              <h2 className="font-heading font-bold text-[var(--color-primary)] text-sm md:text-base leading-tight">
                {config.domain || 'Mock'} Interview
              </h2>
            </div>
          </div>
          <div className={`flex items-center gap-2 border px-4 py-2 rounded-full shadow-sm transition-colors ${timeLeft < 300 ? 'bg-red-50 border-red-200' : 'bg-white border-[var(--color-border)]'}`}>
            <Clock size={18} className={timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-[var(--color-primary)]'} />
            <span className={`font-heading font-bold tracking-wider ${timeLeft < 300 ? 'text-red-600' : 'text-[var(--color-primary-text)]'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1360px] mx-auto px-6 py-5 flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: AI Interviewer */}
        <div className="w-full lg:w-[40%] flex flex-col gap-5">
          <Card className="flex-1 flex flex-col overflow-hidden p-0 border border-[var(--color-border)] shadow-sm bg-white min-h-[340px]">
            <div className="bg-[var(--color-background)] py-2.5 px-4 border-b border-[var(--color-border)] flex justify-between items-center">
              <span className="font-heading font-semibold text-[var(--color-primary-text)] text-xs uppercase tracking-wider">
                AI Interviewer
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider ${
                interviewState === 'thinking' ? 'bg-amber-100 text-amber-700' :
                interviewState === 'ready' ? 'bg-green-100 text-green-700' :
                'bg-indigo-100 text-[var(--color-primary)]'
              }`}>
                {interviewState}
              </span>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-white to-[var(--color-background)] relative">
              <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-5 shadow-xl transition-all duration-500 ${
                interviewState === 'thinking' ? 'bg-amber-50 ring-4 ring-amber-100 scale-105' :
                'bg-gradient-to-br from-[#6366f1] to-[#4f46e5] ring-8 ring-indigo-50'
              }`}>
                <Bot size={48} className={interviewState === 'thinking' ? 'text-amber-500 animate-pulse' : 'text-white'} />
              </div>
              
              {interviewState === 'thinking' ? (
                <p className="text-sm text-[var(--color-secondary-text)] font-medium animate-pulse">
                  AI is preparing the next question...
                </p>
              ) : (
                <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full border border-indigo-100 shadow-sm">
                  <div className="flex gap-1 items-end h-4">
                    <span className="w-1 bg-indigo-500 rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ height: '60%' }}></span>
                    <span className="w-1 bg-indigo-500 rounded-full animate-[pulse_1s_ease-in-out_infinite_0.2s]" style={{ height: '100%' }}></span>
                    <span className="w-1 bg-indigo-500 rounded-full animate-[pulse_1s_ease-in-out_infinite_0.4s]" style={{ height: '40%' }}></span>
                    <span className="w-1 bg-indigo-500 rounded-full animate-[pulse_1s_ease-in-out_infinite_0.6s]" style={{ height: '80%' }}></span>
                  </div>
                  <span className="text-sm font-bold tracking-wide uppercase">Listening</span>
                </div>
              )}
            </div>
          </Card>
          
          {/* Context Card */}
          <Card className="p-4 bg-white border border-[var(--color-border)] shadow-sm flex-none">
            <div className="flex justify-between items-center text-sm">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-[var(--color-secondary-text)] font-semibold mb-0.5">Difficulty</span>
                <span className="font-semibold text-[var(--color-primary-text)]">{config.difficulty || 'Medium'}</span>
              </div>
              <div className="w-px h-8 bg-[var(--color-border)]"></div>
              <div className="flex flex-col text-right">
                <span className="text-[11px] uppercase tracking-wider text-[var(--color-secondary-text)] font-semibold mb-0.5">Resume</span>
                <span className="font-semibold text-[var(--color-primary-text)] truncate max-w-[120px]">
                  {config.resumeName || 'None'}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Question & Answer */}
        <div className="w-full lg:w-[60%] flex flex-col gap-5">
          <Card className="px-6 py-5 bg-white border border-[var(--color-border)] shadow-sm relative overflow-hidden flex-none">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#6366f1] to-[#4f46e5]"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded">
                Question {currentQuestionIndex + 1} of {SAMPLE_QUESTIONS.length}
              </span>
            </div>
            {interviewState === 'thinking' ? (
              <div className="space-y-2.5">
                <div className="h-5 bg-gray-100 rounded-md w-3/4 animate-pulse"></div>
                <div className="h-5 bg-gray-100 rounded-md w-1/2 animate-pulse"></div>
              </div>
            ) : (
              <p className="text-[var(--color-primary-text)] text-lg md:text-xl font-medium leading-relaxed">
                {currentQuestion}
              </p>
            )}
          </Card>

          <Card className="flex-1 flex flex-col p-5 border border-[var(--color-border)] shadow-sm bg-white min-h-[300px]">
            <div className="flex items-center mb-3">
              <span className="font-heading font-semibold text-[var(--color-primary-text)] text-xs uppercase tracking-wider">
                Your Answer
              </span>
            </div>
            <div className="flex-1 flex flex-col relative group h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] rounded-xl opacity-0 group-focus-within:opacity-20 transition duration-300 blur-sm"></div>
              <textarea
                className="relative w-full h-full resize-none border border-[var(--color-border)] rounded-xl outline-none text-[var(--color-primary-text)] p-4 text-base leading-relaxed focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-[var(--color-background)] transition-all shadow-inner disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="Type your detailed response here..."
                value={answerText}
                onChange={(e) => {
                  setAnswerText(e.target.value);
                  if (interviewState === 'ready' && e.target.value.length > 0) {
                    setInterviewState('answering');
                  }
                }}
                disabled={interviewState === 'thinking' || interviewState === 'submitted'}
              />
            </div>
            
            <div className="mt-4 flex justify-end">
              {interviewState === 'submitted' ? (
                <Button onClick={handleNextQuestion} variant="primary" className="flex items-center gap-2 px-6 py-2.5 text-sm">
                  Next Question <ChevronRight size={16} />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  variant="primary" 
                  className={`flex items-center gap-2 px-6 py-2.5 text-sm transition-all ${
                    (!answerText.trim() || interviewState === 'thinking') ? 'opacity-50 grayscale cursor-not-allowed' : ''
                  }`}
                  disabled={!answerText.trim() || interviewState === 'thinking'}
                >
                  <Send size={16} /> Submit Answer
                </Button>
              )}
            </div>
          </Card>
        </div>
      </main>

      {/* Bottom Controls */}
      <footer className="bg-white border-t border-[var(--color-border)] py-3 sticky bottom-0 z-20 mt-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.03)] h-[72px] flex items-center">
        <div className="w-full max-w-[1360px] mx-auto px-6 flex items-center justify-center gap-6">
          <button 
            onClick={() => setIsMicOn(!isMicOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 border ${
              isMicOn ? 'bg-white border-[var(--color-border)] text-gray-700 hover:bg-gray-50' 
                      : 'bg-red-50 border-red-200 text-red-600'
            }`}
            title="Toggle Microphone"
          >
            {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>
          
          <button 
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 border ${
              isVideoOn ? 'bg-white border-[var(--color-border)] text-gray-700 hover:bg-gray-50' 
                        : 'bg-red-50 border-red-200 text-red-600'
            }`}
            title="Toggle Camera"
          >
            {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>

          <button 
            onClick={handleEndInterview}
            className="w-14 h-14 rounded-full flex items-center justify-center bg-red-600 text-white hover:bg-red-700 hover:shadow-md transition-all duration-300 shadow-sm ml-2 active:scale-95"
            title="End Interview"
          >
            <PhoneOff size={22} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default InterviewPage;

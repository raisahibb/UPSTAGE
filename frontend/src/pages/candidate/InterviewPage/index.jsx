import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import InterviewHeader from './components/InterviewHeader';
import AIInterviewer from './components/AIInterviewer';
import InterviewInfo from './components/InterviewInfo';
import QuestionAnswer from './components/QuestionAnswer';
import InterviewControls from './components/InterviewControls';
import InterviewCompleted from './components/InterviewCompleted';

import { getInterviewQuestions, getInterviewDetails, updateInterviewStatus, reportInterviewViolation, submitInterviewResponse, evaluateInterviewResponse, evaluateInterview, generatePerformanceReport } from '../../../services/apiService';
import bgImg from '../../../img/bg_img.png';

const InterviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state || {};

  // State setup
  const [questions, setQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [interviewState, setInterviewState] = useState('ready'); // ready, thinking, answering, submitted, completed
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  
  // Controls state
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [speechError, setSpeechError] = useState('');
  const recognitionRef = useRef(null);

  const [isVideoOn, setIsVideoOn] = useState(true);

  // Security state
  const [secureState, setSecureState] = useState('entry'); // 'entry', 'active', 'violation'
  const [expiresAt, setExpiresAt] = useState(null);
  const [backendStatus, setBackendStatus] = useState('scheduled');
  const [violationMessage, setViolationMessage] = useState('');

  // Initial timer state
  const [timeLeft, setTimeLeft] = useState(0);
  // Fallback notification — shown when questions came from curated bank
  const [fallbackBannerDismissed, setFallbackBannerDismissed] = useState(false);
  const fallbackMessage = config.fallbackMessage || null;

  // Load interview details & questions from backend
  useEffect(() => {
    const initInterview = async () => {
      if (!config.interviewId) {
        setIsLoadingQuestions(false);
        return;
      }
      try {
        const detailsRes = await getInterviewDetails(config.interviewId);
        const interview = detailsRes.interview;
        setBackendStatus(interview.status);
        
        if (interview.status === 'completed') {
          setInterviewState('completed');
          setIsLoadingQuestions(false);
          return;
        }

        if (interview.status === 'in-progress' && interview.expiresAt) {
          setExpiresAt(new Date(interview.expiresAt));
        }

        const res = await getInterviewQuestions(config.interviewId);
        setQuestions(res.questions || []);
      } catch (err) {
        console.error("Failed to load interview", err);
      } finally {
        setIsLoadingQuestions(false);
      }
    };
    initInterview();
  }, [config.interviewId]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let interim = '';
        let finalStr = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalStr += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        if (finalStr) {
          setAnswerText((prev) => {
            const separator = (prev.length > 0 && !prev.endsWith(' ') && !prev.endsWith('\n')) ? ' ' : '';
            return prev + separator + finalStr.trim() + ' ';
          });
        }
        setInterimText(interim);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setInterimText('');
        
        switch(event.error) {
          case 'not-allowed':
          case 'permission-denied':
            setSpeechError('Microphone permission denied.');
            break;
          case 'no-speech':
            setSpeechError('No speech detected.');
            break;
          case 'audio-capture':
            setSpeechError('Microphone could not be accessed.');
            break;
          default:
            setSpeechError('Speech input is unavailable.');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setInterimText('');
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech input is not supported in this browser. You can type your answer instead.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setSpeechError('');
      setInterimText('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
        if (interviewState === 'ready') {
          setInterviewState('answering');
        }
      } catch (e) {
        console.error("Speech recognition start failed:", e);
      }
    }
  };

  // Handle entering fullscreen and starting/resuming interview
  const requestFullscreenAndStart = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      
      // Only start if it's currently scheduled
      if (backendStatus === 'scheduled') {
        const res = await updateInterviewStatus(config.interviewId, 'in-progress');
        setBackendStatus('in-progress');
        if (res.interview.expiresAt) {
          setExpiresAt(new Date(res.interview.expiresAt));
        }
      }
      setSecureState('active');
    } catch (err) {
      console.error("Fullscreen request failed", err);
      alert("Fullscreen mode is required for this interview. Please allow fullscreen in your browser.");
    }
  };

  const finalizeInterview = async () => {
    setInterviewState('evaluating');
    if (config.interviewId) {
      try {
        await updateInterviewStatus(config.interviewId, 'completed');
        // Trigger final evaluation to aggregate and verify everything is scored
        await evaluateInterview(config.interviewId);
        // Generate final performance report
        await generatePerformanceReport(config.interviewId);
        navigate(`/interview/${config.interviewId}/details`);
      } catch (error) {
        console.error("Failed to finalize interview:", error);
        navigate(`/interview/${config.interviewId}/details`);
      }
    } else {
      setInterviewState('completed');
    }
  };

  // Timer logic - Backend expiry time is the source of truth for the timer
  useEffect(() => {
    if (interviewState === 'completed' || secureState !== 'active' || !expiresAt) return;

    const calculateRemaining = () => Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));

    // Initial calculation when effect runs
    let remaining = calculateRemaining();
    setTimeLeft(remaining);

    if (remaining === 0) {
      finalizeInterview();
      return;
    }

    const timer = setInterval(() => {
      const currentRemaining = calculateRemaining();
      setTimeLeft(currentRemaining);

      if (currentRemaining === 0) {
        clearInterval(timer);
        finalizeInterview();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [interviewState, secureState, expiresAt, config.interviewId]);

  // Fullscreen and Visibility monitoring
  useEffect(() => {
    if (secureState !== 'active' || interviewState === 'completed') return;

    // Detect when the candidate leaves the interview tab or exits fullscreen
    const handleViolation = async (reason) => {
      setSecureState('violation');
      setViolationMessage(reason);
      try {
        const res = await reportInterviewViolation(config.interviewId);
        if (res.terminated) {
          setInterviewState('completed');
          alert("Interview ended because the secure interview requirements were repeatedly violated.");
        }
      } catch (err) {
        console.error("Failed to report violation", err);
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        handleViolation('Interview focus was lost. Please remain in fullscreen mode.');
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleViolation('Interview tab was hidden. Please keep the interview active.');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [secureState, interviewState, config.interviewId]);

  // Clean up fullscreen on exit/unmount
  useEffect(() => {
    return () => {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(err => console.log("Exit fullscreen error:", err));
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  

  const handleEndInterview = () => {
    if (window.confirm("Are you sure you want to end the interview early?")) {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
      finalizeInterview();
    }
  };

  const handleSubmit = async () => {
    if ((!answerText.trim() && !interimText.trim()) || questions.length === 0) return;
    
    // Safety check - do not allow submit if expired or not active
    if (interviewState === 'completed' || secureState !== 'active') return;

    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    
    try {
      const currentQ = questions[currentQuestionIndex];
      const finalSubmissionText = answerText + (interimText ? ' ' + interimText : '');
      const submitRes = await submitInterviewResponse(config.interviewId, currentQ._id, finalSubmissionText, 'text');
      
      // Fire-and-forget background evaluation
      if (submitRes.success && submitRes.response?._id) {
        evaluateInterviewResponse(submitRes.response._id).catch(err => {
          console.error("Background evaluation failed for response", submitRes.response._id, err);
        });
      }

      setInterviewState('submitted');
    } catch (err) {
      console.error("Failed to submit response", err);
      alert("Failed to submit answer. Please try again.");
    }
  };

  const handleNextQuestion = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    setAnswerText('');
    setInterimText('');
    setSpeechError('');
    if (currentQuestionIndex < questions.length - 1) {
      setInterviewState('thinking');
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setInterviewState('ready');
      }, 1500);
    } else {
      finalizeInterview();
    }
  };

  if (isLoadingQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-600 font-medium text-lg">Loading interview details...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 font-medium text-lg">Failed to load interview questions.</p>
      </div>
    );
  }

  if (interviewState === 'evaluating') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-600 font-medium text-lg">Evaluating your interview... Please wait.</p>
        </div>
      </div>
    );
  }

  if (interviewState === 'completed') {
    return <InterviewCompleted config={config} />;
  }

  if (secureState === 'entry') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 text-center shadow-2xl border border-gray-700">
          <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Secure Interview Mode</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Please keep this window in fullscreen mode during the interview. 
            Switching tabs or leaving the interview screen may be recorded as a violation.
          </p>
          <button 
            onClick={requestFullscreenAndStart}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-600/30"
          >
            {backendStatus === 'in-progress' ? 'Resume Interview' : 'Enter Interview'}
          </button>
        </div>
      </div>
    );
  }

  if (secureState === 'violation') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 text-center shadow-2xl border border-red-500/30">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">Interview Focus Lost</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            {violationMessage}
          </p>
          <button 
            onClick={requestFullscreenAndStart}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-600/30"
          >
            Return to Fullscreen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat bg-fixed relative"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.75), rgba(248, 250, 252, 0.85)), url(${bgImg})`
      }}
    >
      <InterviewHeader config={config} timeLeft={timeLeft} formatTime={formatTime} />

      {/* Fallback Notification Banner */}
      {fallbackMessage && !fallbackBannerDismissed && (
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 pt-4">
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-lg px-4 py-3">
            <span className="text-blue-500 mt-0.5">ℹ️</span>
            <span className="flex-1">{fallbackMessage}</span>
            <button
              onClick={() => setFallbackBannerDismissed(true)}
              className="text-blue-400 hover:text-blue-700 font-bold ml-2 text-base leading-none"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-6 py-6 flex flex-col gap-6 h-full min-h-0">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 min-h-0">
          <AIInterviewer interviewState={interviewState} isVideoOn={isVideoOn} />
          
          <QuestionAnswer 
            interviewState={interviewState}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            currentQuestion={questions[currentQuestionIndex]?.questionText}
            answerText={answerText}
            setAnswerText={setAnswerText}
            setInterviewState={setInterviewState}
            handleSubmit={handleSubmit}
            handleNextQuestion={handleNextQuestion}
            isListening={isListening}
            interimText={interimText}
            speechError={speechError}
          />
        </div>
        
        <InterviewInfo config={config} />
      </main>

      <InterviewControls 
        isListening={isListening}
        toggleListening={toggleListening}
        isVideoOn={isVideoOn}
        setIsVideoOn={setIsVideoOn}
        handleEndInterview={handleEndInterview}
      />
    </div>
  );
};

export default InterviewPage;

import React from 'react';
import Card from '../../../../components/common/Card';
import Button from '../../../../components/common/Button';
import { Send, ChevronRight, Info } from 'lucide-react';

const QuestionAnswer = ({ 
  interviewState, 
  currentQuestionIndex, 
  totalQuestions, 
  currentQuestion, 
  answerText, 
  setAnswerText, 
  setInterviewState, 
  handleSubmit, 
  handleNextQuestion,
  isListening,
  interimText,
  speechError
}) => {
  return (
    <div className="flex flex-col gap-6 h-full min-w-0">
      <Card className="p-5 md:p-6 bg-white border border-[var(--color-border)] shadow-sm rounded-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Behavioral
          </span>
        </div>
        
        <div className="text-[var(--color-primary-text)] text-lg md:text-xl font-medium leading-relaxed" style={{ overflowWrap: 'anywhere' }}>
          {interviewState === 'thinking' ? (
            <div className="space-y-3">
              <div className="h-6 bg-gray-100 rounded-md w-[90%] animate-pulse"></div>
              <div className="h-6 bg-gray-100 rounded-md w-[60%] animate-pulse"></div>
            </div>
          ) : (
            currentQuestion
          )}
        </div>

        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mt-2 flex gap-3 items-start">
          <Info size={18} className="text-blue-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-blue-800 mb-0.5">Tip</h4>
            <p className="text-sm text-blue-600/80 leading-relaxed">
              Use the STAR method (Situation, Task, Action, Result) to structure your answer clearly and effectively.
            </p>
          </div>
        </div>
      </Card>

      <Card className="flex-1 flex flex-col p-5 md:p-6 bg-white border border-[var(--color-border)] shadow-sm rounded-2xl min-h-[280px]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">
            Your Answer
          </span>
          <div className="flex items-center gap-2">
            {isListening && (
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> Listening...
              </span>
            )}
            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
              {(answerText + interimText).length} chars
            </span>
          </div>
        </div>
        
        {speechError && (
          <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600 font-medium">
            {speechError}
          </div>
        )}

        <div className="flex-1 relative flex flex-col min-h-[150px]">
          <textarea
            className="absolute inset-0 w-full h-full resize-none border border-gray-200 rounded-xl outline-none text-[var(--color-primary-text)] p-4 text-base leading-relaxed focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-gray-50 transition-all shadow-inner disabled:opacity-60 disabled:cursor-not-allowed"
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
          {interimText && (
            <div className="absolute inset-0 pointer-events-none p-4 text-base leading-relaxed overflow-hidden">
              <span className="invisible whitespace-pre-wrap">{answerText + (answerText && !answerText.endsWith(' ') && !answerText.endsWith('\n') ? ' ' : '')}</span>
              <span className="text-gray-400 bg-gray-100/50 rounded italic whitespace-pre-wrap">{interimText}</span>
            </div>
          )}
        </div>
        
        <div className="mt-5 flex justify-end">
          {interviewState === 'submitted' ? (
            <Button onClick={handleNextQuestion} variant="primary" className="flex items-center gap-2 px-6 py-2.5 text-sm rounded-xl">
              Next Question <ChevronRight size={16} />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              variant="primary" 
              className={`flex items-center gap-2 px-6 py-2.5 text-sm rounded-xl transition-all ${
                (!(answerText.trim() || interimText.trim()) || interviewState === 'thinking') ? 'opacity-50 grayscale cursor-not-allowed' : ''
              }`}
              disabled={!(answerText.trim() || interimText.trim()) || interviewState === 'thinking'}
            >
              <Send size={16} /> Submit Answer
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuestionAnswer;

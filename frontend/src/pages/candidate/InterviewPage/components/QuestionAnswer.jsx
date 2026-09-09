import React from 'react';
import Card from '../../../../components/common/Card';
import Button from '../../../../components/common/Button';
import { Send, ChevronRight } from 'lucide-react';

const QuestionAnswer = ({ 
  interviewState, 
  currentQuestionIndex, 
  totalQuestions, 
  currentQuestion, 
  answerText, 
  setAnswerText, 
  setInterviewState, 
  handleSubmit, 
  handleNextQuestion 
}) => {
  return (
    <div className="w-full lg:w-[60%] flex flex-col gap-5">
      <Card className="px-6 py-5 bg-white border border-[var(--color-border)] shadow-sm relative overflow-hidden flex-none">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#6366f1] to-[#4f46e5]"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded">
            Question {currentQuestionIndex + 1} of {totalQuestions}
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
  );
};

export default QuestionAnswer;

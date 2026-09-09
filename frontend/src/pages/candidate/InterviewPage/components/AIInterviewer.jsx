import React from 'react';
import Card from '../../../../components/common/Card';
import { Bot } from 'lucide-react';

const AIInterviewer = ({ interviewState }) => {
  return (
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
  );
};

export default AIInterviewer;

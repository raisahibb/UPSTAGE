import React from 'react';
import Card from '../../../../components/common/Card';
import { Loader2, Mic, CheckCircle2 } from 'lucide-react';
import CandidateCamera from './CandidateCamera';

import aiInterviewerImg from '../../../../img/ai_interviewer.jpg';

const AIInterviewer = ({ interviewState, isVideoOn }) => {
  return (
    <Card className="flex flex-col overflow-hidden p-0 border border-[var(--color-border)] shadow-sm bg-white aspect-[4/3] md:aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[500px] relative rounded-2xl w-full">
      
      {/* Floating Status Upper Left */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur shadow-sm px-3 py-1.5 rounded-full border border-gray-100">
        <div className={`w-2 h-2 rounded-full ${
          interviewState === 'ready' ? 'bg-emerald-500' :
          interviewState === 'thinking' ? 'bg-amber-500 animate-pulse' :
          'bg-indigo-500 animate-pulse'
        }`} />
        <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
          {interviewState}
        </span>
      </div>

      {/* Main AI Interviewer Visual */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50/30 via-white to-gray-50 relative pb-16 overflow-hidden">
        
        {/* Subtle Background Glow based on state */}
        <div className={`absolute inset-0 opacity-20 transition-all duration-1000 ${
          interviewState === 'thinking' ? 'bg-amber-400 animate-pulse' :
          (interviewState === 'answering' || interviewState === 'listening') ? 'bg-indigo-400 animate-pulse' :
          'bg-transparent'
        }`} />

        <div className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center mb-6 z-10 transition-all duration-700 ${
          interviewState === 'thinking' ? 'ring-4 ring-amber-100 scale-100' :
          interviewState === 'answering' ? 'ring-4 ring-indigo-200 scale-100' :
          interviewState === 'listening' ? 'ring-4 ring-indigo-100 scale-[1.01]' :
          'ring-4 ring-gray-50 scale-100'
        }`}>
          {/* Subtle breathing animation container */}
          <div className={`w-full h-full rounded-full overflow-hidden shadow-2xl bg-white ${
            interviewState === 'ready' ? 'animate-[pulse_4s_ease-in-out_infinite]' : ''
          }`}>
            <img 
              src={aiInterviewerImg} 
              alt="UPSTAGE AI Interviewer" 
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
        
        <h3 className="font-heading font-bold text-lg md:text-xl text-[var(--color-primary-text)] tracking-wide z-10">
          UPSTAGE AI
        </h3>
      </div>

      {/* Bottom Bar overlay for status and camera */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none gap-4">
        
        {/* Left status message */}
        <div className="bg-white/95 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-xl p-3 md:p-3.5 border border-white/50 min-w-0 max-w-[60%] pointer-events-auto">
          {interviewState === 'thinking' ? (
            <div className="flex items-center gap-2.5 text-amber-600">
              <Loader2 size={18} className="animate-spin shrink-0" />
              <span className="text-sm font-medium leading-tight line-clamp-2">Processing answer...</span>
            </div>
          ) : interviewState === 'answering' ? (
            <div className="flex items-center gap-2.5 text-indigo-600">
              <Mic size={18} className="animate-pulse shrink-0" />
              <span className="text-sm font-medium leading-tight line-clamp-2">Listening to your response...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 text-emerald-600">
              <CheckCircle2 size={18} className="shrink-0" />
              <span className="text-sm font-medium leading-tight line-clamp-2">Ready for next question</span>
            </div>
          )}
        </div>

        {/* Right PIP Camera */}
        <div className="pointer-events-auto shrink-0 shadow-xl rounded-xl">
          <CandidateCamera isVideoOn={isVideoOn} />
        </div>

      </div>

    </Card>
  );
};

export default AIInterviewer;

import React from 'react';
import Card from '../../../../components/common/Card';
import { Loader2, Mic, CheckCircle2 } from 'lucide-react';
import CandidateCamera from './CandidateCamera';

import aiInterviewerImg from '../../../../img/ai_interviewer.jpg';

const AIInterviewer = ({ interviewState, isVideoOn }) => {
  return (
    <Card className="flex flex-col overflow-hidden p-0 border border-[var(--color-border)] shadow-sm bg-white min-h-[460px] md:min-h-[500px] lg:h-full relative rounded-2xl w-full">
      
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
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50/30 via-white to-gray-50 relative pt-14 pb-4 px-4 overflow-hidden">
        
        {/* Subtle Background Glow based on state */}
        <div className={`absolute inset-0 opacity-20 transition-all duration-1000 ${
          interviewState === 'thinking' ? 'bg-amber-400 animate-pulse' :
          (interviewState === 'answering' || interviewState === 'listening') ? 'bg-indigo-400 animate-pulse' :
          'bg-transparent'
        }`} />

        <div className={`relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center mb-4 sm:mb-6 z-10 transition-all duration-700 ${
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
        
        <h3 className="font-heading font-bold text-lg md:text-xl text-[var(--color-primary-text)] tracking-wide z-10 mb-auto sm:mb-0">
          UPSTAGE AI
        </h3>

        {/* Bottom Bar overlay for status and camera */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between pointer-events-none gap-3 sm:gap-4 z-20 mt-4 sm:absolute sm:bottom-4 sm:left-4 sm:right-4 sm:w-auto">
          
          {/* Left status message */}
          <div className="bg-white/95 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-xl p-3 md:p-3.5 border border-white/50 w-full sm:min-w-0 sm:max-w-[60%] pointer-events-auto self-start sm:self-auto order-2 sm:order-1">
            {interviewState === 'thinking' ? (
              <div className="flex items-center gap-2.5 text-amber-600">
                <Loader2 size={18} className="animate-spin shrink-0" />
                <span className="text-sm font-medium leading-tight">Processing answer...</span>
              </div>
            ) : interviewState === 'answering' ? (
              <div className="flex items-center gap-2.5 text-indigo-600">
                <Mic size={18} className="animate-pulse shrink-0" />
                <span className="text-sm font-medium leading-tight">Listening to your response...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 text-emerald-600">
                <CheckCircle2 size={18} className="shrink-0" />
                <span className="text-sm font-medium leading-tight">Ready for next question</span>
              </div>
            )}
          </div>

          {/* Right PIP Camera */}
          <div className="pointer-events-auto shrink-0 shadow-xl rounded-xl self-end sm:self-auto order-1 sm:order-2 -mt-16 sm:mt-0 z-30">
            <CandidateCamera isVideoOn={isVideoOn} />
          </div>

        </div>

      </div>

    </Card>
  );
};

export default AIInterviewer;

import React from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Loader2 } from 'lucide-react';

const InterviewControls = ({ isListening, toggleListening, isVideoOn, setIsVideoOn, handleEndInterview, isEnding }) => {
  return (
    <footer className="bg-white border-t border-[var(--color-border)] py-3 sticky bottom-0 z-20 mt-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.03)] h-[72px] flex items-center mb-safe">
      <div className="w-full max-w-[1360px] mx-auto px-6 flex items-center justify-center gap-6">
        <button 
          onClick={toggleListening}
          disabled={isEnding}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${
            isEnding ? 'opacity-50 cursor-not-allowed bg-gray-100 border-gray-200' :
            isListening ? 'bg-indigo-100 border-indigo-300 text-indigo-700 animate-pulse active:scale-95 hover:shadow-md' 
                        : 'bg-white border-[var(--color-border)] text-gray-700 hover:bg-gray-50 active:scale-95 hover:shadow-md'
          }`}
          title="Toggle Microphone"
        >
          {isListening ? <Mic size={20} /> : <MicOff size={20} />}
        </button>
        
        <button 
          onClick={() => setIsVideoOn(!isVideoOn)}
          disabled={isEnding}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${
            isEnding ? 'opacity-50 cursor-not-allowed bg-gray-100 border-gray-200' :
            isVideoOn ? 'bg-white border-[var(--color-border)] text-gray-700 hover:bg-gray-50 active:scale-95 hover:shadow-md' 
                      : 'bg-red-50 border-red-200 text-red-600 active:scale-95 hover:shadow-md'
          }`}
          title="Toggle Camera"
        >
          {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
        </button>

        <button 
          onClick={handleEndInterview}
          disabled={isEnding}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-sm ml-2 ${
            isEnding ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 hover:shadow-md active:scale-95'
          }`}
          title="End Interview"
        >
          {isEnding ? <Loader2 size={22} className="animate-spin" /> : <PhoneOff size={22} />}
        </button>
      </div>
    </footer>
  );
};

export default InterviewControls;

import React from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';

const InterviewControls = ({ isMicOn, setIsMicOn, isVideoOn, setIsVideoOn, handleEndInterview }) => {
  return (
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
  );
};

export default InterviewControls;

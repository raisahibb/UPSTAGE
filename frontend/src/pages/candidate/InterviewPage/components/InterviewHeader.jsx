import React from 'react';
import { Clock } from 'lucide-react';
import upstageLogo from '../../../../img/02_upstage_horizontal_logo.png';

const InterviewHeader = ({ config, timeLeft, formatTime }) => {
  return (
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
  );
};

export default InterviewHeader;

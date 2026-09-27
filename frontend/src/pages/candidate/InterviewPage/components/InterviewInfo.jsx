import React from 'react';
import Card from '../../../../components/common/Card';
import { Target, Layers, FileText } from 'lucide-react';

const InterviewInfo = ({ config }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4 bg-white border border-[var(--color-border)] shadow-sm rounded-2xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
          <Target size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">Domain</span>
          <span className="font-bold text-gray-800 truncate">{config.domain || 'Mock Interview'}</span>
        </div>
      </Card>

      <Card className="p-4 bg-white border border-[var(--color-border)] shadow-sm rounded-2xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
          <Layers size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">Difficulty</span>
          <span className="font-bold text-gray-800 truncate">{config.difficulty || 'Medium'}</span>
        </div>
      </Card>

      <Card className="p-4 bg-white border border-[var(--color-border)] shadow-sm rounded-2xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
          <FileText size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">Resume</span>
          <span className="font-bold text-gray-800 truncate">{config.resumeName || 'Not Provided'}</span>
        </div>
      </Card>
    </div>
  );
};

export default InterviewInfo;

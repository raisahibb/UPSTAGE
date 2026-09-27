import React from 'react';
import Card from '../../../../components/common/Card';
import { FileText, Upload } from 'lucide-react';

const ResumeUpload = ({ resumeName, handleResumeUpload, resumeQuestionsEnabled, setResumeQuestionsEnabled }) => {
  return (
    <Card className="formBox">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <FileText size={20} className="text-[var(--color-primary)]" />
          <h2 className="font-heading text-lg font-bold text-[var(--color-primary)]">Upload Resume (Optional)</h2>
        </div>
      </div>
      <p className="text-sm text-[var(--color-secondary-text)] mb-4">
        Uploading a resume helps the AI personalize questions based on your experience.
      </p>
      
      <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-6 flex flex-col items-center justify-center bg-[var(--color-background)] relative hover:border-[var(--color-primary-light)] transition-colors">
        <input 
          type="file" 
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="primary-gradient-bg p-3 rounded-full mb-3">
          <Upload size={24} className="text-white" />
        </div>
        <span className="text-sm font-semibold text-[var(--color-primary-text)]">
          {resumeName ? resumeName : "Click to browse or drag and drop"}
        </span>
        {!resumeName && (
          <span className="text-xs text-[var(--color-secondary-text)] mt-1">PDF, DOCX up to 5MB</span>
        )}
      </div>

      {resumeName && (
        <div className="mt-4 flex items-center justify-between p-4 bg-indigo-50/50 rounded-lg border border-indigo-100">
          <div>
            <h3 className="font-semibold text-[var(--color-primary)] text-sm">Resume-Based Questions</h3>
            <p className="text-xs text-[var(--color-secondary-text)]">AI will use your resume to ask personalized questions.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={resumeQuestionsEnabled}
              onChange={(e) => setResumeQuestionsEnabled(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
          </label>
        </div>
      )}
    </Card>
  );
};

export default ResumeUpload;

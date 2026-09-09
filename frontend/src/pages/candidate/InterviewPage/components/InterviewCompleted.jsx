import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../../components/common/Card';
import Button from '../../../../components/common/Button';
import upstageLogo from '../../../../img/02_upstage_horizontal_logo.png';
import bgImg from '../../../../img/bg_img.png';

const InterviewCompleted = ({ config }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.75), rgba(248, 250, 252, 0.85)), url(${bgImg})`
      }}
    >
      <Card className="max-w-xl w-full text-center p-10 shadow-lg border border-[var(--color-border)]">
        <div className="flex justify-center mb-6">
          <img src={upstageLogo} alt="UPSTAGE" className="h-10 w-auto object-contain" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-[var(--color-primary)] mb-2">
          Interview Completed
        </h1>
        <p className="text-[var(--color-secondary-text)] mb-8">
          Your interview session has been successfully completed. Thank you for your time.
        </p>
        
        <div className="bg-white border border-[var(--color-border)] rounded-lg p-6 mb-8 text-left">
          <h3 className="font-heading text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] pb-2">
            Session Summary
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span className="text-[var(--color-secondary-text)]">Domain:</span>
              <span className="font-semibold text-[var(--color-primary-text)]">{config.domain || 'Not specified'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-[var(--color-secondary-text)]">Difficulty:</span>
              <span className="font-semibold text-[var(--color-primary-text)]">{config.difficulty || 'Not specified'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-[var(--color-secondary-text)]">Duration:</span>
              <span className="font-semibold text-[var(--color-primary-text)]">{config.duration || 'Not specified'}</span>
            </li>
          </ul>
        </div>
        
        <Button onClick={() => navigate('/dashboard')} variant="primary" className="w-full">
          Back to Dashboard
        </Button>
      </Card>
    </div>
  );
};

export default InterviewCompleted;

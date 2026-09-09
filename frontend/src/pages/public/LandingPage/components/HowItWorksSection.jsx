import React from 'react';

const HowItWorksSection = () => {
  return (
    <section className="bg-[var(--color-surface)] py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="sectionTitle">How It Works</h2>
          <p className="sectionSubTitle mx-auto">
            A systematic approach to interview preparation, designed for maximum skill retention.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
          
          <div className="flex flex-col items-center gap-4">
            <div className="iconGolDabba shadow-sm">
              <span>1</span>
            </div>
            <h3 className="tableTitle">Set Up</h3>
            <p className="chhotaText max-w-xs">Upload your resume and input the job description to tailor your session.</p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="iconGolDabba shadow-sm">
              <span>2</span>
            </div>
            <h3 className="tableTitle">Practice</h3>
            <p className="chhotaText max-w-xs">Engage in a dynamic, voice-driven mock interview with adaptive AI questioning.</p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="iconGolDabba shadow-sm">
              <span>3</span>
            </div>
            <h3 className="tableTitle">Feedback</h3>
            <p className="chhotaText max-w-xs">Receive instant, granular feedback on your content, delivery, and pacing.</p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

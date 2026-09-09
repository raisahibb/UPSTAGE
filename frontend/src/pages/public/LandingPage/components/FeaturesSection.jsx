import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="bg-white py-16 lg:py-24 border-b border-[var(--color-border)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="sectionTitle">Elevate Your Career Prospects</h2>
        <p className="sectionSubTitle mx-auto mb-10">
          Engineered to simulate high-pressure environments with analytical precision, giving you the edge you need.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center gap-4 p-6 bg-[var(--color-background)] rounded-xl border border-[var(--color-border)]">
             <div className="iconGolDabba bg-white shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
               </svg>
             </div>
             <h3 className="tableTitle">Resume-Aware</h3>
             <p className="chhotaText">Probes deep into past projects and stated skills, ensuring authentic practice tailored specifically to your background.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 bg-[var(--color-background)] rounded-xl border border-[var(--color-border)]">
             <div className="iconGolDabba bg-white shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
               </svg>
             </div>
             <h3 className="tableTitle">AI Evaluation</h3>
             <p className="chhotaText">Objective scoring on clarity, conciseness, and relevance with post-session analytical breakdowns of your performance.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 bg-[var(--color-background)] rounded-xl border border-[var(--color-border)]">
             <div className="iconGolDabba bg-white shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <h3 className="tableTitle">Session History</h3>
             <p className="chhotaText">Review transcripts and audio playback to monitor your progress over time through comprehensive dashboard tracking.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

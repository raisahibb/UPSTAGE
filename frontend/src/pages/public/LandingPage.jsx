// Yaha hero section ka main heading aur description dikhaya hai.
// Ye button user ko Login page par le jayega.
// Yaha right side par interview ka product preview dikhaya hai.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';
import { ArrowUp } from 'lucide-react';
import heroImage from '../../img/main page.png';

const LandingPage = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Button dabane par page smoothly top par chala jayega
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <PublicLayout>
      {/* Hero Section with subtle gradient and glow */}
      <div className="heroBg">
        <div className="heroGlow"></div>
        <section className="heroDabba flex-col lg:flex-row items-center gap-12 relative z-10">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Version Badge */}
            <div className="versionBadge">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>v2.0 Now Available</span>
            </div>
            
            <h1 className="heroBadaTitle">
              Mock Interviews <br />with <span className="text-[var(--color-primary-light)]">AI</span>
            </h1>
            
            <p className="heroChhotaText">
              Real-time, conversational, and instant feedback. Start your free practice sessions today and land your dream job!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link to="/login" className="primaryBadaBtn">
                Start Free Interview
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <button className="secondaryBadaBtn">
                How It Works
              </button>
            </div>

            {/* Why Choose Us Feature Strip */}
            <div className="featureListDabba">
              <h3 className="text-xs font-bold text-[var(--color-secondary-text)] tracking-wider uppercase mb-1">Why Choose Us?</h3>
              <div className="featureItem">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 checkIconBox" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Realistic AI-powered interview simulations
              </div>
              <div className="featureItem">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 checkIconBox" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Personalized feedback to boost your confidence
              </div>
              <div className="featureItem">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 checkIconBox" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Flexible practice anytime, anywhere
              </div>
            </div>
          </div>

          {/* Right Image/Mockup */}
          <div className="flex-1 w-full relative mt-8 lg:mt-0">
            <div className="mockupDabba">
              {/* Fake browser chrome */}
              <div className="h-10 bg-[#e2e8f0] border-b border-[#cbd5e1] flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              {/* Product Mockup Image */}
              <img 
                className="w-full h-auto object-cover aspect-[16/10] block" 
                alt="UPSTAGE AI mock interview platform" 
                src={heroImage} 
              />
            </div>
          </div>
        </section>
      </div>

      {/* Why UPSTAGE Section */}
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

      {/* How It Works Section */}
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

      {/* Thoda neeche scroll hone ke baad back to top button dikhayenge */}
      {showTopButton && (
        <button
          onClick={goTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:from-[#4f46e5] hover:to-[#4338ca] active:scale-[0.98] transition-all duration-300 z-50 flex items-center justify-center"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}

    </PublicLayout>
  );
};

export default LandingPage;

import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../../../img/main page.png';

const HeroSection = () => {
  return (
    <div className="heroBg">
      <div className="heroGlow"></div>
      <section className="heroDabba flex-col lg:flex-row items-center gap-12 relative z-10">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-6">
          
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
            <div className="h-10 bg-[#e2e8f0] border-b border-[#cbd5e1] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <img 
              className="w-full h-auto object-cover aspect-[16/10] block" 
              alt="UPSTAGE AI mock interview platform" 
              src={heroImage} 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;

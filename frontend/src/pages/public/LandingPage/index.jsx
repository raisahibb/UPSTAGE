import React, { useState, useEffect } from 'react';
import PublicLayout from '../../../layouts/PublicLayout';
import { ArrowUp } from 'lucide-react';

import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';

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

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <PublicLayout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />

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

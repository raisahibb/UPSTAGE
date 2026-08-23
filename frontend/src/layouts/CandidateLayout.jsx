// Background ko thoda visible rakha hai taaki page plain na lage.
// Sath hi halka sa overlay hai taaki data and cards clearly dikhe.

import React from 'react';
import Navbar from '../components/common/Navbar';
import bgImg from '../img/bg_img.png';

const CandidateLayout = ({ children }) => {
  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-top bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.75), rgba(248, 250, 252, 0.85)), url(${bgImg})`
      }}
    >
      <Navbar />
      
      {/* Main content area */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default CandidateLayout;

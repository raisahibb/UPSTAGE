// Ye layout login aur signup pages ke liye use hoga.
// Isme koi distraction nahi rakha gaya hai (no navbar/footer), bas central form focus rahega.
// Ye image login/signup page ka background set karti hai.
// Background ko poori screen cover karne ke liye background image and cover property use kiya hai.

import React from 'react';
import { Link } from 'react-router-dom';
import upstageLogo from '../img/02_upstage_horizontal_logo.png';
import bgImg from '../img/bg_img.png';

const AuthLayout = ({ children }) => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-fixed relative"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.5), rgba(248, 250, 252, 0.65)), url(${bgImg})`
      }}
    >
      {/* Central container */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Simple Branding Area */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link to="/" className="inline-block hover:opacity-90">
            {/* Yaha sirf ek UPSTAGE logo show kar rahe hain. */}
            <img src={upstageLogo} alt="UPSTAGE logo" className="h-12 sm:h-14 object-contain" />
          </Link>
          <p className="mt-4 text-sm text-[var(--color-secondary-text)]">
            AI-Powered Mock Interview Platform
          </p>
        </div>

        {/* Content Area (Form yaha render hoga) */}
        {children}

      </div>
    </div>
  );
};

export default AuthLayout;

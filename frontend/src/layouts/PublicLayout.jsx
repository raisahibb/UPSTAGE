// Ye layout public pages (jaise landing page) ke liye use hoga.
// Isme simple navbar aur footer rahega.
// Ye background image home page ke hero section ko thoda better look dene ke liye use ho rahi hai.

import React from 'react';
import Navbar from '../components/common/Navbar';
import bgImg from '../img/bg_img.png';

const PublicLayout = ({ children }) => {
  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat bg-fixed relative"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.75), rgba(248, 250, 252, 0.85)), url(${bgImg})`
      }}
    >
      <Navbar isLoggedIn={false} />
      
      {/* Main content area */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Simple footer placeholder */}
      <footer className="border-t border-[var(--color-border)] py-6 mt-auto">
        <div className="max-w-[1280px] mx-auto px-4 text-center text-sm text-[var(--color-secondary-text)]">
          &copy; 2026 UPSTAGE. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

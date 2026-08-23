// Ye file ErrorState component banati hai.
// Jab API fail ho ya koi exception aaye, toh technical details chupa kar user friendly message dikhane ke liye iska use karenge.

import React from 'react';

const ErrorState = ({ title = 'Something went wrong', message, action, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center rounded-lg border border-[var(--color-error)] bg-red-50 ${className}`}>
      {/* Warning/Error icon */}
      <div className="mb-4 text-[var(--color-error)]">
        <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-red-600 mb-6 max-w-sm">
        {message || 'Please try again later or contact support if the issue persists.'}
      </p>
      
      {/* Retry action button agar pass kiya gaya ho */}
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};

export default ErrorState;

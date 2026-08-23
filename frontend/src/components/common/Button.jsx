// Ye file UPSTAGE ka reusable Button component handle karti hai.
// Isko hum poore project mein forms, modals, aur actions ke liye reuse karenge.

import React from 'react';

const Button = ({
  variant = 'primary',
  disabled = false,
  loading = false,
  children,
  onClick,
  type = 'button',
  className = '',
}) => {
  // Yaha hum variant ke according CSS classes set kar rahe hain.
  // Tailwind v4 + CSS variables use ho rahe hain.
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 font-semibold text-sm rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white hover:from-[#4f46e5] hover:to-[#4338ca] active:scale-[0.98] shadow-sm hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
    secondary: 'bg-transparent border border-[var(--color-border)] text-[var(--color-primary-text)] hover:bg-[var(--color-background)] focus:ring-[var(--color-border)]',
    outline: 'border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-surface)] focus:ring-[var(--color-primary)]',
    ghost: 'bg-transparent text-[var(--color-primary-text)] hover:bg-[var(--color-background)] focus:ring-[var(--color-border)]',
    danger: 'bg-[var(--color-error)] text-[var(--color-surface)] hover:bg-red-600 focus:ring-red-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Loading state mein text hide karke spinner dikhayenge. */}
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Wait...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

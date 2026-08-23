// Ye file Badge component handle karti hai.
// Status (Completed, Pending) ya Difficulty (Easy, Hard) dikhane ke liye iska use hoga.

import React from 'react';

const Badge = ({ variant = 'default', children, className = '' }) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  // Yaha hum colors ko subtle rakh rahe hain as per UI requirements
  const variants = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
    completed: 'bg-[var(--color-success)] bg-opacity-20 text-green-800',
    pending: 'bg-[var(--color-warning)] bg-opacity-20 text-yellow-800',
    failed: 'bg-[var(--color-error)] bg-opacity-20 text-red-800',
    candidate: 'bg-blue-100 text-blue-800',
    admin: 'bg-purple-100 text-purple-800',
    default: 'bg-gray-100 text-[var(--color-secondary-text)]',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;

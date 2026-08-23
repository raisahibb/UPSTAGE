// Ye file UPSTAGE ka reusable Card component handle karti hai.
// Dashboard, History aur Report pages mein isi Card ko reuse karenge.

import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    // Card ki default styling: white background, 8px border-radius, aur light border.
    <div className={`bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;

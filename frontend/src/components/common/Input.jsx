// Ye file UPSTAGE ka reusable Input component handle karti hai.
// Isko signup, login, aur form validations mein use kiya jayega.

import React from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {/* Agar label prop diya hai, toh usko display karenge */}
      {label && (
        <label className="text-sm font-semibold text-[var(--color-primary-text)]">
          {label}
        </label>
      )}
      
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-3 py-2 text-sm rounded border bg-[var(--color-surface)] 
          transition-colors focus:outline-none focus:ring-1
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error 
            ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]' 
            : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]'
          }
        `}
      />

      {/* Error state show karne ke liye red text */}
      {error && (
        <span className="text-xs text-[var(--color-error)] mt-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;

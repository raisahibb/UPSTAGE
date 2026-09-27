import React from 'react';

export default function ImprovementSuggestions({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null;
  return (
    <div className="mt-6 border border-indigo-100 bg-indigo-50/50 rounded-xl p-5">
      <h3 className="font-semibold text-indigo-900 mb-3">Actionable Next Steps</h3>
      <ul className="list-decimal pl-5 space-y-2 text-indigo-800 text-sm">
        {suggestions.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
}

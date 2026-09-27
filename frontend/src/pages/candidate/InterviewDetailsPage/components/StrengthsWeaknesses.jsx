import React from 'react';

export default function StrengthsWeaknesses({ strengths, weaknesses }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-green-50 border border-green-100 rounded-xl p-5">
        <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
          <span className="bg-green-200 text-green-800 p-1 rounded-md text-xs font-bold">▲</span>
          Key Strengths
        </h3>
        {strengths && strengths.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1 text-green-700 text-sm">
            {strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        ) : (
          <p className="text-sm text-green-600/70 italic">No strengths recorded yet.</p>
        )}
      </div>
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
        <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
          <span className="bg-amber-200 text-amber-800 p-1 rounded-md text-xs font-bold">▼</span>
          Areas for Improvement
        </h3>
        {weaknesses && weaknesses.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1 text-amber-700 text-sm">
            {weaknesses.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        ) : (
          <p className="text-sm text-amber-600/70 italic">No weaknesses recorded yet.</p>
        )}
      </div>
    </div>
  );
}

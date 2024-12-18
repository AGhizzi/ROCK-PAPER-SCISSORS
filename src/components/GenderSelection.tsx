import React from 'react';
import { Gender } from '../types';

interface GenderSelectionProps {
  onSelect: (gender: Gender) => void;
}

export function GenderSelection({ onSelect }: GenderSelectionProps) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Select Gender</h2>
      <p className="text-gray-600 mb-4">
        This information helps us analyze gameplay patterns across demographics.
      </p>
      
      <div className="space-y-3">
        {(['male', 'female'] as Gender[]).map((gender) => (
          <button
            key={gender}
            onClick={() => onSelect(gender)}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                     transition-colors duration-200 capitalize"
          >
            {gender}
          </button>
        ))}
      </div>
    </div>
  );
}
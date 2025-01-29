import React from 'react';
import { Choice } from '../../types/game';
import { ProbabilityBar } from './ProbabilityBar';

interface StrategyCardProps {
  choice: Choice;
  baseProbability: number;
  adaptiveProbability: number;
  finalProbability: number;
  isSelected?: boolean;
}

export function StrategyCard({
  choice,
  baseProbability,
  adaptiveProbability,
  finalProbability,
  isSelected
}: StrategyCardProps) {
  return (
    <div className={`bg-gray-50 p-3 sm:p-4 rounded-lg relative ${
      isSelected ? 'ring-2 ring-green-500' : ''
    }`}>
      <h4 className="font-semibold capitalize mb-2 sm:mb-3 text-sm sm:text-base">{choice}</h4>
      
      <div className="space-y-2 sm:space-y-3">
        <ProbabilityBar
          value={baseProbability}
          color="gray"
          label="Base"
          compact
        />
        
        <ProbabilityBar
          value={adaptiveProbability}
          color="indigo"
          label="Adaptive"
          compact
        />
        
        <ProbabilityBar
          value={finalProbability}
          color="blue"
          label="Final"
          compact
        />
      </div>

      {isSelected && (
        <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 
                      text-white rounded-full flex items-center justify-center
                      text-xs font-bold">
          ✓
        </div>
      )}
    </div>
  );
}
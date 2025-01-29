import React from 'react';
import { Choice, GameResult } from '../../types/game';
import { RoundOutcome } from './RoundOutcome';

interface RoundHistoryProps {
  choices: Choice[];
  results: GameResult[];
  currentRound: number;
}

export function RoundHistory({ choices, results, currentRound }: RoundHistoryProps) {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-sm text-gray-700">Round History</h4>
      <div className="flex flex-wrap gap-2">
        {choices.map((choice, index) => (
          <div
            key={index}
            className={`flex items-center gap-1 p-2 rounded-lg ${
              index === currentRound
                ? 'bg-blue-100 ring-1 ring-blue-400'
                : 'bg-gray-50'
            }`}
          >
            <span className="text-sm font-medium">
              {index + 1}. {choice.charAt(0).toUpperCase()}
            </span>
            <RoundOutcome result={results[index]} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
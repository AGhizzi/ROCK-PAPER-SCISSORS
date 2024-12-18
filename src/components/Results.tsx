import React from 'react';
import { ResultsProps, Gender, Choice, GameResult } from '../types/game';
import { AIHistory } from './AIHistory';

interface ExtendedResultsProps extends ResultsProps {
  gender: Gender;
  choices: Choice[];
  results: GameResult[];
}

export function Results({ gameData, gender, choices, results }: ExtendedResultsProps) {
  const total = gameData.wins + gameData.losses + gameData.ties;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Game Results</h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-700">{gameData.wins}</div>
            <div className="text-sm text-green-600">Wins</div>
          </div>
          <div className="text-center p-4 bg-red-100 rounded-lg">
            <div className="text-2xl font-bold text-red-700">{gameData.losses}</div>
            <div className="text-sm text-red-600">Losses</div>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-lg">
            <div className="text-2xl font-bold text-gray-700">{gameData.ties}</div>
            <div className="text-sm text-gray-600">Ties</div>
          </div>
        </div>

        <div className="text-center text-lg text-gray-700">
          Win Rate: {Math.round((gameData.wins / total) * 100)}%
        </div>
      </div>

      <AIHistory 
        gender={gender} 
        choices={choices}
        results={results}
      />
    </div>
  );
}
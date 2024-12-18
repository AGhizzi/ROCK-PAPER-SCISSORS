import React from 'react';
import { Hand, HandMetal, Scroll } from 'lucide-react';

interface TutorialProps {
  onComplete: () => void;
}

export function Tutorial({ onComplete }: TutorialProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">How to Play</h2>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Hand className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">Basic Rules</h3>
            <p className="text-gray-600">
              Choose between Rock, Paper, or Scissors. Rock beats Scissors,
              Scissors beats Paper, Paper beats Rock.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <HandMetal className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">Game Format</h3>
            <p className="text-gray-600">
              You'll play 10 rounds. Each round has a 5-second timer.
              Make your choice before time runs out!
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Scroll className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">Research Purpose</h3>
            <p className="text-gray-600">
              Your gameplay helps us study decision-making patterns.
              Play naturally - there's no "right" way to play!
            </p>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                   transition-colors duration-200"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
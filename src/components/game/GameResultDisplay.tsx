import React from 'react';
import { GameChoice } from './GameChoice';
import { GameResult, Choice } from '../../types/game';

interface GameResultDisplayProps {
  result: GameResult;
  playerChoice: Choice;
  computerChoice: Choice;
}

export function GameResultDisplay({ result, playerChoice, computerChoice }: GameResultDisplayProps) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold mb-4">
        {result === 'win' ? '🎉 You Won!' : result === 'loss' ? '😔 You Lost' : '🤝 Tie!'}
      </div>
      <div className="flex justify-center items-center space-x-8">
        <div>
          <div className="text-sm text-gray-600">Your Choice</div>
          <GameChoice
            choice={playerChoice}
            selected={false}
            disabled={true}
            onSelect={() => {}}
          />
        </div>
        <div className="text-2xl">vs</div>
        <div>
          <div className="text-sm text-gray-600">Computer's Choice</div>
          <GameChoice
            choice={computerChoice}
            selected={false}
            disabled={true}
            onSelect={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
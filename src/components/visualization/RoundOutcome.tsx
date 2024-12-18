import React from 'react';
import { GameResult } from '../../types/game';
import { Trophy, X, Minus } from 'lucide-react';

interface RoundOutcomeProps {
  result: GameResult;
  size?: 'sm' | 'md';
}

export function RoundOutcome({ result, size = 'md' }: RoundOutcomeProps) {
  const sizeClasses = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  
  switch (result) {
    case 'win':
      return <Trophy className={`${sizeClasses} text-green-500`} />;
    case 'loss':
      return <X className={`${sizeClasses} text-red-500`} />;
    case 'tie':
      return <Minus className={`${sizeClasses} text-gray-400`} />;
  }
}
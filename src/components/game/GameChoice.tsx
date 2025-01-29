import React from 'react';
import { Scissors, Hand, Square } from 'lucide-react';
import { GameChoiceProps } from '../../types/game';

export function GameChoice({ choice, selected, disabled, onSelect }: GameChoiceProps) {
  const getIcon = () => {
    switch (choice) {
      case 'rock': return <Hand className="w-8 h-8" />;
      case 'paper': return <Square className="w-8 h-8" />;
      case 'scissors': return <Scissors className="w-8 h-8" />;
    }
  };

  return (
    <button
      onClick={() => !disabled && onSelect(choice)}
      className={`p-8 rounded-lg flex flex-col items-center justify-center
                transition-all duration-200 ${
                  selected
                    ? 'bg-blue-600 text-white'
                    : 'bg-white hover:bg-blue-50'
                }`}
      disabled={disabled}
    >
      {getIcon()}
      <span className="mt-2 capitalize">{choice}</span>
    </button>
  );
}
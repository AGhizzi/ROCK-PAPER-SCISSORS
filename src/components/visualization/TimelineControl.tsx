import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Choice, GameResult } from '../../types/game';
import { RoundOutcome } from './RoundOutcome';

interface TimelineControlProps {
  currentRound: number;
  totalRounds: number;
  isPlaying: boolean;
  choices: Choice[];
  results: GameResult[];
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
}

export function TimelineControl({
  currentRound,
  totalRounds,
  isPlaying,
  choices,
  results,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset
}: TimelineControlProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">
          Round {currentRound + 1} of {totalRounds}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onReset}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={onPrev}
            disabled={currentRound === 0}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={isPlaying ? onPause : onPlay}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onNext}
            disabled={currentRound === totalRounds - 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {choices.map((choice, index) => (
          <div
            key={index}
            className={`flex items-center gap-1.5 p-2 rounded-lg ${
              index === currentRound
                ? 'bg-blue-100 ring-1 ring-blue-400'
                : 'bg-gray-50'
            }`}
          >
            <span className="text-sm font-medium">
              {choice.charAt(0).toUpperCase()}
            </span>
            <RoundOutcome result={results[index]} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
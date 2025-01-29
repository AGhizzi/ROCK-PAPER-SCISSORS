import React from 'react';
import { GameStatsProps } from '../../types/game';

export function GameStats({ stats }: GameStatsProps) {
  return (
    <div className="flex justify-between items-center mb-4 px-4">
      <div className="text-sm">
        <span className="text-green-600">Wins: {stats.wins}</span> |{' '}
        <span className="text-red-600">Losses: {stats.losses}</span> |{' '}
        <span className="text-gray-600">Ties: {stats.ties}</span>
      </div>
      <div className="text-sm text-gray-600">
        Round Progress: {stats.wins + stats.losses + stats.ties}/10
      </div>
    </div>
  );
}
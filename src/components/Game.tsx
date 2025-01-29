import React, { useState } from 'react';
import { Choice, GameResult, GameState, GameProps, Gender, Stats } from '../types/game';
import { choices } from '../utils/constants';
import { determineWinner } from '../utils/gameLogic';
import { getAIChoice } from '../utils/aiStrategy';
import { GameChoice } from './GameChoice';
import { GameStats } from './GameStats';
import { GameResult as GameResultDisplay } from './GameResult';

interface ExtendedGameProps extends GameProps {
  gender: Gender;
  onGameHistory: (choices: Choice[], results: GameResult[]) => void;
}

export function Game({ onComplete, gender, onGameHistory }: ExtendedGameProps) {
  const [gameState, setGameState] = useState<GameState>({
    round: 1,
    playerChoice: null,
    computerChoice: null,
    result: null
  });

  const [stats, setStats] = useState<Stats>({ wins: 0, losses: 0, ties: 0 });
  const [previousChoices, setPreviousChoices] = useState<Choice[]>([]);
  const [results, setResults] = useState<GameResult[]>([]);

  const handleChoice = (choice: Choice) => {
    const computerChoice = getAIChoice({
      gender,
      round: gameState.round,
      previousChoices: [...previousChoices]
    });
    
    const result = determineWinner(choice, computerChoice);
    const newChoices = [...previousChoices, choice];
    const newResults = [...results, result];
    
    setPreviousChoices(newChoices);
    setResults(newResults);
    
    setGameState({
      ...gameState,
      playerChoice: choice,
      computerChoice,
      result
    });

    setStats(prev => {
      const newStats = { ...prev };
      if (result === 'win') newStats.wins++;
      else if (result === 'loss') newStats.losses++;
      else newStats.ties++;
      return newStats;
    });
    
    setTimeout(() => {
      if (gameState.round >= 10) {
        onGameHistory(newChoices, newResults);
        onComplete(
          stats.wins + (result === 'win' ? 1 : 0),
          stats.losses + (result === 'loss' ? 1 : 0),
          stats.ties + (result === 'tie' ? 1 : 0)
        );
      } else {
        setGameState(prev => ({
          round: prev.round + 1,
          playerChoice: null,
          computerChoice: null,
          result: null
        }));
      }
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <GameStats stats={stats} />
      
      <div className="text-center mb-8">
        <div className="text-4xl font-bold mb-2">Round {gameState.round}/10</div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {choices.map((choice) => (
          <GameChoice
            key={choice}
            choice={choice}
            selected={gameState.playerChoice === choice}
            disabled={!!gameState.playerChoice}
            onSelect={handleChoice}
          />
        ))}
      </div>

      {gameState.result && gameState.playerChoice && gameState.computerChoice && (
        <GameResultDisplay
          result={gameState.result}
          playerChoice={gameState.playerChoice}
          computerChoice={gameState.computerChoice}
        />
      )}
    </div>
  );
}
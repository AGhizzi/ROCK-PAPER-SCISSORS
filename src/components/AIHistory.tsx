import React, { useState, useEffect, useCallback } from 'react';
import { Choice, Gender, GameResult } from '../types/game';
import { StrategyCard } from './visualization/StrategyCard';
import { TimelineControl } from './visualization/TimelineControl';
import { calculateFinalProbabilities, getAdaptiveWeights } from '../utils/aiStrategy';
import { firstRoundProbabilities, choiceProbabilities, choices } from '../utils/constants';

interface AIHistoryProps {
  gender: Gender;
  choices: Choice[];
  results: GameResult[];
}

export function AIHistory({ gender, choices: playerChoices, results }: AIHistoryProps) {
  const [currentRound, setCurrentRound] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const getCurrentProbabilities = useCallback((round: number) => {
    const isFirstRound = round === 0;
    const previousChoices = playerChoices.slice(0, round);
    const adaptiveWeights = getAdaptiveWeights(previousChoices);
    const baseProbabilities = isFirstRound ? 
      firstRoundProbabilities[gender] : 
      choiceProbabilities[gender];
    const finalProbabilities = calculateFinalProbabilities(
      gender,
      adaptiveWeights,
      isFirstRound
    );

    return {
      base: baseProbabilities,
      adaptive: adaptiveWeights,
      final: finalProbabilities
    };
  }, [gender, playerChoices]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentRound(prev => {
          if (prev < playerChoices.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playerChoices.length]);

  const probabilities = getCurrentProbabilities(currentRound);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold">
          AI Strategy Evolution
        </h3>
        {currentRound === 0 && (
          <span className="text-sm text-blue-600 font-normal">
            First Round Counter-Strategy Active
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {choices.map((choice) => (
          <StrategyCard
            key={choice}
            choice={choice}
            baseProbability={probabilities.base[choice]}
            adaptiveProbability={probabilities.adaptive[choice]}
            finalProbability={probabilities.final[choice]}
            isSelected={playerChoices[currentRound] === choice}
          />
        ))}
      </div>

      <TimelineControl
        currentRound={currentRound}
        totalRounds={playerChoices.length}
        isPlaying={isPlaying}
        choices={playerChoices}
        results={results}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onNext={() => setCurrentRound(prev => 
          Math.min(prev + 1, playerChoices.length - 1)
        )}
        onPrev={() => setCurrentRound(prev => Math.max(prev - 1, 0))}
        onReset={() => {
          setCurrentRound(0);
          setIsPlaying(true);
        }}
      />
    </div>
  );
}
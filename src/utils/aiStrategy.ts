import { Choice, Gender } from '../types/game';
import { choices, choiceProbabilities, firstRoundProbabilities } from './constants';

interface StrategyState {
  gender: Gender;
  round: number;
  previousChoices: Choice[];
}

export function getAdaptiveWeights(previousChoices: Choice[]): Record<Choice, number> {
  if (previousChoices.length === 0) {
    return {
      rock: 0.33,
      paper: 0.33,
      scissors: 0.33
    };
  }
  
  // Focus on the last 3 moves for more dynamic adaptation
  const recentChoices = previousChoices.slice(-3);
  const frequency = recentChoices.reduce((acc, choice) => {
    acc[choice]++;
    return acc;
  }, { rock: 0, paper: 0, scissors: 0 } as Record<Choice, number>);
  
  const total = Object.values(frequency).reduce((a, b) => a + b, 0);
  
  // Calculate counter-move probabilities
  return {
    rock: frequency.scissors / (total || 1),     // Counter scissors
    paper: frequency.rock / (total || 1),        // Counter rock
    scissors: frequency.paper / (total || 1)     // Counter paper
  };
}

export function calculateFinalProbabilities(
  gender: Gender,
  adaptiveWeights: Record<Choice, number>,
  isFirstRound: boolean = false
): Record<Choice, number> {
  // Use gender-based probabilities
  const baseProbabilities = isFirstRound 
    ? firstRoundProbabilities[gender] 
    : choiceProbabilities[gender];
  
  // Weighted combination of base and adaptive probabilities
  const finalProbabilities: Record<Choice, number> = {
    rock: (baseProbabilities.rock * 0.7) + (adaptiveWeights.rock * 0.3),
    paper: (baseProbabilities.paper * 0.7) + (adaptiveWeights.paper * 0.3),
    scissors: (baseProbabilities.scissors * 0.7) + (adaptiveWeights.scissors * 0.3)
  };

  // Normalize probabilities
  const total = Object.values(finalProbabilities).reduce((a, b) => a + b, 0);
  Object.keys(finalProbabilities).forEach(key => {
    finalProbabilities[key as Choice] /= total;
  });

  return finalProbabilities;
}

export function getAIChoice(state: StrategyState): Choice {
  const { gender, previousChoices } = state;
  const isFirstRound = previousChoices.length === 0;
  
  const adaptiveWeights = getAdaptiveWeights(previousChoices);
  const finalProbabilities = calculateFinalProbabilities(gender, adaptiveWeights, isFirstRound);

  // Weighted random selection
  const random = Math.random();
  let cumulativeProbability = 0;
  
  for (const choice of choices) {
    cumulativeProbability += finalProbabilities[choice];
    if (random <= cumulativeProbability) {
      return choice;
    }
  }

  // Fallback to most probable choice
  return Object.entries(finalProbabilities)
    .reduce((a, b) => a[1] > b[1] ? a : b)[0] as Choice;
}
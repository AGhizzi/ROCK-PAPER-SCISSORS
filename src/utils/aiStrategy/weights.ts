import { Choice } from '../../types/game';

export function getAdaptiveWeights(previousChoices: Choice[]): Record<Choice, number> {
  if (previousChoices.length === 0) {
    return { rock: 0.33, paper: 0.33, scissors: 0.33 };
  }

  // Focus on last 3 moves with exponential weighting
  const recentChoices = previousChoices.slice(-3);
  const weightedFrequency = recentChoices.reduce((acc, choice, index) => {
    // Exponential weighting: newest = 4, second = 2, oldest = 1
    const weight = Math.pow(2, recentChoices.length - 1 - index);
    acc[choice] += weight;
    return acc;
  }, { rock: 0, paper: 0, scissors: 0 } as Record<Choice, number>);

  const total = Object.values(weightedFrequency).reduce((a, b) => a + b, 0);

  // Calculate counter probabilities
  const counterWeights = {
    rock: weightedFrequency.scissors / total,    // Counter scissors with rock
    paper: weightedFrequency.rock / total,       // Counter rock with paper
    scissors: weightedFrequency.paper / total    // Counter paper with scissors
  };

  // Normalize weights
  const counterTotal = Object.values(counterWeights).reduce((a, b) => a + b, 0);
  return {
    rock: counterWeights.rock / counterTotal,
    paper: counterWeights.paper / counterTotal,
    scissors: counterWeights.scissors / counterTotal
  };
}
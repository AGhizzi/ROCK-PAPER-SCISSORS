import { Choice, Gender } from '../../types/game';
import { choiceProbabilities, firstRoundProbabilities } from '../constants';

export function calculateFinalProbabilities(
  gender: Gender,
  adaptiveWeights: Record<Choice, number>,
  isFirstRound: boolean
): Record<Choice, number> {
  const baseProbabilities = isFirstRound 
    ? firstRoundProbabilities[gender] 
    : choiceProbabilities[gender];

  // Stronger adaptive weight for non-first rounds
  const adaptiveWeight = isFirstRound ? 0.2 : 0.8;
  const baseWeight = 1 - adaptiveWeight;

  const combined = {
    rock: (baseProbabilities.rock * baseWeight) + (adaptiveWeights.rock * adaptiveWeight),
    paper: (baseProbabilities.paper * baseWeight) + (adaptiveWeights.paper * adaptiveWeight),
    scissors: (baseProbabilities.scissors * baseWeight) + (adaptiveWeights.scissors * adaptiveWeight)
  };

  // Normalize probabilities
  const total = Object.values(combined).reduce((a, b) => a + b, 0);
  return {
    rock: combined.rock / total,
    paper: combined.paper / total,
    scissors: combined.scissors / total
  };
}
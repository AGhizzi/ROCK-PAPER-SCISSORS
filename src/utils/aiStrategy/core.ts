import { Choice, Gender, GameResult } from '../../types/game';
import { getFirstRoundStrategy } from './strategies/firstRoundStrategy';
import { getLoseStrategy } from './strategies/loseStrategy';
import { getWinStrategy } from './strategies/winStrategy';
import { getRepeatStrategy } from './strategies/repeatStrategy';
import { getAdaptiveWeights } from './weights';
import { calculateFinalProbabilities } from './probabilities';
import { choices } from '../constants';

interface AIStrategyState {
  gender: Gender;
  previousChoices: Choice[];
  previousResults: GameResult[];
  lastComputerChoice?: Choice;
}

export function determineNextMove(state: AIStrategyState): Choice {
  const { gender, previousChoices, previousResults, lastComputerChoice } = state;

  // First round: Strong counter-strategy (98% probability)
  if (previousChoices.length === 0) {
    return getFirstRoundStrategy(gender);
  }

  const lastPlayerChoice = previousChoices[previousChoices.length - 1];
  const lastResult = previousResults[previousResults.length - 1];

  // After a loss: Apply LOSE strategy with high probability
  if (lastResult === 'loss' && lastComputerChoice) {
    const loseMove = getLoseStrategy(lastResult, lastPlayerChoice, lastComputerChoice);
    if (loseMove && Math.random() < 0.85) { // 85% chance to use lose strategy
      return loseMove;
    }
  }

  // Pattern detection: Counter repeated moves
  if (previousChoices.length >= 2) {
    const repeatCounter = getRepeatStrategy(previousChoices);
    if (repeatCounter && Math.random() < 0.9) { // 90% chance to counter repeats
      return repeatCounter;
    }
  }

  // After a win: Mix between WIN strategy and adaptive
  if (lastResult === 'win') {
    const winMove = getWinStrategy(lastResult, lastPlayerChoice);
    if (winMove && Math.random() < 0.7) { // 70% chance to use win strategy
      return winMove;
    }
  }

  // Use adaptive weights for final decision
  const adaptiveWeights = getAdaptiveWeights(previousChoices);
  const finalProbabilities = calculateFinalProbabilities(
    gender,
    adaptiveWeights,
    false
  );

  // Weighted selection with minimal noise
  let random = Math.random();
  let cumulative = 0;

  for (const choice of choices) {
    cumulative += finalProbabilities[choice];
    if (random <= cumulative) return choice;
  }

  // Fallback to counter move
  const counterMoves: Record<Choice, Choice> = {
    rock: 'paper',
    paper: 'scissors',
    scissors: 'rock'
  };
  return counterMoves[lastPlayerChoice];
}
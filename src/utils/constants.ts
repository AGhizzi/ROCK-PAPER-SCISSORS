import { Choice, Gender } from '../types/game';

export const choices: Choice[] = ['rock', 'paper', 'scissors'];

// First round probabilities - Very strong counter strategy
export const firstRoundProbabilities: Record<Gender, Record<Choice, number>> = {
  male: {
    rock: 0.05,    // Males often start with rock
    paper: 0.90,   // Strong counter with paper
    scissors: 0.05
  },
  female: {
    rock: 0.90,    // Strong counter with rock
    paper: 0.05,   // Females often start with scissors
    scissors: 0.05
  }
};

// Base probabilities for subsequent rounds - Balanced with slight bias
export const choiceProbabilities: Record<Gender, Record<Choice, number>> = {
  male: {
    rock: 0.25,    // Males tend to favor rock
    paper: 0.45,   // Higher paper probability to counter rock tendency
    scissors: 0.30
  },
  female: {
    rock: 0.45,    // Higher rock probability to counter scissors tendency
    paper: 0.30,
    scissors: 0.25  // Females tend to favor scissors
  }
};
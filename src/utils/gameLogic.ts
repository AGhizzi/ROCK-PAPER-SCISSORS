import { Choice, GameResult } from '../types/game';
import { choices } from './constants';

const winningCombinations: Record<Choice, Choice> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
};

export function determineWinner(playerChoice: Choice, computerChoice: Choice): GameResult {
  if (playerChoice === computerChoice) return 'tie';
  return winningCombinations[playerChoice] === computerChoice ? 'win' : 'loss';
}
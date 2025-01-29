import { Choice } from '../../../types/game';

export function getRepeatStrategy(previousChoices: Choice[]): Choice | null {
  if (previousChoices.length < 2) return null;

  const lastTwo = previousChoices.slice(-2);
  if (lastTwo[0] === lastTwo[1]) {
    const counterMoves: Record<Choice, Choice> = {
      rock: 'paper',
      paper: 'scissors',
      scissors: 'rock'
    };
    return counterMoves[lastTwo[0]];
  }

  return null;
}
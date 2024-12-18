import { Choice, GameResult } from '../../../types/game';

export function getWinStrategy(
  lastResult: GameResult,
  playerChoice: Choice
): Choice | null {
  // If we won, play what they just lost with
  return lastResult === 'win' ? playerChoice : null;
}
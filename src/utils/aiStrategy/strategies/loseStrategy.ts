import { Choice, GameResult } from '../../../types/game';

export function getLoseStrategy(
  lastResult: GameResult,
  playerChoice: Choice,
  computerChoice: Choice
): Choice | null {
  if (lastResult !== 'loss') return null;

  // Find the move that wasn't used in the previous round
  const unusedChoice = ['rock', 'paper', 'scissors'].find(
    choice => choice !== playerChoice && choice !== computerChoice
  ) as Choice;

  // Counter map for the move we predict they'll play
  const counterMoves: Record<Choice, Choice> = {
    rock: 'paper',
    paper: 'scissors',
    scissors: 'rock'
  };

  // Return the counter to the predicted move
  return counterMoves[unusedChoice];
}
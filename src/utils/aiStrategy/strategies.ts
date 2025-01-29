import { Choice, GameResult } from '../../types/game';

// WIN Strategy: If you win, play what your opponent just lost with
export function getWinStrategy(lastResult: GameResult, opponentChoice: Choice): Choice | null {
  if (lastResult === 'win') {
    return opponentChoice;
  }
  return null;
}

// LOSE Strategy: If you lose, predict and counter the unused move
export function getLoseStrategy(
  lastResult: GameResult,
  playerChoice: Choice,
  opponentChoice: Choice
): Choice | null {
  if (lastResult === 'loss') {
    // Find the move that wasn't used in the previous round
    const unusedChoice = ['rock', 'paper', 'scissors'].find(
      choice => choice !== playerChoice && choice !== opponentChoice
    ) as Choice;
    
    // Counter the predicted move
    const counterMoves: Record<Choice, Choice> = {
      rock: 'paper',
      paper: 'scissors',
      scissors: 'rock'
    };
    
    // Return the counter to the unused choice
    return counterMoves[unusedChoice];
  }
  return null;
}
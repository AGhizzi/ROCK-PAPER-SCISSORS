import { Choice, Gender } from '../../../types/game';

export function getFirstRoundStrategy(gender: Gender): Choice {
  // 98% probability for strong counter-strategy
  const maleStrategy = Math.random() < 0.98 ? 'paper' : 'rock';     // Counter expected rock
  const femaleStrategy = Math.random() < 0.98 ? 'rock' : 'scissors'; // Counter expected scissors
  
  return gender === 'male' ? maleStrategy : femaleStrategy;
}
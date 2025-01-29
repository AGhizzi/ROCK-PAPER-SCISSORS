// Core game types
export type Choice = 'rock' | 'paper' | 'scissors';
export type GameResult = 'win' | 'loss' | 'tie';
export type Gender = 'male' | 'female';

// Stats interface
export interface Stats {
  wins: number;
  losses: number;
  ties: number;
}

// Game state interfaces
export interface GameState {
  round: number;
  playerChoice: Choice | null;
  computerChoice: Choice | null;
  result: GameResult | null;
}

// Component props interfaces
export interface GameProps {
  onComplete: (wins: number, losses: number, ties: number) => void;
}

export interface GameChoiceProps {
  choice: Choice;
  selected: boolean;
  disabled: boolean;
  onSelect: (choice: Choice) => void;
}

export interface GameResultProps {
  result: GameResult;
  playerChoice: Choice;
  computerChoice: Choice;
}

export interface ResultsProps {
  gameData: Stats;
}

export interface GameStatsProps {
  stats: Stats;
}
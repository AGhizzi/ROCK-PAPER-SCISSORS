import React, { useState } from 'react';
import { Game } from './components/Game';
import { Results } from './components/Results';
import { GenderSelection } from './components/GenderSelection';
import { Gender, Choice, GameResult } from './types/game';

function App() {
  const [gameComplete, setGameComplete] = useState(false);
  const [finalStats, setFinalStats] = useState({ wins: 0, losses: 0, ties: 0 });
  const [gender, setGender] = useState<Gender | null>(null);
  const [gameHistory, setGameHistory] = useState<Choice[]>([]);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const handleGameComplete = (wins: number, losses: number, ties: number) => {
    setFinalStats({ wins, losses, ties });
    setGameComplete(true);
  };

  const handleGameHistory = (choices: Choice[], results: GameResult[]) => {
    setGameHistory(choices);
    setGameResults(results);
  };

  const handlePlayAgain = () => {
    setGameComplete(false);
    setFinalStats({ wins: 0, losses: 0, ties: 0 });
    setGender(null);
    setGameHistory([]);
    setGameResults([]);
  };

  if (!gender) {
    return <GenderSelection onSelect={setGender} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Rock Paper Scissors
        </h1>

        {!gameComplete ? (
          <Game 
            onComplete={handleGameComplete} 
            gender={gender}
            onGameHistory={handleGameHistory}
          />
        ) : (
          <div>
            <Results 
              gameData={finalStats} 
              gender={gender}
              choices={gameHistory}
              results={gameResults}
            />
            <div className="text-center mt-6">
              <button
                onClick={handlePlayAgain}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                         transition-colors duration-200"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
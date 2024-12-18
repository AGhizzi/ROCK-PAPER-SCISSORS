import React from 'react';
import { Choice, Gender } from '../types/game';
import { choices, choiceProbabilities, firstRoundProbabilities } from '../utils/constants';

interface AIVisualizationProps {
  gender: Gender;
  previousChoices: Choice[];
  adaptiveWeights: Record<Choice, number>;
  finalProbabilities: Record<Choice, number>;
}

export function AIVisualization({ 
  gender, 
  previousChoices, 
  adaptiveWeights,
  finalProbabilities 
}: AIVisualizationProps) {
  const isFirstRound = previousChoices.length === 0;
  const baseProbabilities = isFirstRound ? firstRoundProbabilities[gender] : choiceProbabilities[gender];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4">
        AI Strategy Analysis {isFirstRound && "(First Round Counter-Strategy Active)"}
      </h3>
      
      <div className="grid grid-cols-3 gap-4">
        {choices.map((choice) => (
          <div key={choice} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold capitalize mb-2">{choice}</h4>
            
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-gray-600">Base: </span>
                <span className="font-medium">
                  {(baseProbabilities[choice] * 100).toFixed(1)}%
                </span>
              </div>
              
              <div className="text-sm">
                <span className="text-gray-600">Adaptive: </span>
                <span className="font-medium">
                  {(adaptiveWeights[choice] * 100).toFixed(1)}%
                </span>
              </div>
              
              <div className="text-sm">
                <span className="text-gray-600">Final: </span>
                <span className="font-medium">
                  {(finalProbabilities[choice] * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2"
                  style={{
                    width: `${finalProbabilities[choice] * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h4 className="font-semibold mb-2">Player History</h4>
        <div className="flex space-x-2">
          {previousChoices.map((choice, index) => (
            <div
              key={index}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 
                       rounded-full text-sm capitalize"
            >
              {choice.charAt(0)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
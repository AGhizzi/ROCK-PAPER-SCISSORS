import React from 'react';
import { Info } from 'lucide-react';

export function ProbabilityExplanation() {
  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-4">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold text-blue-900">Understanding the Probabilities</h4>
          <div className="space-y-1 text-blue-800">
            <p><strong>Base:</strong> Initial probability based on gender tendencies</p>
            <p><strong>Adaptive:</strong> Probability adjustment from analyzing your previous moves</p>
            <p><strong>Final:</strong> Combined probability that the AI will choose this move next</p>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';

interface ConsentFormProps {
  onConsent: () => void;
}

export function ConsentForm({ onConsent }: ConsentFormProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Research Participation Consent</h2>
      
      <div className="space-y-4 text-gray-700">
        <p>Welcome to our Rock-Paper-Scissors Research Study!</p>
        
        <h3 className="font-semibold">Data Collection Notice:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Your gameplay choices and timing</li>
          <li>Selected gender category (anonymized)</li>
          <li>Mouse movement patterns</li>
          <li>Game results and statistics</li>
        </ul>

        <h3 className="font-semibold">Data Usage:</h3>
        <p>
          All collected data will be anonymized and used solely for research purposes
          to study gameplay patterns. No personally identifiable information is stored.
        </p>

        <h3 className="font-semibold">Your Rights:</h3>
        <p>
          You can request deletion of your data at any time. Participation is voluntary,
          and you can stop at any point during the game.
        </p>

        <div className="mt-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              onChange={(e) => e.target.checked && onConsent()}
            />
            <span>I consent to participate in this research study</span>
          </label>
        </div>
      </div>
    </div>
  );
}
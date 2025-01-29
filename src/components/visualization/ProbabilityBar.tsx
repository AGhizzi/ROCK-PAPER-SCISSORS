import React from 'react';

interface ProbabilityBarProps {
  value: number;
  color?: string;
  label?: string;
  compact?: boolean;
}

export function ProbabilityBar({ value, color = 'blue', label, compact = false }: ProbabilityBarProps) {
  return (
    <div className="relative w-full">
      <div className={`flex justify-between ${compact ? 'text-xs' : 'text-sm'} text-gray-600 mb-1`}>
        {label && (
          <span className={`${compact ? 'text-xs' : 'text-sm'} truncate pr-2`}>
            {label}
          </span>
        )}
        <span className="flex-shrink-0">{(value * 100).toFixed(1)}%</span>
      </div>
      <div className={`w-full ${compact ? 'h-1.5' : 'h-2'} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`h-full bg-${color}-600 transition-all duration-300`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );
}
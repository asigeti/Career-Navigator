import React, { useEffect, useState } from 'react';

type RiskGaugeProps = {
  score: number;
};

const RiskGauge: React.FC<RiskGaugeProps> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);
  
  useEffect(() => {
    // Animate the score from 0 to the actual value
    const timer = setTimeout(() => {
      setDisplayScore(score);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [score]);
  
  // Calculate color based on risk score
  const getColor = () => {
    if (score < 30) return 'text-green-500';
    if (score < 70) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Calculate risk level text
  const getRiskLevel = () => {
    if (score < 30) return 'Low Risk';
    if (score < 70) return 'Moderate Risk';
    return 'High Risk';
  };
  
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
          />
          
          {/* Colored arc representing the score */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getColor().replace('text-', 'bg-')}
            strokeWidth="10"
            strokeDasharray={`${displayScore * 2.83} 283`}
            strokeDashoffset="70.75"
            transform="rotate(-90 50 50)"
          />
          
          {/* Score text */}
          <text
            x="50"
            y="50"
            fontSize="24"
            textAnchor="middle"
            alignmentBaseline="middle"
            className={getColor()}
            fontWeight="bold"
          >
            {displayScore}
          </text>
          
          <text
            x="50"
            y="65"
            fontSize="12"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="#6b7280"
          >
            Risk Score
          </text>
        </svg>
      </div>
      <div className={`text-xl font-bold mt-2 ${getColor()}`}>
        {getRiskLevel()}
      </div>
    </div>
  );
};

export default RiskGauge;
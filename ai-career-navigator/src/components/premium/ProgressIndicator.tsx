import React from 'react';

type ProgressIndicatorProps = {
  currentStep: number;
  totalSteps: number;
  startAt?: number;
};

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  startAt = 0
}) => {
  // Calculate progress percentage
  const progressPercentage = Math.min(
    Math.max(
      startAt + ((currentStep / totalSteps) * (100 - startAt)),
      startAt
    ),
    100
  );
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {currentStep === 0 ? 'Starting Your Journey' : `Question ${currentStep} of ${totalSteps}`}
        </span>
        <span className="text-sm font-medium text-primary-600">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-primary-600 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressIndicator;

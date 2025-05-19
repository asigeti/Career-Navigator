// src/components/onboarding/WelcomeOverlay.tsx
import React, { useState } from 'react';
import Button from '../ui/Button';

type WelcomeOverlayProps = {
  userName: string;
  onClose: () => void;
};

const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ userName, onClose }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="mb-4 text-center">
          <div className="flex justify-center mb-4">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full mx-1 ${
                  i + 1 === step ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        {step === 1 && (
          <div className="text-center">
            <div className="bg-primary-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
              <svg className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to AI Career Navigator, {userName}!</h2>
            <p className="text-gray-600 mb-6">
              You've taken an important step toward future-proofing your career. Let's get you started with your personalized roadmap.
            </p>
            
            <Button primary onClick={handleNext} className="w-full">
              Get Started
            </Button>
          </div>
        )}
        
        {step === 2 && (
          <div className="text-center">
            <div className="bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Your Career Roadmap</h2>
            <p className="text-gray-600 mb-6">
              Based on your assessment, we've created a personalized roadmap to help you navigate the changing landscape of work in the AI era. 
            </p>
            
            <Button primary onClick={handleNext} className="w-full">
              Continue
            </Button>
          </div>
        )}
        
        {step === 3 && (
          <div className="text-center">
            <div className="bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
              <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Implementation Dashboard</h2>
            <p className="text-gray-600 mb-6">
              Your implementation dashboard is where you'll track your progress, manage tasks, and monitor your skill development. Let's explore it together!
            </p>
            
            <Button primary onClick={handleNext} className="w-full">
              Let's Go!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeOverlay;
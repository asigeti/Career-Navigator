import React from 'react';

type QuestionCardProps = {
  insightValue: string;
  question: string;
  children: React.ReactNode;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  insightValue,
  question,
  children
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="bg-primary-50 rounded-md p-4 mb-6">
        <div className="text-primary-700 font-medium mb-1">Insight</div>
        <p className="text-gray-800">{insightValue}</p>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{question}</h3>
      
      <div>
        {children}
      </div>
    </div>
  );
};

export default QuestionCard;

// src/components/checkout/MiniTestimonials.tsx
import React from 'react';

const MiniTestimonials: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">What Customers Say</h3>
      
      <div className="bg-gray-50 rounded-lg p-4 text-sm italic relative">
        <div className="text-4xl text-gray-200 absolute top-2 left-2">"</div>
        <p className="relative z-10">
          The assessment was eye-opening. Within 3 months of following the roadmap, I transitioned from basic data entry to a healthcare data analyst role with a 40% pay increase.
        </p>
        <div className="mt-2 text-gray-700 font-medium not-italic">
          — Sarah J., Healthcare Data Analyst
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 text-sm italic relative">
        <div className="text-4xl text-gray-200 absolute top-2 left-2">"</div>
        <p className="relative z-10">
          I was skeptical at first, but the personalized roadmap gave me exactly what I needed. The skill gap analysis helped me focus my learning and land a job in tech despite no prior experience.
        </p>
        <div className="mt-2 text-gray-700 font-medium not-italic">
          — Michael T., Junior Developer
        </div>
      </div>
    </div>
  );
};

export default MiniTestimonials;
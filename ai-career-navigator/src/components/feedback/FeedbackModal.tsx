// src/components/feedback/FeedbackModal.tsx
import React, { useState } from 'react';
import Button from '../ui/Button';

type FeedbackModalProps = {
  onClose: () => void;
  onSubmit: (feedback: {
    rating: number;
    comments: string;
    wouldRecommend: boolean;
  }) => void;
};

const FeedbackModal: React.FC<FeedbackModalProps> = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = () => {
    if (rating === 0) return;
    
    onSubmit({
      rating,
      comments,
      wouldRecommend: wouldRecommend || false
    });
    
    setSubmitted(true);
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
        
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">We Value Your Feedback</h2>
            <p className="text-gray-600 mb-6 text-center">
              Your feedback helps us improve AI Career Navigator for all professionals.
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate your experience?
              </label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map(value => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors ${
                      rating >= value
                        ? 'bg-yellow-400 text-white'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                What could we improve?
              </label>
              <textarea
                id="comments"
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Would you recommend AI Career Navigator to a friend?
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setWouldRecommend(true)}
                  className={`px-4 py-2 rounded-md ${
                    wouldRecommend === true
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setWouldRecommend(false)}
                  className={`px-4 py-2 rounded-md ${
                    wouldRecommend === false
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <Button
                primary
                onClick={handleSubmit}
                disabled={rating === 0}
                className="w-full"
              >
                Submit Feedback
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your feedback has been submitted. We appreciate your input and will use it to improve our product.
            </p>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
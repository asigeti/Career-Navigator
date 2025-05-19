// src/components/premium/ResourceCard.tsx
import React from 'react';

type ResourceType = 'Course' | 'Book' | 'Article' | 'Video' | 'Tool' | 'Template' | 'Community';

type ResourceCardProps = {
  title: string;
  description: string;
  type: ResourceType;
  link: string;
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  rating?: number;
};

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  type,
  link,
  duration,
  difficulty,
  rating
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'Course':
        return '🎓';
      case 'Book':
        return '📚';
      case 'Article':
        return '📄';
      case 'Video':
        return '🎬';
      case 'Tool':
        return '🔧';
      case 'Template':
        return '📋';
      case 'Community':
        return '👥';
      default:
        return '📌';
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        <div className="flex items-start">
          <div className="mr-4 mt-1 text-2xl">
            {getTypeIcon()}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg mb-1">{title}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span className="mr-3">{type}</span>
              {duration && <span className="mr-3">• {duration}</span>}
              {difficulty && (
                <span className="mr-3">
                  • {difficulty}
                </span>
              )}
              {rating && (
                <span className="flex items-center">
                  • {Array(5).fill(0).map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </span>
              )}
            </div>
            <p className="text-gray-700 mb-3">{description}</p>
            
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-600 hover:text-primary-800"
            >
              Access Resource
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
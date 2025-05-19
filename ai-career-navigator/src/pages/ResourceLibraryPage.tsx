// src/pages/ResourceLibraryPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ResourceCard from '../components/premium/ResourceCard';
import { useTheme } from '../contexts/ThemeContext';

const ResourceLibraryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getIndustryTerminology } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock resources - in production, these would come from an API
  const resources = [
    {
      id: '1',
      title: 'Healthcare Data Analysis Fundamentals',
      description: 'Learn the basics of healthcare data analysis, including common metrics, visualization techniques, and statistical methods.',
      type: 'Course' as const,
      link: '#',
      duration: '8 hours',
      difficulty: 'Beginner' as const,
      rating: 4.7,
      categories: ['data-analysis', 'healthcare']
    },
    {
      id: '2',
      title: 'HIPAA Compliance Certification',
      description: 'Comprehensive training on HIPAA regulations, compliance requirements, and best practices for healthcare professionals.',
      type: 'Certification' as const,
      link: '#',
      duration: '12 hours',
      difficulty: 'Intermediate' as const,
      rating: 4.9,
      categories: ['compliance', 'healthcare', 'certification']
    },
    {
      id: '3',
      title: 'SQL for Healthcare Professionals',
      description: 'Practical SQL skills for healthcare data analysis, with real-world examples and exercises using healthcare datasets.',
      type: 'Course' as const,
      link: '#',
      duration: '10 hours',
      difficulty: 'Intermediate' as const,
      rating: 4.5,
      categories: ['data-analysis', 'technical-skills', 'healthcare']
    },
    {
      id: '4',
      title: 'Medical Coding Career Transition Guide',
      description: 'A comprehensive guide for healthcare professionals transitioning to medical coding specialization, including certification paths and job opportunities.',
      type: 'Book' as const,
      link: '#',
      difficulty: 'Beginner' as const,
      rating: 4.6,
      categories: ['career-transition', 'healthcare']
    },
    {
      id: '5',
      title: 'Healthcare Analytics Community',
      description: 'Join a community of healthcare professionals focused on data analytics, AI implementation, and career advancement.',
      type: 'Community' as const,
      link: '#',
      categories: ['networking', 'healthcare', 'data-analysis']
    },
    // Add more resources
  ];
  
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'data-analysis', name: 'Data Analysis' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'compliance', name: 'Compliance' },
    { id: 'technical-skills', name: 'Technical Skills' },
    { id: 'career-transition', name: 'Career Transition' },
    { id: 'certification', name: 'Certifications' },
    { id: 'networking', name: 'Networking' },
  ];
  
  const filteredResources = resources.filter(resource => {
    // Filter by category
    if (selectedCategory !== 'all' && !resource.categories.includes(selectedCategory)) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !resource.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Resource Library</h1>
        <p className="text-gray-600 mb-8">
          Curated resources to help you develop the skills for your career transition
        </p>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="font-semibold text-lg mb-4">Filter Resources</h2>
              
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search resources..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={category.id}
                        name="category"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor={category.id} className="ml-2 text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="font-semibold text-primary-800 mb-2">Resource Recommendation</h3>
              <p className="text-gray-700 mb-4">
                Need personalized resource recommendations? Take our 2-minute skill assessment to get tailored suggestions.
              </p>
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded">
                Get Recommendations
              </button>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                {selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600">
                Showing {filteredResources.length} resources
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {filteredResources.map(resource => (
                <ResourceCard
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  link={resource.link}
                  duration={resource.duration}
                  difficulty={resource.difficulty}
                  rating={resource.rating}
                />
              ))}
              
              {filteredResources.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No resources found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="mt-4 text-primary-600 hover:text-primary-800"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourceLibraryPage;
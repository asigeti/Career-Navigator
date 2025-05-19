import React from 'react';
import AssessmentForm from '../components/assessment/AssessmentForm';
import Layout from '../components/layout/Layout';

const AssessmentPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">AI Career Risk Assessment</h1>
            <p className="text-xl text-gray-600">
              Discover how AI might impact your career and get personalized insights in just 2 minutes.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <AssessmentForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssessmentPage;
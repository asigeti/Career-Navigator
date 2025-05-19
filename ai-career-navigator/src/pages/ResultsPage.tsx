import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { assessCareerRisk } from '../services/aiService';
import RiskGauge from '../components/reports/RiskGauge';
import Button from '../components/ui/Button';

type AssessmentResult = {
  riskScore: number;
  timeframe: string;
  insights: string[];
  recommendations: string[];
};

const ResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState<any>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        if (!id) {
          throw new Error('Assessment ID is required');
        }
        
        // Fetch the assessment data
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        if (!data) throw new Error('Assessment not found');
        
        setAssessment(data);
        
        // Generate the assessment result
        const result = await assessCareerRisk({
          jobTitle: data.job_title,
          industry: data.industry,
          experience: data.experience,
          tasks: data.tasks,
          email: data.email
        });
        
        setResult(result);
      } catch (err) {
        console.error('Error fetching assessment:', err);
        setError('Failed to load assessment result. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssessment();
  }, [id]);
  
  const handleUpgrade = () => {
    navigate(`/checkout/${id}`);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold mb-4">Analyzing your career...</div>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (error || !assessment || !result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold mb-4 text-red-600">Error</div>
        <p className="mb-6">{error || 'An unexpected error occurred.'}</p>
        <Button primary onClick={() => navigate('/')}>Try Again</Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-center">Your AI Career Assessment</h1>
      <p className="text-center text-gray-600 mb-8">
        Based on your role as a {assessment.job_title} in {assessment.industry}
      </p>
      
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center">
            <RiskGauge score={result.riskScore} />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="mb-4">
              Your role as a <strong>{assessment.job_title}</strong> has a 
              <strong className={
                result.riskScore < 30 ? ' text-green-600' : 
                result.riskScore < 70 ? ' text-yellow-600' : ' text-red-600'
              }> {result.riskScore}% risk</strong> of being impacted by AI within the next {result.timeframe}.
            </p>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Key Insights:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {result.insights.slice(0, 2).map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
                {result.insights.length > 2 && (
                  <li className="text-gray-500 italic">
                    {result.insights.length - 2} more insights available in the premium report...
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Get Your Detailed Career Roadmap</h2>
            <p className="mb-4">
              Unlock your complete AI vulnerability analysis and personalized career transition plan.
            </p>
            <ul className="list-check pl-5 space-y-2 mb-6">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Complete risk assessment with timeline</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Personalized skill gap analysis</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>30+ page custom transition blueprint</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>6-month access to implementation tools</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/3 text-center">
            <div className="text-gray-500 line-through mb-1">Regular: $99</div>
            <div className="text-3xl font-bold mb-4">Today: $89</div>
            <Button primary onClick={handleUpgrade} className="w-full py-3">
              Get My Career Roadmap
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              100% Satisfaction Guarantee
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">
          After studying thousands of career disruptions, we discovered something profound:
        </h3>
        <p className="text-lg mb-6">
          Those who thrive during technological shifts aren't the most skilled – they're the most prepared.
        </p>
        <Button primary onClick={handleUpgrade}>
          Prepare My Career Now
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
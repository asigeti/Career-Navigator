import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import Button from '../components/ui/Button';
import Layout from '../components/layout/Layout';

import { sendEmail, getEmailTemplate } from '../services/emailService';

const SuccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        if (!id) {
          throw new Error('Assessment ID is required');
        }
        
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        if (!data) throw new Error('Assessment not found');
        
        setAssessment(data);
      } catch (err) {
        console.error('Error fetching assessment:', err);
        setError('Failed to load assessment data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssessment();
  }, [id]);
  useEffect(() => {
  if (assessment && !emailSent) {
    // Send welcome email
    const dashboardUrl = `${window.location.origin}/dashboard/${id}`;
    
    sendEmail('welcome', {
      to: assessment.email,
      subject: 'Welcome to AI Career Navigator!',
      body: getEmailTemplate('welcome', {
        name: assessment.name || assessment.email.split('@')[0],
        dashboardUrl
      })
    }).then(() => {
      setEmailSent(true);
    });
  }
}, [assessment, emailSent, id]);

// Add state for tracking email sent status
const [emailSent, setEmailSent] = useState(false);
  const handleContinue = () => {
    navigate(`/questionnaire/${id}`);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold mb-4">Loading...</div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }
  
  if (error || !assessment) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold mb-4 text-red-600">Error</div>
          <p className="mb-6">{error || 'An unexpected error occurred.'}</p>
          <Button primary onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <div className="bg-green-100 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
            <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
          <p className="text-xl text-gray-600 mb-8">
            You're now on your way to future-proofing your career
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Your Next Steps</h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="bg-primary-50 rounded-lg p-6">
                <div className="text-primary-600 text-xl font-bold mb-4">1. Personalize Your Roadmap</div>
                <p className="mb-4">
                  Complete a short questionnaire to tailor your career roadmap to your specific skills and goals.
                </p>
                <p className="text-sm text-gray-600">
                  Takes approximately 5 minutes
                </p>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-gray-800 text-xl font-bold mb-4">2. Receive Your Blueprint</div>
                <p className="mb-4">
                  We'll generate your comprehensive career transition plan with specific, actionable steps.
                </p>
                <p className="text-sm text-gray-600">
                  Delivered immediately after questionnaire
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Your Purchase Summary</h2>
          <div className="flex justify-between mb-2">
            <span>AI Career Roadmap</span>
            <span>$89.00</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
            <span>Total Paid</span>
            <span>$89.00</span>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            A receipt has been sent to your email: {assessment.email}
          </div>
        </div>
        
        <Button primary onClick={handleContinue} className="py-3 px-8 text-lg">
          Continue to Questionnaire
        </Button>
      </div>
    </Layout>
  );
};

export default SuccessPage;
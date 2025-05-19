import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import QuestionCard from '../components/premium/QuestionCard';
import ProgressIndicator from '../components/premium/ProgressIndicator';

const QuestionnairePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // Questionnaire state
  const [questionnaireData, setQuestionnaireData] = useState({
    specificTasks: ['', '', ''],
    technologies: ['', '', ''],
    skills: [
      { name: '', level: 3 },
      { name: '', level: 3 },
      { name: '', level: 3 }
    ],
    goals: ['', '', ''],
    previousTransitions: '',
    learningPreferences: [],
    location: '',
    industrySpecificChallenges: '',
    timeline: '',
    riskTolerance: 5
  });
  
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
  
  const handleUpdateTasks = (index, value) => {
    const newTasks = [...questionnaireData.specificTasks];
    newTasks[index] = value;
    setQuestionnaireData({ ...questionnaireData, specificTasks: newTasks });
  };
  
  const handleUpdateTechnologies = (index, value) => {
    const newTechnologies = [...questionnaireData.technologies];
    newTechnologies[index] = value;
    setQuestionnaireData({ ...questionnaireData, technologies: newTechnologies });
  };
  
  const handleUpdateSkills = (index, field, value) => {
    const newSkills = [...questionnaireData.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setQuestionnaireData({ ...questionnaireData, skills: newSkills });
  };
  
  const handleUpdateGoals = (index, value) => {
    const newGoals = [...questionnaireData.goals];
    newGoals[index] = value;
    setQuestionnaireData({ ...questionnaireData, goals: newGoals });
  };
  
  const handleLearningPreferenceChange = (preference) => {
    const preferences = [...questionnaireData.learningPreferences];
    if (preferences.includes(preference)) {
      const updatedPreferences = preferences.filter(p => p !== preference);
      setQuestionnaireData({ ...questionnaireData, learningPreferences: updatedPreferences });
    } else {
      preferences.push(preference);
      setQuestionnaireData({ ...questionnaireData, learningPreferences: preferences });
    }
  };
  
  const totalSteps = 10;
  
  const handleNext = () => {
    // Save progress (would connect to API in production)
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = async () => {
    setSaving(true);
    
    try {
      // In a real implementation, save questionnaire to database
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to report page
      navigate(`/report/${id}`);
    } catch (err) {
      console.error('Error submitting questionnaire:', err);
      setError('Failed to save your responses. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  const renderQuestion = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <div className="bg-primary-50 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <svg className="h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Welcome to Your Career Transformation</h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's personalize your roadmap with a few quick questions
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto mb-8">
              <h3 className="text-xl font-semibold mb-4">You're Already Making Progress!</h3>
              <p className="mb-6">
                By completing the initial assessment, you've already taken the crucial first step.
                Now, we'll gather a bit more information to create your personalized plan.
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Takes about 5 minutes to complete</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>You can save and continue later</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Your report will be delivered immediately after completion</span>
                </li>
              </ul>
            </div>
            
            <Button primary onClick={handleNext} className="py-3 px-8 text-lg">
              Let's Get Started
            </Button>
          </div>
        );
      
      case 1:
        return (
          <QuestionCard
            insightValue="Professionals who can precisely articulate their daily tasks are 3x more likely to successfully transition careers."
            question="What specific tasks do you perform in your role that you believe require human judgment?"
          >
            <div className="space-y-4">
              {questionnaireData.specificTasks.map((task, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={task}
                    onChange={(e) => handleUpdateTasks(index, e.target.value)}
                    placeholder={`Task ${index + 1}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              ))}
            </div>
          </QuestionCard>
        );
      
      // Add more cases as needed
      
      default:
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Ready to Generate Your Roadmap</h3>
            <p className="mb-6">
              Thank you for providing this valuable information. We're now ready to create your personalized career transition plan.
            </p>
            <Button primary onClick={handleSubmit} disabled={saving} className="py-3 px-8 text-lg">
              {saving ? 'Generating Your Report...' : 'Generate My Career Roadmap'}
            </Button>
          </div>
        );
    }
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
      <div className="max-w-3xl mx-auto px-4 py-12">
        {currentStep > 0 && (
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            startAt={25}
          />
        )}
        
        <div className="mb-8">
          {renderQuestion()}
        </div>
        
        {currentStep > 0 && (
          <div className="flex justify-between">
            <Button onClick={handleBack}>
              Back
            </Button>
            <Button primary onClick={handleNext}>
              {currentStep < totalSteps ? 'Continue' : 'Complete'}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QuestionnairePage;
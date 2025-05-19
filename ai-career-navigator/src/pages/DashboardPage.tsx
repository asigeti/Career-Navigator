// src/pages/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // You may need to install this package
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import TasksSection from '../components/dashboard/TasksSection';
import NotesSection from '../components/dashboard/NotesSection';
import SkillsTrackingSection from '../components/dashboard/SkillsTrackingSection';
import { supabase } from '../services/supabase';
import { useTheme } from '../contexts/ThemeContext';
import WelcomeOverlay from '../components/onboarding/WelcomeOverlay';

import FeedbackModal from '../components/feedback/FeedbackModal';

// Types
type Task = {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'networking' | 'practice' | 'certification' | 'application' | 'other';
  completed: boolean;
  dueDate?: string;
};

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

type Skill = {
  id: string;
  name: string;
  proficiency: number;
  category: string;
  targetProficiency: number;
};

const DashboardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setIndustry } = useTheme();
  
  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('tasks');
  
  // State for tasks, notes, and skills
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);
const [showFeedback, setShowFeedback] = useState(false);
const handleFeedbackSubmit = (feedback: any) => {
  // In a real application, this would be sent to a backend API
  console.log('Feedback submitted:', feedback);
  
  // Show a thank you message or redirect as appropriate
  setTimeout(() => {
    setShowFeedback(false);
  }, 3000); // Close after 3 seconds
};

// Add a useEffect to trigger the feedback modal after a certain amount of time
useEffect(() => {
  // Check if the user has already given feedback
  const hasFeedback = localStorage.getItem(`feedback_given_${id}`);
  
  if (!hasFeedback && !showWelcome) {
    // Show feedback modal after 5 minutes of active use
    const timer = setTimeout(() => {
      setShowFeedback(true);
      localStorage.setItem(`feedback_given_${id}`, 'true');
    }, 5 * 60 * 1000); // 5 minutes in milliseconds
    
    return () => clearTimeout(timer);
  }
}, [id, showWelcome]);
  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          throw new Error('Assessment ID is required');
        }
        
        // Fetch assessment data
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        if (!data) throw new Error('Assessment not found');
        
        setAssessment(data);
        
        // Set industry theme
        if (data.industry) {
          setIndustry(data.industry);
        }
        
        // Mock tasks - in production, these would come from an API
        const initialTasks: Task[] = [
          {
            id: uuidv4(),
            title: 'Complete Healthcare Data Analysis Course',
            description: 'Enroll in and complete the recommended data analysis course to build foundational skills.',
            category: 'learning',
            completed: false,
            dueDate: '2025-06-30'
          },
          {
            id: uuidv4(),
            title: 'Set up LinkedIn profile for Healthcare Analytics',
            description: 'Update your LinkedIn profile to highlight data analysis skills and interest in healthcare analytics.',
            category: 'networking',
            completed: true
          },
          {
            id: uuidv4(),
            title: 'Practice SQL queries with healthcare dataset',
            description: 'Spend at least 2 hours practicing SQL queries using the provided healthcare dataset.',
            category: 'practice',
            completed: false,
            dueDate: '2025-06-15'
          },
          {
            id: uuidv4(),
            title: 'Join Healthcare Analytics Community',
            description: 'Join the recommended online community to connect with professionals in healthcare analytics.',
            category: 'networking',
            completed: false
          },
          {
            id: uuidv4(),
            title: 'Begin HIPAA Compliance Certification',
            description: 'Register for the HIPAA compliance certification course to enhance your knowledge of healthcare data regulations.',
            category: 'certification',
            completed: false,
            dueDate: '2025-07-15'
          }
        ];
        
        setTasks(initialTasks);
        setFilteredTasks(initialTasks);
        
        // Mock notes
        setNotes([
          {
            id: uuidv4(),
            title: 'Course Progress',
            content: 'Completed the first two modules of the Healthcare Data Analysis course. Finding SQL queries challenging but making progress. Need to spend more time on the practice exercises.',
            createdAt: '2025-05-20T14:22:33Z'
          },
          {
            id: uuidv4(),
            title: 'Networking Contact',
            content: 'Connected with Sarah Johnson, Healthcare Data Analyst at Memorial Hospital. She suggested focusing on SQL and data visualization skills. Offered to review my resume next month.',
            createdAt: '2025-05-18T09:15:00Z'
          }
        ]);
        
        // Mock skills
        setSkills([
          {
            id: uuidv4(),
            name: 'Data Analysis',
            proficiency: 25,
            category: 'technical',
            targetProficiency: 80
          },
          {
            id: uuidv4(),
            name: 'Healthcare Informatics',
            proficiency: 10,
            category: 'domain',
            targetProficiency: 70
          },
          {
            id: uuidv4(),
            name: 'SQL',
            proficiency: 15,
            category: 'technical',
            targetProficiency: 75
          },
          {
            id: uuidv4(),
            name: 'HIPAA Compliance',
            proficiency: 30,
            category: 'certification',
            targetProficiency: 90
          },
          {
            id: uuidv4(),
            name: 'Medical Terminology',
            proficiency: 80,
            category: 'domain',
            targetProficiency: 85
          }
        ]);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, setIndustry]);
  
  // Task handlers
  const handleToggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    
    // Update filtered tasks
    handleFilterTasks(updatedTasks);
  };
  useEffect(() => {
  // Check if this is the first visit after payment
  const isFirstVisit = !localStorage.getItem(`dashboard_visited_${id}`);
  if (isFirstVisit) {
    setShowWelcome(true);
    localStorage.setItem(`dashboard_visited_${id}`, 'true');
  }
}, [id]);
  const handleEditTask = (taskId: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    );
    setTasks(updatedTasks);
    
    // Update filtered tasks
    handleFilterTasks(updatedTasks);
  };
  
  const handleAddTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      id: uuidv4(),
      ...taskData,
      completed: false
    };
    
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    
    // Update filtered tasks
    handleFilterTasks(updatedTasks);
  };
  
  const handleFilterTasks = (allTasks = tasks, filter = 'all') => {
    let filtered;
    
    switch (filter) {
      case 'active':
        filtered = allTasks.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = allTasks.filter(task => task.completed);
        break;
      case 'upcoming':
        filtered = allTasks.filter(task => {
          if (!task.dueDate || task.completed) return false;
          const dueDate = new Date(task.dueDate);
          const today = new Date();
          const diff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          return diff >= 0 && diff <= 7;
        });
        break;
      case 'learning':
      case 'networking':
      case 'practice':
      case 'certification':
      case 'application':
        filtered = allTasks.filter(task => task.category === filter);
        break;
      default:
        filtered = allTasks;
    }
    
    setFilteredTasks(filtered);
  };
  
  // Note handlers
  const handleAddNote = (noteData: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      id: uuidv4(),
      ...noteData,
      createdAt: new Date().toISOString()
    };
    
    setNotes([newNote, ...notes]);
  };
  
  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };
  
  // Skill handlers
  const handleUpdateSkill = (skillId: string, updates: Partial<Skill>) => {
    setSkills(skills.map(skill => 
      skill.id === skillId ? { ...skill, ...updates } : skill
    ));
  };
  
  const handleAddSkill = (skillData: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      id: uuidv4(),
      ...skillData
    };
    
    setSkills([...skills, newSkill]);
  };
  
  // Calculate progress
  const calculateProgress = () => {
    const totalTasks = tasks.length;
    if (totalTasks === 0) return 0;
    
    const completedCount = tasks.filter(task => task.completed).length;
    return Math.round((completedCount / totalTasks) * 100);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold mb-4">Loading dashboard...</div>
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
          <Button primary onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Implementation Dashboard</h1>
            <p className="text-gray-600">
              Track your progress and follow your personalized career transition plan
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to={`/report/${id}`}>
              <Button className="mr-2">View Report</Button>
            </Link>
            <Link to={`/resources/${id}`}>
              <Button primary>Resource Library</Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Overall Progress</h2>
              <span className="text-sm text-gray-500">Updated today</span>
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {calculateProgress()}% Complete
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-primary-600 rounded-full"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              You've completed {tasks.filter(task => task.completed).length} of {tasks.length} recommended actions
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Risk Assessment</h2>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-red-600">75%</span>
              </div>
              <div>
                <div className="font-medium">High Risk</div>
                <div className="text-sm text-gray-600">{assessment.job_title}</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              Your role has significant automation potential within 24 months
            </div>
            <Link to={`/report/${id}`} className="text-primary-600 text-sm font-medium hover:text-primary-800">
              View full risk analysis →
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Next Milestone</h2>
            <div className="mb-4">
              <div className="font-medium mb-1">Healthcare Data Analysis Skills</div>
              <div className="text-sm text-gray-600 mb-2">
                Target completion: June 30, 2025
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-green-500 rounded-full"
                  style={{ width: '25%' }}
                ></div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              Building data analysis skills will open new career opportunities in healthcare
            </div>
            <Link to="#" className="text-primary-600 text-sm font-medium hover:text-primary-800">
              View roadmap →
            </Link>
          </div>
        </div>
        
       <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
  <div className="flex overflow-x-auto border-b">
    <button
      className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'tasks' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600'}`}
      onClick={() => setActiveTab('tasks')}
    >
      Tasks
    </button>
    <button
      className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'skills' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600'}`}
      onClick={() => setActiveTab('skills')}
    >
      Skills
    </button>
    <button
      className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'resources' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600'}`}
      onClick={() => setActiveTab('resources')}
    >
      Resources
    </button>
    <button
      className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'notes' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600'}`}
      onClick={() => setActiveTab('notes')}
    >
      Notes
    </button>
  </div>
  
        
        <div className="bg-primary-50 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Upgrade to Annual Access</h2>
              <p className="mb-4">
                Get quarterly reassessments and continuous guidance as AI evolves.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quarterly reassessments as AI evolves</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited report updates</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority access to new features</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/3 text-center">
              <div className="text-gray-500 line-through mb-1">Regular: $489</div>
              <div className="text-gray-600 mb-1">Your price: $399</div>
              <div className="text-green-600 mb-4">$89 credit applied</div>
              <Button primary className="w-full py-3">
                Upgrade Now
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Special offer expires in 27 days
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Add the missing closing div here */}
      </div>
      {showWelcome && (
        <WelcomeOverlay
          userName={assessment.name || assessment.email.split('@')[0]}
          onClose={() => setShowWelcome(false)}
        />
      )}
      {showFeedback && (
  <FeedbackModal
    onClose={() => setShowFeedback(false)}
    onSubmit={handleFeedbackSubmit}
  />
)}
    </Layout>
  );
};

export default DashboardPage;
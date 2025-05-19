import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import RiskGauge from '../components/reports/RiskGauge';
import SkillRadarChart from '../components/reports/SkillRadarChart';
import CareerTimelineChart from '../components/reports/CareerTimelineChart';
import { useTheme } from '../contexts/ThemeContext';
import { analytics } from '../services/analytics';
import { generateStructuredPDF } from '../services/pdfService';


const ReportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { industry, setIndustry, getThemeColors, getIndustryTerminology } = useTheme();
  
  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
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
        
        // Set the industry theme based on the assessment
        if (data.industry) {
          setIndustry(data.industry);
        }
        
        // In production, you would fetch the full report data here
        // For now, we'll simulate a loading delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Track page view
        analytics.trackPageView('premium_report', { 
          assessment_id: id,
          industry: data.industry,
          job_title: data.job_title
        });
      } catch (err) {
        console.error('Error fetching assessment:', err);
        setError('Failed to load report data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssessment();
  }, [id, setIndustry]);
  
  const handleDownloadPDF = async () => {
  try {
    analytics.trackEvent('button_click', { 
      button: 'download_pdf',
      assessment_id: id
    });
    
    // Show loading spinner
    setDownloadingPdf(true);
    
    // Generate the PDF
    await generateStructuredPDF(report, assessment);
    
    // Hide loading spinner
    setDownloadingPdf(false);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    setDownloadingPdf(false);
    alert('There was an error generating the PDF. Please try again.');
  }
};
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const handleUpgrade = () => {
    analytics.trackEvent('button_click', { 
      button: 'upgrade_annual',
      assessment_id: id,
      from_location: 'report_page'
    });
    // In production, this would navigate to the upgrade page or open a checkout modal
    alert('Upgrade functionality would be implemented here.');
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold mb-4">Generating your report...</div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
          <div className="mt-6 max-w-md text-center">
            <p className="text-gray-600">We're analyzing your career information and creating your personalized roadmap.</p>
          </div>
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
  
  // Mock report data 
  const report = {
    riskScore: 75,
    timeframe: '24 months',
    insights: [
      'Medical record management is increasingly automated',
      'AI is being rapidly adopted for medical documentation',
      'The role will shift toward oversight and quality control',
      'Data quality expertise will remain valuable',
      'Patient privacy knowledge is a key differentiator'
    ],
    recommendations: [
      'Develop healthcare data analysis skills',
      'Focus on compliance and privacy expertise',
      'Consider specialization in medical coding or auditing',
      'Pursue certification in healthcare informatics',
      'Build skills in AI-assisted documentation review'
    ],
    skillGap: {
      current: ['Medical terminology', 'Record management', 'Data entry'],
      needed: ['Data analysis', 'Healthcare informatics', 'AI prompt engineering', 'Privacy compliance'],
      transferable: ['Attention to detail', 'Organization', 'Process optimization']
    },
    roadmap: [
      {
        timeframe: '0-3 months',
        actions: [
          'Complete online course in healthcare data analysis',
          'Begin learning SQL fundamentals',
          'Join healthcare informatics community'
        ]
      },
      {
        timeframe: '3-6 months',
        actions: [
          'Start HIPAA compliance certification',
          'Practice using AI tools for documentation',
          'Connect with professionals in target roles'
        ]
      },
      {
        timeframe: '6-12 months',
        actions: [
          'Complete healthcare informatics certification',
          'Apply for internal transition opportunities',
          'Develop portfolio of data quality projects'
        ]
      }
    ],
    resources: [
      {
        title: 'Healthcare Data Analysis Fundamentals',
        type: 'Course',
        link: '#'
      },
      {
        title: 'AI in Healthcare: Practical Applications',
        type: 'Workshop',
        link: '#'
      },
      {
        title: 'HIPAA Compliance Certification',
        type: 'Certification',
        link: '#'
      },
      {
        title: 'SQL for Healthcare Professionals',
        type: 'Tutorial',
        link: '#'
      }
    ],
    skillRadarData: [
      { name: 'Data Analysis', current: 30, required: 80, fullMark: 100 },
      { name: 'Healthcare Informatics', current: 20, required: 70, fullMark: 100 },
      { name: 'Medical Terminology', current: 90, required: 70, fullMark: 100 },
      { name: 'AI Prompting', current: 10, required: 60, fullMark: 100 },
      { name: 'Privacy Compliance', current: 40, required: 75, fullMark: 100 },
      { name: 'Process Optimization', current: 60, required: 70, fullMark: 100 },
    ],
    timelineData: [
      { year: '2025', withStrategy: 60000, withoutStrategy: 60000 },
      { year: '2026', withStrategy: 68000, withoutStrategy: 62000 },
      { year: '2027', withStrategy: 79000, withoutStrategy: 64000 },
      { year: '2028', withStrategy: 92000, withoutStrategy: 65000 },
      { year: '2029', withStrategy: 105000, withoutStrategy: 67000 },
    ]
  };
  
  // Get theme colors for industry
  const themeColors = getThemeColors();
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your AI Career Roadmap</h1>
            <p className="text-gray-600">
              Based on your role as a {assessment.job_title} in {assessment.industry}
            </p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-4">
           <Button onClick={handleDownloadPDF} disabled={downloadingPdf}>
  <span className="flex items-center">
    {downloadingPdf ? (
      <>
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Generating PDF...
      </>
    ) : (
      <>
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download PDF
      </>
    )}
  </span>
</Button>
            <Link to={`/dashboard/${id}`}>
              <Button primary>
                Implementation Dashboard
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex flex-wrap border-b overflow-x-auto">
            <button
              className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'overview' ? `text-${themeColors.primary} border-b-2 border-${themeColors.primary}` : 'text-gray-600'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'skills' ? `text-${themeColors.primary} border-b-2 border-${themeColors.primary}` : 'text-gray-600'}`}
              onClick={() => setActiveTab('skills')}
            >
              {getIndustryTerminology('skills')} Analysis
            </button>
            <button
              className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'roadmap' ? `text-${themeColors.primary} border-b-2 border-${themeColors.primary}` : 'text-gray-600'}`}
              onClick={() => setActiveTab('roadmap')}
            >
              Transition Plan
            </button>
            <button
              className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'resources' ? `text-${themeColors.primary} border-b-2 border-${themeColors.primary}` : 'text-gray-600'}`}
              onClick={() => setActiveTab('resources')}
            >
              Resources
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                    <RiskGauge score={report.riskScore} />
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-xl font-semibold mb-2">AI Impact Summary</h2>
                    <p className="mb-4">
                      Your role as a <strong>{assessment.job_title}</strong> has a 
                      <strong className={
                        report.riskScore < 30 ? ' text-green-600' : 
                        report.riskScore < 70 ? ' text-yellow-600' : ' text-red-600'
                      }> {report.riskScore}% risk</strong> of being impacted by AI within the next {report.timeframe}.
                    </p>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Key Insights:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {report.insights.map((insight, index) => (
                          <li key={index}>{insight}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Strategic Recommendations:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {report.recommendations.map((recommendation, index) => (
                          <li key={index}>{recommendation}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold mb-3">Executive Summary</h3>
                  <p className="mb-3">
                    Your role as a Medical Records Technician is facing significant automation pressure from AI technologies. 
                    With a 75% risk score and a 24-month timeframe, it's essential to begin a strategic career transition now.
                  </p>
                  <p>
                    Your strongest asset is your understanding of medical terminology and healthcare regulations, which provides 
                    an excellent foundation for transitioning to roles in healthcare data analysis, informatics, or compliance. 
                    By developing technical skills while leveraging your domain expertise, you can position yourself for 
                    higher-value roles that are less susceptible to automation.
                  </p>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold mb-3">Current State</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          !
                        </span>
                        <span>High automation risk (75%)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          !
                        </span>
                        <span>Limited growth in current role</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          ✓
                        </span>
                        <span>Strong medical terminology knowledge</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          ✓
                        </span>
                        <span>Healthcare domain expertise</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold mb-3">Future Opportunities</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          ✓
                        </span>
                        <span>Healthcare Data Analyst (+30% salary)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          ✓
                        </span>
                        <span>Medical Coding Specialist (+15% salary)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          ✓
                        </span>
                        <span>Healthcare Compliance Officer (+40% salary)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          ✓
                        </span>
                        <span>Clinical Informatics Specialist (+35% salary)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'skills' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">{getIndustryTerminology('skills')} Gap Analysis</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium text-gray-800 mb-2">Current {getIndustryTerminology('skills')}</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {report.skillGap.current.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={`bg-${themeColors.primary}-50 p-4 rounded-md`}>
                    <h3 className={`font-medium text-${themeColors.primary}-800 mb-2`}>
                      {getIndustryTerminology('skills')} to Develop
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {report.skillGap.needed.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-md">
                    <h3 className="font-medium text-green-800 mb-2">Transferable {getIndustryTerminology('skills')}</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {report.skillGap.transferable.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 border border-gray-200 rounded-md mb-6">
                  <h3 className="font-medium mb-3">{getIndustryTerminology('skills')} Gap Visualization</h3>
                  <div className="h-80">
                    <SkillRadarChart
                      skills={report.skillRadarData}
                      colors={{
                        currentSkill: themeColors.primary,
                        requiredSkill: themeColors.secondary
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    This chart shows your current skill levels (blue) compared to what's required (green) for your target roles.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold mb-3">Development Strategy</h3>
                    <p className="text-gray-700 mb-4">
                      Focus on developing these key skills to prepare for your career transition:
                    </p>
                    <ol className="list-decimal pl-5 space-y-3">
                      <li>
                        <span className="font-medium">Data Analysis</span>
                        <p className="text-sm text-gray-600 mt-1">
                          Start with healthcare-specific data analysis courses that build on your existing domain knowledge.
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">SQL Database Skills</span>
                        <p className="text-sm text-gray-600 mt-1">
                          Learn basic to intermediate SQL querying to leverage healthcare databases effectively.
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Healthcare Informatics</span>
                        <p className="text-sm text-gray-600 mt-1">
                          Pursue certification in healthcare informatics to formalize your transition.
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Privacy Expertise</span>
                        <p className="text-sm text-gray-600 mt-1">
                          Develop deeper expertise in HIPAA compliance and healthcare data privacy regulations.
                        </p>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold mb-3">Leveraging Transferable Skills</h3>
                    <p className="text-gray-700 mb-4">
                      Your existing skills provide significant advantages in your career transition:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          ✓
                        </span>
                        <div>
                          <span className="font-medium">Medical Terminology</span>
                          <p className="text-sm text-gray-600 mt-1">
                            Gives you an edge in healthcare data analysis over technical analysts without domain expertise.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          ✓
                        </span>
                        <div>
                          <span className="font-medium">Attention to Detail</span>
                          <p className="text-sm text-gray-600 mt-1">
                            Critical for ensuring data quality and regulatory compliance in healthcare analytics.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          ✓
                        </span>
                        <div>
                          <span className="font-medium">Process Optimization</span>
                          <p className="text-sm text-gray-600 mt-1">
                            Valuable for implementing data-driven workflow improvements in healthcare settings.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'roadmap' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Career Transition Roadmap</h2>
                
                <div className="p-6 border border-gray-200 rounded-md mb-6">
                  <h3 className="font-medium mb-4">Career Value Projection</h3>
                  <div className="h-80">
                    <CareerTimelineChart
                      data={report.timelineData}
                      colors={{
                        withStrategy: themeColors.primary,
                        withoutStrategy: '#f56565'
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    Projected career value based on strategic skill development vs. staying on current path
                  </p>
                </div>
                
                <div className="space-y-8 mb-8">
                  {report.roadmap.map((phase, index) => (
                    <div key={index} className={`relative pl-8 pb-8 border-l-2 border-${themeColors.primary}-200`}>
                      <div className={`absolute left-[-8px] top-0 w-4 h-4 bg-${themeColors.primary}-600 rounded-full`}></div>
                      <div className="mb-2">
                        <span className={`inline-block px-3 py-1 bg-${themeColors.primary}-100 text-${themeColors.primary}-800 rounded-full text-sm font-medium`}>
                          {phase.timeframe}
                        </span>
                      </div>
                      <ul className="list-disc pl-5 space-y-2">
                        {phase.actions.map((action, actionIndex) => (
                          <li key={actionIndex}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <h3 className="font-semibold text-lg mb-3">Target Roles</h3>
                    <div className="space-y-4">
                      <div className="border-b pb-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Healthcare Data Analyst</h4>
                          <span className="text-green-600 font-medium">+30% Salary</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Analyze healthcare data to improve patient outcomes, reduce costs, and ensure regulatory compliance.
                        </p>
                        <div className="mt-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">SQL</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">Data Analysis</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Healthcare</span>
                        </div>
                      </div>
                      
                      <div className="border-b pb-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Healthcare Compliance Specialist</h4>
                          <span className="text-green-600 font-medium">+40% Salary</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Ensure healthcare organizations meet regulatory requirements for data handling and privacy.
                        </p>
                        <div className="mt-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">HIPAA</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">Regulations</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Compliance</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Clinical Informatics Specialist</h4>
                          <span className="text-green-600 font-medium">+35% Salary</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Bridge the gap between clinical practice and information technology in healthcare settings.
                        </p>
                        <div className="mt-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">EHR Systems</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">Healthcare IT</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Clinical Workflows</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <h3 className="font-semibold text-lg mb-3">Implementation Strategy</h3>
                    <p className="text-gray-700 mb-4">
                      Follow this strategic approach to maximize your transition success:
                    </p>
                    <ol className="space-y-4">
                      <li className="flex">
                        <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                          1
                        </span>
                        <div>
                          <h4 className="font-medium">Start with fundamentals</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Complete the Healthcare Data Analysis Fundamentals course to build a strong foundation.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex">
                        <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                          2
                        </span>
                        <div>
                          <h4 className="font-medium">Build practical experience</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Practice SQL with real healthcare datasets and create a portfolio of sample projects.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex">
                        <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                          3
                        </span>
                        <div>
                          <h4 className="font-medium">Pursue certification</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Complete a recognized healthcare informatics or data analytics certification.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex">
                        <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                          4
                        </span>
                        <div>
                          <h4 className="font-medium">Network strategically</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Connect with professionals in target roles and participate in relevant communities.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex">
                        <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                          5
                        </span>
                        <div>
                          <h4 className="font-medium">Position for internal transition</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Identify opportunities within your current organization to apply new skills.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'resources' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Recommended Resources</h2>
                <p className="text-gray-600 mb-6">
                  Curated learning resources to help you develop the skills needed for your career transition
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {report.resources.map((resource, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">
                          <span className={`inline-block w-10 h-10 bg-${themeColors.primary}-100 text-${themeColors.primary}-700 rounded-full flex items-center justify-center text-lg`}>
                            {resource.type.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{resource.type}</p>
                          <a href={resource.link} className={`text-${themeColors.primary}-600 text-sm hover:underline`}>
                            View Resource
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={`bg-${themeColors.primary}-50 rounded-lg p-6 mb-6`}>
                  <h3 className="font-semibold mb-2">Resource Library Access</h3>
                  <p className="mb-4">
                    Your premium plan includes access to our complete resource library with hundreds of curated learning materials.
                  </p>
                  <Link to={`/resources/${id}`}>
                    <Button primary>
                      Browse Full Resource Library
                    </Button>
                  </Link>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3">Implementation Support</h3>
                  <p className="text-gray-700 mb-4">
                    Track your progress and stay accountable with our implementation tools:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-100 rounded p-4 text-center">
                      <div className="text-2xl mb-2">📋</div>
                      <h4 className="font-medium mb-1">Task Management</h4>
                      <p className="text-sm text-gray-600">
                        Track progress on your career transition tasks
                      </p>
                    </div>
                    
                    <div className="border border-gray-100 rounded p-4 text-center">
                      <div className="text-2xl mb-2">📝</div>
                      <h4 className="font-medium mb-1">Progress Journals</h4>
                      <p className="text-sm text-gray-600">
                        Document your learning and achievements
                      </p>
                    </div>
                    
                    <div className="border border-gray-100 rounded p-4 text-center">
                      <div className="text-2xl mb-2">📊</div>
                      <h4 className="font-medium mb-1">Skill Tracker</h4>
                      <p className="text-sm text-gray-600">
                        Monitor your skill development over time
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Link to={`/dashboard/${id}`}>
                      <Button primary>
                        Go to Implementation Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className={`bg-${themeColors.primary}-50 rounded-lg p-6 mb-8`}>
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <p className="mb-4">
            Your career transformation journey has just begun. Here's how to make the most of your roadmap:
          </p>
          <ol className="list-decimal pl-5 space-y-2 mb-6">
            <li>Review your complete report and save it for reference</li>
            <li>Start with the 0-3 month actions in your roadmap</li>
            <li>Explore the recommended resources to build your skills</li>
            <li>Track your progress using the implementation dashboard</li>
          </ol>
          <Link to={`/dashboard/${id}`}>
            <Button primary>
              Go to Implementation Dashboard
            </Button>
          </Link>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Upgrade to Annual Access</h2>
              <p className="mb-4">
                Get quarterly reassessments and continuous guidance as AI evolves.
              </p>
              <ul className="list-check pl-5 space-y-2 mb-6">
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
              <Button primary className="w-full py-3" onClick={handleUpgrade}>
                Upgrade Now
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Special offer expires in 30 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportPage;
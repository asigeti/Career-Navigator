type AssessmentData = {
  jobTitle: string;
  industry: string;
  experience: string;
  tasks: string;
  email: string;
};

type AssessmentResult = {
  riskScore: number;
  timeframe: string;
  insights: string[];
  recommendations: string[];
};

// Mock AI responses for development
const mockResponses: Record<string, AssessmentResult> = {
  'Data Entry Specialist': {
    riskScore: 90,
    timeframe: '18 months',
    insights: [
      'Data entry tasks are highly automatable with current AI technology',
      'OCR and ML technologies are already replacing manual data entry',
      'Companies are rapidly adopting automation for cost reduction'
    ],
    recommendations: [
      'Focus on data verification and quality assurance skills',
      'Learn data analysis to move up the value chain',
      'Explore adjacent roles in data management'
    ]
  },
  'Junior Web Developer': {
    riskScore: 60,
    timeframe: '36 months',
    insights: [
      'Simple front-end development tasks are increasingly automated',
      'AI code generators can handle basic component creation',
      'Your role will likely evolve rather than disappear entirely'
    ],
    recommendations: [
      'Build expertise in complex front-end frameworks',
      'Develop AI integration skills',
      'Focus on UX design principles'
    ]
  },
  'Creative Director': {
    riskScore: 25,
    timeframe: '60+ months',
    insights: [
      'Creative direction requires human judgment and taste',
      'Strategic creative thinking remains challenging for AI',
      'Your role will evolve to incorporate AI as a creative tool'
    ],
    recommendations: [
      'Learn to direct and prompt AI creative tools',
      'Develop stronger strategic business skills',
      'Focus on human-centered design thinking'
    ]
  },
  'Medical Records Technician': {
    riskScore: 75,
    timeframe: '24 months',
    insights: [
      'Medical record management is increasingly automated',
      'AI is being rapidly adopted for medical documentation',
      'The role will shift toward oversight and quality control'
    ],
    recommendations: [
      'Develop healthcare data analysis skills',
      'Focus on compliance and privacy expertise',
      'Consider specialization in medical coding or auditing'
    ]
  }
};

// Function to get a mock response or default
const getMockResponse = (jobTitle: string): AssessmentResult => {
  // Check for exact match
  if (mockResponses[jobTitle]) {
    return mockResponses[jobTitle];
  }
  
  // Check for partial match
  for (const key of Object.keys(mockResponses)) {
    if (jobTitle.toLowerCase().includes(key.toLowerCase())) {
      return mockResponses[key];
    }
  }
  
  // Default response
  return {
    riskScore: 50,
    timeframe: '36 months',
    insights: [
      'Your role will face moderate automation pressure',
      'Certain aspects of your job may be automated first',
      'Continuous skill development will be essential'
    ],
    recommendations: [
      'Stay current with industry technology trends',
      'Develop unique skills that complement AI',
      'Focus on aspects requiring human judgment'
    ]
  };
};

export const assessCareerRisk = async (data: AssessmentData): Promise<AssessmentResult> => {
  // In development, use mock responses
  if (import.meta.env.DEV) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return getMockResponse(data.jobTitle);
  }
  
  // In production, call Groq API
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are an AI career risk assessment expert. Analyze the user\'s job information and provide an AI automation risk score (0-100), estimated timeframe for significant automation, key insights, and recommendations.'
          },
          {
            role: 'user',
            content: `
              Job Title: ${data.jobTitle}
              Industry: ${data.industry}
              Experience: ${data.experience}
              Key Tasks: ${data.tasks}
              
              Provide a JSON response with:
              1. riskScore (0-100)
              2. timeframe (when AI might impact this role)
              3. insights (array of key insights)
              4. recommendations (array of initial suggestions)
            `
          }
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' }
      })
    });

    const result = await response.json();
    const content = JSON.parse(result.choices[0].message.content);
    
    return {
      riskScore: content.riskScore,
      timeframe: content.timeframe,
      insights: content.insights,
      recommendations: content.recommendations
    };
  } catch (error) {
    console.error('Error calling AI service:', error);
    // Fallback to mock response if API fails
    return getMockResponse(data.jobTitle);
  }
};
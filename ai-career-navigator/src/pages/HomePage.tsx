import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-6">
              Know Your AI Risk Score. Own Your Future.
            </h1>
            <p className="text-xl mb-8">
              After studying thousands of career disruptions, we discovered something profound: 
              Those who thrive during technological shifts aren't the most skilled – they're the most prepared.
            </p>
            <div className="flex gap-4">
              <Link to="/assessment">
                <Button primary className="py-3 px-8 text-lg">
                  Take the Assessment
                </Button>
              </Link>
              <Link to="/about">
                <Button className="py-3 px-8 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex items-center justify-center">
            <img src="/path-to-your-hero-image.svg" alt="Career Navigation" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
      
      {/* How It Works */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven process helps you understand your AI risk and transform uncertainty into strategy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-700 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Take the Assessment</h3>
              <p className="text-gray-600">
                Complete our 2-minute assessment to analyze your current role and responsibilities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-700 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Your Risk Score</h3>
              <p className="text-gray-600">
                Receive your personalized AI risk score and initial insights about your career vulnerability.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-700 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Transform Your Career</h3>
              <p className="text-gray-600">
                Unlock your detailed roadmap with specific actions to future-proof your professional journey.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/assessment">
              <Button primary className="py-3 px-8 text-lg">
                Start My Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Professionals Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thousands of professionals have transformed their careers with our guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 w-12 h-12 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Former Data Entry Specialist</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I was shocked to see my 92% risk score. The roadmap helped me transition to data analysis, and I now earn 40% more while feeling secure about my future."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 w-12 h-12 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-gray-600 text-sm">Web Developer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The assessment confirmed my suspicions about automation in my field. The skill gap analysis showed me exactly what to learn next. Now I'm leading AI integration projects."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 w-12 h-12 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Jessica Patel</h4>
                  <p className="text-gray-600 text-sm">Healthcare Administrator</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I went from fearing AI would replace me to using it as my competitive advantage. The roadmap gave me clarity when I needed it most."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Don't Wait Until AI Makes Your Career Decision For You
          </h2>
          <p className="text-xl mb-8">
            Join thousands of professionals who've taken control of their future with our AI Career Navigator.
          </p>
          <Link to="/assessment">
            <Button className="bg-white text-primary-700 hover:bg-gray-100 py-3 px-8 text-lg font-semibold">
              Take the Free Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
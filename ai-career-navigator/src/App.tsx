import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import QuestionnairePage from './pages/QuestionnairePage';
import ReportPage from './pages/ReportPage';
import { usePageTracking } from './hooks/usePageTracking';
import ErrorBoundary from './components/ErrorBoundary';
import ResourceLibraryPage from './pages/ResourceLibraryPage';
import DashboardPage from './pages/DashboardPage';


const App: React.FC = () => {
  usePageTracking(); 
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard/:id" element={<DashboardPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/resources/:id" element={<ResourceLibraryPage />} />
              <Route path="/assessment" element={<AssessmentPage />} />
              <Route path="/results/:id" element={<ResultsPage />} />
              <Route path="/checkout/:id" element={<CheckoutPage />} />
              <Route path="/success/:id" element={<SuccessPage />} />
              <Route path="/questionnaire/:id" element={<QuestionnairePage />} />
              <Route path="/report/:id" element={<ReportPage />} />
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
      );
    };
    
    export default App;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../contexts/AuthContext';

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Media',
  'Legal',
  'Construction',
  'Transportation',
  'Hospitality',
  'Energy'
];

const experienceLevels = [
  '0-2 years',
  '3-5 years',
  '6-10 years',
  '10+ years'
];

const AssessmentForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    industry: '',
    experience: '',
    tasks: '',
    email: user?.email || ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }
    
    if (!formData.industry) {
      newErrors.industry = 'Please select your industry';
    }
    
    if (!formData.experience) {
      newErrors.experience = 'Please select your experience level';
    }
    
    if (!formData.tasks.trim()) {
      newErrors.tasks = 'Please describe your key tasks';
    } else if (formData.tasks.trim().length < 10) {
      newErrors.tasks = 'Please provide more detail about your tasks';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save assessment to database
      const { data, error } = await supabase
        .from('assessments')
        .insert([
          {
            user_id: user?.id || 'anonymous',
            job_title: formData.jobTitle,
            industry: formData.industry,
            experience: formData.experience,
            tasks: formData.tasks,
            email: formData.email
          }
        ])
        .select();
      
      if (error) throw error;
      
      // Navigate to results page with assessment ID
      navigate(`/results/${data[0].id}`);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('There was an error submitting your assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">AI Career Assessment</h1>
      <p className="mb-6 text-gray-600">
        Discover how AI might impact your career and get personalized insights to stay ahead.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="e.g., Marketing Manager"
          required
          error={errors.jobTitle}
        />
        
        <div className="mb-4">
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
              errors.industry ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select your industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
            Experience Level <span className="text-red-500">*</span>
          </label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
              errors.experience ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select your experience level</option>
            {experienceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          {errors.experience && <p className="mt-1 text-sm text-red-500">{errors.experience}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="tasks" className="block text-sm font-medium text-gray-700 mb-1">
            Key Tasks <span className="text-red-500">*</span>
          </label>
          <textarea
            id="tasks"
            name="tasks"
            value={formData.tasks}
            onChange={handleChange}
            placeholder="Describe your main job responsibilities and day-to-day tasks..."
            required
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
              errors.tasks ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.tasks && <p className="mt-1 text-sm text-red-500">{errors.tasks}</p>}
        </div>
        
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
          error={errors.email}
        />
        
        <div className="mt-6">
          <Button type="submit" primary disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Analyzing...' : 'Get My AI Risk Assessment'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AssessmentForm;
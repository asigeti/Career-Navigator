import React, { createContext, useContext, useState } from 'react';

type ThemeContextType = {
  industry: string;
  setIndustry: (industry: string) => void;
  getThemeColors: () => {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  getIndustryTerminology: (term: string) => string;
};

const industryThemes = {
  'Technology': {
    colors: {
      primary: '#4c51bf', // Indigo
      secondary: '#6b46c1', // Purple
      accent: '#9f7aea',
      text: '#2d3748'
    },
    terminology: {
      skills: 'Technical Capabilities',
      development: 'Skill Development',
      career: 'Technical Career Path',
      role: 'Position'
    }
  },
  'Healthcare': {
    colors: {
      primary: '#3182ce', // Blue
      secondary: '#38b2ac', // Teal
      accent: '#4fd1c5',
      text: '#2d3748'
    },
    terminology: {
      skills: 'Clinical Competencies',
      development: 'Professional Development',
      career: 'Clinical Pathway',
      role: 'Position'
    }
  },
  'Finance': {
    colors: {
      primary: '#2c5282', // Navy
      secondary: '#2b6cb0', // Blue
      accent: '#4299e1',
      text: '#1a202c'
    },
    terminology: {
      skills: 'Financial Competencies',
      development: 'Professional Development',
      career: 'Career Trajectory',
      role: 'Position'
    }
  },
  'Education': {
    colors: {
      primary: '#2b6cb0', // Blue
      secondary: '#2c7a7b', // Teal
      accent: '#4fd1c5',
      text: '#2d3748'
    },
    terminology: {
      skills: 'Teaching Competencies',
      development: 'Professional Growth',
      career: 'Educational Pathway',
      role: 'Position'
    }
  },
  // Add more industries as needed
  'default': {
    colors: {
      primary: '#3182ce', // Default Blue
      secondary: '#4a5568', // Gray
      accent: '#a0aec0',
      text: '#2d3748'
    },
    terminology: {
      skills: 'Skills',
      development: 'Development',
      career: 'Career Path',
      role: 'Role'
    }
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [industry, setIndustry] = useState('default');
  
  const getThemeColors = () => {
    return industryThemes[industry]?.colors || industryThemes['default'].colors;
  };
  
  const getIndustryTerminology = (term: string) => {
    return industryThemes[industry]?.terminology[term] || 
           industryThemes['default'].terminology[term] || 
           term;
  };
  
  return (
    <ThemeContext.Provider value={{ industry, setIndustry, getThemeColors, getIndustryTerminology }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
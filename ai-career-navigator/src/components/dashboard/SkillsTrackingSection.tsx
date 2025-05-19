// src/components/dashboard/SkillsTrackingSection.tsx
import React, { useState } from 'react';
import Button from '../ui/Button';

type Skill = {
  id: string;
  name: string;
  proficiency: number;
  category: string;
  targetProficiency: number;
};

type SkillsTrackingProps = {
  skills: Skill[];
  onUpdateSkill: (id: string, updates: Partial<Skill>) => void;
  onAddSkill: (skill: Omit<Skill, 'id'>) => void;
};

const SkillsTrackingSection: React.FC<SkillsTrackingProps> = ({
  skills,
  onUpdateSkill,
  onAddSkill
}) => {
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    proficiency: 10,
    category: 'technical',
    targetProficiency: 80,
  });
  
  const handleAddSkill = () => {
    if (!newSkill.name.trim()) {
      return;
    }
    
    onAddSkill(newSkill);
    setNewSkill({
      name: '',
      proficiency: 10,
      category: 'technical',
      targetProficiency: 80,
    });
    setIsAddingSkill(false);
  };
  
  const handleProficiencyChange = (id: string, proficiency: number) => {
    onUpdateSkill(id, { proficiency });
  };
  
  const getProgressColor = (current: number, target: number) => {
    const ratio = current / target;
    if (ratio < 0.33) return 'bg-red-500';
    if (ratio < 0.66) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Skill Development Tracking</h2>
        
        {!isAddingSkill && (
          <Button
            onClick={() => setIsAddingSkill(true)}
            className="flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Skill
          </Button>
        )}
      </div>
      
      {isAddingSkill && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="font-medium mb-3">New Skill</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="skillName" className="block text-sm font-medium text-gray-700 mb-1">
                Skill Name*
              </label>
              <input
                type="text"
                id="skillName"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="E.g., SQL, Data Analysis, Healthcare Informatics"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="skillCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="skillCategory"
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="technical">Technical</option>
                  <option value="domain">Domain Knowledge</option>
                  <option value="soft">Soft Skills</option>
                  <option value="certification">Certification</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="currentProficiency" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Proficiency: {newSkill.proficiency}%
                </label>
                <input
                  type="range"
                  id="currentProficiency"
                  min="0"
                  max="100"
                  value={newSkill.proficiency}
                  onChange={(e) => setNewSkill({ ...newSkill, proficiency: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="targetProficiency" className="block text-sm font-medium text-gray-700 mb-1">
                Target Proficiency: {newSkill.targetProficiency}%
              </label>
              <input
                type="range"
                id="targetProficiency"
                min="0"
                max="100"
                value={newSkill.targetProficiency}
                onChange={(e) => setNewSkill({ ...newSkill, targetProficiency: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsAddingSkill(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <Button 
                primary 
                onClick={handleAddSkill}
                disabled={!newSkill.name.trim()}
              >
                Add Skill
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {skills.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No skills tracked yet. Start tracking your skill development!</p>
          {!isAddingSkill && (
            <Button onClick={() => setIsAddingSkill(true)}>
              Add Your First Skill
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {skills.map(skill => (
            <div key={skill.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{skill.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  skill.category === 'technical' ? 'bg-blue-100 text-blue-800' :
                  skill.category === 'domain' ? 'bg-green-100 text-green-800' :
                  skill.category === 'soft' ? 'bg-purple-100 text-purple-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {skill.category}
                </span>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Current: {skill.proficiency}%</span>
                  <span>Target: {skill.targetProficiency}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 rounded-full ${getProgressColor(skill.proficiency, skill.targetProficiency)}`}
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-4">
                <label htmlFor={`skill-${skill.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Update Proficiency
                </label>
                <input
                  type="range"
                  id={`skill-${skill.id}`}
                  min="0"
                  max="100"
                  value={skill.proficiency}
                  onChange={(e) => handleProficiencyChange(skill.id, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsTrackingSection;
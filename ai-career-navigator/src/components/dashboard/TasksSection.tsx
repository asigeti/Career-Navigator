// src/components/dashboard/TasksSection.tsx
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';
import Button from '../ui/Button';

type Task = {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'networking' | 'practice' | 'certification' | 'application' | 'other';
  completed: boolean;
  dueDate?: string;
};

type TasksSectionProps = {
  tasks: Task[];
  onToggleCompletion: (id: string) => void;
  onEditTask: (id: string, updates: any) => void;
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  onFilterChange: (filter: string) => void;
};

const TasksSection: React.FC<TasksSectionProps> = ({
  tasks,
  onToggleCompletion,
  onEditTask,
  onAddTask,
  onFilterChange
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };
  
  const handleAddTask = (taskData: any) => {
    onAddTask(taskData);
    setShowAddForm(false);
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">Implementation Tasks</h2>
        
        {!showAddForm && (
          <Button
            primary
            onClick={() => setShowAddForm(true)}
            className="flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Task
          </Button>
        )}
      </div>
      
      {showAddForm && (
        <AddTaskForm
          onAddTask={handleAddTask}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeFilter === 'all'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('active')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeFilter === 'active'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeFilter === 'completed'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => handleFilterChange('upcoming')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeFilter === 'upcoming'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => handleFilterChange('learning')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeFilter === 'learning'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}
        >
          Learning
        </button>
        <button
          onClick={() => handleFilterChange('networking')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeFilter === 'networking'
              ? 'bg-purple-600 text-white'
              : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
          }`}
        >
          Networking
        </button>
        <button
          onClick={() => handleFilterChange('practice')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeFilter === 'practice'
              ? 'bg-green-600 text-white'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          }`}
        >
          Practice
        </button>
      </div>
      
      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No tasks found.</p>
          {!showAddForm && (
            <Button onClick={() => setShowAddForm(true)}>
              Add Your First Task
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              category={task.category}
              dueDate={task.dueDate}
              completed={task.completed}
              onToggleCompletion={onToggleCompletion}
              onEdit={onEditTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksSection;
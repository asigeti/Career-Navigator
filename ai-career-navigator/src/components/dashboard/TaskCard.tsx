// src/components/dashboard/TaskCard.tsx
import React, { useState } from 'react';

type TaskCategory = 'learning' | 'networking' | 'practice' | 'certification' | 'application' | 'other';

type TaskCardProps = {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  dueDate?: string;
  completed: boolean;
  onToggleCompletion: (id: string) => void;
  onEdit: (id: string, updates: any) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  category,
  dueDate,
  completed,
  onToggleCompletion,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editCategory, setEditCategory] = useState(category);
  const [editDueDate, setEditDueDate] = useState(dueDate || '');
  
  const getCategoryColor = () => {
    switch (category) {
      case 'learning':
        return 'bg-blue-100 text-blue-800';
      case 'networking':
        return 'bg-purple-100 text-purple-800';
      case 'practice':
        return 'bg-green-100 text-green-800';
      case 'certification':
        return 'bg-yellow-100 text-yellow-800';
      case 'application':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleSave = () => {
    onEdit(id, {
      title: editTitle,
      description: editDescription,
      category: editCategory,
      dueDate: editDueDate || undefined
    });
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditTitle(title);
    setEditDescription(description);
    setEditCategory(category);
    setEditDueDate(dueDate || '');
    setIsEditing(false);
  };
  
  if (isEditing) {
    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="learning">Learning</option>
                <option value="networking">Networking</option>
                <option value="practice">Practice</option>
                <option value="certification">Certification</option>
                <option value="application">Application</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date (Optional)
              </label>
              <input
                type="date"
                id="dueDate"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start">
        <div className="mr-3 mt-1">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleCompletion(id)}
            className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className={`font-medium ${completed ? 'line-through text-gray-500' : ''}`}>
              {title}
            </h3>
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <p className={`text-sm ${completed ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            {description}
          </p>
          <div className="flex items-center mt-2">
            <span className={`inline-block px-2 py-1 text-xs rounded ${getCategoryColor()}`}>
              {category}
            </span>
            {dueDate && (
              <span className="text-xs text-gray-500 ml-3">
                Due: {new Date(dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
// src/components/dashboard/NotesSection.tsx
import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

type NotesSectionProps = {
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  onDeleteNote: (id: string) => void;
};

const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  onAddNote,
  onDeleteNote
}) => {
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isAddingNote, setIsAddingNote] = useState(false);
  
  const handleAddNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      return;
    }
    
    onAddNote(newNote);
    setNewNote({ title: '', content: '' });
    setIsAddingNote(false);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Personal Notes</h2>
        
        {!isAddingNote && (
          <Button
            onClick={() => setIsAddingNote(true)}
            className="flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Note
          </Button>
        )}
      </div>
      
      {isAddingNote && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="font-medium mb-3">New Note</h3>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                placeholder="Note title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                placeholder="Write your note here..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsAddingNote(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <Button 
                primary 
                onClick={handleAddNote}
                disabled={!newNote.title.trim() || !newNote.content.trim()}
              >
                Save Note
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {notes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No notes yet. Start documenting your career journey!</p>
          {!isAddingNote && (
            <Button onClick={() => setIsAddingNote(true)}>
              Create Your First Note
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map(note => (
            <div key={note.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{note.title}</h3>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-3">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesSection;
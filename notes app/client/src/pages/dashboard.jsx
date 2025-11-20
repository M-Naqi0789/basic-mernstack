import React, { useState, useEffect, useCallback, useContext } from 'react';
import NoteCard from '../components/noteCard';
import { getNotes, createNote, updateNote, deleteNote } from '../api/axios';
import { AuthContext } from '../App.jsx';

const NotesDashboard = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const fetchNotes = useCallback(async () => {
    if (!user) return;
    try {
      const response = await getNotes();
      setNotes(response.data);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
      setError('Failed to load notes.');
    }
  }, [user]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    try {
      if (isEditing) {
        await updateNote(currentNoteId, { title, content });
      } else {
        await createNote({ title, content });
      }
      
      setTitle('');
      setContent('');
      setIsEditing(false);
      setCurrentNoteId(null);
      fetchNotes(); 
    } catch (err) {
      console.error('Submit error:', err);
      setError('Could not save note. Please try again.');
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setCurrentNoteId(note._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      await deleteNote(id);
      fetchNotes(); 
    } catch (err) {
      console.error('Delete error:', err);
      setError('Could not delete note. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setTitle('');
    setContent('');
    setCurrentNoteId(null);
    setIsEditing(false);
  };

  return (
    <div className="note-container">
      <h2>{isEditing ? 'Edit Note' : 'Create New Note'}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="note-form-card">
        <div className="form-group">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
          />
        </div>
        <button type="submit" className={isEditing ? 'btn-warning' : 'btn-success'} style={{ marginRight: '10px' }}>
          {isEditing ? 'Save Changes' : 'Add Note'}
        </button>
        {isEditing && (
          <button type="button" onClick={handleCancelEdit} className="btn-danger">
            Cancel Edit
          </button>
        )}
      </form>

      <h3>Your Notes ({notes.length})</h3>
      <div className="note-grid">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard 
              key={note._id} 
              note={note} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ))
        ) : (
          <p className="note-list-empty">You have no notes yet. Start creating one!</p>
        )}
      </div>
    </div>
  );
};

export default NotesDashboard;
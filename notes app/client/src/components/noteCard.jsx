import React from 'react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-card-actions">
        <button 
          onClick={() => onEdit(note)}
          className="btn-small btn-warning"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(note._id)}
          className="btn-small btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
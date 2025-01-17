import React from 'react';
import NoteItem from './NoteItem.jsx';

const NotesList = ({ notes, onDelete, onUpdate }) => {
  return (
    <div>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default NotesList;
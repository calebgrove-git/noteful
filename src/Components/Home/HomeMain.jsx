import React from 'react';
import Note from '../Note/Note';

export default function HomeMain(props) {
  const showNotes = props.notes.map((note) => {
    return <Note key={note.id} note={note} />;
  });

  return <>{showNotes}</>;
}

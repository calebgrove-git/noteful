import React from 'react';
import Note from '../Note/Note';

export default function Folder(props) {
  const notes = props.notes.filter(
    (note) => note.folderId === props.match.params.id
  );

  const displayNotes = notes.map((note, i) => {
    return <Note key={note.id} note={note} />;
  });
  return <div>{displayNotes}</div>;
}

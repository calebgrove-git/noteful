import React from 'react';

export default function FullNote(props) {
  const note = props.notes.find((note) => note.id === props.match.params.id);
  return (
    <div>
      <h2>{note.name}</h2>
      <p>{note.content}</p>
      <p>{note.modified}</p>
    </div>
  );
}

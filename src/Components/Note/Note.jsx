import React from 'react';

export default function Note(props) {
  return (
    <>
      <a href={`/note/${props.note.id}`}>
        <h2>{props.note.name}</h2>
      </a>
    </>
  );
}

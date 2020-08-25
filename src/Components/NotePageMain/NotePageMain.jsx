import React, { useContext } from 'react';
import Context from '../../Context.js';
import Note from '../Note/Note';

export default function NotePageMain(props) {
  const context = useContext(Context);
  const notes = context.notes;
  const noteId = props.match.params.noteId;
  const deleteNote = () => {
    props.history.push(`/`);
  };
  const note = notes.find((note) => note.id === noteId);
  return (
    <section>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
        onDeleteNote={deleteNote}
      />
      <div>
        {note.content.split(/\n \r|\n/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </section>
  );
}

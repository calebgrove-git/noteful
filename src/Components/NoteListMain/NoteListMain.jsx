import React, { useContext } from 'react';
import Note from '../Note/Note';
import Context from '../../Context';
export default function NoteListMain(props) {
  const context = useContext(Context);
  const folderId = props.match.params.folderId;
  const getNotes = (notes = [], folderId) =>
    !folderId ? notes : notes.filter((note) => note.folderId === folderId);
  const notes = getNotes(context.notes, folderId);
  return (
    <section>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Note id={note.id} name={note.name} modified={note.modified} />
          </li>
        ))}
      </ul>
    </section>
  );
}

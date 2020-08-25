import React, { useContext } from 'react';
import Context from '../../Context';
export default function NotePageNav(props) {
  const context = useContext(Context);

  const notes = context.notes;
  const folders = context.folders;
  const noteId = props.match.params.noteId;
  const note = notes.find((note) => note.id === noteId);

  const folder = folders.find((folder) => folder.id === note.folderId);
  return (
    <div>
      <button onClick={() => props.history.goBack()}>Back</button>
      {folder && <h3>{folder.name}</h3>}
    </div>
  );
}

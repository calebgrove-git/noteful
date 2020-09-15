import React, { useContext, useState, useEffect } from 'react';
import Context from '../../Context';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
export default function NotePageNav(props) {
  const context = useContext(Context);
  const [notes] = useState(context.notes);
  const [folders] = useState(context.folders);
  const [noteId] = useState(props.match.params.noteId);
  const [, setNote] = useState({});
  const [folder, setFolder] = useState({});
  useEffect(() => {
    notes.find((note) => {
      let id = noteId;
      if (!id) {
        id = props.match.params.noteId;
      }
      setNote(note.id === id);
      setFolder(folders.find((folder) => folder.id === note.folderId));
      return null;
    });
  }, [folders, noteId, notes, props.match.params.noteId]);
  return (
    <div>
      <Button onClick={() => props.history.goBack()}>Back</Button>
      {folder && <h3>{folder.name}</h3>}
    </div>
  );
}
NotePageNav.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

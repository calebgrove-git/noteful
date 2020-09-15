import React, { useContext, useState, useEffect } from 'react';
import Context from '../../Context.js';
import Note from '../Note/Note';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import PropTypes from 'prop-types';

export default function NotePageMain(props) {
  const context = useContext(Context);
  const [contextState, setContextState] = useState(useContext(Context));
  const [notes, setNotes] = useState(context.notes);
  const [noteId] = useState(props.match.params.noteId);
  const deleteNote = () => {
    props.history.push(`/`);
  };
  const [note, setNote] = useState(null);
  useEffect(() => {
    setNotes(context.notes);
    setNote(
      notes.find((note) => {
        let id = noteId;
        if (!id) {
          id = props.match.params.noteId;
        }
        return note.id === id;
      })
    );
  }, [contextState, context.notes, noteId, notes, props.match.params.noteId]);
  useEffect(() => {
    setContextState(context);
  }, [context]);

  return (
    <ErrorBoundary>
      <section>
        {note != null && (
          <>
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
          </>
        )}
      </section>
    </ErrorBoundary>
  );
}
NotePageMain.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

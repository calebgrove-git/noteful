import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import Note from '../Note/Note';
import Context from '../../Context';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
export default function NoteListMain(props) {
  const context = useContext(Context);
  const folderId = props.match.params.folderId;
  const getNotes = (notes = [], folderId) =>
    !folderId ? notes : notes.filter((note) => note.folderId.toString() === folderId);
  const notes = getNotes(context.notes, folderId);
  const deleteNote = () => {
    props.history.push(`/`);
  };
  return (
    <ErrorBoundary>
      <div className='noteList'>
        <section>
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <Note
                  id={note.id}
                  name={note.name}
                  modified={note.modified}
                  onDeleteNote={deleteNote}
                />
              </li>
            ))}
          </ul>
        </section>
        <Route
          path='/'
          exact
          render={({ history }) => {
            return (
              <Button
                onClick={() => {
                  history.push('/addNote');
                }}
              >
                Add Note
              </Button>
            );
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
NoteListMain.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

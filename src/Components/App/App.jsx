import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import './App.css';
import Context from '../../Context';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:9090/notes'),
      fetch('http://localhost:9090/folders'),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        setFolders(folders);
        setNotes(notes);
      })
      .catch((error) => {
        console.error({ error });
      });
  }, []);
  function renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path='/note/:noteId' component={NotePageNav} />
      </>
    );
  }
  function renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path='/note/:noteId' component={NotePageMain} />
      </>
    );
  }
  const deleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };
  const value = {
    notes: notes,
    folders: folders,
    deleteNote,
  };
  return (
    <>
      <Context.Provider value={value}>
        <div>
          <h1>
            <Link to='/'>Noteful</Link>{' '}
          </h1>
          <nav>{renderNavRoutes()}</nav>
          <header></header>
          <main>{renderMainRoutes()}</main>
        </div>
      </Context.Provider>
    </>
  );
}

import React, { useState, useContext, useEffect } from 'react';
import Context from '../../Context';
import ValidationError from '../ValidationError/ValidationError';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function AddNote(props) {
  const context = useContext(Context);
  const [contextState, setContextState] = useState(context);
  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [content, setContent] = useState('');
  const [contentTouched, setContentTouched] = useState(false);
  const [folderId, setfolderId] = useState('');
  const [folderTouched, setFolderTouched] = useState(false);
  const [folders, setFolders] = useState(contextState.folders);
  useEffect(() => {
    setFolders(context.folders);
  }, [contextState, context.folders]);
  useEffect(() => {
    setContextState(context);
  }, [context]);
  const handleSubmit = (e) => {
    e.preventDefault();
    postNote();
    context.setAdded(Math.random());
    props.history.push(`/`);
  };
  const postNote = () => {
    fetch('http://localhost:9090/notes', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: createId(),
        name: name,
        modified: today,
        folderId: folderId,
        content: content,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };
  const createId = () => {
    return (
      Math.random().toString(36).substring(2, 10) +
      '-' +
      Math.random().toString(36).substring(2, 6) +
      '-' +
      Math.random().toString(36).substring(2, 6) +
      '-' +
      Math.random().toString(36).substring(2, 6) +
      '-' +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 2)
    );
  };
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today =
    yyyy +
    '-' +
    mm +
    '-' +
    dd +
    'T' +
    today.getUTCHours() +
    ':' +
    today.getUTCMinutes() +
    ':' +
    today.getUTCSeconds() +
    ':' +
    today.getUTCMilliseconds() +
    'Z';
  const handleFolderChange = (e) => {
    setfolderId(e);
    setFolderTouched(true);
  };
  const handleNameChange = (e) => {
    setName(e);
    setNameTouched(true);
  };
  const handleContentChange = (e) => {
    setContent(e);
    setContentTouched(true);
  };
  const validateName = () => {
    if (name.length === 0) {
      return 'Name is required';
    } else if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
  };
  const validateContent = () => {
    if (content.length === 0) {
      return 'Content is required';
    }
  };
  const validateFolder = () => {
    if (folderId === '') {
      return 'Please select one';
    }
  };
  return (
    <Form>
      <h2 style={{ textAlign: 'center' }}>Add Note</h2>
      <Form.Label htmlFor='folders'>Folders</Form.Label>
      <Form.Control
        as='select'
        name='folders'
        id='folders'
        onChange={(e) => handleFolderChange(e.target.value)}
      >
        <option value=''>Select One</option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </Form.Control>
      {folderTouched && <ValidationError message={validateFolder()} />}
      <Form.Label htmlFor='name'>Name</Form.Label>
      <Form.Control
        id='name'
        name='name'
        type='text'
        onChange={(e) => handleNameChange(e.target.value)}
      />
      {nameTouched && <ValidationError message={validateName()} />}
      <Form.Label htmlFor='content'>Content</Form.Label>
      <Form.Control
        as='textarea'
        id='content'
        name='content'
        type='text'
        onChange={(e) => handleContentChange(e.target.value)}
      />
      {contentTouched && <ValidationError message={validateContent()} />}
      <Button
        type='submit'
        onClick={(e) => handleSubmit(e)}
        disabled={validateName() || validateContent() || validateFolder()}
      >
        Save
      </Button>
    </Form>
  );
}
AddNote.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

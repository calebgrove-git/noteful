import React, { useState, useContext } from 'react';
import ValidationError from '../ValidationError/ValidationError';
import Context from '../../Context';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

export default function AddFolder(props) {
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);
  const context = useContext(Context);
  const handleSubmit = (e) => {
    e.preventDefault();
    postFolder();
    context.setAdded(Math.random());
    props.history.push(`/`);
  };
  const postFolder = () => {
    fetch('https://tranquil-depths-92452.herokuapp.com/api/folders', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };
  const validateName = () => {
    if (name.length === 0) {
      return 'Name is required';
    } else if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
  };
  const handleChange = (e) => {
    setName(e);
    setTouched(true);
  };
  return (
    <Form>
      <h2 style={{ textAlign: 'center' }}>Add Folder</h2>
      <Form.Label>Folder Name</Form.Label>
      <Form.Control
        type='text'
        onChange={(e) => handleChange(e.target.value)}
      />
      {touched && <ValidationError message={validateName()} />}
      <Button
        type='submit'
        onClick={(e) => handleSubmit(e)}
        disabled={validateName()}
      >
        Save
      </Button>
    </Form>
  );
}
AddFolder.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

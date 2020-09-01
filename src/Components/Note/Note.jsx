import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
export default function Note(props) {
  const context = useContext(Context);
  const handleClickDelete = (e) => {
    e.preventDefault();
    const noteId = props.id;
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        props.onDeleteNote();
        context.deleteNote(noteId);
      })
      .catch((error) => {
        console.error({ error });
      });
  };
  const { name, id, modified } = props;
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link style={{ textDecoration: 'none' }} to={`/note/${id}`}>
          {name}
        </Link>
      </h2>
      <Button
        variant='dark'
        className='Note__delete'
        type='button'
        onClick={(e) => handleClickDelete(e)}
      >
        {' '}
        remove
      </Button>
      <div>
        <div>
          Modified <span>{modified}</span>
        </div>
      </div>
    </div>
  );
}
Note.propTypes = {
  id: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
};

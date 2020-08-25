import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';
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
        <Link to={`/note/${id}`}>{name}</Link>
      </h2>
      <button
        className='Note__delete'
        type='button'
        onClick={(e) => handleClickDelete(e)}
      >
        {' '}
        remove
      </button>
      <div>
        <div>
          Modified <span>{modified}</span>
        </div>
      </div>
    </div>
  );
}

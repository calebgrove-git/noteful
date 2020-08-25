import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';

export default function NoteListNav(props) {
  const context = useContext(Context);
  return (
    <div>
      <ul>
        {context.folders.map((folder) => (
          <li key={folder.id}>
            <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

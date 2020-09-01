import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';
import { Route } from 'react-router-dom';
import { Breadcrumb, Button } from 'react-bootstrap';

export default function NoteListNav() {
  const context = useContext(Context);
  return (
    <div>
      <Breadcrumb>
        {context.folders.map((folder) => (
          <Breadcrumb.Item className='folders' key={folder.id}>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/folder/${folder.id}`}
            >
              {folder.name}
            </Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <Route
        path='/'
        exact
        render={({ history }) => {
          return (
            <Button
              onClick={() => {
                history.push('/addFolder');
              }}
            >
              Add Folder
            </Button>
          );
        }}
      />
    </div>
  );
}

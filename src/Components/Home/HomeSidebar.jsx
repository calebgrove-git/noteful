import React from 'react';

export default function HomeSidebar(props) {
  const showFolders = () => {
    if (props.match === null) {
      const allfolders = props.folders.map((folder) => {
        return (
          <div key={folder.id}>
            <a href={`/folder/${folder.id}`}>
              <h2>{folder.name}</h2>
            </a>
          </div>
        );
      });
      return allfolders;
    } else {
      const thisNote = props.notes.find(
        (note) => note.id === props.match.params.id
      );
      const thisFolder = props.folders.find(
        (folder) => folder.id === thisNote.folderId
      );
      console.log(thisFolder);
      return (
        <div>
          <a href={`/folder/${thisFolder.id}`}>
            <h2>{thisFolder.name}</h2>
          </a>
        </div>
      );
    }
  };
  return <>{showFolders()}</>;
}

import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import store from '../../store';
import { Route, Switch } from 'react-router-dom';
import HomeSidebar from '../Home/HomeSidebar';
import HomeMain from '../Home/HomeMain';
import FullNote from '../Note/FullNote';
import Folder from '../Folder/Folder';
import './App.css';

export default function App() {
  const [notes] = useState(store.notes);
  const [folders] = useState(store.folders);
  return (
    <>
      <header>
        <Nav />
      </header>
      <div id='container'>
        <div>
          <Switch>
            <Route
              exact
              path='/'
              component={() => (
                <HomeSidebar notes={notes} folders={folders} match={null} />
              )}
            />
            <Route
              path='/folder/:id'
              component={() => {
                return (
                  <HomeSidebar notes={notes} folders={folders} match={null} />
                );
              }}
            />
            <Route
              path='/note/:id'
              component={(props) => {
                return (
                  <HomeSidebar
                    notes={notes}
                    folders={folders}
                    match={props.match}
                  />
                );
              }}
            />
          </Switch>
        </div>
        <hr />
        <main>
          <Switch>
            <Route
              exact
              path='/'
              component={() => <HomeMain notes={notes} />}
            />
            <Route
              path='/folder/:id'
              component={(props) => {
                return (
                  <Folder folders={folders} match={props.match} notes={notes} />
                );
              }}
            />
            <Route
              path='/note/:id'
              component={(props) => {
                return <FullNote notes={notes} match={props.match} />;
              }}
            />
          </Switch>
        </main>
      </div>
    </>
  );
}

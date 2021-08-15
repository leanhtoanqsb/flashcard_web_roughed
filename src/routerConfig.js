import React from 'react';
import {Route} from 'react-router-dom';
import Folders from 'modules/folders/Folders';
import Set from 'modules/set/Set';
import Sets from 'modules/sets/Sets';
import SetInFolder from 'modules/sets/SetInFolder';
import SetsAddedForm from 'components/Sets/SetsAddedForm';

const routerConfig = {
  FOLDERS: {
    name: 'FOLDERS',
    path: '/',
    Component: () => <Folders />,
  },
  SETS: {
    name: 'SETS',
    path: '/sets',
    Component: () => <Sets />,
  },
  SETS_ADDED_FORM: {
    name: 'SETS_ADDED_FORM',
    path: '/create-set',
    Component: () => <SetsAddedForm />,
  },
  SETS_IN_FOLDER: {
    name: 'SETS_IN_FOLDER',
    path: '/folder/:folderId',
    Component: () => <SetInFolder />,
  },
  SET: {
    name: 'SET',
    path: '/set/:setId',
    Component: () => <Set />,
  },
};

export const generateRoutes = (config) => {
  return Object.values(config).map(route => {
    const {name, path, Component} = route;
    return (
      <Route exact path={path} key={name} component={Component} />
    );
  });
};

export default routerConfig;

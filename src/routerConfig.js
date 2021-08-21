import React from 'react';
import {Route} from 'react-router-dom';
import Folders from 'modules/folders/Folders';
import Set from 'modules/set/Set';
import Sets from 'modules/sets/Sets';
import SetInFolder from 'modules/sets/SetInFolder';
import SetsAddedForm from 'components/Sets/SetsAddedForm';
import HomePage from 'modules/homePage/HomePage';
import LibraryPage from 'modules/libraryPage/LibraryPage';

const routerConfig = {
  HOMEPAGE: {
    name: 'HOMEPAGE',
    path: '/',
    Component: () => <HomePage />,
    exact: true,
  },
  LIBRARY: {
    name: 'LIBRARY',
    path: '/library',
    Component: () => <LibraryPage />,
    exact: false,
  },
  SETS_ADDED_FORM: {
    name: 'SETS_ADDED_FORM',
    path: '/create-set',
    Component: () => <SetsAddedForm />,
    exact: true,
  },
  SETS_IN_FOLDER: {
    name: 'SETS_IN_FOLDER',
    path: '/folder/:folderId',
    Component: () => <SetInFolder />,
    exact: true,
  },
  SET: {
    name: 'SET',
    path: '/set/:setId',
    Component: () => <Set />,
    exact: true,
  },
};

export const generateRoutes = (config) => {
  return Object.values(config).map(route => {
    const {name, path, Component, exact} = route;
    return (
      <Route exact={exact} path={path} key={name} component={Component} />
    );
  });
};

export default routerConfig;

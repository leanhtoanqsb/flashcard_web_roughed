import './App.css';
import Header from './components/Header/index';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import routerConfig, {generateRoutes} from './routerConfig';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { fetchSets  } from './modules/sets/setsSlice'
import { fetchFolders  } from './modules/folders/foldersSlice'
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFolders())
    dispatch(fetchSets())
  }, [dispatch])
  return (
      <Router>
      <CssBaseline />
        <div className="App">
          <Header />
          <div style={{
            background: '#f6f7fb',
            position: 'relative',
            minHeight: '100vh',
          }}>
          <Switch>
            {generateRoutes(routerConfig)}
          </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;

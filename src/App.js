import './App.css';
import Header from './components/Header/index';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import routerConfig, {generateRoutes} from './routerConfig';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchSets  } from './modules/sets/setsSlice'
import { fetchFolders  } from './modules/folders/foldersSlice'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";

const THEME = createTheme({
  customColor: {
    text: {
      gray: '#cedaf3',
    },
    border: {
      gray: 'rgba(255,255,255,0.2)',
    },
    divider: {
      gray: 'rgba(255,255,255,0.2)',
    },
    background: {
      primary: '#3f51b5',
      gray: '#f6f7fb',
    },
  },
});

function App() {
  const dispatch = useDispatch()
  const folderStatus = useSelector(state => state.folders.status)
  useEffect(() => {
    dispatch(fetchFolders())
  }, [dispatch])
  useEffect(() => {
    dispatch(fetchSets())
  }, [dispatch])
  return (
      <Router>
      <ThemeProvider theme={THEME}>
      <CssBaseline />
        <div className="App">
          <Header />
          <div>
          <Switch>
            {
              generateRoutes(routerConfig)
            }
          </Switch>
          </div>
        </div>
      </ThemeProvider>
      </Router>
  );
}

export default App;

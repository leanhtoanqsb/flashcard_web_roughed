import './App.css';
import Header from './components/Header/index';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import routerConfig, {generateRoutes} from './routerConfig';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { fetchSets  } from './modules/sets/setsSlice'
import { fetchFolders  } from './modules/folders/foldersSlice'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";

const THEME = createTheme({
  customColor: {
    textGray: '#cedaf3',
    dividerGray: 'rgba(255,255,255,0.2)',
  },
});

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFolders())
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
            {generateRoutes(routerConfig)}
          </Switch>
          </div>
        </div>
      </ThemeProvider>
      </Router>
  );
}

export default App;

import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import App from './components/App';

import 'mapbox-gl/dist/mapbox-gl.css';
import './app.css';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
  },
});

function Index() {
  return (
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  );
}

render(<Index />, document.getElementById("root"));

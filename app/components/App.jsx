import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import NavBar from './NavBar';
import Map from './Map';
import Legend from './Legend';

const App = (props) => {
  return (
    <div>
      <NavBar />
      <Map />
      <Legend />
    </div>
  );
}


export default withTheme()(App);

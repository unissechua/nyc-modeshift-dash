import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const NavBar = () => {
    return(
      <div>
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="title" color="inherit">
                  Prediction of Mode Shift in NYC Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
      </div>
    )
}
export default NavBar;

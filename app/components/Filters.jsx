import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { origins, destinations, features } from '../config/options';

const styles = theme => ({
  positionStyle: {
    position: 'absolute',
    top: '80px',
    left: '16px',
    zIndex: '100',
    display: 'flex',
    flexWrap: 'wrap'
  },
  paperStyle: {
    padding: '8px 28px 8px 16px',
    width: '200px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});


class Filters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, select, zone, feature,
      handleSelectChange, handleZoneChange,
      handleFeatureChange } = this.props;
    let zoneSelect;

    if (select === 'origin') {
      zoneSelect = origins;
    } else {
      zoneSelect = destinations;
    }

    return (
      <div className={classes.positionStyle}>
        <Paper className={classes.paperStyle}>
          <TextField
            id="select"
            select
            label="Origin / Destination"
            className={classes.textField}
            value={select}
            onChange={handleSelectChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            // helperText="Origin or destination"
            margin="normal"
          >
            <MenuItem key="origin" value="origin">
              Origin
            </MenuItem>
            <MenuItem key="destination" value="destination">
              Destination
            </MenuItem>
          </TextField>

          <TextField
            id="zone"
            select
            label={"Taxi Zone"}
            className={classes.textField}
            value={zone}
            onChange={handleZoneChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            <MenuItem key="all" value="all">
              {`All ${select} zones`}
            </MenuItem>
            {zoneSelect.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="feature"
            select
            label="Feature"
            className={classes.textField}
            value={feature}
            onChange={handleFeatureChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            {features.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Filters);

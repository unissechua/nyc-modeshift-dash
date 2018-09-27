import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { colors } from '../config/options';

const styles = theme => ({
  label: {
    margin: '0 0 5px',
    color: '#666',
    textTransform: 'uppercase',
    fontSize: '11px',
    fontWeight: '700',
    textAlign: 'left',
  }
})
/**
 * The legend on the map
 * @param {object} props Component props
 */
const Legend = (props) => {
  const { classes } = props;

  return (
    <Paper className="map-legend" elevation={4}>
      <Typography className={classes.label}>Value Experience (Vx)</Typography>
      <ul>
        <Typography component="li" className="min">-10,000</Typography>
        <Typography component="li" className="max">10,000+</Typography>
        <li className="graph">
          <div className="colors">
            {colors.map((value, index) => (
              <div className="quartile" key={index} style={{ backgroundColor: value }} />
            ))}
          </div>
        </li>
      </ul>
    </Paper>
  );
};

export default withStyles(styles)(Legend);

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

mapboxgl.accessToken = 'pk.eyJ1IjoiaXdzc3R1YXJ0IiwiYSI6InNaNzMzVXMifQ.OFDL1zM5OjRUHcL_Y5htCA';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -73.98,
      lat: 40.75,
      zoom: 11,
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: `mapbox://styles/mapbox/light-v9`,
      center: [lng, lat],
      zoom,
      maxZoom: 12.5,
      minZoom: 9.5
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('style.load', () => {

      this.map.addLayer({
      	"id": "destination",
      	"type": "fill",
      	"source": {
      		type: 'vector',
      		url: 'mapbox://unissechua.cjm8lrxyc16x12wqp09anuos3-907i0'
      	},
      	"source-layer": "destinationVx",
      	"paint": {
      		"fill-color": "#C9B79C"
      	}
      }, 'waterway-label');

      this.map.addLayer({
      	"id": "origin",
      	"type": "fill",
      	"source": {
      		type: 'vector',
      		url: 'mapbox://unissechua.23xv8rkk'
      	},
      	"source-layer": "originVx-1l6u35",
      	"paint": {
      		"fill-color": "#71816D"
      	}
      }, 'waterway-label');

      this.map.addLayer({
      	"id": "base-zones",
      	"type": "line",
      	"source": {
      		type: 'vector',
      		url: 'mapbox://unissechua.cjm8o6zh91v9y32qvkt3hvx6c-579wh'
      	},
      	"source-layer": "nyctaxizones",
      	"paint": {
            'line-width': 1,
            'line-color': '#ececec',
          },
      }, 'waterway-label');
    });

    this.map.on('zoom', () => {
      console.log(this.map.getZoom());
    })
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const mapContainerStyle = {
      height: '100%',
      overflow: 'hidden',
      margin: '0',
      padding: '0',
      backgroundColor: '#d0d0d0',
    };

    const mapStyle = {
      height: '70vh',
      width: '100vw',
    };

    return (
      <Grid container>
        <div style={mapStyle} ref={(el) => { this.mapContainer = el; }} />
      </Grid>
    );
  }
}

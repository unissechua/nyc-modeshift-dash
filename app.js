import {MDCRipple} from '@material/ripple';
import {MDCSelect} from '@material/select';

// const ripple = new MDCRipple(document.querySelector('.foo-button'));


const origin = new MDCSelect(document.querySelector('#origin-select'));
const destination = new MDCSelect(document.querySelector('#destination-select'));
const feature = new MDCSelect(document.querySelector('#feature-select'));
// select.listen('change', () => {
//   alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
// });


mapboxgl.accessToken = 'pk.eyJ1IjoidW5pc3NlY2h1YSIsImEiOiJjamR3NG11dHMzYThnMzNxcDZmYWhsdXBxIn0.0XHPtsEvZJjMI3Ev2GElKA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-73.98, 40.75],
    zoom: 11
});

map.addControl(new mapboxgl.NavigationControl());

// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

map.on('load', function () {

	console.log(map);

	map.addLayer({
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
    });

    map.addLayer({
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
    });

    map.addLayer({
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
    });
});

map.on('mouseenter', 'destination', function(e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    var zone = e.features[0].properties.destination;
    var uberCost = e.features[0].properties.cost_uber;
    var uberTravelTime = e.features[0].properties.traveltime_uber;

    var description = "<b>Zone:</b> " + zone +"<br><b>Uber Cost:</b> " + uberCost + "<br>" + "<b>Uber Travel Time:</b> " + uberTravelTime;

    // var coordinates = e.features[0].geometry.coordinates.slice();
    // var description = e.features[0].properties.description;

    // // Ensure that if the map is zoomed out such that multiple
    // // copies of the feature are visible, the popup appears
    // // over the copy being pointed to.
    // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    // }

    // // Populate the popup and set its coordinates
    // // based on the feature found.
    popup.setLngLat(e.lngLat)
        .setHTML(description)
        .addTo(map);
});

map.on('mouseleave', 'destination', function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

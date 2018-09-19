import {MDCRipple} from '@material/ripple';
import {MDCSelect} from '@material/select';

// const ripple = new MDCRipple(document.querySelector('.foo-button'));


// const select = new MDCSelect(document.querySelector('.mdc-select'));
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
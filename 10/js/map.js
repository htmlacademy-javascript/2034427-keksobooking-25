import {START_LAT, START_LNG, START_ZOOM, MARKER_WIDTH, MAIN_MARKER_WIDTH} from './constant.js';
import {setAppDisabled} from './app-disabled.js';
import {setAdders} from './form.js';

const map = L.map('map-canvas');
const startLatLng = L.latLng(START_LAT, START_LNG);
const markerGroup = L.layerGroup().addTo(map);

const icon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [MARKER_WIDTH, MARKER_WIDTH],
  iconAnchor: [MARKER_WIDTH / 2, MARKER_WIDTH],
});

const onMapLoaded = () => {
  setAdders(startLatLng);
  setAppDisabled(false);
};

const initialMap = () => {
  map.on('load', onMapLoaded).setView(startLatLng, START_ZOOM);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);
};

const createMarker = (popupElement, location) => {
  const marker = L.marker(
    {
      lat: location.lat,
      lng: location.lng
    },
    {
      icon
    });
  marker
    .addTo(markerGroup)
    .bindPopup(popupElement);
};

const createMainPinMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: '/img/main-pin.svg',
    iconSize: [MAIN_MARKER_WIDTH, MAIN_MARKER_WIDTH],
    iconAnchor: [MAIN_MARKER_WIDTH / 2, MAIN_MARKER_WIDTH],
  });
  const marker = L.marker(startLatLng, {
    draggable: true,
    icon: mainPinIcon,
  });
  marker.addTo(map);

  return marker;
};

const mainPinMarker = createMainPinMarker();

const resetMainPinMarker = () => {
  map.closePopup();
  mainPinMarker.setLatLng(startLatLng);
  map.setView(startLatLng, START_ZOOM);
};

mainPinMarker.on('moveend', (evt) => setAdders(evt.target.getLatLng()));

export {initialMap, resetMainPinMarker, createMarker};



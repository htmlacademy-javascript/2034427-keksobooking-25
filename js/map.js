import {
  START_LAT,
  START_LNG,
  START_ZOOM,
  MARKER_WIDTH,
  MAIN_MARKER_WIDTH
} from './constant.js';
import {setEnabledApp} from './app-status.js';
import {setDefaultAdders} from './ad-form.js';
import {createAd} from './similar-ads.js';

const map = L.map('map-canvas');
const startLatLng = L.latLng(START_LAT, START_LNG);
const markerGroup = L.layerGroup().addTo(map);

const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [MARKER_WIDTH, MARKER_WIDTH],
  iconAnchor: [MARKER_WIDTH / 2, MARKER_WIDTH],
});

const createMarker = (popupElement, location) => {
  const marker = L.marker({
    lat: location.lat,
    lng: location.lng
  }, {
    icon
  });
  marker
    .addTo(markerGroup)
    .bindPopup(popupElement);
};

const renderMarkers = (listAds) => {
  listAds.forEach((item) => {
    createMarker(createAd(item), item.location);
  });
};

const updateMarkers = (listAds) => {
  markerGroup.clearLayers();
  renderMarkers(listAds);
};

const createMainPinMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [MAIN_MARKER_WIDTH, MAIN_MARKER_WIDTH],
    iconAnchor: [MAIN_MARKER_WIDTH / 2, MAIN_MARKER_WIDTH],
  });
  return L.marker(startLatLng, {
    draggable: true,
    icon: mainPinIcon,
  });
};

const mainPinMarker = createMainPinMarker();

const setDefaultMapValue = () => {
  map.closePopup();
  mainPinMarker.setLatLng(startLatLng);
  map.setView(startLatLng, START_ZOOM);
};

mainPinMarker.on('moveend', (evt) => setDefaultAdders(evt.target.getLatLng()));

const initialMap = (onMapLoaded) => {

  const onMapInit = () => {
    mainPinMarker.addTo(map);
    setEnabledApp();
  };

  map.on('load', onMapInit).setView(startLatLng, START_ZOOM);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);

  onMapLoaded();
};

export {initialMap, createMarker, setDefaultMapValue, renderMarkers, updateMarkers};


import {START_LAT, START_LNG, MAX_COUNT_ADS} from './constant.js';
import {setAppDisabled} from './app-status.js';
import {initialMap, renderMarkers, setMapDefaultValue} from './map.js';
import {initialForm, setAdders} from './ad-form.js';
import {setSliderDefaultValue} from './slider.js';
import {resetFilters, setEnableFilter, setFilter} from './filter.js';
import {getData} from './api.js';
import {showAlertError} from './utils.js';
import './avatar.js';
import './photo.js';

let similarAds = [];
let isFirstLoad = true;

setAppDisabled();
initialMap();
initialForm(setDefault);
getData(successLoadData, errorLoadData);
setDefault();

function setDefault() {
  resetFilters();
  setMapDefaultValue();
  setSliderDefaultValue();
  setAdders({lat: START_LAT, lng: START_LNG});
  if (!isFirstLoad) {
    renderMarkers(similarAds);
  }
  isFirstLoad = false;
}

function successLoadData (response) {
  similarAds = response.slice(0, MAX_COUNT_ADS);
  renderMarkers(similarAds);
  setFilter(response);
  setEnableFilter();
}

function errorLoadData() {
  showAlertError('Ошибка загрузки данных с сервера');
}

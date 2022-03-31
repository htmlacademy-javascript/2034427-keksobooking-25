import {
  START_LAT,
  START_LNG,
  MAX_COUNT_ADS
} from './constant.js';
import {setDisabledApp} from './app-status.js';
import {initialMap, renderMarkers, updateMarkers, setDefaultMapValue} from './map.js';
import {initialForm, setDefaultAdders, setDefaultAdType} from './ad-form.js';
import {resetFilters, setEnableFilterForm, setFilter} from './filter.js';
import {getData} from './api.js';
import {showAlertError} from './utils.js';
import './avatar.js';
import './photo.js';

let similarAds = [];
let isFirstLoad = true;

const setDefault = () => {
  resetFilters();
  setDefaultMapValue();
  setDefaultAdders({lat: START_LAT, lng: START_LNG});
  setDefaultAdType();
  if (!isFirstLoad) {
    updateMarkers(similarAds);
  }
  isFirstLoad = false;
};

const onSuccessLoadData = (listAds) => {
  similarAds = listAds.slice(0, MAX_COUNT_ADS);
  renderMarkers(similarAds);
  setFilter(listAds);
  setEnableFilterForm();
};

const onErrorLoadData = () => {
  showAlertError('Ошибка загрузки данных с сервера');
};

const onMapLoad = () => {
  getData(onSuccessLoadData, onErrorLoadData);
};

setDisabledApp();
initialMap(onMapLoad);
initialForm(setDefault);
setDefault();

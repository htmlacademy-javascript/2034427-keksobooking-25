import {START_LAT, START_LNG} from './constant.js';
import {listAdObjets} from './data.js';
import {renderAds} from './render.js';
import {setAppDisabled} from './app-disabled.js';
import {addForm, setAdders} from './form.js';
import {resetPriceSlider} from './slider.js';
import {initialMap, resetMainPinMarker} from './map.js';

setAppDisabled(true);
renderAds(listAdObjets());
addForm(setDefault);

function setDefault() {
  initialMap();
  resetMainPinMarker();
  resetPriceSlider();
  setAdders({lat: START_LAT, lng: START_LNG});
}

setDefault();

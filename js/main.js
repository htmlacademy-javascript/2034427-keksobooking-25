import {START_LAT, START_LNG} from './constant.js';
import {setAppDisabled} from './app-status.js';
import {initialMap, setMapDefaultValue} from './map.js';
import {initialForm, setAdders} from './ad-form.js';
import {setSliderDefaultValue} from './slider.js';
import {listAdObjets} from './data.js';
import {renderAds} from './render.js';

setAppDisabled();
initialMap();
initialForm(setDefault);
setDefault();
renderAds(listAdObjets());

function setDefault() {
  setMapDefaultValue();
  setSliderDefaultValue();
  setAdders({lat: START_LAT, lng: START_LNG});
}

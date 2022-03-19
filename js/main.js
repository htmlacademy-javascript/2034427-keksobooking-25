import {listObjets} from './data.js';
import {renderAds} from './render.js';
import {setAppDisabled} from './app-disabled.js';
import './form.js';

setAppDisabled(true);
setAppDisabled(false);

const data = listObjets();
renderAds(data[1]);


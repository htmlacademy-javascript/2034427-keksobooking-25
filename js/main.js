import {listObjets} from './data.js';
import {renderAds} from './render.js';
import './form.js';

const data = listObjets();

renderAds(data[1]);


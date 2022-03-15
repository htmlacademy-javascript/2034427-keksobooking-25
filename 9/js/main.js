import {listObjets} from './data.js';
import {renderAds} from './render.js';
import {setActiveStatus, setNotActiveStatus} from './form.js';

setNotActiveStatus();
setActiveStatus();

const data = listObjets();
renderAds(data[1]);


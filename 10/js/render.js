import {createAdElement} from './similar-ads.js';
import {createMarker} from './map.js';

const renderAds = (listAds) => {
  listAds.forEach((item) => {
    createMarker(createAdElement(item), item.location);
  });
};

export {renderAds};

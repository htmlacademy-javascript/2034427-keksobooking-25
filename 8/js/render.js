import {createAdElement} from './similar-ads.js';

const adsContainer = document.querySelector('.map__canvas');

const renderAds = (adsObj) => {
  const adItem = createAdElement(adsObj);
  adsContainer.append(adItem);
};

export {renderAds};

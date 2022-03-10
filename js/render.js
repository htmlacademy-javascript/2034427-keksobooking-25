import {createAdElement} from './similar-ads.js';

const adsContainer = document.querySelector('.map__canvas');

const renderAds = (addsList) => {
  addsList.forEach((ad) => {
    const adItem = createAdElement(ad);
    adsContainer.append(adItem);
  });
};

export {renderAds};

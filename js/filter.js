import {
  FILTER_DEFAULT,
  FILTER_LOW_PRICE,
  FILTER_HIGH_PRICE,
  FILTER_DELAY,
  MAX_COUNT_ADS
} from './constant.js';
import {debounce} from './utils.js';
import {updateMarkers} from './map.js';

const PriceLevel = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const formElement = document.querySelector('.map__filters');
const selectElement = formElement.querySelectorAll('select');
const fieldsetElement = formElement.querySelector('fieldset');

const typeElement = formElement.querySelector('#housing-type');
const priceElement = formElement.querySelector('#housing-price');
const roomsElement = formElement.querySelector('#housing-rooms');
const guestsElement = formElement.querySelector('#housing-guests');

const setDisableFilterForm = () => {
  formElement.classList.add('map__filters--disabled');
  fieldsetElement.disabled = true;
  selectElement.forEach((it) => {it.disabled = true;});
};

const setEnableFilterForm = () => {
  formElement.classList.remove('map__filters--disabled');
  fieldsetElement.disabled = false;
  selectElement.forEach((it) => {it.disabled = false;});
};

const getDefaultCheck = (selector) => selector.value === FILTER_DEFAULT;

const checkType = (itemAd) => getDefaultCheck(typeElement) || itemAd.offer.type === typeElement.value;

const checkPrice = (itemAd) => {
  switch (priceElement.value) {
    case FILTER_DEFAULT:
      return true;
    case PriceLevel.LOW:
      return itemAd.offer.price < FILTER_LOW_PRICE;
    case PriceLevel.MIDDLE:
      return itemAd.offer.price >= FILTER_LOW_PRICE && itemAd.offer.price < FILTER_HIGH_PRICE;
    case PriceLevel.HIGH:
      return itemAd.offer.price >= FILTER_HIGH_PRICE;
    default:
      return false;
  }
};

const checkRooms = (itemAd) =>
  getDefaultCheck(roomsElement) || parseInt(roomsElement.value, 10) === itemAd.offer.rooms;

const checkGuests = (itemAd) =>
  getDefaultCheck(guestsElement) || parseInt(guestsElement.value, 10) <= itemAd.offer.guests;

const checkFeatures = (itemAd) => {
  const featuresElement = formElement.querySelectorAll('.map__checkbox:checked');
  for (let i = 0; i < featuresElement.length; i++) {
    if (itemAd.offer.features && itemAd.offer.features.includes(featuresElement[i].value)) {
      continue;
    }
    return false;
  }
  return true;
};

const getFilteredAds = (similarAds) => {
  const filteredAds = [];
  let counter = 0;
  for (let i = 0; i < similarAds.length; i++) {
    const item = similarAds[i];
    if (checkType(item) && checkPrice(item) && checkRooms(item) && checkGuests(item) && checkFeatures(item)) {
      filteredAds.push(similarAds[i]);
      counter++;
      if (counter === MAX_COUNT_ADS) {
        break;
      }
    }
  }
  return filteredAds;
};

const onFilterChange = (similarAds) =>
  debounce(() => {
    const filteredAdds = getFilteredAds(similarAds).slice(0, MAX_COUNT_ADS);
    updateMarkers(filteredAdds);
  }, FILTER_DELAY);

const setFilter = (similarAds) =>
  formElement.addEventListener('change', onFilterChange(similarAds));

const resetFilters = () => formElement.reset();

export {setEnableFilterForm, setDisableFilterForm, setFilter, resetFilters};


import {FILTER_DEFAULT, FILTER_LOW_PRICE, FILTER_HIGH_PRICE, FILTER_DELAY, MAX_COUNT_ADS} from './constant.js';
import {debounce} from './utils.js';
import {renderMarkers} from './map.js';

const filterForm = document.querySelector('.map__filters');
const filterFormSelects = filterForm.querySelectorAll('select');
const filterFormFieldset = filterForm.querySelector('fieldset');

const housingType = filterForm.querySelector('#housing-type');
const housingPrice = filterForm.querySelector('#housing-price');
const housingRooms = filterForm.querySelector('#housing-rooms');
const housingGuests = filterForm.querySelector('#housing-guests');

const setDisableFilter = () => {
  filterForm.classList.add('map__filters--disabled');
  filterFormFieldset.disabled = true;
  filterFormSelects.forEach((it) => {it.disabled = true;});
};

const setEnableFilter = () => {
  filterForm.classList.remove('map__filters--disabled');
  filterFormFieldset.disabled = false;
  filterFormSelects.forEach((it) => {it.disabled = false;});
};

const defaultCheck = (selector) => selector.value === FILTER_DEFAULT;

const filterType = (itemAd, selector) => {
  if (!defaultCheck(selector)) {
    return itemAd.offer.type === selector.value;
  }
  return true;
};

const filterPrice = (itemAd, selector) => {
  if (defaultCheck(selector)) {
    return true;
  }
  if (selector.value === 'low') {
    return itemAd.offer.price < FILTER_LOW_PRICE;
  }
  if (selector.value === 'middle') {
    return itemAd.offer.price >= FILTER_LOW_PRICE && itemAd.offer.price < FILTER_HIGH_PRICE;
  }
  if (selector.value === 'high') {
    return itemAd.offer.price >= FILTER_HIGH_PRICE;
  }
  return false;
};

const filterRooms = (itemAd, selector) => {
  if (!defaultCheck(selector)) {
    return parseInt(selector.value, 10) === itemAd.offer.rooms;
  }
  return true;
};

const filterGuests = (itemAd, selector) => {
  if (!defaultCheck(selector)) {
    return parseInt(selector.value, 10) <= itemAd.offer.guests;
  }
  return true;
};

const filterFeatures = (itemAd) => {
  const checkedFeatures = filterForm.querySelectorAll('.map__checkbox:checked');
  for (let i = 0; i < checkedFeatures.length; i++) {
    if (itemAd.offer.features && itemAd.offer.features.includes(checkedFeatures[i].value)) {
      continue;
    }
    return false;
  }
  return true;
};

const finalFilter = (similarAds) =>
  similarAds.filter((itemAd) => (
    filterType(itemAd, housingType) &&
    filterPrice(itemAd, housingPrice) &&
    filterRooms(itemAd, housingRooms) &&
    filterGuests(itemAd, housingGuests) &&
    filterFeatures(itemAd)
  ));

const onFilterChange = (similarAds) =>
  debounce(() => {
    const filteredAdds = finalFilter(similarAds);
    renderMarkers(filteredAdds.slice(0, MAX_COUNT_ADS));
  }, FILTER_DELAY);

const setFilter = (similarAds) =>
  filterForm.addEventListener('change', onFilterChange(similarAds));

const resetFilters = () => filterForm.reset();

export {setEnableFilter, setDisableFilter, setFilter, resetFilters};


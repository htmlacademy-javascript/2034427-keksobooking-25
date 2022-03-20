import {MIN_LENGTH_TITLE, MAX_LENGTH_TITLE, MAX_PRICE} from './constant.js';
import {priceSlider} from './slider.js';

const form = document.querySelector('.ad-form');
const titleField = document.querySelector('#title');
const typeField = document.querySelector('#type');
const priceField = document.querySelector('#price');
const roomsField = document.querySelector('#room_number');
const capacityField = document.querySelector('#capacity');
const timeInField = document.querySelector('#timein');
const timeOutField = document.querySelector('#timeout');
const addressField = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
addressField.setAttribute('readonly', 'readonly');

const minPrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const roomCapacities = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const capacityNumberToText = {
  1: 'одного гостя',
  2: 'двух гостей',
  3: 'трех гостей',
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
}, true);

priceSlider(parseInt(priceField.min, 10), MAX_PRICE, pristine);

const setAdders = ({lat, lng}) => {
  const latitude = lat.toFixed(5);
  const longitude = lng.toFixed(5);
  addressField.value = `${latitude} ${longitude}`;
};

const setAdType = () => {
  priceField.min = minPrices[typeField.value];
  priceField.placeholder = minPrices[typeField.value];
};

const getPriceValidatorErrors = () => {
  if (parseInt(priceField.value, 10) < parseInt(priceField.min, 10)) {
    return `Минимальная цена ${priceField.min}`;
  }
  return `Максимальная цена ${MAX_PRICE}`;
};

pristine.addValidator(
  priceField,
  (valuePrice) => valuePrice >= parseInt(priceField.min, 10) && valuePrice <= MAX_PRICE,
  getPriceValidatorErrors
);

pristine.addValidator(
  titleField,
  (symbols) => symbols.length >= MIN_LENGTH_TITLE && symbols.length <= MAX_LENGTH_TITLE ,
  `Длинна объявления должна быть от ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов.`
);

const roomsCapacityValidator = () => {
  const countRooms = parseInt(roomsField.value, 10);
  const countCapacities = parseInt(capacityField.value, 10);
  return roomCapacities[countRooms].includes(countCapacities);
};

const getRoomsCapacityErrorMessage = () => {
  const countRooms = parseInt(roomsField.value, 10);
  const maxCapacities = Math.max(...roomCapacities[countRooms]);
  const textRooms = roomsField.options[roomsField.selectedIndex].textContent;
  if (countRooms === 100) {
    return `${textRooms} не для гостей`;
  }

  return `${textRooms} не более ${capacityNumberToText[maxCapacities]}`;
};

pristine.addValidator(roomsField, roomsCapacityValidator, getRoomsCapacityErrorMessage);

capacityField.addEventListener('change', () => pristine.validate(roomsField));
timeInField.addEventListener('change', () => {timeOutField.value = timeInField.value;});
timeOutField.addEventListener('change', () => {timeInField.value = timeOutField.value;});

typeField.addEventListener('change', () => {
  setAdType();
  pristine.validate(priceField);
});

const addForm = (setDefault) => {

  const resetForm = () => {
    form.reset();
    pristine.reset();
    setDefault();
    setAdType();
  };

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      resetForm();
    }
  });
};

export {addForm, setAdders};

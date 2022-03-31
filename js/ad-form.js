import {
  MIN_LENGTH_TITLE,
  MAX_LENGTH_TITLE,
  MAX_PRICE,
  ROOMS_NOT_FOR_GUESTS
} from './constant.js';
import {setPriceSlider, setSliderDefaultValue} from './slider.js';
import {sendData} from './api.js';
import {showError, showSuccess} from './dialog-modal.js';
import {clearAvatar} from './avatar.js';
import {clearPhoto} from './photo.js';

const formElement = document.querySelector('.ad-form');
const fieldsetElement = formElement.querySelectorAll('fieldset');
const titleElement = formElement.querySelector('#title');
const addressElement = formElement.querySelector('#address');
const typeElement = formElement.querySelector('#type');
const priceElement = formElement.querySelector('#price');
const roomsElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');
const submitButtonElement = formElement.querySelector('.ad-form__submit');
const resetButtonElement = formElement.querySelector('.ad-form__reset');
addressElement.setAttribute('readonly', 'readonly');

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

const pristine = new window.Pristine(formElement, {
  classTo: 'ad-form__element',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
}, true);

const setDefaultAdders = ({lat, lng}) => {
  const latitude = lat.toFixed(5);
  const longitude = lng.toFixed(5);
  addressElement.value = `${latitude} ${longitude}`;
};

const setDefaultAdType = () => {
  priceElement.min = minPrices[typeElement.value];
  priceElement.placeholder = minPrices[typeElement.value];
};

const getPriceValidatorMessage = () => {
  if (parseInt(priceElement.value, 10) < parseInt(priceElement.min, 10)) {
    return `Минимальная цена ${priceElement.min}`;
  }
};

pristine.addValidator(
  priceElement,
  (valuePrice) => valuePrice >= parseInt(priceElement.min, 10) && valuePrice <= MAX_PRICE,
  getPriceValidatorMessage
);

pristine.addValidator(
  titleElement,
  (symbols) => symbols.length >= MIN_LENGTH_TITLE && symbols.length <= MAX_LENGTH_TITLE ,
  `Длинна объявления должна быть от ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов.`
);

const validateRoomsCapacity = () => {
  const countRooms = parseInt(roomsElement.value, 10);
  const countCapacities = parseInt(capacityElement.value, 10);
  return roomCapacities[countRooms].includes(countCapacities);
};

const getRoomsCapacityMessage = () => {
  const countRooms = parseInt(roomsElement.value, 10);
  const maxCapacities = Math.max(...roomCapacities[countRooms]);
  const textRooms = roomsElement.options[roomsElement.selectedIndex].textContent;
  return countRooms === ROOMS_NOT_FOR_GUESTS
    ? `${textRooms} не для гостей`
    : `${textRooms} не более ${capacityNumberToText[maxCapacities]}`;
};

pristine.addValidator(roomsElement, validateRoomsCapacity, getRoomsCapacityMessage);

capacityElement.addEventListener('change', () => pristine.validate(roomsElement));
timeInElement.addEventListener('change', () => {timeOutElement.value = timeInElement.value;});
timeOutElement.addEventListener('change', () => {timeInElement.value = timeOutElement.value;});

typeElement.addEventListener('change', () => {
  setDefaultAdType();
  pristine.validate(priceElement);
});

const setEnableForm = () => {
  formElement.classList.remove('ad-form--disabled');
  fieldsetElement.forEach((it) => {it.disabled = false;});
};

const setDisableForm = () => {
  formElement.classList.add('ad-form--disabled');
  fieldsetElement.forEach((it) => {it.disabled = true;});
};

setPriceSlider(pristine);

const initialForm = (onSetDefault) => {

  const resetForm = () => {
    formElement.reset();
    pristine.reset();
    setSliderDefaultValue();
    clearAvatar();
    clearPhoto();
    onSetDefault();
  };

  const onSuccess = () => {
    showSuccess();
    submitButtonElement.removeAttribute('disabled');
    resetForm();
  };

  const onFailure = () => {
    showError();
    submitButtonElement.removeAttribute('disabled');
  };

  resetButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      submitButtonElement.setAttribute('disabled', 'disabled');
      sendData(onSuccess, onFailure, new FormData(evt.target));
    }
  });
};

export {initialForm, setDefaultAdders, setEnableForm, setDisableForm, setDefaultAdType};


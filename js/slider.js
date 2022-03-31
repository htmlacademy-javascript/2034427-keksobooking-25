import {MAX_PRICE} from './constant.js';

const sliderElement = document.querySelector('.ad-form__slider');
const priceElement = document.querySelector('#price');

const setPriceSlider = (pristine) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: MAX_PRICE,
    },
    start: 0,
    step: 1,
    connect: 'lower',
  });

  priceElement.addEventListener('input', () => {
    sliderElement.noUiSlider.set(priceElement.value);
  });

  sliderElement.noUiSlider.on('update', (values, handle) => {
    priceElement.value = parseInt(values[handle], 10);
    if (parseInt(priceElement.value, 10) === 0) {
      priceElement.value = '';
    } else {
      pristine.validate(priceElement);
    }
  });
};

const setSliderDefaultValue = () => sliderElement.noUiSlider.set(0);
const setDisabledSlider = () => sliderElement.setAttribute('disabled', 'disabled');
const setEnabledSlider = () => sliderElement.removeAttribute('disabled');

export {setPriceSlider, setSliderDefaultValue, setDisabledSlider, setEnabledSlider};

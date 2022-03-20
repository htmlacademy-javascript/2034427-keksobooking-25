const sliderElement = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');

const priceSlider = (minValue, maxPrice, pristine) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: maxPrice,
    },
    start: 0,
    step: 1,
    connect: 'lower',
  });

  priceField.addEventListener('input', () => {
    sliderElement.noUiSlider.set(priceField.value);
  });

  sliderElement.noUiSlider.on('update', (values, handle) => {
    priceField.value = parseInt(values[handle], 10);
    if (parseInt(priceField.value, 10) === 0) {
      priceField.value = '';
    } else {
      pristine.validate(priceField);
    }
  });
};

const resetPriceSlider = () => sliderElement.noUiSlider.set(0);

export {priceSlider, resetPriceSlider};

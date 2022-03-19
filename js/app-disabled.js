const setAppDisabled = (isDisabled = true) => {

  const adForm = document.querySelector('.ad-form');
  const filterForm = document.querySelector('.map__filters');
  const adFormFieldsets = adForm.querySelectorAll('fieldset');
  const filterFormSelects = filterForm.querySelectorAll('select');
  const filterFormFieldset = filterForm.querySelector('fieldset');

  const setDisabled = (target, disabled) => {
    if (target.length) {
      target.forEach((item) => {
        item.disabled = disabled;
      });
    } else {
      target.disabled = disabled;
    }
  };

  const addDisabledClass = (element, disabledClass, disabled) => {
    if (disabled) {
      element.classList.add(disabledClass);
    } else {
      element.classList.remove(disabledClass);
    }
  };

  addDisabledClass(adForm, 'ad-form--disabled', isDisabled);
  addDisabledClass(filterForm, 'map__filters--disabled', isDisabled);

  setDisabled(adFormFieldsets, isDisabled);
  setDisabled(filterFormSelects, isDisabled);
  setDisabled(filterFormFieldset, isDisabled);
};

export {setAppDisabled};

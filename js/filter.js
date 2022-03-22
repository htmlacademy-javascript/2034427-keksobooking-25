const filterForm = document.querySelector('.map__filters');
const filterFormSelects = filterForm.querySelectorAll('select');
const filterFormFieldset = filterForm.querySelector('fieldset');

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

export {setEnableFilter, setDisableFilter};

